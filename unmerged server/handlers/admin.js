const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const ObjectId = require("mongodb").ObjectId;

const validate = require("../utils/validate");
const mailSender = require("../utils/mailSender");

const { Profiles, Suggestions, Translations } = require("../models");
const { catchError } = require("../utils/quickFunctions");

exports.fetchTextSuggestion = async (req, res) => {
  try {
    const { hasNext } = req.body;

    // if collection hasNext doc, query to get docs greater than or equal to current hasNext id
    const suggestions = await Suggestions.find(hasNext ? { _id: { $gte: ObjectId(hasNext) } } : {})
      .sort({ _id: 1 })
      .limit(5)
      .toArray();

    // get doc after last doc in suggestions
    const hasNextId = suggestions.length
      ? await Suggestions.find({ _id: { $gt: ObjectId(suggestions[suggestions.length - 1]._id) } })
          .sort({ _id: 1 })
          .limit(1)
          .toArray()
          .then((doc) => (doc[0] ? doc[0]._id : false))
      : false;

    return res.status(200).json({ hasNext: hasNextId, suggestions });
  } catch (err) {
    return catchError({ res, err, message: err.message || "Can't get documents" });
  }
};

exports.approveSuggestion = async (req, res) => {
  try {
    const { _id } = req.body;

    // find and remove doc from Suggestions
    const suggestionData = await (await Suggestions.findOneAndDelete({ _id: new ObjectId(_id) })).value;
    if (!suggestionData) throw { message: "Suggestion not found" };

    const { query, suggestion, sourceLanguage, translationLanguage } = suggestionData;

    const a = await Translations.updateOne(
      {
        [sourceLanguage]: { $regex: new RegExp("^" + query.toLowerCase(), "i") },
        // _id: new ObjectId(translationId), // <= if id is null/undefined, id is set to null
      },
      {
        // $setOnInsert: { _id: new ObjectID() }, // <= As the name suggests it will set the _id on insert
        $set: { [sourceLanguage]: query, [translationLanguage]: suggestion },
      },
      {
        upsert: true, // <= update translation else create a new document if it does not exist
      }
    );

    res.status(200).json("successful");
  } catch (err) {
    return catchError({ res, err, message: err.message || "An error occured" });
  }
};

exports.rejectSuggestion = async (req, res) => {
  try {
    const { _id } = req.body;

    // remove doc from Suggestions
    await Suggestions.deleteOne({ _id: new ObjectId(_id) });

    res.status(200).json("successful");
  } catch (err) {
    return catchError({ res, err, message: err.message || "An error occured" });
  }
};

exports.starter = async (req, res) => {
  try {
    res.status(200).json("successful");
  } catch (err) {
    return catchError({ res, err, message: err.message || "An error occured" });
  }
};
