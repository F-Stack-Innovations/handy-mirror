// const execSync = require('child_process').execSync;
// const { execFile } = require('child_process');
// const inquirer = require('inquirer');

// /**
//  * Récupère le statut des fichiers modifiés à l'aide de "git status".
//  * @returns {string} Le statut des fichiers modifiés.
//  */
// function getGitStatus() {
//   return execSync('git status --short', { encoding: 'utf-8' });
// }

// /**
//  * Affiche un message et quitte le processus avec un code de sortie spécifié.
//  * @param {string} message - Le message à afficher.
//  * @param {number} [exitCode=0] - Le code de sortie du processus (0 par défaut).
//  */
// function exitWithMessage(message, exitCode = 0) {
//   console.log(message);
//   process.exit(exitCode);
// }

// /**
//  * Vérifie si des fichiers ont été modifiés dans le dépôt git.
//  * @param {string} gitStatusOutput - Le statut des fichiers modifiés.
//  * @returns {string[]} La liste des fichiers modifiés.
//  */
// function getModifiedFiles(gitStatusOutput) {
//   const filesByStatus = new Map();

//   gitStatusOutput.split('\n').forEach((line) => {
//     const match = line.trim().match(/(..)\s+(.*)/);
//     if (match) {
//       const [, status, filePath] = match;
//       if (
//         (status === 'M' && status === 'A' && status === '??') ||
//         (status === 'M' && status === '??') ||
//         (status === 'M' && status === 'A') ||
//         (status === 'A' && status === '??')
//       ) {
//         if (!filesByStatus.has(status)) {
//           filesByStatus.set(status, []);
//         }
//         filesByStatus.get(status).push(filePath);
//       } else if (status === 'M' || status === 'A' || status === '??') {
//         if (!filesByStatus.has(status)) {
//           filesByStatus.set(status, []);
//         }
//         filesByStatus.get(status).push(filePath);
//       }
//     }
//   });

//   return filesByStatus;
// }

// /**
//  * Demande à l'utilisateur de sélectionner des fichiers à ajouter au commit.
//  * @param {Map<string, string[]>} filesByStatus - Les fichiers triés par statut.
//  */
// function promptForSelectedFiles(filesByStatus) {
//   const choices = [];

//   filesByStatus.forEach((files, status) => {
//     choices.push(new inquirer.Separator(`---- ${status} ----`));
//     files.forEach((filePath) => {
//       choices.push({
//         name: filePath,
//         value: filePath,
//       });
//     });
//   });

//   console.log(choices);

//   inquirer
//     .prompt([
//       {
//         type: 'checkbox',
//         name: 'selectedFiles',
//         message: 'Sélectionnez les fichiers à ajouter au commit :',
//         choices,
//       },
//     ])
//     .then((answers) => {
//       const selectedFiles = answers.selectedFiles;
//       if (selectedFiles.length === 0) {
//         exitWithMessage('Aucun fichier sélectionné pour le commit.', 1);
//       } else {
//         execFile('git', ['add', ...selectedFiles]);
//       }
//     })
//     .catch((error) => {
//       console.error(error);
//       process.exit(1);
//     });
// }

// /**
//  * Point d'entrée du script.
//  */
// function main() {
//   const gitStatusOutput = getGitStatus();
//   const modifiedFiles = getModifiedFiles(gitStatusOutput);

//   if (modifiedFiles.size === 0) {
//     execSync('echo "fuck"');
//     exitWithMessage("Aucun fichier modifié n'a besoin d'être ajouté au commit");
//   } else {
//     promptForSelectedFiles(modifiedFiles);
//   }
// }

// // Appel de la fonction principale
// main();

const { execSync } = require('child_process');
const readline = require('readline-sync');

// Récupère le statut des fichiers modifiés à l'aide de "git status --short"
const gitStatusOutput = execSync('git status --short', { encoding: 'utf-8' });

// Si aucun fichier modifié n'est trouvé, affiche un message et quitte le script
if (!gitStatusOutput.trim()) {
  console.log(
    "Aucun nouveau fichier ou modifié n'a besoin d'être ajouté au commit.",
  );
  process.exit(0);
}

// Affiche les fichiers modifiés
console.log('Fichiers modifiés ou non suivis :\n');
console.log(gitStatusOutput);

// Demande à l'utilisateur s'il souhaite ajouter des fichiers manuellement
const response = readline.question(
  '\nVoulez-vous ajouter des fichiers manuellement ? (Oui/Non) ou (y/n): ',
);

if (response.toLowerCase() === 'oui' || response.toLowerCase() === 'y') {
  // Demande à l'utilisateur de saisir les noms de fichiers à ajouter
  const filesToAdd = readline.question(
    'Saisissez les noms de fichiers à ajouter (séparés par des espaces) : ',
  );

  // Ajoute les fichiers saisis
  if (filesToAdd.trim() !== '') {
    const filesArray = filesToAdd.split(' ');

    filesArray.forEach((file) => {
      try {
        execSync(`git add ${file}`);
        console.log(`Fichier ${file} ajouté au commit.`);
      } catch (error) {
        console.error(`Erreur lors de l'ajout du fichier ${file} :`, error);
      }
    });
  }
}

// Ajoute tous les fichiers modifiés ou créés avec "git add -A"
try {
  execSync('git add -A');
  console.log('Tous les fichiers modifiés ou créés ont été ajoutés au commit.');
} catch (error) {
  console.error(
    "Une erreur s'est produite lors de l'ajout des fichiers au commit :",
    error,
  );
  process.exit(1);
}
