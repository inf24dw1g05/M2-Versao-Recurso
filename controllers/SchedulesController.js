'use strict';

var utils = require('../utils/writer.js');
var SchedulesController = require('../service/SchedulesControllerService');

module.exports.createSchedule = function createSchedule (req, res, next, body) {
  SchedulesController.createSchedule(body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.deleteSchedule = function deleteSchedule (req, res, next, id) {
  SchedulesController.deleteSchedule(id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.retrieveSchedule = function retrieveSchedule (req, res, next, id) {
  SchedulesController.retrieveSchedule(id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.retrieveSchedules = function retrieveSchedules (req, res, next) {
  SchedulesController.retrieveSchedules()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.updateSchedule = function updateSchedule (req, res, next, body, id) {
  SchedulesController.updateSchedule(body, id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
