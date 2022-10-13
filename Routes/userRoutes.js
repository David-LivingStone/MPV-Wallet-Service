const router = require('express').Router();
const userController = require('./../controllers/userController');


router
.post('/createUser', userController.createUser)
.get('/allUsers', userController.getAllUser)
.get('/:id', userController.getUser)
.post('/fund/:id', userController.fundWallet)
.post('/transfer/:id', userController.transferFund)
.post('/withdraw/:id', userController.withdrawFund)


module.exports = router;