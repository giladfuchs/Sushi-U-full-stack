const User = require("../modles/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { errorPassword401, error422, error401auth } = require('../middleware/error-handler')


exports.signup = async (req, res, next) => {
  error422(req)

  const { email, name, password } = req.body;

  try {
    const hashedPw = await bcrypt.hash(password, 12);

    const user = new User({
      email: email,
      password: hashedPw,
      name: name,
      phone: 18,
    });

    await user.save();
    const token = createToken(user);
    console.log(token);

    res.status(201).json({ message: "create new user", userId: user._id, token });
  } catch (err) {
    return next(err);
  }
};

exports.login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email: email });
    error401auth(user)

    const isEqual = await bcrypt.compare(password, user.password);
    errorPassword401(isEqual)

    const token = createToken(user)

    res.status(200).json({ token: token, userId: user._id.toString() });
  } catch (err) {
    if (!err.statusCode) err.statusCode = 500;
    return next(err);
  }
};


const createToken = (user) => {
  return jwt.sign(
    {
      email: user.email,
      userId: user._id.toString(),
    },
    "somesupersecretsecret",
    { expiresIn: "1h" }
  );
}