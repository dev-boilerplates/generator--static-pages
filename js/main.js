/**
 * assert to cache object
 */
let cache = {
    $navBurger: null,
    $body: null,
    $hero: null,
    $collection: null,
    $navIcon: null,
    $player: null,
    $herotext: null,
    $scrollitems: null,
    $scrollnodes: null
}


var speed = 250
const _tablet = 768
// side-scroller
var numSideItems = 0
var img_ratio = 0.417
// const fps = 25
// setInterval(() => {
//     console.log(~~($player.currentTime()*fps))
// }, 100)

let state = {
    burgerblack: false,
    mobile: false,
    player: false,
    sidescroller: false,
    homepage: false
}

function scrollHandler() {
    if(cache.$hero) {
        let pct = isVisible(cache.$hero.getBoundingClientRect())
        if(!cache.$player) $herotext.style.opacity = Math.pow(pct, 8)
        if(!state.burgerblack && pct == 0) toggleBurgerBlack(true)
        if(state.burgerblack && pct > 0) toggleBurgerBlack(false)        
    } 
}
function toggleBurgerBlack(bool) {
    state.burgerblack = bool
    cache.$navIcon.classList.toggle("dark")
    if(cache.$player) stopPlayback(bool)
}
function stopPlayback(bool) {
    if(bool) cache.$player.pause()
    else if(!state.mobile) cache.$player.play()
}
function isVisible($el) {
    let innerHeight = (state.homepage) ? window.innerHeight : window.innerHeight * .5
    return ($el.top <= 0 && $el.bottom > window.pageYOffset - innerHeight) ? $el.bottom / innerHeight : 0
}
function setBackgrounds($el) {
    let src = $el.getAttribute('data-bg')
    $el.style.backgroundImage = `url(${src})`
}
function onResize() {
    if(cache.$player) {
        state.mobile = (window.innerWidth < _tablet)
        if(window.pageYOffset - window.innerHeight < 0) stopPlayback(state.mobile)
    }
}

function handleSideScroller() {
    let w = (window.innerHeight * 0.35) / img_ratio
    let containerWidth = w * numSideItems
    let halfscreen = window.innerWidth / 2
    let scrollRight = window.innerWidth + this.scrollLeft
    let marker = scrollRight - halfscreen
    if(marker > halfscreen) {
        let total = numSideItems
        let num = total - (~~((marker / containerWidth) * numSideItems))
        let i = total - num
        cache.$scrollnodes[i].classList.add('active')
        if(cache.$scrollnodes[i + 1]) cache.$scrollnodes[i + 1].classList.remove('active')
    }
}

function mount() {
    cache.$navBurger = document.querySelector(".hamburger")
    cache.$body = document.querySelector("body")
    cache.$hero = document.querySelector(".hero-container")
    cache.$herotext = document.querySelector(".hero-container h1")
    cache.$collection = document.querySelectorAll('[data-bg]')
    cache.$navIcon = document.querySelector(".menu--icon")

    state.sidescroller = (document.body.querySelector("section[role='side-scroller']"))

    if(state.sidescroller) {
        cache.$scrollitems = document.body.querySelector("section[role='side-scroller'] .body")
        cache.$scrollnodes = Array.from(cache.$scrollitems.querySelectorAll('.nodes > .node-item'))
        numSideItems = cache.$scrollnodes.length
        cache.$scrollitems.addEventListener('scroll', handleSideScroller)
    }
    
    cache.$player = document.getElementById("player")
    speed = (cache.$player) ? 250 : 100
    if(cache.$player) cache.$player.volume = 0

    Array.from(cache.$collection).forEach(setBackgrounds)
    window.addEventListener("scroll", throttle(scrollHandler))
    window.addEventListener("resize", throttle(onResize))

    cache.$navBurger.addEventListener("click", () => {
        cache.$body.classList.toggle("state--menu")
        cache.$navBurger.classList.toggle("is-active")
    }, false)

    if(!cache.$hero) toggleBurgerBlack(true)
    else state.homepage = (cache.$hero.classList.contains('home'))
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