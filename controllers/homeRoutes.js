const router = require('express').Router();
const User = require("../models/User.js");
const Post = require("../models/Post.js");
const Comment = require("../models/Comment.js");

router.get("/", async(req, res) => {
  console.log(req.session)  
  try {
        const postData = await Post.findAll({
            include: [
              User,
            {
              model: Comment,
              include: [User]
            }]
        })
        
        const posts = postData.map((post) => post.get({
            plain: true
        }))
        console.log(posts)
        // res.json(posts)
        res.render("home", {
            posts
        })
        if (!req.session.logged_in) {
          // res.redirect("/login");
    }}
    catch(err) {
        res.status(500).json(err)
    }
})
// router.get("/dashboard", async (req, res) => {
//     if (!req.session.logged_in) {
//       res.redirect("/login");
//     } else {
//       const userData = await User.findByPk(req.session.user_id, {
//         include: {
//           model: Post,
//           include: {
//             model: Comment,
//           },
//         },
//       });
//       if (!userData) {
//         res.redirect("/login");
//       }
  
//       const userHbs = userData.toJSON();
//       console.log(userHbs);
//       res.render("dashboard", userHbs);
//     }
//   });

  router.get("/login", (req, res) => {
    if (!req.session.logged_in) {
      res.render("login");
    } else {
      res.redirect("/home");
    }
  });

  router.get("/signup", (req, res) => {
    if (!req.session.logged_in) {
      res.render("signup");
    } else {
      res.redirect("/home");
    }
  });

  router.get('/logout', (req, res) => {
    req.session.destroy()
    res.redirect('/login');  
  });

  

module.exports = router