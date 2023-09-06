/**
 * =======================================================================
 * Dépendances (modules)
 * =======================================================================
 */
const router = require('express').Router();

/**
 * =======================================================================
 * Import différentes routes
 * =======================================================================
 */
const BaseRoutes = require('./base.v1.routes');

/**
 * =======================================================================
 * Base
 * =======================================================================
 */
router.use(BaseRoutes);

/**
 * =======================================================================
 * Documentation de Swagger
 * =======================================================================
 */

/**
 * @swagger
 * tags:
 *   name: Redirection
 *   description: Découvrez comment accéder à la documentation officielle de l'API
 */

/**
 * =======================================================================
 * Redirection vers la documentation Swagger
 * =======================================================================
 */

/**
 * @swagger
 * /api/v1/api-handy-docs:
 *   get:
 *     summary: Redirige vers la page d'accueil de la documentation Swagger de l'API
 *     tags: [Redirection]  # Utilisez le nom de la balise correspondante
 *     responses:
 *       302:
 *         description: Redirection vers la documentation Swagger
 *       500:
 *         description: Une erreur serveur s'est produite.
 */
router.get('*', (_, res) => res.redirect('/api-handy-docs'));

/**
 * =======================================================================
 * Exports
 * =======================================================================
 */
module.exports = router;
