var contact = document.querySelector('#contact');
var slideLeft = document.querySelectorAll('.slide');

function debounce(func, delay) {
    var inDebounce;
    return function () {
        var context = this;
        var args = arguments;
        clearTimeout(inDebounce);
        inDebounce = setTimeout(() => func.apply(context, args), delay);
    }
}

function smoothScroll(target, duration) {
    var target = document.querySelector(target);
    var targetPosition = target.getBoundingClientRect().top;
    var startPosition = window.pageYOffset || window.scrollY;
    var distance = targetPosition - startPosition;
    var startTime = null;

    function loop(currentTime) {
        if (startTime === null) startTime = currentTime;
        var timeElapsed = currentTime - startTime;
        var run = ease(timeElapsed, startPosition, distance, duration);
        window.scrollTo(0, run);
        if (timeElapsed < duration) requestAnimationFrame(loop);
    }
    function ease(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
    }
    requestAnimationFrame(loop);
}


function fadeItems() {
    slideLeft.forEach(slide => {
        if (slide.getBoundingClientRect().top - window.innerHeight / 1.3 < 0) {
            slide.classList.add('fade');
        }
    });

}


window.addEventListener("scroll", debounce(fadeItems, 100));

contact.addEventListener('click', function () {
    smoothScroll('.contact', 1000)
});