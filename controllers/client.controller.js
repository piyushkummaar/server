const mongoose = require('mongoose');
const _ = require('lodash');
const { query } = require('express');

var ObjectId = require('mongoose').Types.ObjectId;
const ClientRecords = mongoose.model('clientRecords');



module.exports.getRecords = (req, res, next) =>{
    // get all Client in the db
    ClientRecords.find((err, docs) => {
    if (!err) { res.send(docs); }
    else { console.log('Error in Retriving Records :' + JSON.stringify(err, undefined, 2)); }
    });
}

module.exports.getclient = (req, res, next) =>{
    // get all Client in the db
    ClientRecords.find((err, docs) => {
    if (!err) { res.send(docs); }
    else { console.log('Error in Retriving Records :' + JSON.stringify(err, undefined, 2)); }
    });
}

module.exports.addclientRecord = (req, res, next) =>{
    var client = new ClientRecords({
        clientName: req.body.clientName,
        clientEmail: req.body.clientEmail,
        serverdetails: req.body.serverdetails,
        websiteurl: req.body.websiteurl,
        clientskype: req.body.clientskype
    });
    client.save((err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in Record Save :' + JSON.stringify(err, undefined, 2)); }
    });
}

module.exports.updateclientRecord = (req, res) =>{
    if (!ObjectId.isValid(req.query.id))
    return res.status(400).send(`No record with given id : ${req.query.id}`);
    var client = {
        clientName: req.body.clientName,
        clientEmail: req.body.clientEmail,
        serverdetails: req.body.serverdetails,
        websiteurl: req.body.websiteurl,
        clientskype: req.body.clientskype
    };
    ClientRecords.findByIdAndUpdate(req.query.id, { $set: client }, { new: true }, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in Record Update :' + JSON.stringify(err, undefined, 2)); }
    });

}

module.exports.deleteclientRecord = (req, res) =>{
    if (!ObjectId.isValid(req.query.id))
    return res.status(400).send(`No record with given id : ${req.query.id}`);
    ClientRecords.findByIdAndDelete(req.query.id, (err, doc) => {
        if (!err) {
            res.send('Deleted Sucessfully..');
        }
        else { console.log('Error in employee delete :' + err); }
    });
}