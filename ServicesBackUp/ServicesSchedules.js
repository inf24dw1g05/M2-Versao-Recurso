'use strict';


const db = require('../db/config');

/**
 * Create feedback for a schedule
 *
 * body Feedback
 * no response value expected for this operation
 **/
exports.createFeedback = async function(body) {
  try {
    // Validar rating entre 1 e 5
    if (body.rating < 1 || body.rating > 5) {
      throw { code: 400, error: 'Rating must be between 1 and 5' };
    }

    const [result] = await db.execute(
      'INSERT INTO Feedback (schedule_id, user_id, rating, comment) VALUES (?, ?, ?, ?)',
      [body.schedule_id, body.user_id, body.rating, body.comment]
    );
    return { id: result.insertId, ...body };
  } catch (error) {
    throw error.code ? error : { code: 500, error: error.message };
  }
}

/**
 * Delete a feedback by ID
 *
 * id Integer
 * returns inline_response_200_1
 **/
exports.feedbacksIdDELETE = async function(id) {
  try {
    const [result] = await db.execute('DELETE FROM Feedback WHERE id = ?', [id]);
    if (result.affectedRows === 0) {
      throw { code: 404, error: 'Feedback not found' };
    }
    return { message: `Feedback with ID ${id} deleted successfully` };
  } catch (error) {
    throw error.code ? error : { code: 500, error: error.message };
  }
}

/**
 * Update a feedback by ID
 *
 * body Feedback
 * id Integer
 * returns Feedback
 **/
exports.feedbacksIdPUT = async function(body, id) {
  try {
    // Validar rating entre 1 e 5
    if (body.rating < 1 || body.rating > 5) {
      throw { code: 400, error: 'Rating must be between 1 and 5' };
    }

    const [result] = await db.execute(
      'UPDATE Feedback SET schedule_id = ?, user_id = ?, rating = ?, comment = ? WHERE id = ?',
      [body.schedule_id, body.user_id, body.rating, body.comment, id]
    );
    if (result.affectedRows === 0) {
      throw { code: 404, error: 'Feedback not found' };
    }
    return { id: id, ...body };
  } catch (error) {
    throw error.code ? error : { code: 500, error: error.message };
  }
}

/**
 * Get feedbacks for a schedule
 *
 * schedule_id Integer ID of a schedule
 * returns List
 **/
exports.getFeedbacks = async function(schedule_id) {
  try {
    const [rows] = await db.execute(
      `SELECT f.*, u.name as user_name 
       FROM Feedback f 
       LEFT JOIN Users u ON f.user_id = u.id 
       WHERE f.schedule_id = ?`,
      [schedule_id]
    );
    return rows;
  } catch (error) {
    throw { code: 500, error: error.message };
  }
}