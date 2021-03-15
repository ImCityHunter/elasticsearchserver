const readQueryXML  = require('./ReadQueryXML');
const esMethods = require('./elasticSearchFunctions');

async function getTopK(text, k){
  //console.log(text);
  let tmp = [];

  try{
    tmp =  await esMethods.search("cfc",text,k)
  }catch(error){
    console.log(error);
  }
  return tmp.slice(0,parseInt(k));
}


async function calculatePrecision(expected, text, k){
  let actual = await getTopK(text,k);
  let relevant = 0;
  for(let i  = 0; i < k ;i++){
    let conv = parseInt(actual[i]);
    if(expected.includes(conv)){
        relevant++;
    }
  }
  let precision = relevant/k;
  return precision;
}

async function test02(){

}


//https://stackoverflow.com/questions/55748792/understanding-precisionk-apk-mapk
async function getMAP10(){
  const allQueries = await readQueryXML.readQueryXML();
  const length = Object.keys(allQueries).length;
  let MAPK = 0;
  const apk = {};
  for(let k = 1; k<=10; k++){
    for(let index in allQueries){
      if(apk[index]==undefined){
        apk[index] = new Object();
        apk[index].sum = 0;
      }
      let expected = allQueries[index].expected;
      let id = allQueries[index].id;
      let text = allQueries[index].text;
      let precision = await calculatePrecision(expected, text, k);
      apk[index][k] = precision;
      apk[index].sum += precision; // sum up all current precision
    }
  }

  for(let index in apk){
    apk[index].sum = apk[index].sum / 10.0;
    MAPK += apk[index].sum;
  }

  MAPK = MAPK / length;

  console.log(MAPK);
}

//https://queirozf.com/entries/evaluation-metrics-for-ranking-problems-introduction-and-examples#average-precision-k
async function test(){
  let allQueries = {};
  try {
    allQueries = await readQueryXML.readQueryXML();
    console.log('size of arr is:',Object.keys(allQueries).length);
  } catch (error) {
    console.log('error appears in getting all queries');
    console.log(error);
  }
  const length = (Object.keys(allQueries)==undefined) ? 0:Object.keys(allQueries).length;
  const apk = {};

  let MAPK = 0.0;
  for(let index in allQueries){
    if(apk[index]==undefined){
      apk[index] = new Object();
      apk[index].sum = 0;
    }
    let expected = allQueries[index].expected;
    let text = allQueries[index].text;
    let apScore = await getAPK(expected, text, 10);

    MAPK = MAPK + apScore;
    //console.log(MAPK);
  }

  let avg = MAPK / length;
  console.log(MAPK);

}


async function getAPK(expected, text,k){

  let actual = await getTopK(text,k);
  let relevant = 0;
  let runningSum = 0;
  for(let i = 1; i<=k;i++){
    let convert = parseInt(actual[i-1]);
    if(expected.includes(convert)){
      relevant++;
      runningSum = runningSum + relevant/i;
    }
  }

  let apk = runningSum/(relevant*1.0);
  // console.log('relevant',relevant);
  // console.log('running sum',runningSum);
  // console.log('apk', runningSum/(relevant*1.0));

  if(relevant == 0){
    return 0;
  }

  return apk;
}

module.exports = {
  test, test02, getMAP10
}
