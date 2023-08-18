const { createUser, getusers, userLogOut, userLogIn, userLogout, useDeletebyId, userUpdate } = require("./controller")
const { checkToken } = require("../../auth/tokenValidation")
const router = require("express").Router()
router.post('/registration', createUser);
router.post('/login', userLogIn);
router.get('/getusers', checkToken, getusers);
router.put('/userUpdate', checkToken, userUpdate);
router.delete('/delete/:userId', checkToken, useDeletebyId);
router.post('/logout', checkToken, userLogOut);
module.exports = router