var StatusCode = require("http-status-codes");
var dbConnection = require("../../../utilities/postgresql-connection.js");
var settings = require("../../../config.js");
var validate = require("validator");
var HttpStatusCode = require("http-status-codes");

exports.getCarById = function (req, res) {
  var entityData = {
    Id: req.params.id,
  };

  function validateFields(req, res) {
    return new Promise(function (resolve, reject) {
      var isCarIdEmpty = validate.isEmpty(entityData.Id);
      if (isCarIdEmpty) {
        return resolve({
          status: HttpStatusCode.StatusCodes.BAD_REQUEST,
          result: req.i18n.__("CarIdRequired"),
        });
      }

      return resolve({
        status: HttpStatusCode.StatusCodes.OK,
        data: entityData,
      });
    });
  }

  function getCarById(req, entityData) {
    return new Promise(function (resolve, reject) {
      const sqlQuery =
        'SELECT car.id as Id, car."name" as "Name", model."name" as "Model Name", make."name" as "Make Name",array_agg(carimage.imgpath) AS Images FROM car INNER JOIN model ON car.modelid = model.id INNER JOIN make ON car.makeid = make.id INNER JOIN carimage ON car.id = carimage.carid GROUP BY car.id, "Name", "Model Name", "Make Name" HAVING car.id = ' +
        entityData.Id;
      dbConnection
        .getResult(sqlQuery)
        .then(function (response) {
          if (response.data.length > 0) {
            return resolve({
              status: HttpStatusCode.StatusCodes.OK,
              data: response,
              message: "Record listed successfully!!!",
            });
          } else {
            return resolve({
              status: HttpStatusCode.StatusCodes.OK,
              data: [],
              message: "No record found!!!",
            });
          }
        })
        .catch(function (error) {
          res.status(error.status).json({
            data: error.data,
          });
        });
    });
  }

  validateFields(req, res)
    .then(function (response) {
      getCarById(req, response.data)
        .then(function (response) {
          res.status(response.status).json({
            data: response.data.data,
            message: response.message,
          });
        })
        .catch(function (error) {
          res.status(error.status).json({
            data: error.data,
          });
        });
    })
    .catch(function (error) {
      res.status(error.status).json({
        data: error.data,
      });
    });
};
