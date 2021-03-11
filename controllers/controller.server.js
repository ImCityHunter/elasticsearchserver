/*
* Create controllers to send message for localhost:4200
*/
module.exports = function(app){

  // default, ping test
  app.get('/', function (req, res) {
      let obj = {test:'hello word'};
      res.send(obj);
  })

  // search info
  app.get('/:index/:query/:k/search', async function (req, res) {
  	const index = req.params.index;
  	const query = req.params.query;
  	const k = req.params.k;
  	const result = await esMethods.search(index,query,k);
  	res.send(JSON.stringify(result));
  })

  // delete all indexes
  app.delete('/removeAll', function(req,res){
    esMethods.deleteIndex("cfc");
    let obj = {test:'all deleted'};
    res.send(obj);
  })
}
