//===================================================================================================================================//
// Event listener that rotates and restarts the header background video randomly everytime the video ends.
//===================================================================================================================================//

const bgVideo = document.getElementById("header__bg-video");
bgVideo.playbackRate = 0.5;

const rotateVideo = () => {
    let randomNum = Math.floor(Math.random() * 4);
    
    bgVideo.removeAttribute("class");
    
    if(randomNum !== 0) {
      bgVideo.classList.add("rotate-video--"+randomNum);
    }

    bgVideo.play();
}

bgVideo.addEventListener('ended', rotateVideo);

//===================================================================================================================================//



//===================================================================================================================================//
// Observer that checks is video is in at least 70% of the screen and pauses video if not.
//===================================================================================================================================//

let isPaused = false;
const videoObserver = new IntersectionObserver((entries) => {
  const entry = entries[0];

  if(entry.intersectionRatio != 1  && !bgVideo.paused) {
    bgVideo.pause(); 
    isPaused = true;
  }
  else if(isPaused) {
    bgVideo.play(); 
    isPaused = false;
  }
}, 
{
  threshold: 0.6
});

videoObserver.observe(bgVideo);

//===================================================================================================================================//



//===================================================================================================================================//
// Event listeners for adding a shadow for the primary and secondary header titles that moves based on cursor position.
//===================================================================================================================================//

const header = document.querySelector(".header");
const primaryHead = header.querySelector(".header__text--primary");
const secondaryHead = header.querySelector(".header__text--secondary");

const shadowPrimary = (e) => {
  const width = header.offsetWidth;
  const height = header.offsetHeight;
  const walk = 10;
  const { clientX: x, clientY: y} = e;

  const xWalk = Math.round((x / width * walk) - (walk / 2));
  const yWalk = Math.round((y / height * walk) - (walk / 2));
  
  primaryHead.style.textShadow = `${xWalk}px ${yWalk}px 0 rgb(237, 69, 2)`;			
}

const shadowSecondary = (e) => {
  const width = header.offsetWidth;
  const height = header.offsetHeight;
  const walk = 5;
  const {clientX: x, clientY: y} = e;

  const xWalk = Math.round((x / width * walk) - (walk / 2));
  const yWalk = Math.round((y / height * walk) - (walk / 2));

  secondaryHead.style.textShadow = `${xWalk * -1}px ${yWalk * -1}px 0 rgb(2, 171, 236)`;
}

header.addEventListener("mousemove", shadowPrimary);
header.addEventListener("mousemove", shadowSecondary);

//===================================================================================================================================//



//===================================================================================================================================//
// Event listeners for pausing background video in header. For clicking, and for button press for accessibility.
// Changes button image from pause button to play button based on class name.
//===================================================================================================================================//

const pauseBtn = document.querySelector(".header__video-controls-icon");

const pauseEvent = (e) => {
  if(e.key !== 'Tab') {
    if(pauseBtn.getAttribute("name") === 'play-circle-outline') {
      bgVideo.play();
      pauseBtn.setAttribute("name", "pause-circle-outline");
    }
    else {
      bgVideo.pause();
      pauseBtn.setAttribute("name", "play-circle-outline");
    }
  }
}

pauseBtn.addEventListener("click", pauseEvent);
pauseBtn.addEventListener("keydown", pauseEvent);

//===================================================================================================================================//



//===================================================================================================================================//
// Event listener that scrolls to the about section when header button is clicked.
//===================================================================================================================================//

headerBtn = document.querySelector('.header__btn');

headerBtn.addEventListener('click', (e) => {
  e.preventDefault();

  const section = document.querySelector('#about');

  section.scrollIntoView({behavior: 'smooth'});
});

//===================================================================================================================================//


// Make mobile navigation work
const btnNavEl = document.querySelector('.btn-mobile-nav');
const navEl = document.querySelector('.main__nav');

btnNavEl.addEventListener('click', function() {
    navEl.classList.toggle('nav-open');
});


// Smooth scrolling
const allLinks = document.querySelectorAll('.link');

allLinks.forEach(function(link) {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        let href = link.getAttribute('href');

        // Scroll back to top
        if(href === '#') {
            window.scrollTo({
                top: 0,
                behavior: 'smooth',
            });
        }

        // Scroll to other links
        if(href !== '#' && href.startsWith('#')) {
            const sectionEl = document.querySelector(href);
            sectionEl.scrollIntoView({behavior: 'smooth'});
        }

        // Close mobile navigation
        if(link.classList.contains('nav__link-btn')) {
            navEl.classList.toggle('nav-open');
        }
    });
});



// Sticky Navigation
const sectionHeadEl = document.querySelector(".header");

const obs = new IntersectionObserver(
  function (entries) {
    const ent = entries[0];

    if (!ent.isIntersecting) {
      document.body.classList.add("sticky");
    }
    else {
        document.body.classList.remove("sticky");
    }
  },
  {
    // In the viewport
    root: null,
    threshold: 0,
    rootMargin: "40px",
  }
);
obs.observe(sectionHeadEl);


const navObserverOptions = {
  root: null,
  threshold: 0.5,
  rootMargin: '0px'
}

const aboutSection = document.getElementById('about');
const aboutBtn = document.getElementById("about-btn");

const aboutObs = new IntersectionObserver(
    (entries) => {
      const entry = entries[0];
  
      if (entry.isIntersecting) {
        aboutBtn.classList.add("active");
      }
      else {
          aboutBtn.classList.remove("active");
      }
    },
    navObserverOptions
);

aboutObs.observe(aboutSection);


const skillsSection = document.getElementById('skills');
const skillsBtn = document.getElementById("skills-btn");

const skillsObs = new IntersectionObserver(
    (entries) => {
      const entry = entries[0];
  
      if (entry.isIntersecting) {
        skillsBtn.classList.add("active");
      }
      else {
          skillsBtn.classList.remove("active");
      }
    },
    navObserverOptions
);

skillsObs.observe(skillsSection);


const projectsSection = document.getElementById('projects');
const projectsBtn = document.getElementById("projects-btn");

const projectsObs = new IntersectionObserver(
    (entries) => {
      const entry = entries[0];
  
      if (entry.isIntersecting) {
        projectsBtn.classList.add("active");
      }
      else {
          projectsBtn.classList.remove("active");
      }
    },
    {
      root: null,
      threshold: 0.4,
      rootMargin: '0px'
    }
);

projectsObs.observe(projectsSection);


const contactSection = document.getElementById('contact');
const contactBtn = document.getElementById("contact-btn");

const contactObs = new IntersectionObserver(
    (entries) => {
      const entry = entries[0];
  
      if (entry.isIntersecting) {
        contactBtn.classList.add("active");
      }
      else {
          contactBtn.classList.remove("active");
      }
    },
    navObserverOptions
);

contactObs.observe(contactSection);

//===================================================================================================================================//