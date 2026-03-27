function changeImage(imgs) {
    // Get the expanded image element
    var expandImg = document.getElementById("expandedImg");
    // Use the same src in the expanded image as the image being clicked on from the grid
    expandImg.src = imgs.src;
    
    // Manage active class on thumbnails
    var thumbs = document.getElementsByClassName("thumb");
    for (var i = 0; i < thumbs.length; i++) {
        thumbs[i].classList.remove("active");
    }
    imgs.classList.add("active");
    
    // Add a quick fade animation using JS
    expandImg.style.opacity = '0';
    setTimeout(function(){
        expandImg.style.opacity = '1';
        expandImg.style.transition = 'opacity 0.3s ease-in-out';
    }, 50);
}
