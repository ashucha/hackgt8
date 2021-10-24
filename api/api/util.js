const axios = require("axios");
const express = require("express");
const router = express.Router();

const url = "https://gateway-staging.ncrcloud.com/site/";
const auth = {
  headers: {
    "content-type": "application/json",
    "nep-organization": process.env.NCR_ORG,
  },
  auth: {
    username: process.env.NCR_USR,
    password: process.env.NCR_PWD,
  },
};

/**
 * Helper method which converts from degrees to radians.
 * @param {Number} deg
 * @returns equivalent number of radians
 */
function deg2rad(deg) {
  return deg * (Math.PI / 180);
}

/**
 * Helper method which returns the distance between two points in latitude/longitude.
 * @param {Number} lat1
 * @param {Number} lon1
 * @param {Number} lat2
 * @param {Number} lon2
 * @returns the distance
 */
function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
  var R = 6371;
  var dLat = deg2rad(lat2 - lat1);
  var dLon = deg2rad(lon2 - lon1);
  var a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c;
  return d;
}

/**
 * Calculates the expected time to get from your current location to the store.
 * @param {Number} latitude
 * @param {Number} longitude
 * @param {JSON} store
 * @return walking time and driving time in minutes
 */
function calcTime(latitude, longitude, store) {
  // return [walking time, driving time]
  const walkingSpeed = 6.4,
    drivingSpeed = 80;
  let dist = getDistanceFromLatLonInKm(
    latitude,
    longitude,
    store.coordinates.latitude,
    store.coordinates.longitude
  );
  return [(dist / walkingSpeed) * 60, (dist / drivingSpeed) * 60];
}

/**
 * Returns a Google Maps link for a store based on location.
 * @param {JSON} store
 * @returns the Google Maps link
 */
function getGoogleMapsLink(store) {
  return (
    "https://www.google.com/maps?q=" +
    store.coordinates.latitude +
    "," +
    store.coordinates.longitude
  );
}

/**
 * Returns an array of closest stores in order matching foodTypes.
 * @param {*} latitude
 * @param {*} longitude
 * @param {*} foodTypes
 * @returns the array of stores
 */
router.post("/", async (req, res) => {
  const { lat, lng, foodTypes } = req.body;

  const response = await axios.get(
    url +
      "v1/sites/find-nearby/" +
      lat +
      "," +
      lng +
      "?radius=2147483647&numSites=500",
    auth
  );
  let stores = response.data.sites.filter((el) => el.status === "ACTIVE");
  let taken = new Array(stores.length).fill(false);
  let ret = new Array(foodTypes.length).fill(undefined);
  for (let i = 0; i < foodTypes.length; i++) {
    for (let j = 0; j < stores.length; j++) {
      if (
        !taken[j] &&
        foodTypes[i] === JSON.parse(stores[j].siteName).foodType
      ) {
        ret[i] = stores[j];
        taken[j] = true;
        break;
      }
    }
  }
  console.log(ret);

  res.json(ret);
});

module.exports = router;
