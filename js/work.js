function init() {
    // toggle state
    let state = {}

    let $tags = document.querySelectorAll('.tag'),
        $head = document.querySelector('nav[role="desktop"]'),
        $tagparent = document.querySelector('.tags'),
        $wrap = document.querySelector('.project-banners'),
        $banners = Array.from(document.querySelectorAll('.img-item')),
        $footer = document.querySelector("footer .layout")

    Array.from($tags).forEach(addClickEvent)
    Array.from($banners).forEach(addTouchStart)

    function addTouchStart(el) {
        el.addEventListener('touchstart', function() {
            this.classList.toggle('hover')    
        })
    }
    function addClickEvent(el) {
        let tag = el.getAttribute('data-tag')
        state[tag] = false
        el.addEventListener("click", toggleTags)
    }
    function toggleTags() {
        let tag = this.getAttribute('data-tag')
        // state[tag] = this.classList.toggle('active')
        Array.from(document.querySelectorAll('.tag')).forEach(el => {
            if(el.getAttribute('data-tag') == tag) state[tag] = el.classList.toggle('active')
        })
        setTimeout(() => {
            window.scroll({
              top: $wrap.offsetHeight / 2,
              behavior: 'smooth'
            })
        }, 150)
        // check if we apply toggle or init state
        let toggle = false
        Object.keys(state).forEach((key) => {
            if(state[key]) toggle = true   
        })
        if(toggle) $banners.forEach(toggleFilter)
        else $banners.forEach(initState)
    }
    function initState(el) {
        if(el.classList.contains('hide')) el.classList.remove('hide')
    }
    function toggleFilter(el) {
        let hide = true,
            classes = Array.from(el.classList).filter(name => {
            if(name != 'active') {
              if(name != 'img-item') return name
            } 
        })        
        for (var tag of classes) {
            Object.keys(state).forEach((key) => {
                if(state[key]) {                        
                    if(tag == key) hide = false
                }
            })
        }
        if(hide) {
            if(!el.classList.contains('hide')) el.classList.add('hide')
        } else {
            if(el.classList.contains('hide')) el.classList.remove('hide')
        }
    }

    let tagHeight = $tagparent.offsetHeight
    document.addEventListener("scroll", function () {
        let pageBottom = ($footer.getBoundingClientRect().top - window.innerHeight) - (window.innerHeight * 0.1),
            pageTop = window.scrollY - $head.offsetHeight

        if(!debounce) {  
            if(!$tagparent.classList.contains('sticky')) {                
                // non-sticky
                if(window.scrollY > $head.offsetHeight && pageBottom > 0) {
                    $tagparent.classList.add('sticky')
                } 
            } else {
                // sticky
                if(window.scrollY < $head.offsetHeight || pageBottom < 0) {
                    if($tagparent.classList.contains('sticky')) {
                        $tagparent.classList.remove('sticky')
                    }
                }
            }
            throttle()
        }
    })

    let debounce = false
    function throttle() {
        debounce = true
        setTimeout(() => {
            debounce = false
        }, 50)
    }
}
window.onload = init