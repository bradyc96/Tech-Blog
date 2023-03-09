const router = require('express').Router();
const { User, Post, Comment } = require('../../models');
const withAuth = require('../../utils/auth');
router.get("/sessions", (req, res) => {
  res.json(req.session)
})
// GET /api/users
router.get('/', (req, res) => {
    // Access our User model and run .findAll() method
    User.findAll({
        attributes: { exclude: ['password'] }
    })
      .then(dbUserData => res.json(dbUserData))
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

// GET /api/users/1
router.get("/:id", (req, res) => {
  User.findByPk(req.params.id)
    .then((data) => {
      if (data) {
        return res.json(data);
      } else {
        res.status(404).json({
          message: "Record does not exist.",
        });
      }
    })
    .catch((error) => {
      res.status(500).json({
        message: "System error! Unable to get record.",
        error: error,
      });
    });
});


// POST /api/users
router.post('/', (req, res) => {
    User.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    })
    .then(dbUserData => {
      req.session.save(() => {
        req.session.user_id = dbUserData.id;
        req.session.username = dbUserData.username;
        req.session.loggedIn = true;
        console.log(dbUserData)
        res.json(dbUserData);
      });
    }).catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
  });
  

  // LOGIN
  router.post('/login', (req, res) => {
    User.findOne({
      where: {
        email: req.body.email
      }
    }).then(dbUserData => {
      if (!dbUserData) {
        res.status(400).json({ message: 'No user with that email address!' });
        return;
      }
  
      const validPassword = dbUserData.checkPassword(req.body.password);
  
      if (!validPassword) {
        res.status(400).json({ message: 'Incorrect password!' });
        return;
      }
      
  
      req.session.save(() => {
        // declare session variables
        req.session.user_id = dbUserData.id;
        req.session.email = dbUserData.email
        req.session.username = dbUserData.username;
        req.session.loggedIn = true;
        // console.log(dbUserData)
        res.json({ user: dbUserData, message: 'You are now logged in!' });
      });
    });
  });

   // Singup
  //  router.post('/signup', (req, res) => {
  //   User.findOne({
  //     where: {
  //       email: req.body.email
  //     }
  //   }).then(dbUserData => {
  //     if (!dbUserData) {
  //       res.status(400).json({ message: 'No user with that email address!' });
  //       return;
  //     }
  
  //     // const validPassword = dbUserData.checkPassword(req.body.password);
  
  //     // if (!validPassword) {
  //     //   res.status(400).json({ message: 'Incorrect password!' });
  //     //   return;
  //     // }
      
  
  //     req.session.save(() => {
  //       // declare session variables
  //       req.session.user_id = dbUserData.id;
  //       req.session.email = dbUserData.email
  //       req.session.username = dbUserData.username;
  //       req.session.loggedIn = true;
  //       // console.log(dbUserData)
  //       res.json({ user: dbUserData, message: 'You are now logged in!' });
  //     });
  //   });
  // });


  // router.get('/logout', (req, res) => {
  //     req.session.destroy()
  //     res.redirect('/api/users/login');  
  //   });

// PUT /api/users/1
router.put('/:id', withAuth, (req, res) => {
    User.update(req.body, {
        individualHooks: true,
        where: {
            id: req.params.id
      }
    })
      .then(dbUserData => {
        if (!dbUserData[0]) {
          res.status(404).json({ message: 'No user found with this id' });
          return;
        }
        res.json(dbUserData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

// DELETE /api/users/1
router.delete('/:id', withAuth, (req, res) => {
    User.destroy({
      where: {
        id: req.params.id
      }
    })
      .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No user found with this id' });
          return;
        }
        res.json(dbUserData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

module.exports = router;