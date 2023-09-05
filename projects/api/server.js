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
 * Redirection vers la route de base (à modifier pour afficher la doc swagger)
 * =======================================================================
 */
app.get('*', (_, res) => res.redirect('/api/v1'));

/**
 * =======================================================================
 * Démarage de l'application selon un certain PORT.
 * =======================================================================
 */
app.listen(PORT, () => {
  console.log(`API démarré à cette adresse: http://${HOST}:${PORT}`);
});
