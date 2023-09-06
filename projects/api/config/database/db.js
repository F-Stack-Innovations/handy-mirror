/* eslint-disable no-undef */

/**
 * =======================================================================
 * Dépendances ou module
 * =======================================================================
 */
const mongoose = require('mongoose');

/**
 * =======================================================================
 * Configuration des variables d'environnement
 * =======================================================================
 */
const USERNAME = process.env.MONGODB_USER;
const PASSWORD = process.env.MONGODB_PASSWORD;
const CLIENT = process.env.MONGODB_CLIENT_NAME;
const DATABASE = process.env.MONGODB_DATABASE_NAME;

/**
 * =======================================================================
 * Connexion selon l'URI récupérer sur MongoDB pour VsCode
 * =======================================================================
 */
const getConnexion = async () => {
  try {
    const checkConnexion = await mongoose.connect(
      `mongodb+srv://${USERNAME}:${PASSWORD}@${CLIENT}.relqwgv.mongodb.net/${DATABASE}`,
    );
    if (checkConnexion) {
      console.log(`connecté à la bdd de mongoDB sous le pseudo ${USERNAME}`);
    }
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
      console.log(error.stack);
    }
  }
};

/**
 * =======================================================================
 * Démarrage de la connexion à la DB
 * =======================================================================
 */
getConnexion();
