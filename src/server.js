// Register path aliases defined in package.json. This call must occur
// before any alias-based requires are resolved. It uses the
// `module-alias` package to map alias names to the corresponding
// directories configured in package.json under `_moduleAliases`.
require('module-alias/register');

const { buildApp } = require('./app');
const { env } = require('infrastructure/config/env');

const app = buildApp();

const port = process.env.PORT || env.port || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`));

