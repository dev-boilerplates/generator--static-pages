var $navBurger
var $body
var $hero
var $collection
var $navIcon
var $player
const _tablet = 768
// const fps = 25
// setInterval(() => {
//     console.log(~~($player.currentTime()*fps))
// }, 100)

let state = {
    burgerblack: false,
    mobile: false,
    player: false // deprecate
}


function scrollHandler(e) {
    if($hero) {
        let pct = isVisible($hero.getBoundingClientRect())
        if(!state.burgerblack && pct == 0) toggleBurgerBlack(true)
        if(state.burgerblack && pct > 0) toggleBurgerBlack(false)
    } 
}
function toggleBurgerBlack(bool) {
    state.burgerblack = bool
    $navIcon.classList.toggle("dark")
    if(state.player) togglePlayback(bool)
}
function togglePlayback(bool) {
    if(bool) $player.pause()
    else $player.play()
}
function isVisible($el) {
    // console.log($el.top, $el.bottom, (window.pageYOffset - window.innerHeight))
    return ($el.top <= 0 && $el.bottom > window.pageYOffset - window.innerHeight) ? $el.bottom / window.innerHeight : 0
}
function setBackgrounds($el) {
    let src = $el.getAttribute('data-bg')
    $el.style.backgroundImage = `url(${src})`
}
function onResize() {
    if($player != null) {
        state.mobile = (window.innerWidth < _tablet)
        togglePlayback(state.mobile)
    }
}


function mount() {
    $navBurger = document.querySelector(".hamburger")
    $body = document.querySelector("body")
    $hero = document.querySelector(".hero-container")
    $collection = document.querySelectorAll('[data-bg]')
    $navIcon = document.querySelector(".menu--icon")

    state.player = (document.getElementById("player") != undefined)

    $player = (state.player) ? videojs("player") : null

    document.addEventListener("scroll", scrollHandler)
    $navBurger.addEventListener("click", () => {
        $body.classList.toggle("state--menu")
        $navBurger.classList.toggle("is-active")
    }, false)

    document.addEventListener("resize", onResize)

    Array.from($collection).forEach(setBackgrounds)
    if(state.player) $player.volume(0)
    if(!$hero) toggleBurgerBlack(true)
    onResize()

}
mount()