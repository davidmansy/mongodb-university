var MongoClient = require('mongodb').MongoClient;

var compare = function(a, b) {
  if (a.type < b.type) {
    return -1;
  } else if(a.type > b.type) {
    return 1;
  } else {
    return a.score - b.score;
  }
};

MongoClient.connect('mongodb://localhost:27017/school', function(err, db) {
  db.collection('students').find({}).toArray(function(err, students) {
    if(err) throw err;
    for (var i = 0; i < students.length; i++) {
      var student = students[i];
      student.scores.sort(compare).splice(1, 1);
      var query = {};
      query._id = student._id;
      db.collection('students').update(query, {$set: {scores: student.scores}}, function(err, updated) {
        if(err) throw err;
      });
    }
  });

});