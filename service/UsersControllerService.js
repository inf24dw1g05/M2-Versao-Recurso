'use strict';

const db = require('../db/config');

/**
 * Get all users
 * Retrieve a list of all users in the system.
 *
 * returns List
 **/
exports.usersGET = async function() {
  try {
    const [rows] = await db.query('SELECT id, name, email, password, role FROM Users');
    return rows;
  } catch (error) {
    console.error('Erro ao buscar usuários:', error);
    throw { code: 500, error: error.message };
  }
}

/**
 * Create a new User
 **/
exports.createUser = async function(body) {
  try {
    const [result] = await db.execute(
      'INSERT INTO Users (name, email, password, role) VALUES (?, ?, ?, ?)',
      [body.name, body.email, body.password, body.role || 'member']
    );
    return {
      id: result.insertId,
      name: body.name,
      email: body.email,
      password: body.password,
      role: body.role || 'member'
    };
  } catch (error) {
    console.error('Erro ao criar usuário:', error);
    throw { code: 500, error: error.message };
  }
}

/**
 * Get a user by ID
 **/
exports.usersIdGET = async function(id) {
  try {
    const [rows] = await db.execute(
      'SELECT id, name, email, password, role FROM Users WHERE id = ?',
      [id]
    );
    if (rows.length === 0) {
      throw { code: 404, error: 'Usuário não encontrado' };
    }
    return rows[0];
  } catch (error) {
    console.error('Erro ao buscar usuário:', error);
    throw error.code ? error : { code: 500, error: error.message };
  }
}

/**
 * Update an existing user
 **/
exports.usersIdPUT = async function(body, id) {
  try {
    const [result] = await db.execute(
      'UPDATE Users SET name = ?, email = ?, password = ?, role = ? WHERE id = ?',
      [body.name, body.email, body.password, body.role, id]
    );
    if (result.affectedRows === 0) {
      throw { code: 404, error: 'Usuário não encontrado' };
    }
    return {
      id: id,
      name: body.name,
      email: body.email,
      password: body.password,
      role: body.role
    };
  } catch (error) {
    console.error('Erro ao atualizar usuário:', error);
    throw error.code ? error : { code: 500, error: error.message };
  }
}

/**
 * Delete a user by ID
 **/
exports.usersIdDELETE = async function(id) {
  try {
    const [result] = await db.execute('DELETE FROM Users WHERE id = ?', [id]);
    if (result.affectedRows === 0) {
      throw { code: 404, error: 'Usuário não encontrado' };
    }
    return {
      message: `User with ID ${id} deleted successfully`
    };
  } catch (error) {
    console.error('Erro ao deletar usuário:', error);
    throw error.code ? error : { code: 500, error: error.message };
  }
}