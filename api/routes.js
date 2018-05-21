const express = require('express');
const router = express.Router();
const notesController = require('./notesController');

router.get('/notes', notesController.index);
router.get('/notes/:id', notesController.show);
router.post('/notes', notesController.store);
router.patch('/notes/:id', notesController.update);

module.exports = router;