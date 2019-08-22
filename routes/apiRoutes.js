var db = require("../models");

module.exports = function(app) {
  // Get all examples
  app.get("/api/examples", function(req, res) {
    db.Example.findAll({}).then(function(dbExamples) {
      res.json(dbExamples);
    });
  });

  // Create a new example
  app.post("/api/examples", function(req, res) {
    db.Example.create(req.body).then(function(dbExample) {
      res.json(dbExample);
    });
  });

  // Delete an example by id
  app.delete("/api/examples/:id", function(req, res) {
    db.Example.destroy({ where: { id: req.params.id } }).then(function(
      dbExample
    ) {
      res.json(dbExample);
    });
  });

  /**
   *  APIs for journals
   */

  // Get all examples
  app.get("/api/journals", function(req, res) {
    db.Journal.findAll({}).then(function(journals) {
      res.json(journals);
    });
  });

  // Get a specific journal
  app.get("/api/journals/:journalId", function(req, res) {
    var journalId = req.params.journalId;
    db.Journal.findAll({
      where: {
        id: journalId
      }
    }).then(function(journal) {
      res.json(journal);
    });
  });

  // Create a new example
  app.post("/api/journals", function(req, res) {
    db.Journal.create(req.body).then(function(journal) {
      res.json(journal);
    });
  });

  // Delete an example by id
  app.delete("/api/journals/:journalId", function(req, res) {
    var journalId = req.params.journalId;
    db.Journal.destroy({
      where: {
        id: journalId
      }
    }).then(function(journal) {
      res.json(journal);
    });
  });

   /**
   *  APIs for jurnals journal && tags
   */
  // GET /api/journals/:journalId/tags
  // GET /api/journals/:journalId/tags/:tagId
  // POST /api/journals/:journalId/tags
  // DELETE /api/journals/:journalId/tags/:tagId

  // Get all examples
  app.get("/api/journals/:journalId/tags", function(req, res) {
    db.tag.findAll({}).then(function(journalId) {
      res.json(journalId);
    });
  });

  // Get a specific journal
  app.get("/api/journals/:journalId/tags/:tagId", function(req, res) {
    var tagId = req.params.tagId;
    db.Journal.findAll({
      where: {
        id: tagId
      }
    }).then(function(tag) {
      res.json(tag);
    });
  });

  // Create a new example
  app.post("/api/journals/:journalId/tags", function(req, res) {
    db.JournalId.create(req.body).then(function(tags) {
      res.json(tags);
    });
  });

  // Delete an example by id
  app.delete("/api/journals/:journalId/tags/:tagId", function(req, res) {
    var journalId = req.params.journalId;
    db.Journal.destroy({
      where: {
        id: journalId
      }
    }).then(function(journal) {
      res.json(journal);
    });
  });

   /**
   *  APIs for tags
   */

  // GET /api/tags
  // GET /api/tags/:tagId
  // POST /api/tags
  // DELETE /api/tags/:tagId

  // Get all examples
  app.get("/api/tags", function(req, res) {
    db.tag.findAll({}).then(function(tags) {
      res.json(tags);
    });
  });

  // Get a specific journal
  app.get("/api/tags/:tagId", function(req, res) {
    var tagId = req.params.tagId;
    db.Journal.findAll({
      where: {
        id: tagId
      }
    }).then(function(tag) {
      res.json(tag);
    });
  });

  // Create a new example
  app.post("/api/tags", function(req, res) {
    db.tag.create(req.body).then(function(tag) {
      res.json(tag);
    });
  });

  // Delete an example by id
  app.delete("/api/tags/:tagId", function(req, res) {
    var tagId = req.params.tagId;
    db.tags.destroy({
      where: {
        id: tagId
      }
    }).then(function(tag) {
      res.json(tag);
    });
  });
};
