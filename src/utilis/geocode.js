const request = require("request");

// const geocode = function (address, callback) {
//   const geocodeURL = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1IjoiYW5kcmV3bWVhZDEiLCJhIjoiY2pvOG8ybW90MDFhazNxcnJ4OTYydzJlOSJ9.njY7HvaalLEVhEOIghPTlw&limit=1`;
//   request({ url: geocodeURL, json: true }, (error, response) => {
//     if (error) {
//       callback("Unable to connect to location services!", undefined);
//     } else if (response.body.features.length === 0) {
//       callback("Unable to find location. Try another search.", undefined);
//     } else {
//       callback(undefined, {
//         latitude: response.body.features[0].center[0],
//         longitude: response.body.features[0].center[1],
//         location: response.body.features[0].place_name,
//       });
//     }
//   });
// };

const geocode = function (address, callback) {
  // const geocodeURL =
  //   "http://api.weatherapi.com/v1/current.json?key=ccf7cc0d15f74a5abf510557222306&q=$28.2 83.9&aqi=no";
  const url = `https://api.weatherapi.com/v1/current.json?key=ccf7cc0d15f74a5abf510557222306&q=${address}&aqi=no`;

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to location services!", undefined);
    } else if (body.error) {
      callback(`${body.error.message}`, undefined);
    } else {
      callback(undefined, {
        latitude: body.location.lat,
        longitude: body.location.lon,
        location: body.location.name,
      });
    }
  });
};

module.exports = geocode;
