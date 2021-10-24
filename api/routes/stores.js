const axios = require("axios");
const crypto = require("crypto");
const express = require("express");
const router = express.Router();

const url = "https://gateway-staging.ncrcloud.com/site/";
const auth = {
    headers: {
        "content-type": "application/json",
        "nep-organization": process.env.NCR_ORG
    },
    auth: {
        username: process.env.NCR_USR,
        password: process.env.NCR_PWD
    }
};

/**
 * Adds a store to the database.
 * @param {String} name
 * @param {String} foodType
 * @param {Number} latitude
 * @param {Number} longitude
 */
router.post("/", (req, res) => {
    let body = {
        siteName: req.body.name + '~' + req.body.foodType,
        coordinates: {
            latitude: req.body.latitude,
            longitude: req.body.longitude
        },
        enterpriseUnitName: crypto.randomUUID(),
        status: "ACTIVE"
    };
    axios.post(url + "v1/sites", body, auth)
        .then(response => res.status(200).send(response.data))
        .catch(error => console.error(error));
});

/**
 * Get all stores from the database (with optional query parameter of foodType).
 */
router.get("/", (req, res) => {
    axios.post(url + "v1/sites/find-by-criteria?pageSize=10000", { criteria: { status: "ACTIVE" } }, auth)
        .then(response => res.status(200).send(response.data.pageContent.filter(el => req.query.foodType === undefined || req.query.foodType === el.siteName.split("~")[1])))
        .catch(error => console.error(error));
});

/**
 * Get store with id.
 */
router.get("/:id", (req, res) => {
    axios.get(url + "v1/sites/" + req.params.id, auth)
        .then(response => res.status(200).send(response.data))
        .catch(error => console.error(error));
});

/**
 * Get stores within a radius of location.
 */
router.get("/nearby/:lat,:lon", (req, res) => {
    axios.get(url + "v1/sites/find-nearby/" + req.params.lat + "," + req.params.lon + "?radius=" + (req.query.radius ? req.query.radius : "2147483647") + "&numSites=500", auth)
        .then(response => res.status(200).send(response.data.sites.filter(el => el.status === "ACTIVE")))
        .catch(error => console.error(error));
});

/**
 * Update store with id.
 */
router.put("/:id", (req, res) => {
    let body = {
        siteName: req.body.name + '~' + req.body.foodType,
        coordinates: {
            latitude: req.body.latitude,
            longitude: req.body.longitude
        },
        enterpriseUnitName: crypto.randomUUID(),
        status: "ACTIVE"
    };
    axios.put(url + "v1/sites/" + req.params.id, body, auth)
        .then(response => res.status(200).send(response.data))
        .catch(error => console.error(error));
});

/**
 * Delete store with id.
 */
router.delete("/:id", (req, res) => {
    let body = {
        siteName: "x",
        coordinates: {
            latitude: 0,
            longitude: 0
        },
        enterpriseUnitName: crypto.randomUUID(),
        status: "INACTIVE"
    };
    axios.put(url + "v1/sites/" + req.params.id, body, auth)
        .then(response => res.status(200).send(response.data))
        .catch(error => console.error(error));
});

module.exports = router;