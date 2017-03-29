/**
 * Creates a single JSON file from all project config.js files
 */
var fs = require('fs'),
    glob = require('glob'),
    type = process.argv[2]

function generate() {
    glob(`views/${type}/**/config.js`, function (er, files) {
        var contents = {}
        files.forEach(function(filename, index) {
            let id = (filename.split('/')[2].includes('.js')) ? "home" : filename.split('/')[2] // getting projectname from path
            let _id = id.replace('-','') // safe object id
            fs.readFile(filename, 'utf8', function(err, data) {
                contents[_id] = eval(data)
                getImages(id)
                .then(images => {
                    console.log(id, images)
                    contents[_id].images = images 
                    if(index == files.length-1) writeConfig(contents)
                }).catch(console.log)                
            })
        })  
    })
}

function getImages(id) {
    return new Promise((resolve, reject) => {
        glob(`public/images/${type}/${id}/resized/*.jpg`, (er, files) => {
            if(!er) {
                resolve(seperateTypes(files))
            } else {
                resolve({})
            }
        })
    })
}
function seperateTypes(files) {
    let images = {
        hero: [],
        collection: [],
        slides: [],
        banner: ''
    }
    files.forEach(file => {
        let src = file.replace('public', ''),
            img = file.split('/').pop()
        if(img.includes('--slides')) images.slides.push(src)
            else if(img.includes('--hero')) images.hero = src
                else if(img.includes('banner')) images.banner = src
                    else images.collection.push(src)
    })
    return images
}

function writeConfig(contents) {
    fs.writeFile(`_scripts/config.${type}.json`, JSON.stringify(contents), 'utf8', (err) => {
        if(err) console.log(err)
        else console.log(`new config | ${type} | json database has been created.`)
    })
}

generate()