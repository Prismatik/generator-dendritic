const _ = require('lodash');
const exec = require('child_process').execSync;
const bandname = require('bandname');
const mkdirp = require('mkdirp');
const rimraf = require('rimraf');
const path = require('path');
const os = require('os');

const randomstring = () => bandname().replace(' ', '_').replace(/-/g, '_');

let dir;
if (process.env.SLOW_TEST) {
  dir = path.join(os.tmpdir(), 'redbeard_tests', randomstring());
} else {
  dir = path.join(__dirname, 'redbeard_tests', randomstring());
}

mkdirp.sync(dir);

const opts = { cwd: dir, stdio: 'inherit' };
const index = path.join(__dirname, 'index.js');

const appName = `redbeard_tests_${randomstring()}`;
const modelName1 = randomstring();
const modelName2 = randomstring();
const userName = `${randomstring()}_user`;

exec(['node', index, 'base', appName].join(' '), opts);
exec(['node', index, 'model', modelName1].join(' '), opts);
exec(['node', index, 'model', modelName2, '-s', modelName1].join(' '), opts);
exec(['node', index, 'user', userName, '-m', modelName2].join(' '), opts);
if (process.env.SLOW_TEST) exec(['npm', 'install'].join(' '), opts);
exec(['cp', 'example.env', '.env'].join(' '), opts);
exec(['npm', 'test'].join(' '), opts);
exec(['npm', 'run', 'testredbeard'].join(' '), _.omit(opts, 'cwd'));
exec(['./node_modules/.bin/eslint', './redbeard_tests/'].join(' '), _.omit(opts, 'cwd'));
exec(['npm', 'run', 'lint'].join(' '), _.omit(opts, 'cwd'));

rimraf.sync(dir);
