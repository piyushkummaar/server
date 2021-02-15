const mongoose = require('mongoose');

var clientRecords = new mongoose.Schema({
    clientName: {
        type: String
    },
    clientEmail: {
        type: String
    },
    serverdetails:{
        type: String
    },
    clientskype:{
        type: String
    },
    websiteurl:{
        type:String
    },
    created: { 
        type: Date, 
        default: Date.now 
    },
});


mongoose.model('clientRecords', clientRecords);