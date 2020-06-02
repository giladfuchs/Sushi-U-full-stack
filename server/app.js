const express = require("express");

const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");

// 4242 4242 4242 4242
// 10 / 22
const app = express();

app.use(morgan("dev"));

app.use(cors());
const indexRoutes = require("./routes/index");


var rawBodySaver = function (req, res, buf, encoding) {


  if (buf && buf.length) {
    req.rawBody = buf.toString(encoding || 'utf8');


  }
}

app.use(bodyParser.json({ verify: rawBodySaver }));
app.use(bodyParser.urlencoded({ verify: rawBodySaver, extended: true }));
app.use(bodyParser.raw({ verify: rawBodySaver, type: '*/*' }));
app.use("/auth", indexRoutes.auth);
app.use("/order", indexRoutes.order);
app.use("/cart", indexRoutes.cart);
app.use("/items", indexRoutes.item);
app.use("/price", indexRoutes.price);

app.use((error, req, res, next) => {

  const status = error.statusCode || 500;
  const msg = error.message || "error with statusCode" + status;
  const data = error.data;
  res.status(status).json({ message: msg, data });
});

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then((result) => {
    console.log("app connenct on");

    app.listen(process.env.PORT || 8080);
  })
  .catch((err) => {
    console.log(err);
  });
