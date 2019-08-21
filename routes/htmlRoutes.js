var db = require("../models");

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
    db.Example.findAll({}).then(function(dbExamples) {
      res.render("index", {
        msg: "Welcome!",
        examples: dbExamples
      });
    });
  });

  // Load example page and pass in an example by id
  app.get("/example/:id", function(req, res) {
    db.Example.findOne({ where: { id: req.params.id } }).then(function(
      dbExample
    ) {
      res.render("example", {
        example: dbExample
      });
    });
  });

  // app.get("/journal/:tag", function(req, res) {
  //   db.Journal.findAll({ where: {} });
  // });

  // api.get("/journals/", function(req, res) {
  //   // Get all journal entries
  //   db.Journal.findAll({
  //     // Make sure to include the products
  //     include: [
  //       {
  //         model: Tags,
  //         as: "tags",
  //         required: false,
  //         // Pass in the TAG attributes that you want to retrieve
  //         attributes: ["id", "name"],
  //         through: {
  //           // This block of code allows you to retrieve the properties of the join table
  //           model: JournalTags,
  //           as: "JournalTags"
  //         }
  //       }
  //     ]
  //   });
  //   // If everything goes well respond with the journals
  //   res.render("allEntries", {

  //   });
  // });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
