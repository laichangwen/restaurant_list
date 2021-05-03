
const restaurants = require("../restaurant")
const restos = require("./restaurant.json").results

const db = require("../../config/mongoose")

// succeed in connecting
db.once("open", () => {
  for (let i = 0; i < restos.length; i++) {
    restaurants.create({
      name: `${restos[i].name}`,
      category: `${restos[i].category}`,
      image: `${restos[i].image}`,
      location: `${restos[i].location}`,
      phone: `${restos[i].phone}`,
      google_map: `${restos[i].google_map}`,
      rating: `${restos[i].rating}`,
      description: `${restos[i].description}`
    })
  }
  console.log("done!!")
})