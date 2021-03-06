const { version, name, author, license, dependencies } = require('../package.json');
const banner = `
/**
 * ${name} v${version}
 * (c) 2017 ${author}
 * Released under ${license}
 */
`;
import flow from 'rollup-plugin-flow-no-whitespace';
import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
const babelConfig = {
  common: {
    presets: [
      'flow',
      [ 'env', { modules: false }],
    ],
    plugins: [ 'transform-runtime' ],
    exclude: 'node_modules/**',
    runtimeHelpers: true,
    babelrc: false,
  },
  es: {
    presets: [
      'flow',
      [ 'env', { modules: false }],
    ],
    plugins: [ 'transform-runtime' ],
    exclude: 'node_modules/**',
    runtimeHelpers: true,
    babelrc: false,
  },
  umd: {
    presets: [ 'flow', 'es2015-rollup' ],
    exclude: 'node_modules/**',
    babelrc: false,
  },
  iife: {
    presets: [ 'flow', 'es2015-rollup' ],
    plugins: [],
    babelrc: false,
  },
  min: {
    presets: [ 'flow', 'es2015-rollup' ],
    exclude: 'node_modules/**',
    plugins: [],
    babelrc: false,
  },
};
const externalRegExp = new RegExp(Object.keys(dependencies).join('|'));
export default function(mode) {
  return {
    input: 'src/index.js',
    banner,
    external(id) {
      return !/min|umd|iife/.test(mode) && externalRegExp.test(id);
    },
    plugins: [
      babel(babelConfig[mode]),
      flow(),
      resolve(),
      commonjs(),
    ],
  };
}
