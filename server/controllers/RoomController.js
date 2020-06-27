const RoomModel = require("../models/RoomModel");

class RoomController {
  static async insertOne(req, res) {
    try {
      const movie = await RoomModel.insertOne(req.body);
      return res.status(201).json(movie.ops[0]);
    } catch (error) {
      res.status(500).json({ err: "SERVER_ERROR" });
    }
  }

  static async findAll(req, res) {
    try {
      const movies = await RoomModel.findAll();
      return res.status(200).json(movies);
    } catch (error) {
      return res.status(500).json({ err: "SERVER_ERROR" });
    }
  }

  static async findOneById(req, res) {
    try {
      const movie = await RoomModel.findOneById(req.params.id);
      return res.status(200).json(movie);
    } catch (error) {
      return res.status(500).json({ err: "SERVER_ERROR" });
    }
  }

  static async updateOneById(req, res) {
    try {
      const result = await RoomModel.updateOneById(req.body, req.params.id);
      return res.status(200).json(result);
    } catch (error) {
      return res.status(500).json({ err: "SERVER_ERROR" });
    }
  }

  static async deleteOneById(req, res) {
    try {
      const { result } = await RoomModel.deleteOneById(req.params.id);
      return res.status(200).json(result);
    } catch (error) {
      return res.status(500).json({ err: "SERVER_ERROR" });
    }
  }
}

module.exports = RoomController;
