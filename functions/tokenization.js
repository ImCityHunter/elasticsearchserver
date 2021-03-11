const stemmer = require('stemmer')
const sw = require('stopword');

/*
* Given a text, remove punctuations, remove stopwords, stem words,
* Then, build a new text with remaining words
*
*/
function tokenizing (text) {
  let split = text.split(/[\[\]<>.,\/#!$%\^&\*;:{}=_()?@\s\'\-\"]/g);
  let newSplit = sw.removeStopwords(split);
  let newText = "";
  for( let tmp of newSplit){
    let word = tmp.replace(/[\d+]/g,""); // remove digits
    word = stemmer(word); // stem words
    word = word.toLowerCase();
    if(word.length>0){
      newText = newText + ' ' + word
    }
  }
  return newText;
}

module.exports = tokenizing
