// Get elements
const scrollDownButton = document.getElementById('scrollDown');
const aboutUsSection = document.getElementById('aboutUs');
const contactFormSection = document.getElementById('contactForm');
const exploreButton = document.getElementById('explorebtn');
// Scroll down to About Us section when the button is clicked
scrollDownButton.addEventListener('click', () => {
  // Smooth scroll to the About Us section
  aboutUsSection.scrollIntoView({ behavior: 'smooth' });

  // Show the About Us section
  aboutUsSection.classList.add('show-section');
});
exploreButton.addEventListener('click', () => {
  window.location.href = 'main.html';
});
// Show Contact Form section once About Us section is visible
window.addEventListener('scroll', () => {
  if (window.scrollY + window.innerHeight > aboutUsSection.offsetTop + aboutUsSection.offsetHeight) {
    contactFormSection.classList.add('show-section');
  }
});

// Initialize Notyf instance
const notyf = new Notyf();

// Add event listener to the form
document.addEventListener('DOMContentLoaded', () => {
    const contributeForm = document.querySelector('form');

    contributeForm.addEventListener('submit', async (event) => {
        event.preventDefault(); // Prevent default form submission

        // Collect data from the form
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            dataset: document.getElementById('data').value,
            openSourceLink: document.getElementById('os').value,
            codeDescription: document.getElementById('codedesc').value,
        };

        try {
            // Send the form data to the backend
            const response = await fetch('http://127.0.0.1:5000/contribute', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) throw new Error('Failed to submit the form');

            // Notify success
            notyf.success('Thank you for contributing! Your data has been successfully submitted.');

            // Reset the form
            contributeForm.reset();
        } catch (error) {
            console.error('Error submitting form:', error);

            // Notify error
            notyf.error('An error occurred while submitting your data. Please try again later.');
        }
    });
});
