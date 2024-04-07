function addElement(parentElement) {
    var videoContainer = document.createElement("div");
    var videoHandler = document.createElement("div");
    var videoDiv = document.createElement("div");

    videoDiv.style.width = "100%";
    videoDiv.style.backgroundColor = "red";
    videoDiv.style.cursor = "se-resize";

    videoContainer.style.backgroundColor = "white";
    videoContainer.style.position = "absolute";
    
    videoHandler.style.width = "100%";
    videoHandler.style.height = "50px";
    videoHandler.style.backgroundColor = "blue";
    videoHandler.style.cursor = "grab";

    videoContainer.appendChild(videoHandler);
    videoContainer.appendChild(videoDiv);
    parentElement.appendChild(videoContainer);
 
    videoContainer.style.width = "50%";
    videoContainer.style.left = "0px"; // Initial position
    videoContainer.style.top = "0px"; // Initial position

   setTimeout(function() {
    adjustAspectRatio(videoDiv);
   }, 0);
    
    // Event listeners for dragging
    var initialX, initialY;
    var isDragging = false;

    videoHandler.addEventListener('mousedown', function(e) {
        isDragging = true;
        initialX = e.clientX - videoContainer.offsetLeft;
        initialY = e.clientY - videoContainer.offsetTop;
        videoContainer.classList.add('grabbed');
    });

    document.addEventListener('mousemove', function(e) {
        if (isDragging) {
            var newX = e.clientX - initialX;
            var newY = e.clientY - initialY;
            videoContainer.style.left = newX + 'px';
            videoContainer.style.top = newY + 'px';
        }
    });

    document.addEventListener('mouseup', function() {
        isDragging = false;
        videoContainer.classList.remove('grabbed');
    });

    videoDiv.addEventListener('mousedown', initResize, false);

    function initResize(e) {
        window.addEventListener('mousemove', Resize, false);
        window.addEventListener('mouseup', stopResize, false);
    }

    function Resize(e) {
        videoContainer.style.width = (e.clientX - videoContainer.offsetLeft) + 'px';
        adjustAspectRatio(videoDiv);
    }

    function stopResize(e) {
        window.removeEventListener('mousemove', Resize, false);
        window.removeEventListener('mouseup', stopResize, false);
    }
};

var contentArea1 = document.createElement("div");
var contentArea2 = document.createElement("div");
var contentArea3 = document.createElement("div");
var contentArea4 = document.createElement("div");
var contentArea5 = document.createElement("div");
var contentArea6 = document.createElement("div");

document.getElementById("contentArea").appendChild(contentArea1)
document.getElementById("contentArea").appendChild(contentArea2)
document.getElementById("contentArea").appendChild(contentArea3)
document.getElementById("contentArea").appendChild(contentArea4)
document.getElementById("contentArea").appendChild(contentArea5)
document.getElementById("contentArea").appendChild(contentArea6)

addElement(contentArea1);
addElement(contentArea2);
addElement(contentArea3);
addElement(contentArea4);
addElement(contentArea5);
addElement(contentArea6);

function adjustAspectRatio(container) {
    var width = container.offsetWidth;
    var height = width * (9/16);
    container.style.height = height + 'px';
}