const Word = require('../models/Word');

// POST /api/words
const createWord = async (req, res) => {
  try {
    const { english, japanese, reading, meaning, examples } = req.body;

    const word = await Word.create({
      english,
      japanese,
      reading,
      meaning,
      examples,
      createdBy: req.user.id
    });

    res.status(201).json(word);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create word' });
  }
};

// GET /api/words
const getAllWords = async (req, res) => {
  try {
    const words = await Word.find()
      .populate('createdBy', 'username')
      .sort({ createdAt: -1 });

    res.json(words);
  } catch (error) {
    res.status(500).json({ message: 'Failed to get words' });
  }
};

// GET /api/words/:id
const getWordById = async (req, res) => {
  try {
    const word = await Word.findById(req.params.id)
      .populate('createdBy', 'username');

    if (!word) {
      return res.status(404).json({ message: 'Word not found' });
    }

    res.json(word);
  } catch (error) {
    res.status(500).json({ message: 'Failed to get word' });
  }
};

// PUT /api/words/:id
const updateWord = async (req, res) => {
  try {
    const word = await Word.findById(req.params.id);

    if (!word) {
      return res.status(404).json({ message: 'Word not found' });
    }

    if (word.createdBy.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Access denied' });
    }

    Object.assign(word, req.body);
    await word.save();

    res.json(word);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update word' });
  }
};

// DELETE /api/words/:id
const deleteWord = async (req, res) => {
  try {
    const word = await Word.findById(req.params.id);

    if (!word) {
      return res.status(404).json({ message: 'Word not found' });
    }

    if (word.createdBy.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Access denied' });
    }

    await word.deleteOne();
    res.json({ message: 'Word deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete word' });
  }
};

// GET /api/words/search?q=
const searchWords = async (req, res) => {
  try {
    const { q } = req.query;

    if (!q) {
      return res.status(400).json({ message: 'Query is required' });
    }

    const regex = new RegExp(q, 'i'); // i = case-insensitive

    const words = await Word.find({
      $or: [
        { english: regex },
        { japanese: regex },
        { reading: regex },
        { meaning: regex }
      ]
    })
      .populate('createdBy', 'username')
      .sort({ createdAt: -1 });

    res.json(words);
  } catch (error) {
    res.status(500).json({ message: 'Search failed' });
  }
};


module.exports = {
  createWord,
  getAllWords,
  getWordById,
  updateWord,
  deleteWord,
  searchWords
};
