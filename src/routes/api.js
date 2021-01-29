const express = require("express");
const router = express.Router();
const AuthController = require('../controllers/auth');
const ApiController = require("../controllers/api")

router.use(AuthController.check_token);
router.get('/getUsersList', ApiController.getUsersList);
router.post('/changeEmail', ApiController.changeEmail);


module.exports = router;