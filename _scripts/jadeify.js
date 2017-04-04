/**
 * Takes all project/page views and creates index.html files from them
 * builds up the expected file structure
 * injects the generated config.json which contains all locals for build
 */
var fs = require('fs'),
    fsPath = require('fs-path'),
    glob = require('glob'),
    jade = require('jade'),
    dir = process.argv[2],
    path = `${__dirname}/../public`

function init() {
    let confs = {
        work: "config.work",
        pages: "config.pages",
        home: "config.home"
    }
    fs.readFile(`./_scripts/${confs[dir]}.json`, 'utf8', (err, config) => {
        if(err) console.log(`has your _scripts/config${dir}.json been generated?`)
        else applyJade(config)
    })
}
function applyJade(config) {
    glob(`views/${dir}/**/_partials/index.jade`, function (er, files) {
        files.forEach(filename => compileJade(filename, config))
    })
}
function compileJade(filename, config) {

    let id = (filename.split('/')[2].includes('_partials')) ? "home" : filename.split('/')[2]  // get projectname from path            
    jade.renderFile(filename, JSON.parse(config), (err, html) => {
        if(err) console.log(`Some fail with parsing ${id}`, err)
        else writeHTML(id, html)
    })
}
function writeHTML(id, html) {
    let target = {
        work: `${path}/${dir}/${id}`,
        pages: `${path}/${id}`,
        home: `${path}`
    }
    fsPath.writeFile(`${target[dir]}/index.html`, html, 'utf8', (err) => {
        if(err) console.log(err)
        else console.log('page created:', `${id}/index.html`)
    })
}

init()