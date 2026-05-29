

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



//the about section


document.getElementById('aboutNavLink').addEventListener('click', function(event) {
  // Check if the user is currently on the home page view
  if (window.location.pathname === '/' || window.location.pathname.endsWith('index.html')) {
    
    const aboutSection = document.getElementById('about');
    
    if (aboutSection) {
      event.preventDefault(); // Stop the browser from instantly reloading/jumping
      
      // Smoothly slide the window viewport right to the about section box
      aboutSection.scrollIntoView({ 
        behavior: 'smooth' 
      });
    }
  }
});




//the contact slide down


document.getElementById('contactNavLink').addEventListener('click', function(event) {
  // Check if the user is currently on the home page
  if (window.location.pathname === '/' || window.location.pathname.endsWith('index.html')) {
    
    const contactSection = document.getElementById('contact');
    
    if (contactSection) {
      event.preventDefault(); // Stops the instant jumping/glitching
      
      // Smoothly glides the page all the way to the footer
      contactSection.scrollIntoView({ 
        behavior: 'smooth' 
      });
    }
  }
});


//increasing/decreasing ingredient amounts

// 1. Grab all our HTML elements
const decreaseBtn = document.getElementById('decreaseServings');
const increaseBtn = document.getElementById('increaseServings');
const servingsDisplay = document.getElementById('servingsValue');
const ingredientElements = document.querySelectorAll('.ingredient-amount');

// 2. Read our starting values from the HTML data attributes
const baseServings = parseInt(servingsDisplay.getAttribute('data-base-servings'));
let currentServings = baseServings;

// 3. The Core Function that handles the math
function updateRecipeValues() {
  // Update the servings text box
  servingsDisplay.textContent = `${currentServings} servings`;

  // Loop through every single ingredient number on the page
  ingredientElements.forEach(element => {
    // Get the original measurement for the starting serving size
    const baseAmount = parseFloat(element.getAttribute('data-base-amount'));
    
    // The Math: (Original Amount / Original Servings) * New Servings
    let newAmount = (baseAmount / baseServings) * currentServings;
    
    // Clean up the decimals so you don't get ugly numbers like 1.33333333
    // This rounds it to a maximum of 2 decimal places if needed
    element.textContent = Math.round(newAmount * 100) / 100;
  });
}

// 4. Set up the Plus button event listener
increaseBtn.addEventListener('click', () => {
  currentServings += 1; // Add 1 serving
  updateRecipeValues();  // Run the math function
});

// 5. Set up the Minus button event listener
decreaseBtn.addEventListener('click', () => {
  // Prevent the servings from dropping below 1 (you can't cook 0 servings!)
  if (currentServings > 1) {
    currentServings -= 1; // Subtract 1 serving
    updateRecipeValues();  // Run the math function
  }
});

