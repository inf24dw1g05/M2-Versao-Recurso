'use strict';

var utils = require('../utils/writer.js');
var FeedbacksController = require('../service/FeedbacksControllerService');

module.exports.createFeedback = function createFeedback (req, res, next, body) {
  FeedbacksController.createFeedback(body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.feedbacksIdDELETE = function feedbacksIdDELETE (req, res, next, id) {
  FeedbacksController.feedbacksIdDELETE(id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.feedbacksIdPUT = function feedbacksIdPUT (req, res, next, body, id) {
  FeedbacksController.feedbacksIdPUT(body, id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getFeedbacks = function getFeedbacks (req, res, next, schedule_id) {
  FeedbacksController.getFeedbacks(schedule_id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
