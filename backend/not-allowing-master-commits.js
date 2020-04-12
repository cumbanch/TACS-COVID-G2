const childProcessExec = require('child_process').exec;
const util = require('util');

const exec = util.promisify(childProcessExec);

checkBranch();

async function checkBranch() {
    const branch = await (await exec('git rev-parse --abbrev-ref HEAD')).stdout.trim();
    branch == 'master' ? console.log('You cannot push directly to master branch. Create a new branch and a pull request instead') : process.exit(0);
    process.exit(1);
}
