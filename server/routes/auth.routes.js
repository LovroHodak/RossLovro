const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs');
const UserModel = require('../models/user.model')
const { isLoggedIn } = require('../helpers/auth-helper'); // middleware to check if user is loggedIn



router.post('/signup', (req, res) => {
    const {username, email, password } = req.body;
    console.log(username, email, password);

    bcrypt.genSalt(12)
      .then((salt) => {
        console.log('Salt: ', salt);
        bcrypt.hash(password, salt)
          .then((passwordHash) => {
            UserModel.create({email, username, passwordHash})
              .then((user) => {
                user.passwordHash = "***";
                req.session.loggedInUser = user;
                console.log(req.session)
                res.status(200).json(user);
              })
              .catch((err) => {
                if (err.code === 11000) {
                  res.status(500)
                  .json({
                    errorMessage: 'username or email entered already exists!'
                  });
                  return;  
                } 
                else {
                  res.status(500)
                  .json({
                    errorMessage: 'Something went wrong! Go to sleep!'
                  });
                  return; 
                }
              })
          });  
  });

});

router.post('/signin', (req, res) => {
    const {email, password } = req.body;
    // Find if the user exists in the database 
    UserModel.findOne({email})
      .then((userData) => {
           //check if passwords match
          bcrypt.compare(password, userData.passwordHash)
            .then((doesItMatch) => {
                //if it matches
                if (doesItMatch) {
                  // req.session is the special object that is available to you
                  user.passwordHash = "***";
                  req.session.loggedInUser = user;
                  console.log('Signin', req.session)
                  res.status(200).json(user)
                }
                //if passwords do not match
                else {
                    res.status(500).json({
                        error: 'Passwords don\'t match',
                    })
                  return; 
                }
            })
            .catch((err) => {
                res.status(500).json({
                    error: 'Email format not correct',
                    message: err,
                })
              return; 
            });
      })
      //throw an error if the user does not exists 
      .catch((err) => {
        res.status(500).json({
            error: 'Email format not correct',
            message: err
        })
        return;  
      });
  
});

router.get("/user", isLoggedIn, (req, res, next) => {
  res.status(200).json(req.session.loggedInUser);
});

module.exports = router;