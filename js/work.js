function init() {
    // toggle state
    let state = {}

    let $tags = document.querySelectorAll('.tag'),
        $head = document.querySelector('nav[role="desktop"]'),
        $tagparent = document.querySelector('.tags'),
        $wrap = document.querySelector('.project-banners'),
        $banners = Array.from(document.querySelectorAll('.img-item'))

    Array.from($tags).forEach(addClickEvent)


    function addClickEvent(el) {
        let tag = el.getAttribute('data-tag')
        state[tag] = false
        el.addEventListener("click", toggleTags)
    }
    function toggleTags() {
        let tag = this.getAttribute('data-tag')
        state[tag] = this.classList.toggle('active')
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
            if (name != 'active') {
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
    let debounce = false
    function throttle() {
        debounce = true
        setTimeout(() => {
            debounce = false
        }, 200)
    }

    $wrap.style.marginTop = $head.offsetHeight + "px"
    window.addEventListener("resize", function () {
        if($tagparent.getBoundingClientRect().top > 0) {
            tagHeight = $tagparent.offsetHeight
            $wrap.style.marginTop = $head.offsetHeight + "px"
        }
    })
    let tagHeight = $tagparent.offsetHeight
    document.addEventListener("scroll", function () {
        if(!debounce) {  
            if(!$tagparent.classList.contains('sticky')) {                
                // non-sticky
                if($tagparent.getBoundingClientRect().top < 0) {
                    $wrap.style.paddingTop = tagHeight + "px" 
                    $tagparent.classList.add('sticky')
                    throttle()
                } else {
                    tagHeight = $tagparent.offsetHeight
                }
            } else {
                // sticky
                if(window.scrollY < tagHeight) {                    
                    if($tagparent.classList.contains('sticky')) {
                        $tagparent.classList.remove('sticky')
                        $wrap.style.paddingTop = "0px"
                        throttle()
                    }
                }
            }
        }
    })
}
window.onload = init