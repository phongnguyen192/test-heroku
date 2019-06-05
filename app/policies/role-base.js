'use strict';
const cache = require('../middleware/cache');

function roleMatch(role, userRole) {
    var stringifyObj = JSON.parse(userRole);
    if (role == getRole(stringifyObj.ProStartRoles)) {
        return true;
    }
    return false;
}

function getRole(strRole) {
    switch (strRole) {
        case "EF":
            return 'ADMIN';
        case "ProStart Coordinator Approver":
            return "COORDINATOR";
        case "Confirmed ProStart Educator and Proctor":
            return 'POC';
        case "Confirmed ProStart Educator":
            return 'EDUCATOR';
        default: return null;
    }
}

// middleware for doing role-based permissions
module.exports = function authorization(role) {
    // return a middleware
    return (req, res, next) => {
        if (req.currentUser) {
            let result = cache.get(req.currentUser.lastName)
            if (result && roleMatch(role, result.ExtendedAttributesJson)) {
                next();
            } else {
                res.status(401).json({ Error: "Unauthorized" });
            }
        } else {
            res.status(403).json({ Error: "Forbidden" }); // user is forbidden
        }
    }
}