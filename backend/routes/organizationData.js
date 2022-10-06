const express = require("express"); 
const router = express.Router(); 

//importing data model schemas
let { organizationdata } = require("../models/models"); 

const commonRoutes = require('./commonRoutes');


commonRoutes.generate_common_endpoints(organizationdata, router);


//GET entries based on search query
//Ex: '...?firstName=Bob&lastName=&searchBy=name' 
router.get("/search/", (req, res, next) => { 
    let dbQuery = "";
    if (req.query["searchBy"] === 'name') {
        dbQuery = { organizationName: { $regex: `^${req.query["organizationName"]}`, $options: "i" } }
    } else if (req.query["searchBy"] === 'email') {
        dbQuery = { organizationEmail: { $regex: `^${req.query["organizationEmail"]}`, $options: "i" } }
    } else if (req.query["searchBy"] === 'phone') {
        dbQuery = { organizationPhone: { $regex: `^${req.query["organizationPhone"]}`, $options: "i" } }
    }
    
    organizationdata.find( 
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

module.exports = router;
