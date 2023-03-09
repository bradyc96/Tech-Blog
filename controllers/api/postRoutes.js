const router = require('express').Router();
const { Post, User, Comment } = require('../../models');
const withAuth = require('../../utils/auth.js');

// get all users
router.get("/", (req, res) => {
  Post.findAll()
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      res.status(500).json({
        message: "Server error! Unable to get records.",
        error: error,
      });
    });
});

router.get("/:id", (req, res) => {
  Post.findByPk(req.params.id)
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
        message: "Server error! Unable to get data.",
        error: error,
      });
    });
});

router.post('/', (req, res) => {
    Post.create({
      title: req.body.title,
      body: req.body.body,
      user_id: req.session.user_id
    })
      .then(dbPostData => {res.json(dbPostData)
      console.log(dbPostData)})
      
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
});

router.put('/:id', withAuth, (req, res) => {
    Post.update({
        title: req.body.title,
        post_content: req.body.post_content
      },
      {
        where: {
          id: req.params.id
        }
      })
      .then(dbPostData => {
        if (!dbPostData) {
          res.status(404).json({ message: 'No post found with this id' });
          return;
        }
        res.json(dbPostData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

  router.delete('/:id', withAuth, (req, res) => {
    Post.destroy({
      where: {
        id: req.params.id
      }
    })
      .then(dbPostData => {
        if (!dbPostData) {
          res.status(404).json({ message: 'No post found with this id' });
          return;
        }
        res.json(dbPostData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

  module.exports = router; 