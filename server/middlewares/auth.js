const jwt = require('jsonwebtoken');
const userModel = require('../models/users.model');

const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    const decoded = jwt.verify(token, 'mysecretstring');
    const user = await userModel.findOne({ _id: decoded._id, 'tokens.token': token });
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