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
