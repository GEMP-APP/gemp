import React, { useState, useEffect } from "react";
import { Dimensions, View, StyleSheet, PanResponder } from "react-native";
import Colors from "../constants/Colors";
import ColorSelector from "./ColorSelector";
import Svg, { G, Path } from "react-native-svg";
import { useSelector } from "react-redux";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default ({ drawingMode }) => {
  const socket = useSelector((state) => state.socketReducer.socket);

  const [color, setColor] = useState(Colors.color1);
  const [strokeWidth, setStrokeWidth] = useState(4);
  const [donePaths, setDonePaths] = useState([]);
  const [offsetX, setOffsetX] = useState(0);
  const [offsetY, setOffsetY] = useState(0);
  const [currentMax, setCurrentMax] = useState(0);
  const [currentPoints, setCurrentPoints] = useState([]);
  const [gestures, setGestures] = useState(gestures || []);

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: () => true,
    onPanResponderGrant: (e, gs) => onResponderGrant(e, gs),
    onPanResponderMove: (e, gs) => onResponderMove(e, gs),
    onPanResponderRelease: (e, gs) => onResponderRelease(e, gs),
  });

  const onTouch = (e) => {
    let [x, y] = [e.nativeEvent.pageX, e.nativeEvent.pageY];
    setCurrentPoints(currentPoints.concat({ x, y }));
  };

  const onResponderGrant = (e) => {
    if (drawingMode) onTouch(e);
  };

  const onResponderMove = (e) => {
    if (drawingMode) onTouch(e);
  };

  const onResponderRelease = () => {
    if (drawingMode) {
      if (currentPoints.length > 0) {
        setDonePaths(
          donePaths.concat(
            <Path
              key={currentMax}
              d={pointsToSvg(currentPoints)}
              stroke={color}
              strokeWidth={strokeWidth}
              fill="none"
            />
          )
        );
        socket.emit("canvasDraw", { currentPoints, color });
        setGestures(gestures.concat(currentPoints));
      }
      setCurrentPoints([]);
      setCurrentMax(currentMax + 1);
    }
  };

  const changeColor = (color) => {
    if (color === "eraser") {
      setColor("#FFF");
      setStrokeWidth(15);
    } else if (color === "clear") {
      setColor("#4d4d4d");
      setStrokeWidth(4);
      setDonePaths([]);
      socket.emit("donePath");
    } else {
      setColor(color);
      setStrokeWidth(4);
    }
  };

  const onLayoutContainer = (e) => {
    setOffsetX(e.nativeEvent.layout.x);
    if (drawingMode) setOffsetY(e.nativeEvent.layout.y + 100);
    else if(!drawingMode) setOffsetY(e.nativeEvent.layout.y + 400);
    if (!drawingMode) socket.on('receiveDonePath', () => setDonePaths([]));
    if (!drawingMode) socket.on('canvasDraw', ({ currentPoints, color }) => {
      console.log("canvasDraw")
      if (!drawingMode) {
        if (currentPoints.length > 0) {
          console.log('donepaths length: ', donePaths.length);
          const newPath = donePaths;
          newPath.push(
            <Path
              key={currentMax}
              d={pointsToSvg(currentPoints)}
              stroke={color}
              strokeWidth={strokeWidth}
              fill="none"
            />
          )
          setDonePaths(newPath);
          setGestures(gestures.concat(currentPoints));
        }
        setCurrentPoints([]);
        setCurrentMax(currentMax + 1);
      }
    });
  };

  const pointsToSvg = (points) => {
    if (points.length > 0) {
      let path = `M ${points[0].x - offsetX}, ${points[0].y - offsetY}`;
      points.forEach((point) => {
        path = `${path} L ${point.x - offsetX}, ${point.y - offsetY}`;
      });
      return path;
    } else {
      return "";
    }
  };

  return (
    <View style={styles.container}>
      <View style={{ alignItems: "center" }}>
        <View onLayout={onLayoutContainer} style={styles.drawContainer}>
          <View {...panResponder.panHandlers}>
            <Svg
              style={{ backgroundColor: "transparent" }}
              width={Dimensions.get("window").width}
              height={Dimensions.get("window").width}
            >
              <G>
                {donePaths.map((path) => {
                  return path;
                })}
                <Path
                  key={currentMax}
                  d={pointsToSvg(currentPoints)}
                  stroke={color}
                  strokeWidth={strokeWidth - 1}
                  fill="none"
                />
              </G>
            </Svg>
          </View>
        </View>
      </View>

      {drawingMode && <ColorSelector onPress={changeColor} />}
    </View>
  );
};

let styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "stretch",
    backgroundColor: "white",
  },
  drawContainer: {
    borderWidth: 1,
    borderRadius: 2,
    borderColor: "#ddd",
    borderBottomWidth: 0,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
    width: (windowWidth / 100) * 96,
    height: Dimensions.get("window").width,
    backgroundColor: "#FFF",
    marginTop: 10,
  },
});
