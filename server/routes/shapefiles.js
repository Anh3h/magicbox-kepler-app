const express = require('express');
// eslint-disable-next-line new-cap
const router = express.Router();
const helperShapefileCountry = require('../helpers/helper-shapefile-country')
const helperShapefile = require('../helpers/helper-shapefile')
router.get('/countries', (req, res) => {
  helperShapefileCountry.listCountries()
    .then(result => res.send(result));
});

router.get('/countries/:countryCode/:adminLevel', (req, res) => {
  let getHealthSites = (req.query.healthsites == 'true');
  let getSchoolData = (req.query.schools == 'true');
  const fileName = `${req.params.countryCode}_${req.params.adminLevel}.json`;
  helperShapefile.sendCountryShapefile(fileName)
    .then(shapedata => {
      if (getHealthSites) {
        return helperShapefile.sendCountryHealthSites(req.params.countryCode, shapedata);
      } else if (getSchoolData) {
        return helperShapefile.sendCountrySchoolData(req.params.countryCode, shapedata);
      }else {
        res.send({ shapedata: shapedata });
      }
    })
    .then((results) => {
      res.send(results);
    });
});

module.exports = router;
