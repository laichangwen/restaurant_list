// include express
const express = require("express")
const app = express()
const exphbs = require("express-handlebars")
const bodyParser = require("body-parser")
const methodOverride = require("method-override")
const routes = require("./routes")

app.engine("handlebars", exphbs({ defaultLayout: "main" }))
app.set("view engine", "handlebars")
app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride("_method"))
require("./config/mongoose")

// define server related variables
const port = 3000

// static files
app.use(express.static("public"))
// Handle request and response
app.use(routes)

// Start and listen to express server
app.listen(port, () => {
  console.log(`Listen on http://localhost:${port}`)
})
