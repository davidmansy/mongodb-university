var MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://127.0.0.1:27017/weather', function(err, db) {
  if(err) throw err;

  var state;
  var query = {};
  var sort = [['State', 1], ['Temperature', -1]];
  var cursor = db.collection('data').find(query).sort(sort);

  cursor.each(function(err, doc) {
    if(err) throw err;
    if(doc === null) {
      return db.close();
    }
    if(state === undefined || state !== doc.State) {
      state = doc.State;
      query['_id'] = doc['_id'];
      db.collection('data').update(query, {$set: {month_high: true}}, function(err, doc) {
        if(err) throw err;
      });
    }
  });

  console.dir('Called find!');
});