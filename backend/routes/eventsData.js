const express = require("express");
const router = express.Router();
ObjectId = require('mongodb').ObjectId;

//importing data model schemas
let { eventdata } = require("../models/models"); 

const commonRoutes = require('./commonRoutes');

//DELETE
commonRoutes.generate_common_endpoints(eventdata, router);

// 
router.get("/dashboard/", (req, res, next) => {
    monthData=new Date();
    monthData.setMonth(monthData.getMonth() - 2);
    eventdata.find( 
        { organization_id: process.env.ORG_ID, date:{$gte:monthData}}, 
        (error, data) => {
            if (error) {
                return next(error);
            } else {
                output_data = [];
                for (i = 0; i < data.length; i++) {
                    newdata = new Object();
                    newdata.date = data[i].date
                    newdata.eventName = data[i].eventName
                    newdata.count = data[i].attendees.length
                    output_data.push(newdata)
                } 
                res.json(output_data);
            }
        }
    );
});

//GET all entries with org_id
router.get("/org/:id", (req, res, next) => { 
    eventdata.find({"organization_id": new ObjectId(req.params.id)}, (error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
});


//GET entries based on search query
//Ex: '...?eventName=Food&searchBy=name' 
router.get("/search/", (req, res, next) => { 
    let dbQuery = "";
    if (req.query["searchBy"] === 'name') {
        dbQuery = { eventName: { $regex: `^${req.query["eventName"]}`, $options: "i" } }
    } else if (req.query["searchBy"] === 'date') {
        dbQuery = {
            date:  req.query["eventDate"]
        }
    };
    eventdata.find( 
        dbQuery, 
        (error, data) => { 
            if (error) {
                return next(error);
            } else {
                res.json(data);
            }
        }
    );
});

//GET events for which a client is signed up
router.get("/client/:id", (req, res, next) => { 
    eventdata.find( 
        { attendees: req.params.id }, 
        (error, data) => { 
            if (error) {
                return next(error);
            } else {
                res.json(data);
            }
        }
    );
});



//PUT add attendee to event
router.put("/addAttendee/:id", (req, res, next) => {
    //only add attendee if not yet signed uo
    eventdata.find( 
        { _id: req.params.id, attendees: req.body.attendee }, 
        (error, data) => { 
            if (error) {
                return next(error);
            } else {
                if (data.length == 0) {
                    eventdata.updateOne(
                        { _id: req.params.id }, 
                        { $push: { attendees: req.body.attendee } },
                        (error, data) => {
                            if (error) {
                                consol
                                return next(error);
                            } else {
                                res.json(data);
                            }
                        }
                    );
                }
                
            }
        }
    );
    
});

//PUT remove attendee from event
router.put("/removeAttendee/:id", (req, res, next) => {
    //only remove attendee if signed up
    eventdata.find( 
        { _id: req.params.id, attendees: req.body.attendee }, 
        (error, data) => { 
            if (error) {
                return next(error);
            } else {
                if (data.length > 0) {
                    eventdata.updateOne(
                        { _id: req.params.id }, 
                        { $pull: { attendees: req.body.attendee } },
                        (error, data) => {
                            if (error) {
                                consol
                                return next(error);
                            } else {
                                res.json(data);
                            }
                        }
                    );
                }
                
            }
        }
    );
    
});

module.exports = router;