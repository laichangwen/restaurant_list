const mongoose = require("mongoose")
mongoose.connect("mongodb://localhost/restaurants", { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection
// fail to connect
db.on("error", () => {
  console.log("mongodb error!!!")
})
// succeed in connecting
db.once("open", () => {
  console.log("mongodb connected!!!")
})

module.exports = db