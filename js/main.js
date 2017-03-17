var $navBurger
var $body
var $hero
var $collection
var $navIcon
var $player

// const fps = 25
// setInterval(() => {
//     console.log(~~($player.currentTime()*fps))
// }, 100)

let state = {
    burgerblack: false,
    player: false
}

function scrollHandler(e) {
    let pct = isVisible($hero.getBoundingClientRect())
    if(!state.burgerblack && pct == 0) toggleBurgerBlack(true)
    if(state.burgerblack && pct > 0) toggleBurgerBlack(false)
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

function mount() {
    $navBurger = document.querySelector(".hamburger")
    $body = document.querySelector("body")
    $hero = document.querySelector(".hero-container")
    $collection = document.querySelectorAll('[data-bg]')
    $navIcon = document.querySelector(".menu--icon")
    $player = document.getElementById("player")
    
    state.player = ($player != undefined)

    if(state.player) videojs("player")

    document.addEventListener("scroll", scrollHandler)
    $navBurger.addEventListener("click", () => {
        $body.classList.toggle("state--menu")
        $navBurger.classList.toggle("is-active")
    }, false)

    Array.from($collection).forEach(setBackgrounds)
    if(state.player) $player.volume(0)
    
}
mount()