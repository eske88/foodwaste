// const express = require("express")
// const app = express()
// const { createInstance } = require('@salling-group/auth');

// const bodyParser = require('body-parser');

// app.use(bodyParser.json());

 
// app.post("/api", async (req,res) => {
//     const { lon,lat, sliderValue } = req.body;
//     const instance = await createInstance({
//         'applicationName': 'My Application v1.0.1',
//         'auth': {
//           'type': 'bearer',
//           'token': '171db633-0b19-4075-a481-ed885e720bd1',
//         },
//       });     
//     instance.get("https://api.sallinggroup.com/v1/food-waste/?geo=" + lat + "," + lon + "&radius=" + sliderValue ).then(response => {
//     res.json(response.data)
//   });
// })



// app.listen(3001, () => {
//     console.log("Server started on port 3001")
// })