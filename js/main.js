console.log('heelo orld')
function name(p) {
    console.log(...p)
}
name([1])
if (ENV !== 'production') {
    console.log('Logging is enabled!');
}