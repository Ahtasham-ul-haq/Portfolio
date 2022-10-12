const header = document.querySelector("header");

const first_skill = document.querySelector(".skill:first-child");
const sk_counters = document.querySelectorAll(".counter span");
const progress_bars = document.querySelectorAll(".skill svg circle");

const ml_section = document.querySelector(".milestones");
const ml_counters = document.querySelectorAll(".number span");

const prt_section = document.querySelector(".portfolio");
const zoom_icons = document.querySelectorAll(".zoom-icon");
const modal_overlay = document.querySelector(".modal-overlay");
const images = document.querySelectorAll(".images img");
const prev_btn = document.querySelector(".prev-btn");
const next_btn = document.querySelector(".next-btn");

const links = document.querySelectorAll(".nav-link")

const toggle_btn = document.querySelector(".toggle-btn")

window.addEventListener("scroll", () =>{
    activeLinks();
    if(!skillsPlayed) skillsCounter();
    if(!mlPlayed) mlCounters();
})


function updateCount(num , maxNum){
    let currentNum = +num.innerText;
    
    if(currentNum < maxNum){
        num.innerText = currentNum + 1;
        setTimeout(() => {
            updateCount(num, maxNum);
        }, 12);
    }
}

// ---------------STICKY NAVBAR-----------------

function stickyNavbar(){
    header.classList.toggle("scrolled" , window.pageYOffset > 0);
}
stickyNavbar();
window.addEventListener("scroll", stickyNavbar);

// ---------------REVEAL ANIMATION-----------------

let sr = ScrollReveal({
    duration: 2500,
    distance: "60px"
});
sr.reveal(".showcase-info" , {delay : 600});
sr.reveal(".showcase-image" , {delay: 700, origin: "top" });

// ---------------SKILL PROGREESS BAR ANIMATION-----------------

function hasReached(el) {
    let topPosition = el.getBoundingClientRect().top;
    
    if(window.innerHeight >= topPosition + el.offsetHeight) return true;
    return false;
}



let skillsPlayed = false;

function skillsCounter() {
    if(!hasReached(first_skill)) return;
    skillsPlayed = true;
    sk_counters.forEach((counter, i) =>{
        let target = +counter.dataset.target;
        let strokeValue = 427 - 427 * (target / 100);
        progress_bars[i].style.setProperty("--target" , strokeValue);

        setTimeout(() => {
            updateCount(counter , target);
        }, 400);
    })

    progress_bars.forEach((p) =>
    (p.style.animation = "progress 2s ease-in-out forwards"))
}

// ---------------SERVICES COUNTER ANIMATION-----------------

let mlPlayed = false;

function mlCounters() {
    if(!hasReached(ml_section)) return;
    mlPlayed = true;
    ml_counters.forEach(ctr => {
        let target = +ctr.dataset.target;
        
        setTimeout(() => {
            updateCount(ctr, target);
        }, 400)
    })
}

mlCounters();

// ---------------PORTFOLIO FILTER ANIMATION-----------------

let mixer = mixitup(".portfolio-gallery", {
    selectors: {
        target: '.prt-card'
    },
    animation: {
        duration: 500,
    }
});

// ---------------MODAL POP UP ANIMATION-----------------

let currentIndex = 0;

zoom_icons.forEach((icn, i) =>
icn.addEventListener("click", () =>{
    prt_section.classList.add("open")
    document.body.classList.add("stopScrolling");
    currentIndex = i;
    changeImage(currentIndex);
})
);

modal_overlay.addEventListener("click" , () => {
    prt_section.classList.remove("open")
    document.body.classList.remove("stopScrolling")
});

prev_btn.addEventListener("click" , () => {
    if(currentIndex=== 0){
    currentIndex = 5
    }
    else{
    currentIndex--;
    }
    changeImage(currentIndex);
})

next_btn.addEventListener("click" , () => {
    if(currentIndex=== 5){
    currentIndex = 0
    }
    else{
    currentIndex++;
    }
    changeImage(currentIndex);
})

function changeImage(index){
    images.forEach(img => img.classList.remove("showImage"))
    images[index].classList.add("showImage")
}

// ---------------SWIPER ANIMATION-----------------

const swiper = new Swiper('.swiper', {
    loop: true,
    speed : 500,
    autoplay :true,
  
    // If we need pagination
    pagination: {
      el: '.swiper-pagination',
      clickable : true
    },
});

// ---------------ACTIVE NAV_LINKS ANIMATION-----------------

function activeLinks () {
    let sections = document.querySelectorAll("section[id]");
    let passedSection = Array.from(sections)
        .map((sct, i) => {
            return {
            y : sct.getBoundingClientRect().top - header.offsetHeight,
            id: i,
            };
    })
    .filter ((sct) => sct.y <= 0);


    let currSectionID = passedSection.at(-1).id;

    links.forEach(l => l.classList.remove("active"));
    links[currSectionID].classList.add("active");
}

activeLinks ();


// ---------------CHANGE THEME ANIMATION-----------------


let firstTheme = localStorage.getItem("dark")

changeTheme(+firstTheme);

function changeTheme(isDark) {
    if(isDark){
        document.body.classList.add("dark")
        toggle_btn.classList.replace("uil-moon" , "uil-sun")
        localStorage.setItem("dark", 1)
    }
    else{
        document.body.classList.remove("dark")
        toggle_btn.classList.replace("uil-sun" , "uil-moon")
        localStorage.setItem("dark", 0)
    }
}

toggle_btn.addEventListener("click" , () => {
    changeTheme(!document.body.classList.contains("dark"));
})