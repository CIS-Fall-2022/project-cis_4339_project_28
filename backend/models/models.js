const uuid = require('uuid');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;


//collection for intakeData
let primaryDataSchema = new Schema({
    _id: { type: Schema.Types.ObjectId, auto:true },
    organization_id: {
        type: Schema.Types.ObjectId,
        require: true,
        auto: true,
    },
    firstName: {
        type: String,
        require: true
    },
    middleName: {
        type: String,
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String
    },
    phoneNumbers: {
        type: Array,
        required: true
    },
    address: {
        line1: {
            type: String
        },
        line2: {
            type: String,
        },
        city: {
            type: String,
            required: true
        },
        county: {
            type: String,
        },
        zip: {
            type: String,
        }
    }
}, {
    collection: 'primaryData',
    timestamps: true
});

//collection for eventData
let eventDataSchema = new Schema({
    _id: { type: Schema.Types.ObjectId, 
        auto:true },
    organization_id: {
        type: Schema.Types.ObjectId,
        required: true,
    },
    eventName: {
        type: String,
        require: true
    },
    services: {
        type: Array
    },
    date: {
        type: Date,
        required: true
    },
    address: {
        line1: {
            type: String
        },
        line2: {
            type: String,
        },
        city: {
            type: String,
        },
        county: {
            type: String,
        },
        zip: {
            type: String,
        }
    },
    description: {
        type: String,
    },
    attendees: [{
        type: Schema.Types.ObjectId
    }]
}, {
    collection: 'eventData'
});

//collection for organizationData
let organizationDataSchema = new Schema({
    _id: { type: Schema.Types.ObjectId, auto:true },
    organizationName: {
        type: String,
        require: true
    },
    organizationPhoneNumber: {
        type: String,
        require: true
    },
    organizationEmail: {
        type: String,
        require: true
    },
   
}, {
    collection: 'organizationData'
});


// create models from mongoose schemas
const primarydata = mongoose.model('primaryData', primaryDataSchema);
const eventdata = mongoose.model('eventData', eventDataSchema);
const organizationdata = mongoose.model('organizationData', organizationDataSchema);

// package the models in an object to export 
module.exports = { primarydata, eventdata, organizationdata}
