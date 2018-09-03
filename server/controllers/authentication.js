import User from "../models/user";
import jwt from "jsonwebtoken";
import config from "../secret";

function tokenForUser(user) {
    const timestamp = new Date().getTime();
    return jwt.sign({
        sub: user.id,
        iat: timestamp
    }, config.secret)
}

export function signup(req, res, next) {
  const {email, password} = req.body;

  if (!email || !password) {
    return res.status(422).send({
        error : 'You must provide email and password'
    })
  }
  // See if a user with the given email exists
  User.findOne({ email })
    .then((existingUser) => {
      if (existingUser)
        throw new Error('Email is in use');
      const user = new User({
        email,
        password
      });
      return user.save();
    })
    .then((user) => {
      // If a user with email does NOT exist, create and save user record
      return res.json( {
          token: tokenForUser(user)
      });
    })
    .catch((err) => {
      // If a user with email does exist, return an console.error
      if (err.message === 'Email is in use') {
        return res.status(422).send({
          error : err.message
        });
      }
        // Respond to request indicationg the user was created
      return next(err);
    });
}
