const { StatusCodes } = require("http-status-codes");
const Fragrance = require("../models/Fragrance");

const noFragranceError = () => {
  const error = new Error("Fragrance with that id not found");
  error.statusCode = 404;
  throw error;
};

module.exports = {
  createFragrance: async (req, res, next) => {
    try {
      const fragrance = new Fragrance(req.body);
      await fragrance.save();
      res.status(StatusCodes.ACCEPTED).json(fragrance);
    } catch (error) {
      next(error);
    }
  },
  getAllFragrances: async (req, res, next) => {
    try {
      let fragrances = await Fragrance.find().lean();
      if (!fragrances.length) fragrances = ["No fragrances in database"];
      res.json(fragrances);
    } catch (error) {
      next(error);
    }
  },
  getFragranceById: async (req, res, next) => {
    try {
      const fragrance = await Fragrance.findById(req.params.id).lean();
      if (!fragrance) noFragranceError();
      res.json(fragrance);
    } catch (error) {
      next(error);
    }
  },
  updateFragrance: async (req, res, next) => {
    try {
      const fragrance = await Fragrance.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
        }
      ).lean();

      if (!fragrance) noFragranceError();

      res.json(fragrance);
    } catch (error) {
      next(error);
    }
  },
  deleteFragrance: async (req, res, next) => {
    try {
      const fragrance = await Fragrance.findByIdAndDelete(req.params.id).lean();
      if (!fragrance) noFragranceError();
      res.json(fragrance);
    } catch (error) {
      next(error);
    }
  },
};
