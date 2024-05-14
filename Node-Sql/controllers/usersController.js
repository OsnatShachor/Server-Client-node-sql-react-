const model = require('../models/usersModel');
const bcrypt = require('bcrypt');

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
        const user = await model.getUserByNamePassword(userName);
        if (user) {
            if (bcrypt.compareSync(password, user.password)) {
                return user;
            }
        }
        else {
            console.log("Error");
            throw new Error('User does not exist, please sign up');
        }
    } catch (err) {
        throw err;
    }
}


async function createUser(userName, password) {
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        return model.createUser(userName, hashedPassword);
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