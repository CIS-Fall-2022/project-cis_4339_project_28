const express = require("express"); 

function delete_endpoint(target_collection, router){
    router.delete("/:id", (req, res, next) => { 
        target_collection.findByIdAndRemove( 
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
};

//GET all entries
function get_all_endpoint(target_collection, router){
    router.get("/", (req, res, next) => { 
        target_collection.find( 
            (error, data) => {
                if (error) {
                    return next(error);
                } else {
                    res.json(data);
                }
            }
        ).sort({ 'updatedAt': -1 }).limit(10);
    });
};

//GET single entry
function get_one_endpoint(target_collection, router){
    router.get("/id/:id", (req, res, next) => {
        target_collection.find( 
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
};

//POST
function add_new_endpoint(target_collection, router){
    router.post("/", (req, res, next) => { 
        console.log(req.body)
        target_collection.create( 
            req.body, 
            (error, data) => { 
                if (error) {
                    //return next(error);
                } else {
                    res.json(data);
                }
            }
        );
    });
};

//PUT
function replace_existing_endpoint(target_collection, router){
    router.put("/:id", (req, res, next) => {
        target_collection.findOneAndUpdate(
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
};

// Adds all reusable endpoints into a single func so each collection only needs one line
function generate_common_endpoints(target_collection, router){
    delete_endpoint(target_collection, router);
    get_all_endpoint(target_collection, router);
    get_one_endpoint(target_collection, router);
    replace_existing_endpoint(target_collection, router);
    add_new_endpoint(target_collection, router);
}

module.exports.delete_endpoint = delete_endpoint;
module.exports.get_all_endpoint = get_all_endpoint;
module.exports.get_one_endpoint = get_one_endpoint;
module.exports.replace_existing_endpoint = replace_existing_endpoint;
module.exports.add_new_endpoint = add_new_endpoint;
module.exports.generate_common_endpoints = generate_common_endpoints;