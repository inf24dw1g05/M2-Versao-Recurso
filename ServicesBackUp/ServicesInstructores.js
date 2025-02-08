'use strict';


const db = require('../db/config');

/**
 * Create a new Instructor
 *
 * body Instructor
 * no response value expected for this operation
 **/
exports.createInstructor = async function(body) {
  try {
    const [result] = await db.execute(
      'INSERT INTO Instructors (name, specialty, email, phone) VALUES (?, ?, ?, ?)',
      [body.name, body.specialty, body.email, body.phone]
    );
    return { id: result.insertId, ...body };
  } catch (error) {
    throw { code: 500, error: error.message };
  }
}

/**
 * Delete an instructor by ID
 *
 * id Integer The ID of the instructor to delete
 * no response value expected for this operation
 **/
exports.deleteInstructor = async function(id) {
  try {
    const [result] = await db.execute('DELETE FROM Instructors WHERE id = ?', [id]);
    if (result.affectedRows === 0) {
      throw { code: 404, error: 'Instructor not found' };
    }
    return { message: 'Instructor deleted successfully' };
  } catch (error) {
    throw error.code ? error : { code: 500, error: error.message };
  }
}

/**
 * Retrieve a list of instructors
 *
 * returns List
 **/
exports.getInstructors = async function() {
  try {
    const [rows] = await db.query('SELECT * FROM Instructors');
    return rows;
  } catch (error) {
    throw { code: 500, error: error.message };
  }
}

/**
 * Update an instructor by ID
 *
 * body Instructor
 * id Integer The ID of the instructor to update
 * returns Instructor
 **/
exports.updateInstructor = async function(body, id) {
  try {
    const [result] = await db.execute(
      'UPDATE Instructors SET name = ?, specialty = ?, email = ?, phone = ? WHERE id = ?',
      [body.name, body.specialty, body.email, body.phone, id]
    );
    if (result.affectedRows === 0) {
      throw { code: 404, error: 'Instructor not found' };
    }
    return { id: id, ...body };
  } catch (error) {
    throw error.code ? error : { code: 500, error: error.message };
  }
}