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
 * /api/v1/signup:
 *  post:
 *    summary: Cette route permet de créer un nouvel utilisateur
 *    tags: [Base]  # Utilisez le nom de la balise correspondante
 *    response:
 *      400:
 *        description: Erreur de validation des champs.
 *        content:
 *          application/json:
 *            examples:
 *              MissingFields:
 *                summary: Tous les champs doivent être renseignés.
 *              MissingFirstName:
 *                summary: Tu dois renseigner un prénom.
 *              MissingLastName:
 *                summary: Tu dois renseigner un nom.
 *              MissingEmail:
 *                summary: Tu dois renseigner un email.
 *              MissingPassword:
 *                summary: Tu dois renseigner un mot de passe.
 *              MissingConfirmPassword:
 *                summary: Tu dois renseigner une confirmation du mot de passe.
 *              PasswordMismatch:
 *                summary: Les mots de passes ne correspondent pas.
 *      409:
 *        Désolé l'email existe déjà en base de donnée.
 *      201:
 *        description: Enregistrement effecturer avec succès.
 */
router.post('/signup', BaseController.postSignUp);

/**
 * @swagger
 * /api/v1/signin:
 *   post:
 *     summary: Cette route permet de connecter un utilisateur
 *     tags: [Base]  # Utilisez le nom de la balise correspondante
 *     responses:
 *       400:
 *         description: Erreur de validation des champs.
 *         content:
 *           application/json:
 *             examples:
 *               MissingFields:
 *                 summary: Vous devez saisir tous les champs.
 *               MissingEmail:
 *                 summary: Vous devez saisir un email.
 *               MissingPassword:
 *                 summary: Vous devez saisir un mot de passe.
 *       422:
 *         description: L'email n'existe pas en base de données ou le mot de passe est incorrect.
 *       200:
 *         description: Utilisateur connecté avec succès.
 */
router.post('/signin', BaseController.postSignIn);

/**
 * =======================================================================
 * Exports
 * =======================================================================
 */
module.exports = router;
