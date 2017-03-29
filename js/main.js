/**
 * assert to cache object
 */
var $navBurger
var $body
var $hero
var $collection
var $navIcon
var $player
var $herotext
var $scrollitems
var $nodes

var homepage = false
var speed = 250
const _tablet = 768
// const fps = 25
// setInterval(() => {
//     console.log(~~($player.currentTime()*fps))
// }, 100)

let state = {
    burgerblack: false,
    mobile: false,
    player: false
}

function scrollHandler() {
    if($hero) {
        let pct = isVisible($hero.getBoundingClientRect())
        if(!$player) $herotext.style.opacity = Math.pow(pct, 8)
        if(!state.burgerblack && pct == 0) toggleBurgerBlack(true)
        if(state.burgerblack && pct > 0) toggleBurgerBlack(false)        
    } 
}
function toggleBurgerBlack(bool) {
    state.burgerblack = bool
    $navIcon.classList.toggle("dark")
    if($player) stopPlayback(bool)
}
function stopPlayback(bool) {
    if(bool) $player.pause()
    else if(!state.mobile) $player.play()
}
function isVisible($el) {
    let innerHeight = (homepage) ? window.innerHeight : window.innerHeight * .5
    return ($el.top <= 0 && $el.bottom > window.pageYOffset - innerHeight) ? $el.bottom / innerHeight : 0
}
function setBackgrounds($el) {
    let src = $el.getAttribute('data-bg')
    $el.style.backgroundImage = `url(${src})`
}
function onResize() {
    if($player) {
        state.mobile = (window.innerWidth < _tablet)
        if(window.pageYOffset - window.innerHeight < 0) stopPlayback(state.mobile)
    }
}


function mount() {
    $navBurger = document.querySelector(".hamburger")
    $body = document.querySelector("body")
    $hero = document.querySelector(".hero-container")
    $herotext = document.querySelector(".hero-container h1")
    $collection = document.querySelectorAll('[data-bg]')
    $navIcon = document.querySelector(".menu--icon")
    // $scrollitems = document.body.querySelector("section[role='side-scroller'] .body")
    // $nodes = Array.from($scrollitems.querySelectorAll('.nodes > .node-item'))

    // $scrollitems.addEventListener('scroll', function (e) {
    //     let id = this.scrollLeft % 1300
    //     let xdiff =  window.innerWidth - 1300
    //     let halfscreen = window.innerWidth / 2
    //     let scrollRight = window.innerWidth + this.scrollLeft
    //     let marker = scrollRight - halfscreen
    //     if(marker > 650) {
    //         let total = 3
    //         let num = total - (~~((marker / 3600) * 3))
    //         let i = total - num
    //         $nodes[i].classList.add('active')
    //         if($nodes[i + 1]) $nodes[i + 1].classList.remove('active')
    //     }


    // })

    $player = document.getElementById("player")
    speed = ($player) ? 250 : 100
    if($player) $player.volume = 0
    Array.from($collection).forEach(setBackgrounds)
    window.addEventListener("scroll", throttle(scrollHandler))
    window.addEventListener("resize", throttle(onResize))

    $navBurger.addEventListener("click", () => {
        $body.classList.toggle("state--menu")
        $navBurger.classList.toggle("is-active")
    }, false)

    if(!$hero) toggleBurgerBlack(true)
    else homepage = ($hero.classList.contains('home'))
    onResize()
    scrollHandler()
}

function throttle(cb) {    
    let start = Date.now()
    return function() {
        if(Date.now() - start > speed) {            
            start = Date.now() // reset
            cb()
        }
    }
}

mount()