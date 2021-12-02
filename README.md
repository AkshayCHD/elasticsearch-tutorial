# Elasticsearch Tutorial
The project is sort of a bare metal fullstack application, that can help you get started with Elasticsearch.

## Setup
To run the application you need to have Elasticsearch installed locally, you can do that by
```
docker network create elastic

docker pull docker.elastic.co/elasticsearch/elasticsearch:7.15.2

docker run --name es01-test --net elastic -p 127.0.0.1:9200:9200 -p 127.0.0.1:9300:9300 -e "discovery.type=single-node" docker.elastic.co/elasticsearch/elasticsearch:7.15.2
```

Then you can install the project dependencies by running
```
npm install
```

Now we have to inject our dataset that we'll query later into Elasticsearch, you can do that using,
```
node server/insertToElasticSearch.js
```

Once the data is injested successfully, you first have to start the express server, you can do that with
```
node server/index.js
```

then in a different terminal you can start the react application using
```
npm start
```

## Links
If you want to know more about Elasticsearch and this project you can head over to my [article](https://medium.com/@StandupCoder/your-first-elasticsearch-application-7db5ea74ef02)
