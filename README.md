### Installations & Instruction

install elasticsearch<br/>
`brew tap elastic/tap` <br/>
`brew install elastic/tap/elasticsearch-full` <br/>

install express: `npm install express` <br/>
install xmldom: `npm install xmldom` <br/>
install stemmer: `npm install stemmer` <br/>
install stopword:`npm i stopword` <br/>

**must start the elasticsearch** <br/>
`cd elasticsearch-7.11.1/bin` <br/>
`./elasticsearch` <br/>

**start this server on the terminal** <br/>
`node index.js`

### Summary
This is the server for a query search for Cystic Fibrosis Collection (CFC) collection. Here are the things that this server provides:
1. Read CFC collection, parse them from XML, extracts the needed text from each record, tokenized the text
2. Send the data in {record_id, text} pair to elastic search
3. Provides the API needed for front end to retrieve the data
4. This server is opened on localhost:4200. 

### Possible Improvement
Ideally, this service should be able to run online instead of only localhost; but heroku charges a lot of monthly to provide access to elastic-search.


