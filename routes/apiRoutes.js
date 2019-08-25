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

  // app.post("/api/journals", function(req, res) {
  //   db.Journal.create(req.body).then(function(dbJournal) {
  //     res.json(dbJournal);
  //   });
  // });

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

  // Get all examples
  app.get("/api/journals/:journalId/tags", function(req, res) {
    db.tag.findAll({}).then(function(journalId) {
      res.json(journalId);
    });
  });

  // Get a specific journal
  app.get("/api/journals/:journalId/tags/:tagId", function(req, res) {
    var journalId = req.params.journalId;
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
