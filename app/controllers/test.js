'use strict';
const axios = require('axios');
const express = require('express');
const router = express.Router();
const env = process.env.NODE_ENV || 'development';
const config = require('../../config/config.json')[env];

// RETURNS ALL THE PEOPLE IN THE DATABASE
router.get('/', (req, res, next) => {
    const role = (req.query.role) ? parseInt(req.query.role) : 3;
    let data = {
        "clientid": "ChooseRestaurants",
        "clientsecret": "59F76BE9-77E2-4110-AFFF-83E4FEABA5A4",
        "profile": {
            "PersonID": "13719172",
            "FirstName": "Hiren",
            "LastName": "Test",
            "Email": "devtest@restaurant.org",
            "ExtendedAttributesJson": "{\"ProStartRoles\":\"Confirmed ProStart Educator and Proctor\"}"
        }
    };
    if (role == 1) {
        data = {
            "clientid": "ChooseRestaurants",
            "clientsecret": "59F76BE9-77E2-4110-AFFF-83E4FEABA5A4",
            "profile": {
                "PersonID": "8326769",
                "FirstName": "Test1000",
                "LastName": "TestL100",
                "Email": "devtest@restaurant.org",
                "ExtendedAttributesJson": "{\"ProStartRoles\":\"FE\"}"
            }
        };
    }
    if (role == 2) {
        data = {
            "clientid": "ChooseRestaurants",
            "clientsecret": "59F76BE9-77E2-4110-AFFF-83E4FEABA5A4",
            "profile": {
                "PersonID": "11370009",
                "FirstName": "Super User",
                "LastName": "ProStart New Jersey",
                "Email": "devtest@restaurant.org",
                "ExtendedAttributesJson": "{\"ProStartRoles\":\"ProStart Coordinator Approver\"}"
            }
        };
    }

    let url = config.cgiUrl + 'user';
    axios.post(url, data)
        .then((response) => {
            console.log(response.data);
            if (response.data.ErrorMessage.length > 0) {
                res.status(500).json({ Error: response.data.ErrorMessage });
            } else {
                res.status(200).send({ status: "success", token: response.data.Token });
            }
        })
        .catch((error) => {
            res.status(500).json({ Error: error });
        })
  });
  


module.exports = router;