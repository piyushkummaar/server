const express = require('express');
const router = express.Router();

const ctrlUser = require('../controllers/user.controller');
const ctrlAdmin = require('../controllers/admin.controller');
const ctrlClient = require('../controllers/client.controller');

const jwtHelper = require('../config/jwtHelper');


// User 
router.post('/register', ctrlUser.register);
router.post('/authenticate', ctrlUser.authenticate);
router.get('/userProfile',jwtHelper.verifyJwtToken, ctrlUser.userProfile);

// User Crud 
router.put('/updateuser',ctrlUser.updateuser)
router.delete('/deleteuser',ctrlUser.deleteuser)

// Admin
router.get('/home', ctrlAdmin.adminHome);
router.get('/getrecords',jwtHelper.verifyJwtToken, ctrlClient.getRecords);

// router.get('/delete',);


// Client
router.get('/getclient',jwtHelper.verifyJwtToken, ctrlClient.getclient);
router.post('/addclientrecord', ctrlClient.addclientRecord);
router.put('/updaterecord', ctrlClient.updateclientRecord);

router.delete('/deleterecord', ctrlClient.deleteclientRecord);


module.exports = router;



