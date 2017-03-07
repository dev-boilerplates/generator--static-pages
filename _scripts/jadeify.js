/**
 * Takes all project/page views and creates index.html files from them
 * builds up the expected file structure
 * injects the generated config.json which contains all locals for build
 */
var fs = require('fs'),
    fsPath = require('fs-path'),
    glob = require('glob'),
    jade = require('jade'),
    dir = process.argv[2]

var path = `${__dirname}/../public`

fs.readFile('./_scripts/config.json', 'utf8', (err, config) => {
    if(err) console.log("has your _scripts/config.json been generated?")
    else applyJade(config)
})

function applyJade(config) {
    glob(`views/${dir}/**/_partials/index.jade`, function (er, files) {
        files.forEach(function(filename, index) {
            var page = filename.split('/')[2] // get projectname from path
            var html = jade.renderFile(filename, JSON.parse(config))
            writeHTML(page, html)
        })  
    })
}

function writeHTML(page, html) {
    // console.log(`${path}/${dir}/${page}/index.html`, page)
    fsPath.writeFile(`${path}/${dir}/${page}/index.html`, html, 'utf8', (err) => {
        if(err) console.log(err)
        else console.log('page created:', `public/${dir}/${page}/index.html`)
    })
}