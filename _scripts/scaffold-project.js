/**
 * Finds and replaces string __project in all raw new project file scaffold
 */
var fs = require('fs'),
    replace = require('replace-in-file'),
    glob = require('glob'),    
    id = process.argv[2],
    type = process.argv[3]

/**
 * --type is now deprecated from template usage
 */

glob(`views/${type}/${id}/**/*.*`, function (er, files) {
    let _id = id.replace("-","")
    replace({
        files,
        from: [/__id/g, /--type/],
        to: [_id, `--${type}`]
    }).then(modified => {
        console.log('created new', modified)
    }).catch(console.error)
})
