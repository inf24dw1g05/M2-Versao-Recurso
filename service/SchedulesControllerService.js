'use strict';

const db = require('../db/config');

/**
 * Create Schedule
 **/
exports.createSchedule = async function(body) {
  try {
    // Verifica se todos os campos obrigatórios estão presentes e válidos
    if (!body.class_name || !body.date || !body.date_time) {
      throw { 
        code: 400, 
        error: 'Campos obrigatórios: class_name, date, date_time' 
      };
    }

    // Formata as datas corretamente
    const formattedDate = new Date(body.date).toISOString().split('T')[0];
    const formattedDateTime = new Date(body.date_time).toISOString().slice(0, 19).replace('T', ' ');

    // Prepara os valores para inserção, garantindo que nenhum seja undefined
    const values = [
      body.class_name,
      formattedDate,
      formattedDateTime,
      body.reserved_by || null,  // Se não for fornecido, será null
      body.instructor_id || null // Se não for fornecido, será null
    ];

    const [result] = await db.execute(
      'INSERT INTO Schedules (class_name, date, date_time, reserved_by, instructor_id) VALUES (?, ?, ?, ?, ?)',
      values
    );

    return {
      id: result.insertId,
      class_name: body.class_name,
      date: formattedDate,
      date_time: formattedDateTime,
      reserved_by: body.reserved_by || null,
      instructor_id: body.instructor_id || null
    };
  } catch (error) {
    console.error('Erro ao criar agendamento:', error);
    if (error.code === 'ER_NO_REFERENCED_ROW_2') {
      throw { 
        code: 400, 
        error: 'Usuário ou instrutor referenciado não existe' 
      };
    }
    throw error.code ? error : { code: 500, error: error.message };
  }
};

/**
 * Get all schedules
 **/
exports.retrieveSchedules = function() {
  return new Promise(async function(resolve, reject) {
    try {
      const [rows] = await db.query(`
        SELECT s.*, i.name as instructor_name, i.specialty as instructor_specialty
        FROM Schedules s
        LEFT JOIN Instructors i ON s.instructor_id = i.id
      `);
      resolve(rows);
    } catch (error) {
      reject({ code: 500, message: 'Erro ao obter agendamentos: ' + error.message });
    }
  });
}

/**
 * Get schedule by ID
 **/
exports.retrieveSchedule = function(id) {
  return new Promise(async function(resolve, reject) {
    try {
      const [rows] = await db.execute(`
        SELECT s.*, i.name as instructor_name, i.specialty as instructor_specialty
        FROM Schedules s
        LEFT JOIN Instructors i ON s.instructor_id = i.id
        WHERE s.id = ?
      `, [id]);

      if (rows.length === 0) {
        reject({ code: 404, message: 'Agendamento não encontrado' });
        return;
      }
      resolve(rows[0]);
    } catch (error) {
      reject({ code: 500, message: 'Erro ao obter agendamento: ' + error.message });
    }
  });
}

/**
 * Update schedule
 **/
exports.updateSchedule = function(body, id) {
  return new Promise(async function(resolve, reject) {
    try {
      if (!body || !body.class_name || !body.date || !body.date_time) {
        reject({ code: 400, message: 'Dados inválidos' });
        return;
      }

      const [result] = await db.execute(
        'UPDATE Schedules SET class_name = ?, date = ?, date_time = ?, reserved_by = ?, instructor_id = ? WHERE id = ?',
        [body.class_name, body.date, body.date_time, body.reserved_by, body.instructor_id, id]
      );

      if (result.affectedRows === 0) {
        reject({ code: 404, message: 'Agendamento não encontrado' });
        return;
      }

      resolve({
        id: id,
        class_name: body.class_name,
        date: body.date,
        date_time: body.date_time,
        reserved_by: body.reserved_by,
        instructor_id: body.instructor_id
      });
    } catch (error) {
      reject({ code: 500, message: 'Erro ao atualizar agendamento: ' + error.message });
    }
  });
}

/**
 * Delete schedule
 **/
exports.deleteSchedule = function(id) {
  return new Promise(async function(resolve, reject) {
    try {
      const [result] = await db.execute('DELETE FROM Schedules WHERE id = ?', [id]);
      if (result.affectedRows === 0) {
        reject({ code: 404, message: 'Agendamento não encontrado' });
        return;
      }
      resolve({ message: `Agendamento com ID ${id} eliminado com sucesso` });
    } catch (error) {
      reject({ code: 500, message: 'Erro ao eliminar agendamento: ' + error.message });
    }
  });
}

/**
 * Get schedules by instructor
 **/
exports.getSchedulesByInstructor = function(instructorId) {
  return new Promise(async function(resolve, reject) {
    try {
      // Primeiro verifica se o instrutor existe
      const [instructor] = await db.execute(
        'SELECT id FROM Instructors WHERE id = ?',
        [instructorId]
      );

      if (instructor.length === 0) {
        reject({ code: 404, message: 'Instrutor não encontrado' });
        return;
      }

      // ProcurA os agendamentos do instrutor
      const [schedules] = await db.execute(`
        SELECT s.*, i.name as instructor_name, i.specialty as instructor_specialty
        FROM Schedules s
        LEFT JOIN Instructors i ON s.instructor_id = i.id
        WHERE s.instructor_id = ?
        ORDER BY s.date_time
      `, [instructorId]);

      resolve(schedules);
    } catch (error) {
      reject({ code: 500, message: 'Erro ao obter agendamentos do instrutor: ' + error.message });
    }
  });
}

/**
 * Get schedules by user
 **/
exports.getSchedulesByUser = function(userId) {
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

      const [schedules] = await db.execute(`
        SELECT s.*, i.name as instructor_name, i.specialty as instructor_specialty
        FROM Schedules s
        LEFT JOIN Instructors i ON s.instructor_id = i.id
        WHERE s.reserved_by = ?
        ORDER BY s.date_time
      `, [userId]);

      resolve(schedules);
    } catch (error) {
      reject({ code: 500, message: 'Erro ao obter agendamentos do utilizador: ' + error.message });
    }
  });
}