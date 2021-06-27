const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Author = new Schema({
    //id: { type: GraphQLID }, in mongodb we dont need id right ? generated auto 
    name: String,
    age : Number
})
module.exports = mongoose.model('Author', Author);
