var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var user_db_schema = new Schema({
    name:{type:String,require:true,index:true},
    email:{type:String,require:true,unique:true,index:true},
    password:{type:String,require:true,unique:true,trim: true,minlength: 5}
},{
    timestamps: true,
    collection: 'sign-up'
});

var UserName = mongoose.model('',user_db_schema);

module.exports = UserName;