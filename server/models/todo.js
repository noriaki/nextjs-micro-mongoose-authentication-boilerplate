const mongoose = require('mongoose');

const { Schema } = mongoose;

const todoSchema = new Schema({
  title: { type: String, required: true },
});

const TodoModel = mongoose.model('Todo', todoSchema);

module.exports = TodoModel;
