## Metro Bundler ESM/CJS Conflict

**Issue:**

The Metro bundler failed with an error similar to: `Metro error: src\app?ctx=...: module is not defined` and `Unexpected module status 5. Cannot require() ES Module C:\coding\best-shot-app\babel.config.js`.

This was caused by a conflict between how Node.js handles JavaScript module types. The `package.json` file had `"type": "module"`, which makes `.js` files default to ES Modules (ESM). However, the `babel.config.js` file was written using CommonJS (CJS) module syntax (`module.exports`).

**Solution:**

The `babel.config.js` file was renamed to `babel.config.cjs`. The `.cjs` extension explicitly tells Node.js to treat this file as a CommonJS module, overriding the `"type": "module"` setting in `package.json`.

This resolved the conflict and allowed the Metro bundler to correctly load the Babel configuration. 