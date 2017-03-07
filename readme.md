#website-static-generator

# Development

#### Build process of static pages

* ~~init new project `npm create:project horizontalhumans`~~
	* ~~create barebones folder: `jade/projects/horizontalhumans`~~
	* ~~`main.yml` YAML config to generate `config.js`, using `js-yaml`~~
	* ~~`config.js`: config Object which is passed into the Jade page build for page meta, links, general top level ~~
	* ~~`index.jade`: extends layout etc~~
	* ~~`content.md`: base markdown file~~
	* copy image files from server	

* update images from server `npm update:images` (copy files)

* build statics: use `rsync` to check for diffs

* put some top level config into `package.json` : `env.npm_package_config_*`

* ~~Jade will expect markdown to compile with static file `include ./content.md` ~~

### Create new project

    `id=uniquename npm run create:project`

### Watch

    `npm start`


### Package Module into CJS Format
This can now be included in another `rollup` built bundle.  
Work on `es6/package.js`, and create with..
    
    npm run package

### Testing bundle
Work in `js/main` as usual

    npm start

---

### notes
* Uses `rollup` where most `commonjs` modules from `npm` will work, there may still need to be some tweaking.
* `ENV variables` are available, see `npm run production` and in `js/main.js`. Also `rollup.config.js` detects `ENV` and `uglifies` where applicable.
* [eslint](http://eslint.org/docs/user-guide/configuring) check the manual for any issues with ES6

---
