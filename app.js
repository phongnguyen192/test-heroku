import cors from 'cors';
import bodyParser from 'body-parser';
import express from 'express';
import http from 'http';
import routes from './src/routes';

const app = express();

// Application-Level Middleware

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('Welcome');
});

// Routes
app.use('/api/emailLogs', routes.emailLogs);


//IF WE ARE HERE THEN THE SPECIFIED REQUEST IS NOT FOUND
app.use((req, res, next) => {
  const err = new Error("Not Found");
  err.status = 404;
  next(err);
});

//ALL OTHER REQUESTS ARE NOT IMPLEMENTED.
app.use((err, req, res, next) => {
  // error level logging
  res.status(err.status || 501);
  res.json({
      error: {
          code: err.status || 501,
          message: err.message
      }
  });
});


// Start
const PORT = process.env.API_PORT || 3010;
//CREATE A SERVER
const server = http.createServer(app);
server.listen(PORT);
console.log('RESTful API server started on: ' + PORT);
