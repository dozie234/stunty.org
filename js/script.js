document.addEventListener('DOMContentLoaded', () => {
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');

  hamburger.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');
    
    // Toggle hamburger icon animation transform (X effect)
    const bars = hamburger.querySelectorAll('.bar');
    if (mobileMenu.classList.contains('active')) {
      bars[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
      bars[1].style.opacity = '0';
      bars[2].style.transform = 'rotate(-45deg) translate(6px, -6px)';
    } else {
      bars[0].style.transform = 'none';
      bars[1].style.opacity = '1';
      bars[2].style.transform = 'none';
    }
  });
});

const form = document.querySelector('.contact-form');
  const submitBtn = document.querySelector('.btn-submit');

  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      // Disable button and update UI text during submission
      submitBtn.disabled = true;
      const originalBtnText = submitBtn.innerText;
      submitBtn.innerText = 'Sending Inquiry...';

      const formData = new FormData(form);

      try {
        const response = await fetch(form.action, {
          method: 'POST',
          body: formData,
          headers: {
            'Accept': 'application/json'
          }
        });

        if (response.ok) {
          // Success feedback
          submitBtn.style.backgroundColor = '#05472A';
          submitBtn.style.borderColor = '#FF5500';
          submitBtn.innerText = '✓ Message Sent Successfully!';
          form.reset();

          // Reset button state after 5 seconds
          setTimeout(() => {
            submitBtn.disabled = false;
            submitBtn.style.backgroundColor = '';
            submitBtn.innerText = originalBtnText;
          }, 5000);
        } else {
          throw new Error('Submission failed');
        }
      } catch (error) {
        // Error handling
        submitBtn.style.backgroundColor = '#d9534f';
        submitBtn.innerText = 'Error! Please Try Again.';
        
        setTimeout(() => {
          submitBtn.disabled = false;
          submitBtn.style.backgroundColor = '';
          submitBtn.innerText = originalBtnText;
        }, 4000);
      }
    });
  }