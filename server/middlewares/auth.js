const jwt = require('jsonwebtoken');
const userModel = require('../models/users.model');

const auth = async (req, res, next) => {
  try {
    console.log("in auth");
    const token = req.header('Authorization').replace('Bearer ', '');
    console.log("token:",token);
    const decoded = jwt.verify(token, 'mysecretstring');
    console.log("decode:",decoded);
    const user = await userModel.findOne({ _id: decoded._id, 'tokens.token': token });
    console.log("user:",user);
    if (!user) {
      throw new Error();
    }
    req.user = user;
    req.token = token;
    next();
  } catch (error) {
    console.log(error)
    res.status(401).send({ error: 'Please authenticate' });
  }
}

module.exports = auth;