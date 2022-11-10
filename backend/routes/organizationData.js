const express = require("express"); 
const router = express.Router(); 

//importing data model schemas
let { organizationdata } = require("../models/models"); 

const commonRoutes = require('./commonRoutes');
    router.get("/", (req, res, next) => {
        organizationdata.find( 
            { _id: process.env.ORG_ID}, 
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
