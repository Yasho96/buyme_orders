const Order = require("../models/Order");
const { checkToken } = require('../middleware/auth/tokenvalidation');
const { GetProductDetailsEvent } = require("../middleware/events/events");
const router = require("express").Router();

//CREATE

router.post("/add-order", checkToken, async (req, res) => {
  try {

    if (req.body.products.length < 0) {
      res.status(500).json({ err: 'Empty Product List', success: false })
    }

    let products_array = [];
    for (let product of req.body.products) {

      //get product details
      let payload = {
        event: 'GET_PRODUCT',
        data: {
          product_id: product.product_id
        }

      };

      let product_respond = await GetProductDetailsEvent(payload);
      if (product_respond.status == 200) {
        let obj = {
          product: {
            _id: product_respond.data._id,
            title: product_respond.data.title,
            desc: product_respond.data.desc,
            img: product_respond.data.img,
            size: product_respond.data.size,
            color: product_respond.data.color,
            price: product_respond.data.price
          },
          quantity: product.quantity
        }
        products_array.push(obj);
      } else {
        res.status(500).json({ err: 'Error occured in product module. Please try again later', success: false })
      }

    }

    await Order.create({
      userId: req.user.userID,
      products: products_array,
      amount: req.body.amount,
      address: req.body.address,
    })

    res.status(200).json({ success: true, msg: 'Order created' });
  } catch (err) {
    res.status(500).json(err);
  }
});

//UPDATE
router.post("/update-order", checkToken, async (req, res) => {

  try {

    if (req.body.products.length < 0) {
      res.status(500).json({ err: 'Empty Product List', success: false })
    }

    let products_array = [];
    for (let product of req.body.products) {

      //get product details
      let payload = {
        event: 'GET_PRODUCT',
        data: {
          product_id: product.product_id
        }

      };

      let product_respond = await GetProductDetailsEvent(payload);
      if (product_respond.status == 200) {
        let obj = {
          product: {
            _id: product_respond.data._id,
            title: product_respond.data.title,
            desc: product_respond.data.desc,
            img: product_respond.data.img,
            size: product_respond.data.size,
            color: product_respond.data.color,
            price: product_respond.data.price
          },
          quantity: product.quantity
        }
        products_array.push(obj);
      } else {
        res.status(500).json({ err: 'Error occured in product module. Please try again later', success: false })
      }

    }

    await Order.findByIdAndUpdate(req.body.order_id, {
      userId: req.user.userID,
      products: products_array,
      amount: req.body.amount,
      address: req.body.address,
    }, { new: true })

    res.status(200).json({ success: true, msg: 'Order created' });
  } catch (err) {
    res.status(500).json(err);
  }

});

//DELETE
router.post("/delete-order", checkToken, async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.body.order_id);
    res.status(200).json({ msg: "Order has been deleted...",success:true });
  } catch (err) {
    res.status(500).json(err);
  }
});


router.get("/get-order", checkToken, async (req, res) => {
  try {
    const orders = await Order.findById(req.body.order_id);
    res.status(200).json({ data: orders,success:true });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/get-all-orders", checkToken, async (req, res) => {
  try {
    const orders = await Order.find({ userId :req.user.userID});
    res.status(200).json({ data: orders,success:true });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;