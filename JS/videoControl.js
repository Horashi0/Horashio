function addCheckboxListeners() {
    var checkboxes = document.querySelectorAll('input[type="checkbox"]');

    checkboxes.forEach(function(checkbox) {
        checkbox.addEventListener('change', function() {
            if (!checkbox.checked) {
                stopStream(checkbox.id);
            }
        })
    })

}

function stopStream(id) {var overlayDiv = document.createElement
    id = id + "Div";
    var videoContainer = document.getElementById(id);
    if (videoContainer) {
        
        if (videoContainer.parentNode) {
            videoContainer.parentNode.removeChild(videoContainer);
        }
    }
}


var highestZIndex = 1;

function addElement(url, id) {
    id = id + "Div";

    if (document.getElementById(id)) {
        return;
    }
    
    var parentElement = document.createElement('div');
    document.getElementById("contentArea").appendChild(parentElement);

    var videoContainer = document.createElement("div");
    videoContainer.id = id;

    var videoHandler = document.createElement("div");
    var videoDiv = document.createElement("div");

    var overlayDiv = document.createElement("div");
    overlayDiv.style.position = "absolute";
    overlayDiv.style.top = "0";
    overlayDiv.style.left = "0";
    overlayDiv.style.width = "100%";
    overlayDiv.style.height = "100%";
    overlayDiv.style.zIndex = "9999999";
    


    videoDiv.style.width = "100%";
    videoDiv.style.cursor = "se-resize";
    videoDiv.style.padding = "0px 3px 3px 3px";
    videoDiv.style.backgroundColor = "#141723";

    videoHandler.style.width = "100%";
    videoHandler.style.height = "20px";
    videoHandler.style.padding = "0px 3px 0px 3px";
    videoHandler.style.cursor = "grab";
    videoHandler.style.backgroundColor = "#D53155";

    videoContainer.style.position = "absolute";

    videoContainer.appendChild(videoHandler);
    videoContainer.appendChild(videoDiv);
    parentElement.appendChild(videoContainer);
 
    videoContainer.style.width = "30%";
    videoContainer.style.left = "0px"; // Initial position
    videoContainer.style.top = "0px"; // Initial position

    videoContainer.style.zIndex = highestZIndex++;

   setTimeout(function() {
    adjustAspectRatio(videoDiv, url);
   }, 0);

   videoDiv.innerHTML = '<iframe width="100%" height="100%" src="' + url + '" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>';
    
    // Event listeners for dragging
    var initialX, initialY;
    var isDragging = false;

    videoHandler.addEventListener('mousedown', function(e) {
        videoContainer.appendChild(overlayDiv)
        isDragging = true;
        initialX = e.clientX - videoContainer.offsetLeft;
        initialY = e.clientY - videoContainer.offsetTop;
        videoContainer.classList.add('grabbed');
        videoContainer.style.zIndex = highestZIndex++;
        e.preventDefault();
        e.stopPropagation();
    });

    document.addEventListener('mousemove', function(e) {
        if (isDragging) {
            var newX = e.clientX - initialX;
            var newY = e.clientY - initialY;
            videoContainer.style.left = newX + 'px';
            videoContainer.style.top = newY + 'px';
        }
    });

    document.addEventListener('mouseup', function(e) {
        if(isDragging) {
            if(overlayDiv && overlayDiv.parentNode) {
                overlayDiv.parentNode.removeChild(overlayDiv);
            }
            isDragging = false;
            videoContainer.classList.remove('grabbed');            
            e.preventDefault();
            e.stopPropagation();
        }
        
    });

    

    videoDiv.addEventListener('mousedown', initResize, false);

    function initResize(e) {
        videoContainer.appendChild(overlayDiv)
        videoContainer.style.zIndex = highestZIndex++;
        window.addEventListener('mousemove', Resize, false);
        window.addEventListener('mouseup', stopResize, false);
        e.preventDefault();
        e.stopPropagation();
    }

    function Resize(e) {
        videoContainer.style.width = (e.clientX - videoContainer.offsetLeft) + 'px';
        adjustAspectRatio(videoDiv, url);
    }

    function stopResize(e) {
        if(overlayDiv && overlayDiv.parentNode) {
            overlayDiv.parentNode.removeChild(overlayDiv);
        }
        window.removeEventListener('mousemove', Resize, false);
        window.removeEventListener('mouseup', stopResize, false);
        e.preventDefault();
        e.stopPropagation();
    }
};

function adjustAspectRatio(container, url) {
    var width = container.offsetWidth;
    var height = width * (9/16);
    container.style.height = height + 'px';
}

window.addEventListener('load', function() {
    addCheckboxListeners();
}); 