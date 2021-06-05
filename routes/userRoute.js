const express = require('express');

const router = express.Router();

const UserController = require('../controller/userController');

router.post('/', UserController.create_user);
router.get('/', UserController.get_all_user);
router.get('/:userId', UserController.get_user_byId);
router.patch('/:userId', UserController.update_user);
router.delete('/:userId', UserController.delete_user);

//Login
router.post('/login', UserController.login_user);

module.exports = router;