const express = require("express");
const router = express.Router();
const AuthController = require('../controllers/auth');
const ApiController = require("../controllers/api")

router.post('/createUser', ApiController.createUser);
router.use(AuthController.check_token);
router.get('/getObservedUsersList', ApiController.getObservedUsersList);
router.post('/fetchObservedUser', ApiController.fetchObservedUser);
router.post('/createObservedUser', ApiController.createObservedUser);
router.patch('/updateUser', ApiController.updateUser);

module.exports = router;