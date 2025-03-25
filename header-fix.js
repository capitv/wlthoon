// Script to fix logo behavior
document.addEventListener('DOMContentLoaded', function() {
  // Fix logo elements
  const logoContainer = document.querySelector('.logo');

  // Remove any existing text element
  const logoText = logoContainer ? logoContainer.querySelector('.logo-text') : null;
  if (logoText) {
    logoText.remove();
  }

  // Make sure we have the logo
  let logoImg = logoContainer ? logoContainer.querySelector('.logo-img') : null;

  // If it doesn't exist, let's fix it
  if (!logoImg && logoContainer) {
    // Remove any existing images
    const existingImgs = logoContainer.querySelectorAll('img');
    existingImgs.forEach(img => img.remove());

    // Create new one
    logoImg = document.createElement('img');
    logoImg.src = 'berathoon-logo.png';
    logoImg.alt = 'Berathoon Logo';
    logoImg.className = 'logo-img';

    // Add it
    logoContainer.appendChild(logoImg);
  }

  // Add scroll event listener to header
  const header = document.getElementById('mainHeader');
  if (header) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    });
  }
});
