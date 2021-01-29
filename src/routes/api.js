const express = require("express");
const router = express.Router();
const AuthController = require('../controllers/auth');
const ApiController = require("../controllers/api")

router.post('/createUser', ApiController.createUser);
router.use(AuthController.check_token);
router.get('/getObservedUsersList', ApiController.getObservedUsersList);
router.post('/changeEmail', ApiController.changeEmail);
router.post('/createObservedUser', ApiController.createObservedUser);


module.exports = router;