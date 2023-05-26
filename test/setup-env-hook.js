// load environment variables for tests
const path = require('path');

require('../src/env').config(path.resolve(process.cwd(), '.env.test'))