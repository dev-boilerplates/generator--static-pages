const $navBurger = document.querySelector(".hamburger")
const $body = document.querySelector("body")
const $hero = document.querySelector(".hero-container")
const $collection = document.querySelectorAll('[data-bg]')
const $navIcon = document.querySelector(".menu--icon")
const $player = videojs("#player")



// const fps = 25
// setInterval(() => {
//     console.log(~~($player.currentTime()*fps))
// }, 100)

let state = {
    burgerblack: false
}

function scrollHandler(e) {
    let pct = isVisible($hero.getBoundingClientRect())
    if(!state.burgerblack && pct == 0) toggleBurgerBlack(true)
    if(state.burgerblack && pct > 0) toggleBurgerBlack(false)
}
function toggleBurgerBlack(bool) {
    state.burgerblack = bool
    $navIcon.classList.toggle("dark")
    togglePlayback(bool)
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
    document.addEventListener("scroll", scrollHandler)
    $navBurger.addEventListener("click", () => {
        $body.classList.toggle("state--menu")
        $navBurger.classList.toggle("is-active")
    }, false)
    $player.volume(0)
    $collection.forEach(setBackgrounds)
}
mount()