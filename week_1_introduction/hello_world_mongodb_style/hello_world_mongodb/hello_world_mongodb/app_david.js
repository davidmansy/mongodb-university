var MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://127.0.0.1:27017/test', function(err, db) {
  if(err) throw err;

  db.collection('coll').findOne({}, function(err, doc) {
    if(err) throw err;
    console.dir(doc);
    db.close();
  });
  console.dir('Called findOne!');
});