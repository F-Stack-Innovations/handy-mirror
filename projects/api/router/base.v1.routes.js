/**
 * =======================================================================
 * Dépendances (modules)
 * =======================================================================
 */
const router = require('express').Router();

/**
 * =======================================================================
 * Controllers
 * =======================================================================
 */
const BaseController = require('../controllers/Base.controller');

/**
 * =======================================================================
 * Documentation de Swagger
 * =======================================================================
 */

/**
 * @swagger
 * tags:
 *   name: Base
 *   description: Je vous propose les routes de base de l'API
 */

/**
 * =======================================================================
 * BaseController
 * =======================================================================
 */

/**
 * @swagger
 * /:
 *   get:
 *     summary: Renvoie la page d'accueil de l'API
 *     tags: [Base]  # Utilisez le nom de la balise correspondante
 *     responses:
 *       200:
 *         description: Page d'accueil de l'API renvoyée avec succès!
 *       500:
 *         description: Une erreur serveur s'est produite.
 */
router.get('/', BaseController.getHome);

/**
 * =======================================================================
 * Exports
 * =======================================================================
 */
module.exports = router;
