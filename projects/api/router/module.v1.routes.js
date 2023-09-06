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
const ModuleController = require('../controllers/Module.controller');

/**
 * =======================================================================
 * Documentation de Swagger
 * =======================================================================
 */

/**
 * @swagger
 * tags:
 *   name: Module
 *   description: Je vous propose les routes lié aux modules
 */

/**
 * =======================================================================
 * ModuleController
 * =======================================================================
 */

/**
 * @swagger
 * /api/v1/modules:
 *   post:
 *     summary: Crée un nouveau module
 *     tags: [Module]
 *     responses:
 *       400:
 *         description: Erreur de validation des champs.
 *         content:
 *           application/json:
 *             examples:
 *               MissingFields:
 *                 summary: Tous les champs doivent être renseignés.
 *               MissingName:
 *                 summary: Tu dois renseigner un nom pour ce module.
 *               MissingDescription:
 *                 summary: Tu dois renseigner une description pour ce module.
 *       409:
 *         description: Désolé, le module existe déjà en base de données.
 *       201:
 *         description: Module enregistré avec succès.
 */
router.post('/modules', ModuleController.postModule);

/**
 * @swagger
 * /api/v1/modules:
 *   get:
 *     summary: Récupère tous les modules
 *     tags: [Module]
 *     responses:
 *       200:
 *         description: Liste de modules récupérée avec succès.
 *       204:
 *         description: Aucun module enregistré.
 */
router.get('/modules', ModuleController.getAllModules);

/**
 * @swagger
 * /api/v1/modules/{id}:
 *   get:
 *     summary: Récupère un module par son ID
 *     tags: [Module]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID du module à récupérer
 *     responses:
 *       200:
 *         description: Module récupéré avec succès.
 *       404:
 *         description: Module non valide ou introuvable.
 */
router.get('/modules/:id', ModuleController.getModuleByID);

/**
 * =======================================================================
 * Exports
 * =======================================================================
 */
module.exports = router;
