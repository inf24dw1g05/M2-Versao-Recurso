'use strict';

const db = require('../db/config');

/**
 * Create a new Instructor
 **/
exports.createInstructor = function(body) {
  return new Promise(async function(resolve, reject) {
    try {
      if (!body || !body.name || !body.specialty) {
        reject({ code: 400, message: 'Dados inválidos' });
        return;
      }

      const [result] = await db.execute(
        'INSERT INTO Instructors (name, specialty, email, phone) VALUES (?, ?, ?, ?)',
        [body.name, body.specialty, body.email, body.phone]
      );

      resolve({
        id: result.insertId,
        name: body.name,
        specialty: body.specialty,
        email: body.email,
        phone: body.phone
      });
    } catch (error) {
      reject({ code: 500, message: 'Erro ao criar instrutor: ' + error.message });
    }
  });
}

/**
 * Get instructor by ID
 **/
exports.getInstructor = function(id) {
  return new Promise(async function(resolve, reject) {
    try {
      const [rows] = await db.execute('SELECT * FROM Instructors WHERE id = ?', [id]);
      
      if (rows.length === 0) {
        reject({ code: 404, message: 'Instrutor não encontrado' });
        return;
      }

      resolve(rows[0]);
    } catch (error) {
      reject({ code: 500, message: 'Erro ao obter instrutor: ' + error.message });
    }
  });
}

/**
 * Get all instructors
 **/
exports.getInstructors = function() {
  return new Promise(async function(resolve, reject) {
    try {
      const [rows] = await db.query('SELECT * FROM Instructors');
      resolve(rows);
    } catch (error) {
      reject({ code: 500, message: 'Erro ao obter instrutores: ' + error.message });
    }
  });
}

/**
 * Update instructor
 **/
exports.updateInstructor = function(body, id) {
  return new Promise(async function(resolve, reject) {
    try {
      if (!body || !body.name || !body.specialty) {
        reject({ code: 400, message: 'Dados inválidos' });
        return;
      }

      const [result] = await db.execute(
        'UPDATE Instructors SET name = ?, specialty = ?, email = ?, phone = ? WHERE id = ?',
        [body.name, body.specialty, body.email, body.phone, id]
      );

      if (result.affectedRows === 0) {
        reject({ code: 404, message: 'Instrutor não encontrado' });
        return;
      }

      resolve({
        id: id,
        name: body.name,
        specialty: body.specialty,
        email: body.email,
        phone: body.phone
      });
    } catch (error) {
      reject({ code: 500, message: 'Erro ao atualizar instrutor: ' + error.message });
    }
  });
}

/**
 * Delete instructor
 **/
exports.deleteInstructor = function(id) {
  return new Promise(async function(resolve, reject) {
    try {
      const [result] = await db.execute('DELETE FROM Instructors WHERE id = ?', [id]);
      if (result.affectedRows === 0) {
        reject({ code: 404, message: 'Instrutor não encontrado' });
        return;
      }
      resolve({ message: `Instrutor com ID ${id} eliminado com sucesso` });
    } catch (error) {
      reject({ code: 500, message: 'Erro ao eliminar instrutor: ' + error.message });
    }
  });
}