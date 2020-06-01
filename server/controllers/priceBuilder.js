const PriceBuilder = require("../modles/priceBuilder");
const { error404 } = require('../middleware/error-handler')
exports.getPrice = async (req, res, next) => {
  try {
    const items = await PriceBuilder.find();
    error404(items)
    res.status(200).json(items);
  } catch (err) {
    return next(err);
  }
};

