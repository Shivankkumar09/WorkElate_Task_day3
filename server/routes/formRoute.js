const express = require('express');
const router = express.Router();

const { addFormResponse,getFormResponses } = require('../controller/formController');

router.post('/add', addFormResponse);
router.get('/', getFormResponses);


module.exports = router;