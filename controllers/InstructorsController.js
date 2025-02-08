'use strict';

var utils = require('../utils/writer.js');
var InstructorsController = require('../service/InstructorsControllerService');
var Schedules = require('../service/SchedulesControllerService');

module.exports.createInstructor = function createInstructor (req, res, next, body) {
  InstructorsController.createInstructor(body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.deleteInstructor = function deleteInstructor (req, res, next, id) {
  InstructorsController.deleteInstructor(id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getInstructors = function getInstructors (req, res, next) {
  InstructorsController.getInstructors()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.updateInstructor = function updateInstructor (req, res, next, body, id) {
  InstructorsController.updateInstructor(body, id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getInstructorSchedules = function getInstructorSchedules (req, res, next, instructorId) {
  Schedules.getSchedulesByInstructor(instructorId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (error) {
      utils.writeJson(res, { error: error.message }, error.code || 500);
    });
};

module.exports.getInstructor = function getInstructor (req, res, next, id) {
  InstructorsController.getInstructor(id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, { error: response.message }, response.code);
    });
};