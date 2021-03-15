
const xmlMethods = require('./functions/ReadXMLFiles.js');
const esMethods = require('./functions/elasticSearchFunctions.js');
const queryResult = require('./functions/calculateRankingResult.js');

/*
* This function is meant to parseXML files and use the dictionary it builds to be uploaded to elasticsearch
*/
async function start(){

  // build an index named 'cfc' in elastic search
  esMethods.createIndex("cfc");
  console.log('created Index');

  // read all cfc collections
  try{
    await xmlMethods.readAllXML();
  } catch(error){
    console.log(error);
  }
  console.log("all xml doc has been processed");

  // update elastic search
  console.log("updating index");
  try{
    await await updateIndex();
  } catch(error){
    console.log(error);
  }
  console.log('updated Index');

  // check how many docs were inserted to elastic search
  esMethods.countIndex("cfc","record");
  console.log('done putting in elastic search');

  // run test with query samples
  queryResult.test();
  //queryResult.test02();
}

async function updateIndex(){
  const allDocs = xmlMethods.allDocs;
  let count = 0;
  let max = Object.keys(allDocs).length;
  console.log("there are",max,"terms in the collections");
  for(let i in allDocs){
    let doc = allDocs[i];
    let record_id = doc.id;
    let text = doc.text;
    try{
      await esMethods.createId("cfc", record_id, "record", text);
      console.log(count++,' terms have updated');
    } catch(error){
      console.log(error);
    }

  }
}

module.exports = start;
