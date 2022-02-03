import babel from '@rollup/plugin-babel'
import commonjs from '@rollup/plugin-commonjs'
import resolve from '@rollup/plugin-node-resolve'
import { terser } from 'rollup-plugin-terser'
import packageJSON from './package.json'

const minifyExtension = pathToFile => pathToFile.replace(/\.js$/, '.min.js');

const input = './src/index.js';

const baseCfg= (output, withTerser) => {
  let plugins= []
  plugins= plugins.concat([
    babel({
      exclude: 'node_modules/**',
      /*https://github.com/rollup/plugins/tree/master/packages/babel#babelhelpers*/
      babelHelpers: 'bundled'
    }),
    resolve({
      rootDir: './src'
    }),
    commonjs()
  ])
  if (withTerser) {
    plugins.push(
      terser()
    )
  }

  return {
    input: input,
    output: output,
    external: ['moment'],
    plugins: plugins  
  }
}

module.exports = [
  //
  // CommonJs
  //
  baseCfg({
    file: packageJSON.cjs,
    format: 'cjs'
  }, false),
  baseCfg({
    file: minifyExtension(packageJSON.cjs),
    format: 'cjs'
  }, true),
  //
  // ES modules
  //
  baseCfg({
    file: packageJSON.module,
    format: 'es',
    exports: 'named'
  }, false),
  baseCfg({
    file: minifyExtension(packageJSON.module),
    format: 'es',
    exports: 'named'
  }, true),  
  //
  // UMD
  //  
  baseCfg({
    file: packageJSON.browser,
    format: 'umd',
    name: 'intre',
    globals: {
      'moment': 'moment'
    }
  }, false),
  baseCfg({
    file: minifyExtension(packageJSON.browser),
    format: 'umd',
    name: 'intre',
    globals: {
      'moment': 'moment'
    }
  }, true)  
];
