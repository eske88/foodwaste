const functions = require("firebase-functions");


const express = require("express")
const app = express()
const { createInstance } = require('@salling-group/auth');
const cors = require('cors');


app.use(cors());

const bodyParser = require('body-parser');

app.use(bodyParser.json());

 
app.post("/app/api", async (req,res) => {
    const { lon,lat, sliderValue } = req.body;
    const instance = await createInstance({
        'applicationName': 'My Application v1.0.1',
        'auth': {
          'type': 'bearer',
          'token': '171db633-0b19-4075-a481-ed885e720bd1',
        },
      });     
    instance.get("https://api.sallinggroup.com/v1/food-waste/?geo=" + lat + "," + lon + "&radius=" + sliderValue ).then(response => {
    res.json(response.data)
  });
})


// app.listen("https://us-central1-foodwaste-62538.cloudfunctions.net/app/api", () => {
//     console.log("Server started on port 3001")
// })


exports.app = functions.https.onRequest(app)
