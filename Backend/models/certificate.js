const mongoose = require('mongoose');
const certificateSchema = mongoose.Schema({
   candidateName: { type: String, required: true },
   courseName:{type :  String,required: true},
   creditHours: {type : String , required : true},
   endDate: {type : String , required : true},
   notes: {type : String ,required : true}
})
module.exports= mongoose.model('Certificate', certificateSchema);
