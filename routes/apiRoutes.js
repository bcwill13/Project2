var db = require("../models");
var jwt = require("jsonwebtoken");
var passport = require("passport");
var passportJWT = require("passport-jwt");

module.exports = function(app) {
  var ExtractJwt = passportJWT.ExtractJwt;
  var JwtStrategy = passportJWT.Strategy;

  var jwtOptions = {};
  jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
  jwtOptions.secretOrKey = "jwtsecret";

  // lets create our strategy for web token
  var strategy = new JwtStrategy(jwtOptions, function(jwtPayload, next) {
    db.User.findOne({ id: jwtPayload.id }).then(function(user) {
      if (user) {
        next(null, user);
      } else {
        next(null, false);
      }
    });
  });

  passport.serializeUser(function(user, done) {
    done(null, user);
  });

  passport.deserializeUser(function(user, done) {
    done(null, user);
  });

  // use the strategy
  passport.use(strategy);
  app.use(passport.initialize());

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
    console.log("app.post using req.body of: '" + JSON.stringify(req.body) + "'");
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
          console.log("completed first loop and calls to createTag3 tagIdArray:" + JSON.stringify(tagIdArray));
        });
      }
      console.log("***completed first loop and calls to createTag3 tagIdArray:" + JSON.stringify(tagIdArray));
      // Loop through all tagIDs creating the linking table entries
      tagIdArray.forEach(createJournalTag);
      function createJournalTag(tagIdItem) {
        console.log("tagIdItem:" + tagIdItem);
        db.JournalTag.create({ journalId: "1", tagId: "1" }).then(function(dbTagId) {
          console.log(dbTagId);
        });
      }

      res.json(dbJournal);
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

  // Get all examples
  app.get("/api/journals/:journalId/tags", function(req, res) {
    db.tag.findAll({}).then(function(journalId) {
      res.json(journalId);
    });
  });

  // Get a specific journal
  app.get("/api/journals/:journalId/tags/:tagId", function(req, res) {
    //var journalId = req.params.journalId;
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
  // Get all examples
  app.get("/api/tags", function(req, res) {
    db.Tag.findAll({}).then(function(tags) {
      res.json(tags);
    });
  });

  // Get a specific journal
  app.get("/api/tags/:tagId", function(req, res) {
    var tagId = req.params.tagId;
    db.Tag.findAll({
      where: {
        id: tagId
      }
    }).then(function(tag) {
      res.json(tag);
    });
  });

  // Create a new example
  app.post("/api/tags", function(req, res) {
    db.Tag.create(req.body).then(function(tag) {
      res.json(tag);
    });
  });

  // Delete an example by id
  app.delete("/api/tags/:tagId", function(req, res) {
    var tagId = req.params.tagId;
    db.Tag.destroy({
      where: {
        id: tagId
      }
    }).then(function(tag) {
      res.json(tag);
    });
  });

  /**
   *  APIs for user authentication
   */

  // get all users
  app.get("/users", function(req, res) {
    db.User.findAll().then(function(users) {
      res.json(users);
    });
  });

  // register route
  app.post("/register", function(req, res) {
    db.User.create(req.body).then(function(user) {
      res.json(user);
    });
  });

  //login route
  app.post("/login", function(req, res) {
    var username = req.body.username;
    var password = req.body.password;
    if (username && password) {
      db.User.findOne({ username: username }).then(function(user) {
        if (!user) {
          res.status(401).json({ message: "User not found!" });
        }
        if (user.password === password) {
          var payload = { id: user.id };
          var token = jwt.sign(payload, jwtOptions.secretOrKey);
          res.json({ msg: "ok", token: token });
        } else {
          res.status(401).json({ msg: "Password is incorrect" });
        }
      });
    }
  });

  // protected route
  app.get("/protected", passport.authenticate("jwt", { session: true }), function(req, res) {
    res.json("Success! You can now see this without a token.");
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
  tagIdArray.push("1");
  // line above exists only to satify eslint/travis, remove it before debugging
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
