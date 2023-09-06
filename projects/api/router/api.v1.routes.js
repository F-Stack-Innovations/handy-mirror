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
const UserRoutes = require('./user.v1.routes');
const Moduleroutes = require('./module.v1.routes');

/**
 * =======================================================================
 * Base
 * =======================================================================
 */
router.use(BaseRoutes);

/**
 * =======================================================================
 * User
 * =======================================================================
 */
router.use(UserRoutes);

/**
 * =======================================================================
 * Module
 * =======================================================================
 */
router.use(Moduleroutes);

/**
 * =======================================================================
 * Documentation de Swagger
 * =======================================================================
 */

/**
 * @swagger
 * tags:
 *   name: Redirect
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
 *
 *     summary: Redirige vers la page d'accueil de la documentation Swagger de l'API dès lors qu'une route ne match pas.
 *     tags: [Redirect]  # Utilisez le nom de la balise correspondante
 *     responses:
 *       302:
 *         description: Redirection vers la documentation Swagger
 *       500:
 *         description: Une erreur serveur s'est produite.
 */
router.use('*', (_, res) => res.redirect('/api-handy-docs'));

/**
 * =======================================================================
 * Exports
 * =======================================================================
 */
module.exports = router;
