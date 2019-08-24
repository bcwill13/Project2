var db = require("../models");

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
    db.Journal.findAll({}).then(function(dbJournals) {
      res.render("index", {
        msg: "Welcome!",
        journals: dbJournals
      });
    });
  });

  // retrieve all journals with tags tagging along
  // Sorta TESTED
  app.get("/journals/", function(req, res) {
    // Get all journal entries
    db.Journal.findAll({
      // Make sure to include the tags
      include: [
        {
          model: db.Tag,
          as: "tag",
          required: false,
          // Pass in the TAG attributes that you want to retrieve
          attributes: ["id", "name"],
          through: {
            // This block of code allows you to retrieve the properties of the join table
            model: db.JournalTag,
            as: "JournalTag"
          }
        }
      ]
    }).then(function(dbJournal) {
      // If everything goes well respond with the journals
      res.render("journalentry", {
        journals: dbJournal
      });
    });
  });

  // retrieve all tags with journals tagging along
  // UNTESTED
  app.get("/tags/", function(req, res) {
    // Get all tag entries
    db.Tag.findAll({
      // Make sure to include the Journals
      include: [
        {
          model: db.Journal,
          as: "journals",
          required: false,
          // Pass in the journal attributes that you want to retrieve
          attributes: ["id", "description"],
          through: {
            // This block of code allows you to retrieve the properties of the join table
            model: db.JournalTags,
            as: "JournalTags"
          }
        }
      ]
    }).then(function(dbTag) {
      // If everything goes well respond with the journals
      res.render("tag", {
        tags: dbTag
      });
    });
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
