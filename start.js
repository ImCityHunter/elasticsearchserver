
const xmlMethods = require('./functions/ReadXMLFiles.js');
const esMethods = require('./functions/elasticSearchFunctions.js');
const queryResult = require('./functions/calculateRankingResult.js');

/*
* This function is meant to parseXML files and use the dictionary it builds to be uploaded to elasticsearch
*/
async function start(){

  // build an index named 'cfc' in elastic search
  esMethods.createIndex("cfc");

  // read all cfc collections
  await xmlMethods.readAllXML();

  // update elastic search
  await updateIndex();

  // check how many docs were inserted to elastic search
  esMethods.countIndex("cfc","record");

  // run test with query samples
  // queryResult.test();
  queryResult.test02();
}

function updateIndex(){
  const allDocs = xmlMethods.allDocs;
  for(let i in allDocs){
    let doc = allDocs[i];
    let record_id = doc.id;
    let text = doc.text;
    esMethods.createId("cfc", record_id, "record", text);
  }
}

module.exports = start;
