const mongoose = require('mongoose');
const passport = require('passport');
const _ = require('lodash');

var ObjectId = require('mongoose').Types.ObjectId;
const User = mongoose.model('User');

module.exports.register = (req, res, next) => {
    var user = new User();
    user.fullName = req.body.fullName;
    user.email = req.body.email;
    user.password = req.body.password;
    user.is_admin = false;
    user.is_staff = true;
    user.is_active = true;
    user.save((err, doc) => {
        if (!err)
            res.send(doc);
        else {
            if (err.code == 11000)
                res.status(422).send(['Duplicate email adrress found.']);
            else
                return next(err);
        }
    });
}

module.exports.authenticate = (req, res, next) => {
    // call for passport authentication
    passport.authenticate('local', (err, user, info) => {       
        // error from passport middleware
        if (err) return res.status(400).json(err);
        // registered user
        else if (user) return res.status(200).json({ "token": user.generateJwt() });
        // unknown user or wrong password
        else return res.status(404).json(info);
    })(req, res);
}

module.exports.userProfile = (req, res, next) =>{
    User.findOne({ _id: req._id },
        (err, user) => {
            if (!user)
                return res.status(404).json({ status: false, message: 'User record not found.' });
            else
                return res.status(200).json({ status: true, user : _.pick(user,['fullName','email','is_active','is_staff','is_admin']) });
        }
    );
}

module.exports.updateuser = (req, res, next) =>{
    if (!ObjectId.isValid(req.query.id))
    return res.status(400).send(`No record with given id : ${req.body.id}`);
    var user = {
        fullName: req.body.fullName,
        email: req.body.email,
        is_active: req.body.is_active
    };
    User.findByIdAndUpdate(req.query.id, { $set: user }, { new: true }, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in Record Update :' + JSON.stringify(err, undefined, 2)); }
    });
}

module.exports.deleteuser = (req, res) =>{
    if (!ObjectId.isValid(req.query.id))
        return res.status(400).send(`No record with given id : ${req.query.id}`);
    User.findOneAndDelete(req.query.id, (err, doc) => {
        if (!err) {
            res.send('Deleted Sucessfully..');
        }
        else { console.log('Error in employee delete :' + err); }
    });
}
