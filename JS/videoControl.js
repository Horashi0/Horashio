function addElement() {
    var videoContainer = document.createElement("div");
    var videoHandler = document.createElement("div");
    var videoDiv = document.createElement("div");

    videoDiv.style.width = "100%";
    videoDiv.style.backgroundColor = "red";

    videoContainer.style.backgroundColor = "white";
    videoContainer.style.position = "relative";
    videoContainer.style.cursor = "se-resize";

    videoHandler.style.width = "100%";
    videoHandler.style.height = "50px";
    videoHandler.style.backgroundColor = "blue";
    videoHandler.style.cursor = "grab";

    videoContainer.appendChild(videoHandler);
    videoContainer.appendChild(videoDiv);
    document.getElementById("contentArea").appendChild(videoContainer);

    videoContainer.style.width = "50%";
    videoContainer.style.left = "0px"; // Initial position
    videoContainer.style.top = "0px"; // Initial position

   setTimeout(function() {
    adjustAspectRatio(videoDiv);
   }, 0);
    
    // Event listeners for dragging
    var offsetX, offsetY;
    var isDragging = false;

    videoHandler.addEventListener('mousedown', function(e) {
        isDragging = true;
        offsetX = e.clientX - videoContainer.offsetLeft;
        offsetY = e.clientY - videoContainer.offsetTop;
        videoContainer.classList.add('grabbed');
    });

    document.addEventListener('mousemove', function(e) {
        if (isDragging) {
            videoContainer.style.left = (e.clientX - offsetX) + 'px';
            videoContainer.style.top = (e.clientY - offsetY) + 'px';
        }
    });

    document.addEventListener('mouseup', function() {
        isDragging = false;
        videoContainer.classList.remove('grabbed');
    });
    
};

addElement();

function adjustAspectRatio(container) {
    var width = container.offsetWidth;
    var height = width * (9/16);
    container.style.height = height + 'px';
}