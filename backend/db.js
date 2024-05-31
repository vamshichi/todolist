const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://chvamshi03:X3ucpbKk81EAeycG@cluster0.rapd2fg.mongodb.net/todo');

const todoSchema = mongoose.Schema({
    title: String,
    description: String, 
    completed: Boolean,
});

const todo = mongoose.model('Todo', todoSchema); // It's better to use singular and capitalized model names

module.exports = {
    todo,
};
