const express = require("express")
const router = express.Router()
const restaurants = require("../../models/restaurant")
const { body, validationResult } = require('express-validator')


router.get("/new", (req, res) => {
  res.render("new")
})

router.post("/", (req, res) => {
  // body('name', 'Empty name').isLength({ min: 1 })
  // const errors = validationResult(req);
  // console.log(errors)
  // if (errors.isEmpty()) {
  const newRestaurant = req.body
  const { name, category, image, location, phone, google_map, rating, description } = newRestaurant
  return restaurants.create({ name, category, image, location, phone, google_map, rating, description })
    .then(() => res.redirect("/"))
    .catch(error => console.log(error))
  // } else {
  //   console.log(errors)
  // }
})


router.get("/:restaurant_id", (req, res) => {
  const id = req.params.restaurant_id
  restaurants.findById(id)
    .lean()
    .then(restaurant => res.render("show", { restaurant }))
    .catch(error => console.log(error))
})

router.get("/:restaurant_id/detail", (req, res) => {
  const id = req.params.restaurant_id
  restaurants.findById(id)
    .lean()
    .then(restaurant => res.render("show", { restaurant }))
    .catch(error => console.log(error))
})

router.get("/:restaurant_id/edit", (req, res) => {
  const id = req.params.restaurant_id
  return restaurants.findById(id)
    .lean()
    .then(restaurant => res.render("edit", { restaurant }))
    .catch(error => console.log(error))
})

router.put("/:restaurant_id", (req, res) => {
  const id = req.params.restaurant_id
  const modified = req.body
  return restaurants.findById(id)
    .then(restaurant => {
      Object.keys(modified).forEach(key => {
        restaurant[key] = modified[key]
      })
      return restaurant.save()
    })
    .then(() => res.redirect(`/restaurants/${id}`))
    .catch(error => console.log(error))
})

router.delete("/:restaurant_id", (req, res) => {
  const id = req.params.restaurant_id
  return restaurants.findById(id)
    .then(restaurant => restaurant.remove())
    .then(() => res.redirect("/"))
    .catch(error => console.log(error))
})


module.exports = router