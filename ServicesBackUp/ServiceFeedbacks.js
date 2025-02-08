'use strict';


/**
 * Create feedback for a schedule
 *
 * body Feedback  (optional)
 * no response value expected for this operation
 **/
exports.createFeedback = function(body) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * Delete a feedback by ID
 *
 * id Integer 
 * returns inline_response_200_1
 **/
exports.feedbacksIdDELETE = function(id) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "message" : "Feedback with ID 1 deleted successfully"
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Update a feedback by ID
 *
 * body Feedback  (optional)
 * id Integer 
 * returns Feedback
 **/
exports.feedbacksIdPUT = function(body,id) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "user_id" : 1,
  "rating" : 5,
  "created_at" : "2000-01-23T04:56:07.000+00:00",
  "comment" : "comment",
  "id" : 0,
  "schedule_id" : 6
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Get feedbacks for a schedule
 *
 * schedule_id Integer ID of a schedule
 * returns List
 **/
exports.getFeedbacks = function(schedule_id) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = [ {
  "user_id" : 1,
  "rating" : 5,
  "created_at" : "2000-01-23T04:56:07.000+00:00",
  "comment" : "comment",
  "id" : 0,
  "schedule_id" : 6
}, {
  "user_id" : 1,
  "rating" : 5,
  "created_at" : "2000-01-23T04:56:07.000+00:00",
  "comment" : "comment",
  "id" : 0,
  "schedule_id" : 6
} ];
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}
