
var db = require('../models');


module.exports = function (app) {

    
    app.get("/news", (req, res) => {
        db.New.find({})
            .then((dbNew) => {
                res.json(dbNew);
            })
            .catch((err) => {
                res.json(err);
            });
    });

   
    app.put("/save/:id", (req, res) => {
        db.New.findOneAndUpdate({ _id: req.params.id }, { saved: true })
            .then((dbNew) => {
                res.json(dbNew);
            })
            .catch((err) => {
                res.json(err);
            });
    });

    app.put("/unsave/:id", (req, res) => {
        db.New.findOneAndUpdate({ _id: req.params.id }, { saved: false })
            .then((dbNew) => {
                res.json(dbNew);
            })
            .catch((err) => {
                res.json(err);
            });
    });

    app.get("/new/:id", (req, res) => {
        db.New.findOne({ _id: req.params.id })
            .populate("note")
            .then(function (dbNew) {
                res.json(dbNew);
            })
            .catch((err) => {
                res.json(err);
            });
    });

    app.post("/new/:id", (req, res) => {
        db.Note.create(req.body)
            .then(function (dbNote) {
                return db.dbNew.findOneAndUpdate({ _id: req.params.id }, { note: dbNote._id }, { new: true });
            })
            .then(function (dbNew) {
                res.json(dbNew);
            })
            .catch((err) => {
                res.json(err);
            });
    });

 
   

};
