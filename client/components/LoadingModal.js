import React, { useEffect } from 'react'
import {StyleSheet, View, Text, Image, Dimensions, Animated} from 'react-native'
import { useFonts } from '@use-expo/font'
import { Easing } from 'react-native-reanimated';

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const Loading = () => {

    const spinBlueValue = new Animated.Value(0)
    const spinYellowValue = new Animated.Value(0)
    
    useEffect( () => {
        Animated.loop(
            Animated.timing(
                spinBlueValue,
                {
                    toValue: 1,
                    duration: 3000,
                    easing: Easing.linear,
                    useNativeDriver: true
                }
            )
        ).start()
        Animated.loop(
            Animated.timing(
                spinYellowValue,
                {
                    toValue: 1,
                    duration: 1000,
                    easing: Easing.linear,
                    useNativeDriver: true
                }
            )
        ).start()
    }, [])


    const spinBlue = spinBlueValue.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg']
    })
    const spinYellow = spinYellowValue.interpolate({
        inputRange: [0, 1],
        outputRange: ['360deg', '0deg']
    })
    
    return (
        <View style={styles.globalContainer}>
            <Animated.Image
                style={[
                    styles.LoadingBrushBlue,
                    {transform: [{rotate: spinBlue}]}
                ]}
                source={require('../assets/images/loading_brush_blue.png')}
            />
            <Animated.Image
                style={[
                    styles.LoadingBrushYellow,
                    {transform: [{rotate: spinYellow}]}
                ]}
                source={require('../assets/images/loading_brush_yellow.png')}
            />
        </View>    
    )
}

const styles = StyleSheet.create({
    globalContainer: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center'
    },
    LoadingBrushBlue: {
        position: 'absolute',
        width: (windowWidth / 100) * 70,
        height: (windowWidth / 100) * 50,
    },
    LoadingBrushYellow: {
        position: 'absolute',
        width: (windowWidth / 100) * 50,
        height: (windowWidth / 100) * 40
    },
})

export default Loading