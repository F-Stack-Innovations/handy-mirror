/**
 * Author: GUILLON Alain
 * version: 0.0.2
 * Created_at: 05/09/2023
 *
 */

/**
 * =======================================================================
 * Dépendances (modules)
 * =======================================================================
 */
require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');

/**
 * =======================================================================
 * Import du routing
 * =======================================================================
 */
const routerApiV1 = require('./router/api.v1.routes');

/**
 * =======================================================================
 * Configuration de l'application
 * =======================================================================
 */
const app = express();

// eslint-disable-next-line no-undef
const HOST = process.env.HOST || 'localhost';

// eslint-disable-next-line no-undef
const PORT = process.env.PORT || 5000;

/**
 * =======================================================================
 * Configuration de Swagger
 * =======================================================================
 */
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    explorer: true,
    info: {
      title: 'HandyMirror API',
      version: '1.0.0',
      description:
        // eslint-disable-next-line quotes
        "Découvrez une API concocter à la main pour permettre d'être utiliser avec notre application mobile et surtout notre miroir connecté. (Magic Mirror ²)",
    },
    servers: [
      {
        url: `http://${HOST}:${PORT}`,
      },
    ],
  },
  apis: ['./router/*.js', './controllers/*.js'],
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);
app.use(
  '/api/v1/api-handy-docs',
  swaggerUI.serve,
  swaggerUI.setup(swaggerSpec),
);

/**
 * =======================================================================
 * Mise en places des Middlewares
 * =======================================================================
 */
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan('dev'));

/**
 * =======================================================================
 * Utilisation du routing selon une certaine route.
 * "/api" => Api
 * =======================================================================
 */
app.use('/api/v1', routerApiV1);

/**
 * =======================================================================
 * Redirection vers la documentation de l'API avec Swagger
 * =======================================================================
 */
app.get('*', (_, res) => res.redirect('/api/v1/api-handy-docs'));

/**
 * =======================================================================
 * Démarage de l'application selon un certain PORT.
 * =======================================================================
 */
app.listen(PORT, () => {
  console.log(`API démarré à cette adresse: http://${HOST}:${PORT}`);
});
