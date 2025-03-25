// Script to implement updates to the Berathoon site
document.addEventListener('DOMContentLoaded', function() {
  // 1. Update mint date to April 9th
  updateMintDate();

  // 2. Update supply to 4,444
  updateSupply();

  // 3. Change GTD and FCFS status to "Coming Thoon"
  updateMintStages();

  // 4. Make images appear randomly when user visits the site
  setupRandomGallery();

  // 5. Ensure the header is fixed correctly (logo only, no text)
  fixHeader();
});

// Update mint date to April 9th
function updateMintDate() {
  const mintDateLabel = document.querySelector('.mint-date-label');
  if (mintDateLabel) {
    mintDateLabel.textContent = 'Target date: April 9, 2025 - 12:00 UTC';
  }

  // Update countdown timer target date
  window.mintTargetDate = new Date("April 9, 2025 12:00:00 UTC").getTime();
}

// Update supply to 4,444
function updateSupply() {
  const supplyElement = document.querySelector('.info-item .info-value');
  if (supplyElement && supplyElement.textContent.includes('10,000')) {
    supplyElement.textContent = '4,444';
  }
}

// Change GTD and FCFS status to "Coming Thoon"
function updateMintStages() {
  const tableRows = document.querySelectorAll('.mint-table tbody tr');
  if (tableRows && tableRows.length > 0) {
    // First two stages (GTD and FCFS) should be "Coming Thoon"
    for (let i = 0; i < Math.min(2, tableRows.length); i++) {
      const statusCell = tableRows[i].querySelector('.status-badge');
      if (statusCell) {
        statusCell.textContent = 'Coming Thoon';
        statusCell.classList.remove('status-active');
        statusCell.classList.add('status-soon');
      }
    }
  }
}

// Make images appear randomly when user visits the site
function setupRandomGallery() {
  const gallery = document.getElementById('galleryTrack');
  if (!gallery) return;

  // Clear existing gallery
  gallery.innerHTML = '';

  // Create array of image paths - Using the new gallery images
  const imagePaths = [
    'gallery/bear1.jpg',
    'gallery/bear2.jpg',
    'gallery/bear3.jpg',
    'gallery/bear4.jpg',
    'gallery/bear5.jpg',
    'gallery/bear6.jpg'
  ];

  // Shuffle the array
  for (let i = imagePaths.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [imagePaths[i], imagePaths[j]] = [imagePaths[j], imagePaths[i]];
  }

  // Create new slides with random images
  imagePaths.forEach((path, index) => {
    const slide = document.createElement('div');
    slide.className = 'gallery-slide';

    const img = document.createElement('img');
    img.src = path;
    img.alt = `Berathoon Character ${index + 1}`;
    img.setAttribute('data-index', index);
    img.style.width = '100%'; // Ensure image fills slide
    img.style.height = 'auto';
    img.style.borderRadius = '10px';
    img.style.objectFit = 'cover';

    slide.appendChild(img);
    gallery.appendChild(slide);

    // Add click event for lightbox
    img.addEventListener('click', () => {
      const lightbox = document.getElementById('lightbox');
      const lightboxImg = document.getElementById('lightboxImg');
      if (lightbox && lightboxImg) {
        lightboxImg.src = path;
        lightboxImg.setAttribute('data-index', index);
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  // Reinitialize gallery functionality
  initializeGallery();
}

// Ensure the header is fixed correctly (logo only, no text)
function fixHeader() {
  const logoContainer = document.querySelector('.logo');
  if (!logoContainer) return;

  // Remove any existing text element
  const logoText = logoContainer.querySelector('.logo-text');
  if (logoText) {
    logoText.remove();
  }

  // Make sure we have the logo
  let logoImg = logoContainer.querySelector('.logo-img');

  // If it doesn't exist, let's fix it
  if (!logoImg) {
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
}

// Reinitialize gallery functionality
function initializeGallery() {
  // This function will be called after the gallery slides are randomly replaced
  const galleryTrack = document.getElementById('galleryTrack');
  const gallerySlides = document.querySelectorAll('.gallery-slide');
  const galleryPrev = document.getElementById('galleryPrev');
  const galleryNext = document.getElementById('galleryNext');

  if (!galleryTrack || !gallerySlides.length || !galleryPrev || !galleryNext) return;

  let currentIndex = 0;
  const slideCount = gallerySlides.length;
  let slideWidth = gallerySlides[0].offsetWidth;
  let slidesPerView = getSlidesPerView();

  // Update slide width on resize
  function updateSlideWidth() {
    slideWidth = gallerySlides[0].offsetWidth;
    slidesPerView = getSlidesPerView();
    goToSlide(currentIndex);
  }

  // Get number of slides per view based on window width
  function getSlidesPerView() {
    if (window.innerWidth <= 480) return 1;
    if (window.innerWidth <= 768) return 2;
    if (window.innerWidth <= 1024) return 3;
    return 4;
  }

  // Go to specific slide
  function goToSlide(index) {
    currentIndex = index;
    const offset = -currentIndex * slideWidth;
    galleryTrack.style.transform = `translateX(${offset}px)`;

    // Update active class
    gallerySlides.forEach((slide, i) => {
      slide.classList.toggle('active', i === currentIndex);
    });
  }

  // Go to next slide
  function nextSlide() {
    if (currentIndex < slideCount - slidesPerView) {
      goToSlide(currentIndex + 1);
    } else {
      goToSlide(0);
    }
  }

  // Go to previous slide
  function prevSlide() {
    if (currentIndex > 0) {
      goToSlide(currentIndex - 1);
    } else {
      goToSlide(slideCount - slidesPerView);
    }
  }

  // Event listeners
  galleryNext.addEventListener('click', nextSlide);
  galleryPrev.addEventListener('click', prevSlide);

  // Update on window resize
  window.addEventListener('resize', updateSlideWidth);
  updateSlideWidth();

  // Auto scroll gallery
  setInterval(nextSlide, 5000);
}

// Update the countdown timer function
const originalUpdateCountdown = window.updateCountdown;
window.updateCountdown = function() {
  // Use the updated mint target date
  const targetDate = window.mintTargetDate || new Date("April 9, 2025 12:00:00 UTC").getTime();
  const now = new Date().getTime();
  const timeLeft = targetDate - now;

  if (timeLeft > 0) {
    // Calculate time components
    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

    // Display the result
    const countdownDays = document.getElementById("countdown-days");
    const countdownHours = document.getElementById("countdown-hours");
    const countdownMinutes = document.getElementById("countdown-minutes");
    const countdownSeconds = document.getElementById("countdown-seconds");

    if (countdownDays) countdownDays.textContent = days.toString().padStart(2, '0');
    if (countdownHours) countdownHours.textContent = hours.toString().padStart(2, '0');
    if (countdownMinutes) countdownMinutes.textContent = minutes.toString().padStart(2, '0');
    if (countdownSeconds) countdownSeconds.textContent = seconds.toString().padStart(2, '0');
  }
};
