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

app.get('*', (req, res) => {
  res.send('coucou');
});

/**
 * =======================================================================
 * Démarage de l'application selon un certain PORT.
 * =======================================================================
 */
app.listen(PORT, () => {
  console.log(`API démarré à cette adresse: http://${HOST}:${PORT}`);
});
