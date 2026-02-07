const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const {
  createWord,
  getAllWords,
  getWordById,
  updateWord,
  deleteWord,
  searchWords
} = require('../controllers/wordController');

router.get('/search', searchWords);
router.get('/', getAllWords);
router.get('/:id', getWordById);

router.post('/', authMiddleware, createWord);
router.put('/:id', authMiddleware, updateWord);
router.delete('/:id', authMiddleware, deleteWord);

module.exports = router;
