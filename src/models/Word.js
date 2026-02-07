// src/models/Word.js
const mongoose = require('mongoose');

const wordSchema = new mongoose.Schema(
  {
    english: { type: String, required: true, trim: true },
    japanese: { type: String, required: true, trim: true },
    reading: { type: String, trim: true },
    meaning: { type: String, required: true },
    examples: [{ type: String }],
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Word', wordSchema);
