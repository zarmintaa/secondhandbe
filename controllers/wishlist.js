/** @format */

const { wishlist: Wishlist, product_images: Product_Images, product: Product, user: User } = require('../models');

module.exports = {
  getAll: (req, res, next) => {
    Wishlist.findAll({
      include: [
        {
          model: Product,
          as: 'wishlist_product',
        },
        {
          model: User,
          as: 'wishlist_user',
          attributes: ['username', 'name'],
        },
      ],
    })
      .then((wishlists) => {
        Product_Images.findAll({
          where: {
            product_id: wishlists[0].wishlist_product.id,
          },
        }).then((product_image) => {
          res.status(200).json({
            message: 'success',
            wishlists,
            product_image,
          });
        });
      })
      .catch((err) => {
        res.status(500).json({
          message: 'error',
          error: err.message,
        });
      });
  },
  create: (req, res) => {
    Wishlist.create({
      user_id: req.userLoggedin.userId,
      product_id: req.body.product_id,
    })
      .then((result) => {
        res.status(200).json({ message: 'Success', result });
      })
      .catch((err) => {
        res.status(500).json({ message: 'Failed', err: err.message });
      });
  },
  delete: (req, res) => {
    Wishlist.destroy({
      where: {
        id: req.params.id,
      },
    })
      .then((result) => {
        if (result === 0) {
          res.status(404).json({
            message: 'Product dengan ID ' + req.params.id + ' Not Found',
            result,
          });
        } else {
          res.status(200).json({ message: 'Success', result });
        }
      })
      .catch((err) => {
        res.status(500).json({ message: 'Failed', err: err.message });
      });
  },
};