const execSync = require('child_process').execSync;
const inquirer = require('inquirer');

inquirer
  .prompt([
    {
      type: 'confirm',
      name: 'pushNow',
      message: 'Voulez-vous pousser les changements maintenant ?',
      default: false,
    },
  ])
  .then((answers) => {
    if (answers.pushNow) {
      inquirer
        .prompt([
          {
            type: 'confirm',
            name: 'pushToDevelop',
            message:
              'Voulez-vous pousser directement sur la branche "develop" ? (par défaut : non)',
            default: false,
          },
        ])
        .then((branchAnswers) => {
          if (branchAnswers.pushToDevelop) {
            execSync('git push -u origin develop');
          } else {
            inquirer
              .prompt([
                {
                  type: 'input',
                  name: 'branchName',
                  message:
                    "Ok je ne pousserais pas sur la branche develop, en revanche, j'ai besoin du nom de la branche cible :",
                  validate: function (input) {
                    console.log({
                      input,
                    });
                    return input.trim() !== '';
                  },
                },
              ])
              .then((branchNameAnswers) => {
                const branchName = branchNameAnswers.branchName.trim();
                execSync(`git push -u origin ${branchName}`);
              })
              .catch((error) => {
                console.error(error);
                process.exit(1);
              });
          }
        })
        .catch((error) => {
          console.error(error);
          process.exit(1);
        });
    } else {
      console.log(
        "c'est noté, vous aurez la possibilité de pousser les modifications plus tard.",
      );
    }
  })
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
