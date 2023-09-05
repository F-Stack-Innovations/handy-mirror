const execSync = require('child_process').execSync;
const { execFile } = require('child_process');
const inquirer = require('inquirer');

/**
 * Récupère le statut des fichiers modifiés à l'aide de "git status".
 * @returns {string} Le statut des fichiers modifiés.
 */
function getGitStatus() {
  return execSync('git status --short', { encoding: 'utf-8' });
}

/**
 * Affiche un message et quitte le processus avec un code de sortie spécifié.
 * @param {string} message - Le message à afficher.
 * @param {number} [exitCode=0] - Le code de sortie du processus (0 par défaut).
 */
function exitWithMessage(message, exitCode = 0) {
  console.log(message);
  process.exit(exitCode);
}

/**
 * Vérifie si des fichiers ont été modifiés dans le dépôt git.
 * @param {string} gitStatusOutput - Le statut des fichiers modifiés.
 * @returns {string[]} La liste des fichiers modifiés.
 */
function getModifiedFiles(gitStatusOutput) {
  return gitStatusOutput
    .split('\n')
    .map((line) => {
      const match = line.trim().match(/(..)\s+(.*)/);
      if (match) {
        const [, status, filePath] = match;
        if (status === 'M' || status === 'A' || status === '??') {
          return { status, filePath };
        }
      }
      return null;
    })
    .filter(Boolean);
}

/**
 * Demande à l'utilisateur de sélectionner des fichiers à ajouter au commit.
 * @param {string[]} files - La liste des fichiers modifiés.
 */
function promptForSelectedFiles(files) {
  inquirer
    .prompt([
      {
        type: 'checkbox',
        name: 'selectedFiles',
        message: 'Sélectionnez les fichiers à ajouter au commit :',
        choices: files.map((file) => ({
          name: `${file.status} ${file.filePath}`,
          value: file.filePath,
        })),
      },
    ])
    .then((answers) => {
      const selectedFiles = answers.selectedFiles;
      if (selectedFiles.length === 0) {
        exitWithMessage('Aucun fichier sélectionné pour le commit.', 1);
      } else {
        execFile('git', ['add', ...selectedFiles]);
      }
    })
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
}

/**
 * Point d'entrée du script.
 */
function main() {
  const gitStatusOutput = getGitStatus();
  if (!gitStatusOutput.trim()) {
    exitWithMessage("Aucun fichier n'a été modifié");
  }

  const modifiedFiles = getModifiedFiles(gitStatusOutput);
  if (modifiedFiles.length === 0) {
    exitWithMessage("Aucun fichier modifié n'a besoin d'être ajouté au commit");
  }

  promptForSelectedFiles(modifiedFiles);
}

// Appel de la fonction principale
main();
