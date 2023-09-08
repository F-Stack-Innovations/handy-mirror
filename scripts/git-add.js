const { execSync } = require('child_process');
const readline = require('readline-sync');

/**
 * ========================================================================================================
 * FUNCTIONS
 * ========================================================================================================
 */

/**
 * Récupère le statut des fichiers modifiés à l'aide de "git status --short"
 * @returns {string} Le statut des fichiers modifiés
 */
const getGitStatus = () => {
  return execSync('git status --short', { encoding: 'utf-8' });
};

/**
 * Demande à l'utilisateur s'il souhaite ajouter tous les fichiers automatiquement
 * @returns {string} La réponse de l'utilisateur (y/n)
 */
const askUserToAddFiles = () => {
  return readline.question(
    '\nVoulez-vous ajouter le ou les fichiers qui ont été créé(s)/modifié(s) automatiquement ? (y/n): ',
  );
};

/**
 * Ajoute tous les fichiers avec "git add -A"
 */
const addAllFiles = () => {
  try {
    execSync('git add -A');
    console.log(
      'Toutes les modifications et créations de fichiers ont été incluses dans le commit.',
    );
  } catch (error) {
    console.error(
      "Une erreur s'est produite lors de l'ajout des fichiers au commit :",
      error,
    );
    process.exit(1);
  }
};

/**
 * Demande à l'utilisateur de saisir les noms des fichiers à ajouter
 * @returns {string} Les noms des fichiers saisis par l'utilisateur
 */
const askUserForFilesToAdd = () => {
  return readline.question(
    'Saisissez les noms de fichiers à ajouter (séparés par des espaces) : ',
  );
};

/**
 * ========================================================================================================
 * PROGRAM
 * ========================================================================================================
 */

// Boucle principale
while (true) {
  // Récupère le statut des fichiers modifiés
  const gitStatusOutput = getGitStatus();

  // Si aucun fichier modifié n'est trouvé, affiche un message et quitte le script
  if (!gitStatusOutput.trim()) {
    console.log(
      "Aucun nouveau fichier ou modifié n'a besoin d'être ajouté au commit.",
    );
    process.exit(0);
  }

  // Affiche les fichiers modifiés
  console.log('\nFichiers modifiés ou non suivis :\n');
  console.log(gitStatusOutput);

  // Demande à l'utilisateur s'il souhaite ajouter les fichiers automatiquement
  const response = askUserToAddFiles();

  // Gère la réponse de l'utilisateur
  if (response.toLowerCase() === 'y') {
    addAllFiles();
    break; // Sort de la boucle
  } else if (response.toLowerCase() === 'n') {
    const filesToAdd = askUserForFilesToAdd();

    // Ajoute les fichiers saisis
    if (filesToAdd.trim() !== '') {
      const filesArray = filesToAdd.split(' ');
      console.log({ files: filesArray });

      filesArray.forEach((file) => {
        try {
          execSync(`git add ${file}`);
          console.log(`Fichier ${file} ajouté au commit.`);
        } catch (error) {
          console.error(`Erreur lors de l'ajout du fichier ${file} :`, error);
        }
      });
    }
  } else {
    console.log("Désolé, vous ne pouvez répondre que par 'y' ou 'n'.");
  }
}
