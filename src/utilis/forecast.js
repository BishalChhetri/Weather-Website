const request = require("request");

const forecast = function (lat, long, callback) {
  const url = `https://api.weatherapi.com/v1/current.json?key=ccf7cc0d15f74a5abf510557222306&q=${lat} ${long}&aqi=no`;

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to weather service!", undefined);
    } else if (body.error) {
      callback("Unable to find location", undefined);
    } else {
      callback(
        undefined,
        `${body.current.condition.text}. It is currently ${body.current.temp_c} degrees out.`
      );
    }
  });
};

module.exports = forecast;
