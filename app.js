import express from 'express';
import makeStoppable from 'stoppable';
import http from 'http';
import passport from 'passport';
import cors from 'cors';
import router from './routes/router.js';
import sequelize from './config/database.js';
import config from './config.js';
import { localStrategy } from './passport/localStrategy.js';
import { jwtStrategy } from './passport/jwtStrategy.js';

const app = express();

app.use(
  cors({
    origin: ['https://user-manager-app.onrender.com/login'],
  })
);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(passport.initialize());

passport.use('login', localStrategy);
passport.use('jwt', jwtStrategy);

app.use('/', router);

app.use((req, res, next) => {
  res.status(404).json('Not found');
});

app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.json({ error: err });
});

sequelize
  .authenticate()
  .then(() => {
    console.log('MySQL connection successfully.');
  })
  .catch((err) => {
    console.log('Unable to connect to the database:', err);
  });

sequelize
  .sync({ force: true })
  .then(() => {
    console.log('Database synchronized successfully.');

    const server = makeStoppable(http.createServer(app));

    function startServer() {
      const stopServer = () => {
        return new Promise((resolve) => {
          server.stop(resolve);
        });
      };

      return new Promise((resolve) => {
        server.listen(config.port, () => {
          console.log(`Server is running`);
          resolve(stopServer);
        });
      });
    }

    startServer();
  })
  .catch((err) => console.log('Failed to synchronize the database.', err));
