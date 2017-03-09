/**
 * Creates a single JSON file from all project config.js files
 */
var fs = require('fs'),
    glob = require('glob'),
    type = process.argv[2]

function build() {
    glob(`views/${type}/**/config.js`, function (er, files) {
        var contents = {}
        files.forEach(function(filename, index) {
            var project = filename.split('/')[2] // get projectname from path
            fs.readFile(filename, 'utf8', function(err, data) {
                contents[project] = eval(data)
                if(index == files.length-1) writeConfig(contents)
            })
        })  
    })
}

function writeConfig(contents) {
    fs.writeFile(`_scripts/config.${type}.json`, JSON.stringify(contents), 'utf8', (err) => {
        if(err) console.log(err)
        else console.log(`new config | ${type} | json database has been created.`)
    })
}

build()