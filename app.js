// include express
const express = require("express")
const app = express()
const exphbs = require("express-handlebars")

const bodyParser = require("body-parser")

const restaurants = require("./models/restaurant")
app.engine("handlebars", exphbs({ defaultLayout: "main" }))
app.set("view engine", "handlebars")
require("./config/mongoose")
// define server related variables
const port = 3000

app.use(bodyParser.urlencoded({ extended: true }))


// static files
app.use(express.static("public"))
// Handle request and response
app.get("/", (req, res) => {
  restaurants
    .find()
    .lean()
    .then(restaurant => res.render("index", { restaurant }))
    .catch(error => console.log(error))
})

app.get("/search", (req, res) => {
  if (req.query.keyword) {
    const keyword = req.query.keyword
    restaurants.find({ name: { $regex: keyword, $options: 'i' } })
      .lean()
      .then(restaurant => res.render("index", { restaurant, keyword }))
      .catch(error => console.log(error))
  }
})

app.get("/restaurants/new", (req, res) => {
  res.render("new")
})

app.post("/restaurants", (req, res) => {
  const newRestaurant = req.body
  const { name, category, image, location, phone, google_map, rating, description } = newRestaurant

  return restaurants.create({ name, category, image, location, phone, google_map, rating, description })
    .then(() => res.redirect("/"))
    .catch(error => console.log(error))
})


app.get("/restaurants/:restaurant_id", (req, res) => {
  const id = req.params.restaurant_id
  restaurants.findById(id)
    .lean()
    .then(restaurant => res.render("show", { restaurant }))
    .catch(error => console.log(error))
})

app.get("/restaurants/:restaurant_id/detail", (req, res) => {
  const id = req.params.restaurant_id
  restaurants.findById(id)
    .lean()
    .then(restaurant => res.render("show", { restaurant }))
    .catch(error => console.log(error))
})

app.get("/restaurants/:restaurant_id/edit", (req, res) => {
  const id = req.params.restaurant_id
  return restaurants.findById(id)
    .lean()
    .then(restaurant => res.render("edit", { restaurant }))
    .catch(error => console.log(error))
})

app.post("/restaurants/:restaurant_id/edit", (req, res) => {
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

app.post("/restaurants/:restaurant_id/delete", (req, res) => {
  const id = req.params.restaurant_id
  return restaurants.findById(id)
    .then(restaurant => restaurant.remove())
    .then(() => res.redirect("/"))
    .catch(error => console.log(error))
})

// Start and listen to express server
app.listen(port, () => {
  console.log(`Listen on http://localhost:${port}`)
})
