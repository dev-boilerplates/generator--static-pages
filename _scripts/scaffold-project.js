/**
 * Finds and replaces string __project in all raw new project file scaffold
 */
var fs = require('fs'),
    replace = require('replace-in-file'),
    glob = require('glob'),    
    project = process.argv[2]

glob(`views/projects/${project}/**/*.*`, function (er, files) {
    replace({
        files,
        from: /__project/g,
        to: project
    }).then(modified => {
        console.log('created', modified)
    }).catch(err => {
        console.error(err)
    })
})
