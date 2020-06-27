const { ObjectId } = require("mongodb");
const { getDatabase } = require("../configs/mongo");

const db = getDatabase();
const Room = db.collection("Rooms");

class RoomModel {
  static insertOne(data) {
    const { name, capacity, poster_path, category, language, maxScore, currentScore } = data;
    if (!name || !capacity || !poster_path || !category || !maxScore) throw { errorCode: "VALIDATION_ERROR"} 
    return Room.insertOne({
      name,
      category,
      poster_path,
      language,
      capacity,
      maxScore,
      currentScore
    });
  }

  static findAll() {
    return Room.find({}).toArray();
  }

  static findOneById(id) {
    return Room.findOne({
      _id: ObjectId(id),
    });
  }

  static updateOneById(data, id) {
    const { name, capacity, poster_path, category, language, maxScore, currentScore } = data;
    return Room.findOneAndUpdate(
      {
        _id: ObjectId(id),
      },
      {
        $set: {
          name: name,
          capacity: capacity,
          poster_path: poster_path,
          category: category,
          language: language,
          maxScore: maxScore,
          currentScore: currentScore,
        },
      },
      {
        returnOriginal: false,
      }
    );
  }

  static deleteOneById(id) {
    return Room.deleteOne({
      _id: ObjectId(id),
    });
  }
}

module.exports = RoomModel;
