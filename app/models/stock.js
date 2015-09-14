var mongoose = require('mongoose');
module.exports = function() {
  var schema = mongoose.Schema({
    name: {
      type: String,
      required: true
    },
    inserted: {
      type: Date,
      default: Date.now
    }
  });

  return mongoose.model('Stock',schema);
}
