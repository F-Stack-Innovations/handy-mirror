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
const UserController = require('../controllers/User.controller');

/**
 * =======================================================================
 * Documentation de Swagger
 * =======================================================================
 */

/**
 * @swagger
 * tags:
 *   name: User
 *   description: Je vous propose les routes lié à un user.
 */

/**
 * @swagger
 * /api/v1/users:
 *   get:
 *     summary: Récupère tous les utilisateurs
 *     tags: [User]
 *     responses:
 *       200:
 *         description: Liste d'utilisateurs récupérée avec succès.
 *       204:
 *         description: Aucun utilisateur enregistré.
 */
router.get('/users', UserController.getAllUsers);

/**
 * @swagger
 * /api/v1/users/{id}:
 *   get:
 *     summary: Récupère un utilisateur par son ID
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de l'utilisateur à récupérer
 *     responses:
 *       200:
 *         description: Utilisateur récupéré avec succès.
 *       404:
 *         description: Utilisateur non valide ou introuvable.
 */
router.get('/users/:id', UserController.getUserByID);

/**
 * @swagger
 * /api/v1/users/{id}/photos:
 *   get:
 *     summary: Récupère un utilisateur par son ID et affiche toutes ses photos
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de l'utilisateur à récupérer
 *     responses:
 *       200:
 *         description: Utilisateur récupéré avec succès.
 *       404:
 *         description: Utilisateur non valide ou introuvable.
 */
router.get('/users/:id/photos', UserController.getUserPhotosByID);

/**
 * @swagger
 * /api/v1/users/{id}:
 *   put:
 *     summary: Mise à jour complète d'un utilisateur par son ID
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de l'utilisateur à mettre à jour.
 *     requestBody:
 *       description: Données de mise à jour de l'utilisateur
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstname:
 *                 type: string
 *                 description: Prénom de l'utilisateur.
 *               lastname:
 *                 type: string
 *                 description: Nom de l'utilisateur.
 *               pseudo:
 *                 type: string
 *                 description: Pseudonyme de l'utilisateur.
 *               phone:
 *                 type: string
 *                 description: Numéro de téléphone de l'utilisateur.
 *               genre:
 *                 type: string
 *                 description: Genre de l'utilisateur (Homme/Femme).
 *               addressAtHome:
 *                 type: string
 *                 description: Adresse de l'utilisateur.
 *               city:
 *                 type: string
 *                 description: Ville de l'utilisateur.
 *               country:
 *                 type: string
 *                 description: Pays de l'utilisateur.
 *               children:
 *                 type: string
 *                 description: Indication si l'utilisateur a des enfants (Oui/Non).
 *             example:
 *               firstname: John
 *               lastname: Doe
 *               pseudo: johndoe
 *               phone: 0769696969
 *               genre: Homme
 *               addressAtHome: 123 Main St
 *               city: MyCity
 *               country: MyCountry
 *               children: Oui
 *     responses:
 *       200:
 *         description: Utilisateur mis à jour avec succès.
 *       400:
 *         description: Requête invalide (champs manquants, etc.).
 *       404:
 *         description: Utilisateur non valide ou introuvable pour la mise à jour.
 *       500:
 *         description: Erreur interne du serveur lors de la mise à jour.
 */
router.put('/users/:id', UserController.putUserByID);

/**
 * @swagger
 * /api/v1/users/{id}/photos:
 *   put:
 *     summary: Mise à jour complète d'un utilisateur par son ID pour ses photos
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de l'utilisateur à mettre à jour.
 *     requestBody:
 *       description: Données de mise à jour de l'utilisateur
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               photos.face:
 *                 type: string
 *                 description: Photo de face.
 *               photos.left:
 *                 type: string
 *                 description: Photo côté gauche.
 *               photos.right:
 *                 type: string
 *                 description: Photo côté droit.
 *             example:
 *               photos: {
 *                 face: "url",
 *                 left: "url",
 *                 right: "url",
 *               }
 *     responses:
 *       200:
 *         description: Utilisateur mis à jour avec succès.
 *       400:
 *         description: Requête invalide (champs manquants, etc.).
 *       404:
 *         description: Utilisateur non valide ou introuvable pour la mise à jour.
 *       500:
 *         description: Erreur interne du serveur lors de la mise à jour.
 */
router.put('/users/:id/photos', UserController.putUserPhotoByID);

/**
 * @swagger
 * /api/v1/users/{id}:
 *   delete:
 *     summary: Supprime un utilisateur par son ID
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de l'utilisateur à supprimer
 *     responses:
 *       200:
 *         description: Utilisateur supprimé avec succès.
 *       404:
 *         description: Utilisateur non valide ou introuvable pour la suppression.
 */
router.delete('/users/:id', UserController.deleteUserByID);

/**
 * =======================================================================
 * Exports
 * =======================================================================
 */
module.exports = router;
