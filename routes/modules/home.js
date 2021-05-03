const express = require("express")
const router = express.Router()
const restaurants = require("../../models/restaurant")

router.get("/", (req, res) => {
  restaurants
    .find()
    .lean()
    .then(restaurant => res.render("index", { restaurant }))
    .catch(error => console.log(error))
})

router.get("/search", (req, res) => {
  if (req.query.keyword) {
    const keyword = req.query.keyword
    restaurants.find({ name: { $regex: keyword, $options: 'i' } })
      .lean()
      .then(restaurant => res.render("index", { restaurant, keyword }))
      .catch(error => console.log(error))
  }
})

module.exports = router