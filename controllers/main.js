const getTableData = (req, res, db) => {
  db.select('*').from('posts')
    .then(items => {
      if(items.length){
        res.json(items)
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
  deleteTableData
}