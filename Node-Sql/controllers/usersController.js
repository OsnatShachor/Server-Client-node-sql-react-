const model = require('../models/usersModel');

async function getAllUsers() {
    try {
        return model.getAllUsers()
    } catch (err) {
        throw err;
    }
}

async function getUserByUserName(userName) {
    try {
        return model.getUserByUserName(userName)
    } catch (err) {
        throw err;
    }
}

async function getUserByNamePassword(userName, password) {
    try {
        return model.getUserByNamePassword(userName, password)
    } catch (err) {
        throw err;
    }
}

async function createUser(userName, password) {
    try {
        return model.createUser(userName, password);
    } catch (err) {
        throw err;
    }
}

async function updateUser(userName, name, email, phone, company, street, city, zipcode) {
    try {
        return model.updateUser(userName, name, email, phone, company, street, city, zipcode)
    } catch (err) {
        throw err;
    }
}

module.exports = { createUser, getAllUsers, getUserByUserName, updateUser, getUserByNamePassword }