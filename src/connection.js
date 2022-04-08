import { setDirectory, consistencies, uuid } from "express-cassandra"
var ExpressCassandra = require('express-cassandra');


/*
setDirectory(__dirname + "/models").bind(
  {
    clientOptions: {
      contactPoints: ["127.0.0.1"],
      localDataCenter: "datacenter1",
      protocolOptions: { port: 9042 },
      keyspace: "rapLyrics",
      queryOptions: { consistency: consistencies.one },
      socketOptions: { readTimeout: 0 },
    },
    ormOptions: {
      defaultReplicationStrategy: {
        class: "SimpleStrategy",
        replication_factor: 1,
      },
      migration: "safe",
    },
  },
  function (err) {
    if (err) throw err
    else {
      console.log("Database successfully connected at port 9042")
    }
  }
)
*/
let models = ExpressCassandra.createClient({
  clientOptions: {
      contactPoints: ['127.0.0.1'],
      localDataCenter: 'datacenter1',
      protocolOptions: { port: 9042 },
      keyspace: 'k8ssandra',
      queryOptions: {consistency: ExpressCassandra.consistencies.one}
  },
  ormOptions: {
      defaultReplicationStrategy : {
          class: 'SimpleStrategy',
          replication_factor: 1
      },
      migration: 'safe',
  }
});

var MyModel = models.loadSchema('cassDb1', {
  fields:{
    video_link :     "text",
    lyrics     :     "text",
    label      :     "text",
    //date_of_release :"text",
    singer	   :     "text",
    miscell_inf :	 "text",
    lyricist_name :	 "text", // creator of rap
    rap_id :         "uuid", // 
  },
  key:[["rap_id"],"lyricist_name"]
});

MyModel.syncDB(function(err, result) {
  if (err) throw err;
 // creates migrations and syncs it with the DB
});
var instance = new models.instance.cassDb1({
  video_link :     "video1",
        lyrics     :     "no_ly",
        label      :     "testlabel",
        //date_of_release :"mausi",
        singer	   :     "ayush",
        miscell_inf :	   "not",
        lyricist_name :	 "hema", // creator of rap
        rap_id :         uuid(), // 
});
instance.save(function(err){
  if(err) {
      console.log(err);
      return;
  }
  console.log('Yuppiie!');
});
