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
            var id = (filename.split('/')[2].includes('.js')) ? "home" : filename.split('/')[2] // get projectname from path
            fs.readFile(filename, 'utf8', function(err, data) {
                contents[id] = eval(data)
                getImages(id)
                .then(images => {
                    console.log(id, images)
                    contents[id].images = images 
                    if(index == files.length-1) writeConfig(contents)
                }).catch(console.log)                
            })
        })  
    })
}

function getImages(id) {
    return new Promise((resolve, reject) => {
        glob(`public/images/${type}/${id}/*.jpg`, (er, files) => {
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
        if(img.includes('--hero')) images.hero.push(src)
            else if(img.includes('--slide')) images.slides.push(src)
            else if(img.includes('--banner')) images.banner = src
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