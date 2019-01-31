const express = require('express');
const router = express.Router();
const helperSchools = require('../helpers/helper-schools');
router.get('/:countryCode', (req, res) => {
    let countryCode = `${req.params.countryCode}`;
    helperSchools.sendCountrySchoolData(countryCode)
        .then(schoolsData => res.send(schoolsData));
});

module.exports = router;