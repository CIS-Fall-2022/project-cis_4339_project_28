const express = require("express"); 
const router = express.Router(); 

//importing data model schemas
let { organizationdata } = require("../models/models"); 

//GET all entries
router.get("/", (req, res, next) => { 
    organizationdata.find( 
        (error, data) => {
            if (error) {
                return next(error);
            } else {
                res.json(data);
            }
        }
    ).sort({ 'updatedAt': -1 }).limit(10);
});

//GET single entry by ID
router.get("/id/:id", (req, res, next) => {
    organizationdata.find( 
        { _id: req.params.id }, 
        (error, data) => {
            if (error) {
                return next(error);
            } else {
                res.json(data);
            }
        }
    );
});

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


//POST
router.post("/", (req, res, next) => { 
    organizationdata.create( 
        req.body,
        (error, data) => { 
            if (error) {
                return next(error);
            } else {
                res.json(data); 
            }
        }
    );
    organizationdata.createdAt;
    organizationdata.updatedAt;
    organizationdata.createdAt instanceof Date;
});

//PUT update (make sure req body doesn't have the id)
router.put("/:id", (req, res, next) => { 
    organizationdata.findOneAndUpdate( 
        { _id: req.params.id }, 
        req.body,
        (error, data) => {
            if (error) {
                return next(error);
            } else {
                res.json(data);
            }
        }
    );
});

router.delete("/:id", (req, res, next) => { 
    organizationdata.findByIdAndRemove( 
        req.params.id, 
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
