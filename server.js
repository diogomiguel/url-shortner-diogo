const express = require('express');
const bodyParser = require('body-parser');
const normalizeUrl = require('normalize-url');

const shortify = require('./utils/shortify');
// On a true app replace by a DB
const model = require('./localstorage/queries');

const app = express();

// Get form info in here either as form data or json format
// content type needs to be specified otherwise boom
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set('port', process.env.PORT || 3001);

// Encode url on post in the main route
// e.g. curl localhost:3001 -XPOST -d '{ "url": "http://www.farmdrop.com" }' -H 'content-type:application/json' 
app.post('/api/urls/encode', (req, res) => {
  // Check we have what we need
  // ToDo validate URL format
  if (!req.body || !req.body.url) {
    console.error('Invalid post request', req.body);

    res.status(500).send('Invalid request');
  }

  // TODO try to find URL before saving it

  // Retrieve an id to use to base encode as a hash
  const uniqId = model.getLastStoredUniqId();
  const hash = shortify(uniqId);

  // Normalize our URL to avoid format dramas
  const url = normalizeUrl(req.body.url);

  const urlObject = {
    id: uniqId,
    short_url: `/${hash}`,
    url,
  };

  // Save everything in our storage
  model.addUrlObjToStorage(urlObject);

  // Vomit the object in JSON
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify(urlObject));
});

// List all encoded URLs
app.get('/api/urls', (req, res) => {
  const listUrls = model.getListStored();

  // Vomit the list in JSON
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify(listUrls));
});

// Redirect to url if hash found
app.get('/:hash', (req, res) => {
  const retrievedUrlObj = model.selectHashFromStore(req.params.hash);

  if (typeof retrievedUrlObj === 'object' && retrievedUrlObj.url) {
    // Yay exists. Redirect to it
    res.redirect(302, retrievedUrlObj.url);
  } else {
    // HTTP status 404: NotFound
    res
      .status(404) 
      .send('Url not found');
  }
});

// Express only serves static assets in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
}

app.listen(app.get('port'), () => {
  console.log(`Find the server at: http://localhost:${app.get('port')}/`); // eslint-disable-line no-console
});
