const jwt = require("jsonwebtoken");
const User = require("../modles/user")
const { error401auth, error404 } = require('./error-handler')
module.exports = async (req, res, next) => {
  const token = req.get("token");
  error401auth(token);

  try {
    const decodedToken = jwt.verify(token, "somesupersecretsecret");

    error404(decodedToken)

    req.user = await User.findById(decodedToken.userId);
    error404(req.user)
    console.log("req.user  auth");

  } catch (err) {
    return next(err);
  }
  next();
};
