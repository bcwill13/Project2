var db = require("../models");

module.exports = function(app) {
  // Get all examples
  app.get("/api/examples", function(req, res) {
    db.Example.findAll({}).then(function(dbExamples) {
      res.json(dbExamples);
    });
  });

  // app.get("/api/journals", function(req, res) {
  //   db.Journal.findAll({}).then(function(dbJournals) {
  //     res.json(dbJournals);
  //   });
  // });

  // Create a new example
  app.post("/api/examples", function(req, res) {
    db.Example.create(req.body).then(function(dbExample) {
      res.json(dbExample);
    });
  });

  // This uses apix as a temp solution while working out the details of posting a journal and tag
  // app.post("/apix/journals", function(req, res) {
  //   db.Journal.create(req.body).then(function(dbJournal) {
  //     res.json(dbJournal);
  //   });
  // });

  // example of how a many to many post is made for BOTH tables
  // as seen here: https://medium.com/@tonyangelo9707/many-to-many-associations-using-sequelize-941f0b6ac102
  // (scroll about half way down)
  // app.post('/apix/journals', asyncHandler(async (req, res) => {
  //   // Create and save the order
  //   const savedJournal = await Journal.create(req.body, {w: 1}, { returning: true });

  //   // Loop through all the items in req.products
  //   req.body.tags.forEach((item) => {

  //     // Search for the tag with the givenId and make sure it exists. If it doesn't, respond with status 400.
  //     const tag = await Tag.findById(item.id);
  //     if (!tag) {
  //       return res.status(400);
  //     }

  //     // Create a dictionary with which to create the journaltag
  //     const jt = {
  //       journalId: savedJournal.id,
  //       tagId: item.id
  //     }

  //     // Create and save a journalTag
  //     const savedJournalTag = await JournalTag.create(jt, { w: 1 }, { returning: true });
  //   });

  //   // If everything goes well, respond with the journal
  //   return res.status(200).json(savedJournal)
  // }));

  app.post("/apix/journals", function(req, res) {
    console.log(
      "app.post using req.body of: '" + JSON.stringify(req.body) + "'"
    );
    //const createdJournal = await db.Journal.create(req.body);
    //createdJournal.addTags(req.body.tags);
    //Create and save the order
    db.Journal.create(req.body).then(function(dbJournal) {
      //dbJournal.addTags(req.body.tags);
      var tagIdArray = [];
      // Loop through all tags
      req.body.tags.forEach(createTag1);
      function createTag1(newTag, index) {
        console.log("createTag1 at index:" + index + " = " + newTag);
        createTag3(newTag, tagIdArray, function() {
          console.log(
            "completed first loop and calls to createTag3 tagIdArray:" +
              JSON.stringify(tagIdArray)
          );
        });
      }
      console.log(
        "***completed first loop and calls to createTag3 tagIdArray:" +
          JSON.stringify(tagIdArray)
      );
      // Loop through all tagIDs creating the linking table entries
      tagIdArray.forEach(createJournalTag);
      function createJournalTag(tagIdItem) {
        console.log("tagIdItem:" + tagIdItem);
        db.JournalTag.create({ journalId: "1", tagId: "1" }).then(function(
          dbTagId
        ) {
          console.log(dbTagId);
        });
      }

      res.json(dbJournal);
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
    db.Tag.findAll({}).then(function(tags) {
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
    db.tags
      .destroy({
        where: {
          id: tagId
        }
      })
      .then(function(tag) {
        res.json(tag);
      });
  });
};

function createTag3(newTag, tagIdArray) {
  console.log("createTag3 newTag = " + newTag);
  // first see if the tag exists
  db.Tag.upsert({ name: newTag }).then(function(test) {
    if (test) {
      //res.status(200);
      //res.send("Successfully stored");
      console.log("stored:" + JSON.stringify(test));
    } else {
      //res.status(200);
      //res.send("Successfully inserted");
      console.log("inserted:" + JSON.stringify(test));
    }
  });

  // db.Tag.findAll({
  //   limit: 1,
  //   where: { name: newTag }
  // }).then(function(existingTag) {
  //   if (existingTag) {
  //     console.log("existingTag:" + JSON.stringify(existingTag));
  //     tagIdArray.push(existingTag.id);
  //   } else {
  //     console.log("no tag:" + JSON.stringify(existingTag));
  //     db.Tag.create({ name: newTag }).then(function(dbTag) {
  //       console.log("dbTag.id: " + dbTag.id);
  //       tagIdArray.push(dbTag.id);
  //     });
  //   }
  // });
}
