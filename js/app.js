/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
 */

document.addEventListener("DOMContentLoaded", _ => {
    /**
     * Define Global Variables
     * 
     */
    const activeClassName = 'active',
        navList = document.querySelector('#navbar__list'),
        sections = document.querySelectorAll('main section');

    let lowestTop = window.innerHeight;

    /**
     * End Global Variables
     * Start Helper Functions
     * 
     */


    const activateVisibleSection = _ => {
        let visibleSection = null;
        sections.forEach(section => {
            section.classList.remove('active');
            // const h2 = section.querySelector('h2');
            // const elemTop = getElemTop(h2);
            const elemTop = getElemTop(section);
            if (isElemTopVisible(elemTop) && elemTop < lowestTop) {
                lowestTop = elemTop;
                visibleSection = section;
            }
        });
        if (visibleSection) {
            const sectionId = visibleSection.getAttribute('id'),
                navItem = document.querySelector(`#navbar__list li[data-section-id="${sectionId}"]`);
            visibleSection.classList.add(activeClassName);
            navItem && activateNavItem(navItem);
        }
    }


    const getElemTop = elem => elem.getBoundingClientRect().top

    const isElemTopVisible = elemTop => elemTop >= 0 && elemTop < window.innerHeight



    // build nav item
    const addNavItem = section => {
        const sectionId = section.getAttribute('id'),
            sectionTitle = section.getAttribute('data-nav'),
            li = document.createElement('li'),
            a = document.createElement('a');
        li.setAttribute('data-section-id', sectionId);
        a.setAttribute('href', `#${sectionId}`);
        a.className = 'menu__link';
        a.textContent = sectionTitle;
        a.addEventListener('click', e => {
            e.preventDefault();
            section.scrollIntoView({
                behavior: 'smooth'
            });
        })
        li.appendChild(a);
        navList.appendChild(li);
    }

    const activateNavItem = NavItem => {
        navList.querySelectorAll('li').forEach(li => li.classList.remove(activeClassName))
        NavItem.classList.add(activeClassName);
    }
    /**
     * End Helper Functions
     * Begin Main Functions
     * 
     */

    // build the nav

    sections.forEach(section => addNavItem(section));



    // Add active class to section when near top of viewport

    let lastKnownScrollPosition = 0,
        processing = false;

    document.addEventListener('scroll', e => {
        lastKnownScrollPosition = window.scrollY;
        if (!processing) {
            window.requestAnimationFrame(_ => {
                lowestTop = window.innerHeight; // reset
                activateVisibleSection();
                processing = false;
            });
            processing = true;
        }
    });


});