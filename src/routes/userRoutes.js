const express = require('express');
const { getUsers } = require('../controllers/userController');
const router = express.Router();


router.get("/", getUsers)
router.post("/", createUser)
router.put("/", createUser)
router.delete('/')

module.exports = router;