const model = require('../models/todosModel');

async function createTodo(userID, title, completed) {
    try {
        return model.createTodo(userID, title, completed);
    } catch (err) {
        throw err;
    }

}
async function getAllTodos() {
    try {
        return model.getAllTodos()
    } catch (err) {
        throw err;
    }
}

async function getTodo(ID) {
    try {
        return model.getTodo(ID)
    } catch (err) {
        throw err;
    }
}

async function getTodoByUser(ID) {
    try {
        return model.getTodoByUser(ID)
    } catch (err) {
        throw err;
    }
}
async function deleteTodo(ID) {
    try {
        const result = await model.deleteTodo(ID);
        if (result === false) {
            return false;
        }
        return result;
    } catch (err) {
        throw err;
    }
}

async function updateTodo(todoID, userID, title, completed) {
    try {
        return model.updateTodo(todoID, userID, title, completed)
    } catch (err) {
        throw err;
    }
}

module.exports = { createTodo, getAllTodos, getTodo, deleteTodo, updateTodo, getTodoByUser }