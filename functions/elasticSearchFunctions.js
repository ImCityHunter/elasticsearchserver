const client = require('../connection.js');
const xmlMethods = require('./ReadXMLFiles.js');
const tokenizing = require('./tokenization.js');
function createIndex(index){
  client.indices.create({
    index: index,
  },function(err,resp,status) {
    if(err) {
      //console.log('err',err);
    }
    else {
      console.log("create",resp);
    }
  });
}

function deleteIndex(index){
  client.indices.delete({index: index},function(err,resp,status) {
    console.log("delete",resp);
  });
}

function countIndex(index, type){
  client.count({index: index, type:type},function(err,resp,status) {
    console.log("there are these many records: ",resp);
  });
}


async function search(index, query, k){

  let tokenizedQuery = "";

  try{
    tokenizedQuery = await tokenizing(query);
  } catch(error){
    console.log(error);
  }

  let arr = [];
  let response = {};

  try{
    response = await client.search({
            index: index,
            size : k,
            type : "record",
            body: {
              query: {
                match: {
                  text:tokenizedQuery,
                },
              },
            }});
    response.hits.hits.forEach(function(hit){
      arr.push(hit._id);
    })
  } catch(error){
    console.log("-----there is no match for this query----");
    console.log(tokenizedQuery);
    console.log("------------------------------------------");
  }


  return arr;
}

function createId(index, record_id, type, text){
    client.index({
        index: index,
        type: type,
        id: parseInt(record_id),
        body: {
          "text": text,
        }
      },function(err,resp,status) {
        //console.log('err',err);
    });
}
module.exports = {
  createIndex, createId, deleteIndex, countIndex, search
}
