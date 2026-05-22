

// the fade in effect
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if(entry.isIntersecting){
            entry.target.classList.add('appear');
        }
    });
}, {threshold: 0.2});

document.querySelectorAll('.recipe-card').forEach(card => observer.observe(card));

//the slider
function moveSlider(button, direction) {
    //find the specific window next to the button clicked
    const windowView = button.parentElement.querySelector('.slider-window');

    //calculate how far to move
    const scrollAmount = windowView.offsetWidth * 0.8;

    windowView.scrollBy({
        left: scrollAmount * direction,
        behavior: 'smooth'
    });
}

