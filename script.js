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
// OBSERVER FOR INTRO ANIMATIONS ON CONTACT SECTION.
//===================================================================================================================================//

const contactGrid = document.getElementById('contact__grid');
const contactHeading = document.getElementById('contact__heading');
const contactMap = document.getElementById('contact__map');
const contactBorder = document.getElementById('contact__center-border');
const contactForm = document.getElementById('contact__form');
const contactPhone = document.getElementById('contact__phone');

const contactGridObserver = new IntersectionObserver(
    (entries) => {
      const entry = entries[0];
  
      if (entry.isIntersecting) {
        contactHeading.classList.add('move-in-down__header');
        contactPhone.classList.add('move-in-up__phone');
        contactMap.classList.add('move-in-left__map');
        contactBorder.classList.add('grow-out-height__border');
        contactForm.classList.add('move-in-right__form');
      }
    },
    { rootMargin: "90px" }
);

contactGridObserver.observe(contactGrid);

//===================================================================================================================================//



//===================================================================================================================================//
// OBSERVER FOR INTRO ANIMATIONS ON PROJECTS SECTION.
//===================================================================================================================================//

const projectGrid = document.getElementById('project__grid');
const projectHeader = document.getElementById('project__header');

const projectDescription1 = document.getElementById('project__description--1');
const projectDescription2 = document.getElementById('project__description--2');
const projectDescription3 = document.getElementById('project__description--3');

const projectImages1 = document.getElementById('project__images--1');
const projectImages2 = document.getElementById('project__images--2');
const projectImages3 = document.getElementById('project__images--3');

const rowBorder1 = document.getElementById('project__row-border--1');
const rowBorder2 = document.getElementById('project__row-border--2');

const columnBorder1 = document.getElementById('project__column-border--1');
const columnBorder2 = document.getElementById('project__column-border--2');
const columnBorder3 = document.getElementById('project__column-border--3');

const projectBottomLink = document.getElementById('section__bottom-link--projects');

const projectGridObserver = new IntersectionObserver(
  (entries) => {
    const entry = entries[0];

    if (entry.isIntersecting) {
      projectHeader.classList.add('move-in-down__header');

      projectDescription1.classList.add('move-in-left__description--1');
      projectDescription2.classList.add('move-in-right__description--2');
      projectDescription3.classList.add('move-in-left__description--3');

      projectImages1.classList.add('move-in-right__images--1');
      projectImages2.classList.add('move-in-left__images--2');
      projectImages3.classList.add('move-in-right__images--3');

      columnBorder1.classList.add('grow-out-height__border-col--1');
      columnBorder2.classList.add('grow-out-height__border-col--2');
      columnBorder3.classList.add('grow-out-height__border-col--3');

      rowBorder1.classList.add('grow-out-width__border-row--1');
      rowBorder2.classList.add('grow-out-width__border-row--2');

      projectBottomLink.classList.add('move-in-up__bottom-link--projects');
    }
  },
  { rootMargin: "5px" }
);

projectGridObserver.observe(projectGrid);

//===================================================================================================================================//



//===================================================================================================================================//
// OBSERVER FOR INTRO ANIMATIONS ON SKILLS SECTION.
//===================================================================================================================================//

const skillsGrid = document.getElementById('skills');
const skillsHeader = document.getElementById('skills__header');

const skillsMainText = document.getElementById('skills__main-text');

const skillsList1 = document.getElementById('skills__list--1');
const skillsList2 = document.getElementById('skills__list--2');

const skillsColumnBorder = document.getElementById('skills__column-border');

const skillsOtherList = document.getElementById('skills__other-list');

const skillsBottomLink = document.getElementById('section__bottom-link--skills');

const skillsGridObserver = new IntersectionObserver(
    (entries) => {
      const entry = entries[0];
  
      if (entry.isIntersecting) {
        skillsHeader.classList.add('move-in-down__header');
      
        skillsMainText.classList.add('move-in-left__main-text');

        skillsList1.classList.add('move-in-left__list--1');
        skillsList2.classList.add('move-in-right__list--2');

        skillsColumnBorder.classList.add('grow-out-height__column-border');

        skillsOtherList.classList.add('move-in-right__other-list');

        skillsBottomLink.classList.add('move-in-up__bottom-link--skills');
      }
    },
    { rootMargin: "-1px" }
);

skillsGridObserver.observe(skillsGrid);

//===================================================================================================================================//



//===================================================================================================================================//
// OBSERVER FOR INTRO ANIMATIONS ON ABOUT SECTION.
//===================================================================================================================================//

const aboutGrid = document.getElementById('about__grid');
const aboutHeader = document.getElementById('about__header');
const aboutPhoto = document.getElementById('about__photo');
const aboutBorder = document.getElementById('about__row-border');

const aboutInfoAddress = document.getElementById('about__info--address');
const aboutInfoPhone = document.getElementById('about__info--phone');
const aboutInfoEmail = document.getElementById('about__info--email');

const aboutSocialLinkedin = document.getElementById('about__social--linkedin');
const aboutSocialGithub = document.getElementById('about__social--github');
const aboutSocialResume = document.getElementById('about__social--resume');

const aboutMainText1 = document.getElementById('about__main-text--1');
const aboutMainText2 = document.getElementById('about__main-text--2');
const aboutMainText3 = document.getElementById('about__main-text--3');

const aboutBottomLink = document.getElementById('section__bottom-link--about');

const aboutGridObserver = new IntersectionObserver(
    (entries) => {
      const entry = entries[0];
  
      if (entry.isIntersecting) {
        aboutHeader.classList.add('move-in-down__header');
        aboutPhoto.classList.add('move-in-left__photo');

        aboutInfoAddress.classList.add('move-in-down__info--address');
        aboutInfoPhone.classList.add('move-in-down__info--phone');
        aboutInfoEmail.classList.add('move-in-down__info--email');

        aboutBorder.classList.add('grow-out-wide__row-border');

        aboutSocialLinkedin.classList.add('move-in-left__social--linkedin');
        aboutSocialGithub.classList.add('move-in-left__social--github');
        aboutSocialResume.classList.add('move-in-left__social--resume');

        aboutMainText1.classList.add('move-in-right__main-text--1');
        aboutMainText2.classList.add('move-in-right__main-text--2');
        aboutMainText3.classList.add('move-in-right__main-text--3');

        aboutBottomLink.classList.add('move-in-up__bottom-link--about');
      }
    },
    { rootMargin: "-1px" }
);

aboutGridObserver.observe(aboutGrid);

//===================================================================================================================================//