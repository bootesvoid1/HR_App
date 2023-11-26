const mongoose = require('mongoose');
const certificateSchema = mongoose.Schema({
   candidateName: String,
   courseName: String,
   creditHours: String,
   endDate: Date,
   notes: String
})
module.exports= mongoose.model('Certificate', certificateSchema);
