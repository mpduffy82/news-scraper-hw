
const axios = require("axios");
const cheerio = require("cheerio");

// Models

const db = require("../models");

// Routes

module.exports = function (app) {


    app.get("/", (req, res) => {
        db.New.find({ saved: false })
            .then((dbNew) => {
                let hbsObject = {
                    news: dbNew
                };
                res.render("index", hbsObject);
       
            });
    });

    app.delete("/clear", (req, res) => {
        db.New.deleteMany({ saved: false })
            .then((cleared) => {
                res.send("sent")
            })
            .catch((err) => {
                console.log(err)
            });
    })

    // scraper
    app.post("/scrape", (req, res) => {
        db.New.deleteMany({ saved: false })
            .then((cleared) => {

           
                var titleArr = [];
                db.New.find({})
                    .then((dbNew) => {
                        dbNew.forEach((eachNew) => {
                            titleArr.push(eachNew.title);
                        })
                        console.log("==== titleArr:", titleArr)
                    })

                axios.get("http://www.ign.com/")
                    .then((response) => {
                        let $ = cheerio.load(response.data);
                        let result = {};
                        $("article .item-body .item-thumbnail a").each(function (i, element) {
                            result.title = $(this)
                                .children("img")
                                .attr("alt");
                            result.link = $(this)
                                .attr("href");
                            result.img = $(this)
                                .children("img")
                                .attr("data-original");
                            console.log("==== singleTitle:", result.title)

                            // Prevent to create repeated news in mongoDB
                            if (titleArr.indexOf(result.title) === -1) {
                                db.New.create(result)
                                    .then((dbNew) => {
                                        res.send("News created in mongoDB!!")
                                    })
                                    .catch((err) => {
                                        console.log(err)
                                    });
                            }
                        })
                    });
            })
            .catch((err) => {
                console.log(err)
            });
    })

    // SAVE news
    app.put("/save/:id", (req, res) => {
        db.New.findOneAndUpdate({ _id: req.params.id }, { saved: true })
            .then((dbSave) => {
                res.json(dbSave);
            })
            .catch((err) => {
                res.json(err);
            });
    });



    // hit up mongo
    app.get("/saved", (req, res) => {
        db.New.find({ saved: true }).sort({ date: -1 })
            .then((dbSaved) => {
                let hbsObject = {
                    saved: dbSaved
                };
               
                res.render("saved", hbsObject);
            })
    });

    // delete news
    app.put("/unsave/:id", (req, res) => {
        db.New.findOneAndUpdate({ _id: req.params.id }, { saved: false })
            .then((dbUnsave) => {
                res.json(dbUnsave);
            })
            .catch((err) => {
                res.json(err);
            });
    });


    
};
