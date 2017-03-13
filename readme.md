#website-static-generator

# Development


#### Folder structure

* `_raw` page boilerplate
* `_scripts` node.js build scripts
* `dist` recent release that are in sync with the MONDO location where the candidate is shipped from
* `public` local test build
* `views` site structure is derived from here


#### Build process of static pages

* ~~init new project `npm create:project horizontalhumans`~~
	* ~~create barebones folder: `jade/projects/horizontalhumans`~~
	* ~~`main.yml` YAML config to generate `config.js`, using `js-yaml`~~
	* ~~`config.js`: config Object which is passed into the Jade page build for page meta, links, general top level ~~
	* ~~`index.jade`: extends layout etc~~
	* ~~`content.md`: base markdown file~~
	* ~~copy image files from server	~~

* ~~update images from server `npm update:images` (copy files)~~

* ~~build statics: use `rsync` to check for diffs~~

* put some top level config into `package.json` : `env.npm_package_config_*`

* ~~Jade will expect markdown to compile with static file `include ./content.md` ~~

### Create new project

    id=uniqueName npm run create:project // new project
    id=uniqueName npm run create:page // new page

Pages will scaffold out into their respective `/views` directory  

Use the relative `layout.jade` to organise the page layout, using the `config.js` to structure specific local variables for the HTML render.

Local variables can be accessed in `jade` via the following convention: `projectname.meta.title` 

Images will be pulled directly in order from the server and be populated into the `config.js`, as collections, otherwise by `tags`: `filename--tag.jpg`

* `--hero`
* `--slide`
* `--banner`

Scripts are loaded per page type: `main.js | page.js | project`, and any specific extras can be loaded in via the script config.



### Watch

    npm start
    


---


### notes
* Uses `rollup` where most `commonjs` modules from `npm` will work, there may still need to be some tweaking.
* `ENV variables` are available, see `npm run production` and in `js/main.js`. Also `rollup.config.js` detects `ENV` and `uglifies` where applicable.
* [eslint](http://eslint.org/docs/user-guide/configuring) check the manual for any issues with ES6

---
