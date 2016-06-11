const fs = require('fs');
const path = require('path');
const mkdirp = require('mkdirp');
const scaffold = require('../lib/scaffold');

module.exports = (opts) => {
  // p: source path, n: filename
  // d: destination path, t: target filename, e: target extension
  const files = [
    { p: 'bin', n: 'migration' },
    { p: 'bin', n: 'migrate' },
    { p: 'bin', n: 'migration_template', e: 'mustache' },
    { p: 'bin', n: 'migration_template_test', e: 'mustache' },
    { n: 'Dockerfile', e: '' },
    { n: 'docker-compose', e: 'yml' },
    { n: 'dotenv', t: 'example.env', e: '' },
    { p: 'lib', n: 'db' },
    { p: 'lib', n: 'migrate' },
    { p: 'lib', n: 'util' },
    { p: 'lib', n: 'logger' },
    { n: 'index' },
    { n: 'package', e: 'json' },
    { n: 'schema' },
    { p: 'schemas', n: 'index' },
    { p: 'schemas', n: 'definitions', e: 'json' },
    { n: 'setup' },
    { n: 'start' },
    { p: 'routes', n: 'jwt' },
    { p: 'routes', n: 'schema' },
    { p: 'routes', n: 'index' },
    { p: 'middleware', n: 'index' },
    { p: 'tables', n: 'migrations' },
    { p: 'tables', n: 'index' },
    { p: 'migrations', n: 'index' },
    { p: 'test', n: 'helper' },
    { p: 'test', n: 'mocha.opts', t: 'mocha', e: 'opts' },
    { p: 'test/routes', n: 'jwt_test' },
    { p: 'test/routes', n: 'schema_test' },
    { n: '.gitignore', e: '' }
  ];

  scaffold({ basePath: __dirname, files, mustacheOpts: opts });

  [
    'env'
  ].forEach(dir => mkdirp.sync(dir));

  const modulesDir = path.join(process.cwd(), 'node_modules');
  if (!fs.existsSync(modulesDir)) mkdirp.sync(modulesDir);
};
