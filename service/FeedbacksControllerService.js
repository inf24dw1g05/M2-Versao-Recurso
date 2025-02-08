'use strict';

const db = require('../db/config');

/**
 * Create feedback for a schedule
 **/
exports.createFeedback = function(body) {
  return new Promise(async function(resolve, reject) {
    try {
      if (!body || !body.schedule_id || !body.user_id || !body.rating) {
        reject({ code: 400, message: 'Dados inválidos' });
        return;
      }

      const [result] = await db.execute(
        'INSERT INTO Feedback (schedule_id, user_id, rating, comment) VALUES (?, ?, ?, ?)',
        [body.schedule_id, body.user_id, body.rating, body.comment]
      );

      resolve({
        id: result.insertId,
        schedule_id: body.schedule_id,
        user_id: body.user_id,
        rating: body.rating,
        comment: body.comment,
        created_at: new Date().toISOString()
      });
    } catch (error) {
      reject({ code: 500, message: 'Erro ao criar feedback: ' + error.message });
    }
  });
}

/**
 * Get feedbacks for a schedule
 **/
exports.getFeedbacks = function(schedule_id) {
  return new Promise(async function(resolve, reject) {
    try {
      const [rows] = await db.query(
        'SELECT * FROM Feedback WHERE schedule_id = ?',
        [schedule_id]
      );
      resolve(rows);
    } catch (error) {
      reject({ code: 500, message: 'Erro ao obter feedbacks: ' + error.message });
    }
  });
}

/**
 * Update a feedback
 **/
exports.feedbacksIdPUT = function(body, id) {
  return new Promise(async function(resolve, reject) {
    try {
      if (!body || !body.rating) {
        reject({ code: 400, message: 'Dados inválidos' });
        return;
      }

      const [result] = await db.execute(
        'UPDATE Feedback SET rating = ?, comment = ? WHERE id = ?',
        [body.rating, body.comment, id]
      );

      if (result.affectedRows === 0) {
        reject({ code: 404, message: 'Feedback não encontrado' });
        return;
      }

      resolve({
        id: id,
        rating: body.rating,
        comment: body.comment,
        updated_at: new Date().toISOString()
      });
    } catch (error) {
      reject({ code: 500, message: 'Erro ao atualizar feedback: ' + error.message });
    }
  });
}

/**
 * Delete a feedback
 **/
exports.feedbacksIdDELETE = function(id) {
  return new Promise(async function(resolve, reject) {
    try {
      const [result] = await db.execute('DELETE FROM Feedback WHERE id = ?', [id]);
      if (result.affectedRows === 0) {
        reject({ code: 404, message: 'Feedback não encontrado' });
        return;
      }
      resolve({ message: `Feedback com ID ${id} eliminado com sucesso` });
    } catch (error) {
      reject({ code: 500, message: 'Erro ao eliminar feedback: ' + error.message });
    }
  });
}

// ... código existente ...

/**
 * Get all feedbacks by user
 **/
exports.getFeedbacksByUser = function(userId) {
  return new Promise(async function(resolve, reject) {
    try {
      const [user] = await db.execute(
        'SELECT id FROM Users WHERE id = ?',
        [userId]
      );

      if (user.length === 0) {
        reject({ code: 404, message: 'Utilizador não encontrado' });
        return;
      }

      const [feedbacks] = await db.execute(`
        SELECT f.*, s.class_name, s.date_time, i.name as instructor_name
        FROM Feedback f
        JOIN Schedules s ON f.schedule_id = s.id
        LEFT JOIN Instructors i ON s.instructor_id = i.id
        WHERE f.user_id = ?
        ORDER BY f.created_at DESC
      `, [userId]);

      resolve(feedbacks);
    } catch (error) {
      reject({ code: 500, message: 'Erro ao obter feedbacks do utilizador: ' + error.message });
    }
  });
}