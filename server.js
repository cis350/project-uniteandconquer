// Create express app
const express = require('express');

const webapp = express();
const cors = require('cors');
const userlib = require('./userdbOperation');

let db;

webapp.use(express.json());
webapp.use(
  express.urlencoded({
    extended: true,
  }),
);

webapp.use(cors({ credentials: true, origin: true }));

const url = 'mongodb+srv://cis350:cis350@cluster0.ivirc.mongodb.net/uniteconquer?retryWrites=true&w=majority';

// Root endpoint
webapp.get('/', (req, res) => {
  res.json({ message: 'Welcome to unite and conquer' });
});

// TODO: define all endpoints as specified in REST API
// addPlayer endpoint
webapp.post('/addPlayer', async (req, resp) => {
  console.log('server: add player');
  // check the name was provided
  if (!req.body.player || req.body.player.length === 0) {
    resp.status(404).json({ error: 'username not provided' });
  }
  try {
    await userlib.addUser(db, { name: req.body.player });
    // send the response
    resp.status(201).json({ message: 'Player added' });
  } catch (err) {
    resp.status(500).json({ error: 'try again later' });
  }
});

// Default response for any other request
webapp.use((_req, res) => {
  res.status(404);
});

// Start server
const port = process.env.PORT || 5000;
webapp.listen(port, async () => {
  db = await userlib.connect(url);
  console.log(`Server running on port:${port}`);
});
