$(document).ready(function () {
    // Add smooth scrolling to all links
    $('a').on('click', function (event) {
        // Make sure this.hash has a value before overriding default behavior
        console.log(event);
        if (this.hash !== '') {
            // Prevent default anchor click behavior
            event.preventDefault();

            // Store hash
            var hash = this.hash;

            // Using jQuery's animate() method to add smooth page scroll
            // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
            $('html, body').animate(
                {
                    scrollTop: $(hash).offset().top,
                },
                300,
                function () {
                    // Add hash (#) to URL when done scrolling (default click behavior)
                    window.location.hash = hash;
                }
            );
        } // End if
    });
});

const handleMenu = (event, option) => {
    console.log(event);
    event.preventDefault();

    const navContainer = document.querySelector('.sidebar');
    const nav = document.querySelector('.sidebar-nav');
    const navOptions = document.querySelector('.sidebar-nav-options');
    const navButton = document.querySelector('.sidebar-nav-btn');
    const navClose = document.querySelector('.sidebar-nav-close');

    if (option === 'close') {
        if (window.matchMedia('(max-width: 37.5em)').matches) {
            navContainer.style = 'width: 0';
        }
        nav.style = 'width: 100%;';
        if (window.matchMedia('(max-width: 37.5em)').matches) {
            navOptions.style = 'opacity: 0; width: 0;';
        } else {
            navOptions.style = 'opacity: 0; width: 0;';
        }

        navButton.style = 'display: block;';
        navClose.style = 'display: none;';
    }
    if (option === 'open') {
        if (window.matchMedia('(max-width: 37.5em)').matches) {
            navContainer.style = 'width: 100vw';
        }
        nav.style = 'width: 300%;';
        if (window.matchMedia('(max-width: 37.5em)').matches) {
            navOptions.style = 'opacity: 1; width: 100%;';
        } else {
            navOptions.style = 'opacity: 1; width: 24.6rem;';
        }

        navButton.style = 'display: none;';
        navClose.style = 'display: block;';
    }
};

function handleHover(event, fromLink) {
    console.log(event);
    if (fromLink) {
        event.target.parentElement.classList.add('style-before');
    } else {
        event.target.classList.add('style-before');
    }
}

function handleHoverOut(event, fromLink) {
    console.log(event);
    if (fromLink) {
        event.target.parentElement.classList.remove('style-before');
    } else {
        event.target.classList.remove('style-before');
    }
}

function handleMenuOption(event) {
    console.log(event);
    if (window.matchMedia('(max-width: 37.5em)').matches) {
        const navContainer = document.querySelector('.sidebar');
        const nav = document.querySelector('.sidebar-nav');
        const navOptions = document.querySelector('.sidebar-nav-options');
        const navButton = document.querySelector('.sidebar-nav-btn');
        const navClose = document.querySelector('.sidebar-nav-close');

        navContainer.style = 'width: 0';
        nav.style = 'width: 100%;';
        navOptions.style = 'opacity: 0; width: 0;';
        navButton.style = 'display: block;';
        navClose.style = 'display: none;';
    }
}
