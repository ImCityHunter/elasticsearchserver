const stemmer = require('stemmer')
const sw = require('stopword');
const spellChecker = require ('spellchecker');

/*
* Given a text, remove punctuations, remove stopwords, stem words,
* Then, build a new text with remaining words
*
*/
async function tokenizing (text) {
  let split = text.split(/[\[\]<>.,\/#!$%\^&\*;:{}=_()?@\s\'\-\"]/g);
  let newSplit = sw.removeStopwords(split);
  let newText = "";
  let count = 0;
  for( let tmp of newSplit){
    let word = tmp.replace(/[\d+]/g,""); // remove digits
    if(word.length==0){
      continue;
    }
    try {
      if(spellChecker.isMisspelled(word)){
        let arr = await spellChecker.getCorrectionsForMisspelling(word);
        if(arr.length>0){
          word = arr[0];
          }
      }
    } catch (error) {
      console.log(error)
    }
    word = stemmer(word); // stem words
    word = word.toLowerCase();
    newText = newText+ word+' ';
    count++;
  }

  if(count<3){ // index elimination
    return "";
  }
  return newText;
}

module.exports = tokenizing
