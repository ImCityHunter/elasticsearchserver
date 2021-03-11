const elasticsearch=require('elasticsearch');

// elastic search will need to start first before this to be started
// https://www.elastic.co/guide/en/elasticsearch/reference/current/getting-started-install.html
// https://www.elastic.co/guide/en/elasticsearch/reference/7.11/starting-elasticsearch.html

// brew tap elastic/tap
// brew install elastic/tap/elasticsearch-full
// cd elasticsearch-7.11.1/bin
// ./elasticsearch
const client = new elasticsearch.Client( {
  hosts: [
    'http://localhost:9200'
  ]
});

module.exports = client;
