var highestZIndex = 1;
var idArray = [];
var volumeState;

function addCheckboxListeners() {
    var checkboxes = document.querySelectorAll('input[type="checkbox"]');

    checkboxes.forEach(function(checkbox) {
        checkbox.addEventListener('change', function() {
            if (!checkbox.checked) {
                stopStream(checkbox.id);
            }
        })
        idArray.push(checkbox.id);
    })
}

function refresh() {
    var refresh = document.getElementById("refresh");
    
    refresh.addEventListener("click", function() {
        idArray.forEach(function(idArray) {
            var videoId = idArray + "Div";
            var videoDiv = document.getElementById(videoId);
            if(videoDiv) {
                var innerHTML = videoDiv.innerHTML;
                var start = innerHTML.indexOf('src="') + 5;
                var end = innerHTML.indexOf('"', start);
                var videoUrl = innerHTML.substring(start, end);
                if(videoUrl) {
                    var iframe = videoDiv.querySelector("iframe");
                    if(iframe) {
                        iframe.src = videoUrl;
                    }
                }
            }
        })

    });
}

function volume() {
    var volumeOn = document.getElementById("volumeOn");
    var volumeOff = document.getElementById("volumeOff");

    volumeOn.style.display = "none";
    volumeOff.style.display = "block";

    if (typeof(volumeState) === "undefined") {
        volumeState = "mute";
    } else {

    }
    
    
    volumeOn.addEventListener("click", function() {
        volumeState = "mute";
        volumeOn.style.display = "none";
        volumeOff.style.display = "block";

        idArray.forEach(function(idArray) {
            var videoId = idArray + "Div";
            var videoDiv = document.getElementById(videoId);
            if(videoDiv) {
                var iframe = videoDiv.querySelector("iframe");
                if(iframe) {
                    iframe.contentWindow.postMessage('{"event":"command","func":"mute","method":"setVolume","value":0}', '*');                    
                }
            }
        })
    })

    volumeOff.addEventListener("click", function() {
        volumeState = "unmute";
        volumeOn.style.display = "block";
        volumeOff.style.display = "none";

        idArray.forEach(function(idArray) {
            var videoId = idArray + "Div";
            var videoDiv = document.getElementById(videoId);
            if(videoDiv) {
                var iframe = videoDiv.querySelector("iframe");
                if(iframe) {
                    iframe.contentWindow.postMessage('{"event":"command","func":"unMute","method":"setVolume","value":100}', '*');
                }
            }
        })

    })
}

function stopStream(id) {
    id = id + "Div";
    var videoContainer = document.getElementById(id);
    if (videoContainer) {
        if (videoContainer.parentNode) {
            videoContainer.parentNode.removeChild(videoContainer);
        }
    }
}



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
    var xDiv = document.createElement("div");
    var titleDiv = document.createElement("div");
    var overlayDiv = document.createElement("div");

    overlayDiv.style.position = "absolute";
    overlayDiv.style.top = "0";
    overlayDiv.style.left = "0";
    overlayDiv.style.width = "100%";
    overlayDiv.style.height = "100%";
    overlayDiv.style.zIndex = "9999999";

   
    videoDiv.style.width = "100%";
    videoDiv.style.height = "100%";
    videoDiv.style.cursor = "se-resize";
    videoDiv.style.padding = "0px 3px 3px 3px";
    videoDiv.style.backgroundColor = "#141723";

    videoHandler.style.width = "100%";
    videoHandler.style.height = "20px";
    videoHandler.style.padding = "0px 3px 0px 3px";
    videoHandler.style.cursor = "grab";
    videoHandler.style.backgroundColor = "#D53155";
    videoHandler.style.display = "flex";

    videoContainer.style.alignItems = "center";
    videoContainer.style.position = "absolute";

    xDiv.style.height = "20px";
    xDiv.style.width = "20px";
    xDiv.style.position = "absolute";
    xDiv.style.right = "0";
    xDiv.style.cursor = "pointer";
    xDiv.style.zIndex = videoHandler.zIndex++;
    xDiv.innerHTML = "<span class='material-symbols-outlined'>close</span>";

    videoHandler.appendChild(xDiv);
    videoContainer.appendChild(videoHandler);
    videoContainer.appendChild(videoDiv);
    parentElement.appendChild(videoContainer);
 
    videoContainer.style.width = "25%";
    videoContainer.style.left = "0px"; // Initial position
    videoContainer.style.top = "0px"; // Initial position
    videoContainer.style.zIndex = highestZIndex++;

    var videoId = videoDiv.parentNode.id.replace('Div', '');

    titleDiv.style.position = "absolute";
    titleDiv.style.left = "25%";
    titleDiv.style.height = "20px";
    titleDiv.style.width = "50%";
    titleDiv.style.textAlign = "center";
    titleDiv.style.zIndex = videoHandler.zIndex++;

    var textNode = document.createTextNode(videoId + " Stream");
    titleDiv.appendChild(textNode);

    videoHandler.appendChild(titleDiv);

   

   setTimeout(function() {
    adjustAspectRatio(videoDiv);
   }, 0);

 
    //videoDiv.innerHTML = '<iframe width="100%" height="100%" src="' + url + '?&mute=1&autoplay=1" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>';
    var wrapper = document.createElement('div');
    wrapper.style.width = '100%';
    wrapper.style.height = '100%';
    videoDiv.appendChild(wrapper);
    
    var player = new YT.Player(wrapper, {
        height: "100%",
        width: "100%",
        videoId: url,
        playerVars: {
            autoplay: 1, // Autoplay the video
            playsinline: 1, // Play inline on mobile devices
            frameborder: 0,
            allow: allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share",
            allowfullscreen: true,
        },
        events: {
            'onReady': function(event) {
                if(volumeState == "mute") {
                    event.target.mute();
                } else {
                    event.target.unMute();
                }
            }
        }
   });

   xDiv.addEventListener('mousedown', function(e) {
        var videoId = videoDiv.parentNode.id.replace('Div', '');    
        stopStream(videoId);
        var checkbox = document.getElementById(videoId);
        checkbox.checked = false;
   })

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

            newX = Math.max(0, Math.min(newX, document.getElementById("contentArea").offsetWidth - videoContainer.offsetWidth));
            newY = Math.max(0, Math.min(newY, document.getElementById("contentArea").offsetHeight - videoContainer.offsetHeight));
        
            
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

function adjustAspectRatio(container) {
    var width = container.offsetWidth;
    var height = width * (9/16);
    container.style.height = height + 'px';
}

window.addEventListener('load', function() {
    addCheckboxListeners();
    refresh();
    volume();
}); 

