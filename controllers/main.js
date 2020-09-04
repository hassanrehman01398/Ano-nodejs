const getTableData = (req, res, db) => {
  db.select('*').from('posts')
    .then(items => {
      if(items.length){
        res.json(items)
      } else {
        res.json({dataExists: 'false'})
      }
    })
    .catch(err =>console.log(err), res.status(400).json({dbError: 'Database Connection Error'}))
}
const getmaxview = async function(req, res, db)  {
  // var con = mysql.createConnection({
  //   host : 'anonymous.postgres.database.azure.com',
  //   user : 'hassanrehman01398@anonymous',
  //   password : 'hassan01398=',
  //   database : 'ano_posting',
  //   port: 5432,
  //   ssl: true
  // });
  const { Client } = require('pg');

  const pool = new Client({
    connectionString: "postgres://qzlxmsfcehahpz:2f538ded7e8115802d0570dcb4a0bdee06d3e6cfbf82f3d37e8ef3703f186471@ec2-52-23-86-208.compute-1.amazonaws.com:5432/ddu36ura7kra61",
    ssl: true,
  });
  
  pool.connect();
  console.log("Successful connection to the database");
  pool.query('select * from posts where views=(SELECT MAX(views) FROM posts)', (err, rows) => {
  //  res.json(rows["rows"])
  try{
    if(rows["rows"].length>0){
      res.json(rows["rows"])

    }
    else{
      res.json({dataExists: 'false'})
    }
  }
  catch(e){}
    //const count = rows[0].count;
    // const count = rows[0]['COUNT(*)']; // without alias
  //  console.log(`count: ${count}`);
});

  // db.select('*').from('posts').where('views').select('max(views)').from('posts')
  //   .then(items => {
  //     if(items.length){
  //       res.json(items)
  //     } else {
  //       res.json({dataExists: 'false'})
  //     }
  //   })
  //   .catch(err => res.status(400).json({dbError: 'Database Connection Error'}))
}
const getnewest= (req, res, db) => {
  const { Client } = require('pg');

  const pool = new Client({
    connectionString: "postgres://qzlxmsfcehahpz:2f538ded7e8115802d0570dcb4a0bdee06d3e6cfbf82f3d37e8ef3703f186471@ec2-52-23-86-208.compute-1.amazonaws.com:5432/ddu36ura7kra61",
    ssl: true,
  });
  
  pool.connect();
  console.log("Successful connection to the database");
  pool.query('select * from posts  ORDER BY CAST (posttime AS timestamp) Desc', (err, rows) => {
  //  res.json(rows["rows"])
   try{
  if(rows["rows"].length>0){
      res.json(rows["rows"])

    }
    else{
      res.json({dataExists: 'false'})
    }
    //const count = rows[0].count;
    // const count = rows[0]['COUNT(*)']; // without alias
  //  console.log(`count: ${count}`);
}
catch(e){}
  });
  // db.select('*').from('posts')
  //   .then(items => {
  //     if(items.length){
  //       res.json(items)
  //     } else {
  //       res.json({dataExists: 'false'})
  //     }
  //   })
  //   .catch(err => res.status(400).json({dbError: 'Database Connection Error'}))
}
const getminview = (req, res, db) => {
  const { Client } = require('pg');

  const pool = new Client({
    connectionString: "postgres://qzlxmsfcehahpz:2f538ded7e8115802d0570dcb4a0bdee06d3e6cfbf82f3d37e8ef3703f186471@ec2-52-23-86-208.compute-1.amazonaws.com:5432/ddu36ura7kra61",
    ssl: true,
  });
  pool.connect();
  console.log("Successful connection to the database");
  pool.query('select * from posts where views=(SELECT min(views) FROM posts)', (err, rows) => {
  //  res.json(rows["rows"])
   try{
  if(rows["rows"].length>0){
      res.json(rows["rows"])

    }
    else{
      res.json({dataExists: 'false'})
    }}
    catch(e){}
    //const count = rows[0].count;
    // const count = rows[0]['COUNT(*)']; // without alias
  //  console.log(`count: ${count}`);
});
  // db.select('*').from('posts')
  //   .then(items => {
  //     if(items.length){
  //       res.json(items)
  //     } else {
  //       res.json({dataExists: 'false'})
  //     }
  //   })
  //   .catch(err => res.status(400).json({dbError: 'Database Connection Error'}))
}
const getspecificpostData = (req, res, db) => {
  const { Client } = require('pg');

  const pool = new Client({
    connectionString: "postgres://qzlxmsfcehahpz:2f538ded7e8115802d0570dcb4a0bdee06d3e6cfbf82f3d37e8ef3703f186471@ec2-52-23-86-208.compute-1.amazonaws.com:5432/ddu36ura7kra61",
    ssl: true,
  });
  
  pool.connect();
  console.log("Successful connection to the database");
  pool.query("select * from posts where post_id='"+post_id+"'", (err, rows) => {
   console.log(rows);
    //console.log(rows["rows"]);
   // res.json(rows["rows"])
   console.log(rows);
   try{
  if(rows["rows"]){
    if(rows["rows"].length>0){
      res.json(rows["rows"])

    }
    else{
      res.json({dataExists: 'false'})
    }}
  }
  catch(e){}
})

}
const getspecificreplyData = (req, res, db) => {
  let reply_to = req.query.reply_to;
  const { Client } = require('pg');

  const pool = new Client({
    connectionString: "postgres://qzlxmsfcehahpz:2f538ded7e8115802d0570dcb4a0bdee06d3e6cfbf82f3d37e8ef3703f186471@ec2-52-23-86-208.compute-1.amazonaws.com:5432/ddu36ura7kra61",
    ssl: true,
  });
  
  pool.connect();
  console.log("Successful connection to the database");
  pool.query("select * from replys where reply_to='"+reply_to+"'", (err, rows) => {
  //  res.json(rows["rows"])
  console.log(rows);
try{
  if(rows["rows"]){
    if(rows["rows"].length>0){
      res.json(rows["rows"])

    }
    else{
      res.json({dataExists: 'false'})
    }
  }}
  catch(e){}
}
  
  )

}
const getcountpostData = (req, res, db) => {
  // var sql = "SELECT * FROM posts";
 
  // var query = db.query(sql, function(err, result) {
  //     console.log("Total Records:- " + result.length);
  // });
  
  db.select('*').from('posts')
    .then(items => {
      if(items.length){
        res.json(items.length)
      } else {
        res.json({dataExists: 'false'})
      }
    })
    .catch(err => res.status(400).json({dbError: 'Database Connection Error'}))
}
const postTableData = async (req, res, db) => {
  const { post_description,likes,views ,posttitle,posttime} = req.body
  const added = new Date()
  await db('posts').insert({ post_description,likes,views,posttitle,posttime})
    .returning('*')
    .then(item => {
      res.json(item)
    })
    .catch(err=>{

      console.log('Error:', err.message);
      res.status(500).json({
        message: "Error(Internal)",
        success: false,
        error: err.message
     })
    })
  }

  const postreplyData = async (req, res, db) => {
    const { reply_to,reply_description,likes,views ,replytime} = req.body
    const added = new Date()
    await db('replys').insert({  reply_to,reply_description,likes,views ,replytime})
      .returning('*')
      .then(item => {
        res.json(item)
      })
      .catch(err=>{
  
        console.log('Error:', err.message);
        res.status(500).json({
          message: "Error(Internal)",
          success: false,
          error: err.message
       })
      })
    }
  
const putTableData = (req, res, db) => {
  const { post_id, post_description,likes,views ,posttitle,posttime} = req.body
  db('posts').where({post_id}).update({post_description,likes,views ,posttitle,posttime})
    .returning('*')
    .then(item => {
      res.json(item)
    })
    .catch(err => res.status(400).json({dbError: 'Database Connection Error'}))
}

const deleteTableData = (req, res, db) => {
  const { post_id } = req.body
  db('posts').where({post_id}).del()
    .then(() => {
      res.json({delete: 'true'})
    })
    .catch(err => res.status(400).json({dbError: 'Database Connection Error'}))
}

module.exports = {
  getTableData,
  postTableData,
  putTableData,
  deleteTableData,
  getspecificpostData,
  getcountpostData,
  getspecificreplyData,
  postreplyData,
  
  getmaxview,
  getminview,
  getnewest
}