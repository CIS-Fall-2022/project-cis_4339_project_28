const express = require("express"); 
const router = express.Router();


const commonRoutes = require('./commonRoutes');


//importing data model schemas
let { primarydata } = require("../models/models"); 
let { eventdata } = require("../models/models"); 


commonRoutes.generate_common_endpoints(primarydata, router);

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
//Ex: '...?firstName=Bob&lastName=&searchBy=name' 
router.get("/search/", (req, res, next) => { 
    let dbQuery = "";
    if (req.query["searchBy"] === 'name') {
        dbQuery = { firstName: { $regex: `^${req.query["firstName"]}`, $options: "i" }, lastName: { $regex: `^${req.query["lastName"]}`, $options: "i" } }
    } else if (req.query["searchBy"] === 'number') {
        dbQuery = {
            "phoneNumbers.primaryPhone": { $regex: `^${req.query["phoneNumbers.primaryPhone"]}`, $options: "i" }
        }
    };
    primarydata.find( 
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

//GET events for a single client
router.get("/events/:id", (req, res, next) => { 
    
});



module.exports = router;