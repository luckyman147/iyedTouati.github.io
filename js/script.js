document.addEventListener("DOMContentLoaded", () => {
    const modal = document.getElementById("image-modal");
    const enlargedImg = document.getElementById("enlarged-image");
    const closeModal = document.querySelector(".close");
  
    // Add click event listener to all images with id 'App_img'
    const images = document.querySelectorAll("#App_img");
    images.forEach(image => {
      image.addEventListener("click", () => {
        enlargedImg.src = image.src; // Set modal image source to clicked image
        modal.style.display = "flex"; // Show modal
      });
    });
  
    // Close modal when clicking the close button
    closeModal.addEventListener("click", () => {
      modal.style.display = "none";
    });
  
    // Close modal when clicking outside the image
    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        modal.style.display = "none";
      }
    });
  });
  