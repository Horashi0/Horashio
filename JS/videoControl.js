var highestZIndex = 1;
var idArray = [];
var volumeState;
var videoWidth;




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

function styleContainers(parentElement, videoContainer, videoHandler, videoDiv, xDiv, titleDiv, overlayDiv, textNode, id, wrapper) {

    document.getElementById("contentArea").appendChild(parentElement);
    videoHandler.appendChild(titleDiv);
    videoHandler.appendChild(xDiv);
    videoContainer.appendChild(videoHandler);
    videoContainer.appendChild(videoDiv);
    parentElement.appendChild(videoContainer);
    videoDiv.appendChild(wrapper);

    videoContainer.classList.add("streamContainers");
    videoDiv.classList.add("videoDiv");
    xDiv.classList.add("xDiv");
    titleDiv.classList.add("titleDiv");
    videoHandler.classList.add("videoHandler");
    overlayDiv.classList.add("overlayDiv");

    videoContainer.id = id;
    videoContainer.style.zIndex = highestZIndex++;

    if(videoWidth != null) {
        videoContainer.style.width = videoWidth + "%";
    } else {
        videoContainer.style.width = "25%";
    }  


    xDiv.style.zIndex = videoHandler.zIndex++;
    xDiv.innerHTML = "<span class='material-symbols-outlined'>close</span>";
    
    titleDiv.style.zIndex = videoHandler.zIndex++;
    titleDiv.appendChild(textNode);
}

function addVideo(wrapper, url) {
    //videoDiv.innerHTML = '<iframe width="100%" height="100%" src="' + url + '?&mute=1&autoplay=1" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>';
    
    wrapper.style.width = '100%';
    wrapper.style.height = '100%';
    
    
    new YT.Player(wrapper, {
        height: "100%",
        width: "100%",
        videoId: url,
        playerVars: {
            autoplay: 1, // Autoplay the video
            playsinline: 1, // Play inline on mobile devices
            frameborder: 0,
            allow: allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share",
            allowfullscreen: true,
            suggestedQuality: 'hd1080',
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
}

function addElement(url, id) {
    // Stream ID is the checkbox's ID + div
    var id = id + "Div";

    if (document.getElementById(id)) {
        return;
    }
    
    
    var parentElement = document.createElement('div');
    var videoContainer = document.createElement("div");
    var videoHandler = document.createElement("div");
    var videoDiv = document.createElement("div");
    var xDiv = document.createElement("div");
    var titleDiv = document.createElement("div");
    var overlayDiv = document.createElement("div");  
    var videoId = id.replace('Div', '');
    var textNode = document.createTextNode(videoId + " Stream");
    var wrapper = document.createElement('div');

    styleContainers(parentElement, videoContainer, videoHandler, videoDiv, xDiv, titleDiv, overlayDiv, textNode, id, wrapper);
                    

    

    addVideo(wrapper, url);

   setTimeout(function() {
    adjustAspectRatio(videoDiv);
   }, 0);

    
   videoControl(videoDiv, videoHandler, xDiv, videoContainer, overlayDiv, id);

};

function videoControl(videoDiv, videoHandler, xDiv, videoContainer, overlayDiv, id) {
    
    videoHandler.addEventListener('touchstart', initDrag);
    videoHandler.addEventListener('pointerdown', initDrag);
    videoHandler.addEventListener('mousedown', initDrag);

    videoDiv.addEventListener('touchstart', initResize, false);
    videoDiv.addEventListener('pointerdown', initResize, false);
    videoDiv.addEventListener('mousedown', initResize, false);    

    xDiv.addEventListener('touchstart', xControl);
    xDiv.addEventListener('pointerdown', xControl);
    xDiv.addEventListener('mousedown', xControl);


    var initialX, initialY;
    
    function xControl(e) {
        e.preventDefault();
        
        var videoId = videoDiv.parentNode.id.replace('Div', '');   
        var checkbox = document.getElementById(videoId); 
        
        stopStream(videoId);
        checkbox.checked = false;
    }

    function initResize(e) {
        videoContainer.appendChild(overlayDiv)
        videoContainer.style.zIndex = highestZIndex++;

        window.addEventListener('pointermove', Resize, false);
        window.addEventListener('mousemove', Resize, false);
        window.addEventListener('touchmove', Resize, false);

        window.addEventListener('pointerup', stopResize, false);
        window.addEventListener('mouseup', stopResize, false);
        window.addEventListener('touchend', stopResize, false);

        e.preventDefault();
        e.stopPropagation();
    }

    function Resize(e) {
        var clientX = e.clientX || e.touches[0].clientX;
        var parentWidth = videoContainer.parentNode.offsetWidth;

        var percentageWidth = ((clientX - videoContainer.offsetLeft) / parentWidth) * 100
        videoContainer.style.width = percentageWidth + '%';
        var containerTop = videoDiv.parentElement.style.top;
        adjustAspectRatio(videoDiv);
        videoDiv.parentElement.style.top = containerTop;
    }

    function stopResize(e) {
        if(overlayDiv && overlayDiv.parentNode) {
            overlayDiv.parentNode.removeChild(overlayDiv);
        }

        window.removeEventListener('pointermove', Resize, false);
        window.removeEventListener('mousemove', Resize, false);
        window.removeEventListener('touchmove', Resize, false);
        
        window.removeEventListener('pointerup', stopResize, false);
        window.removeEventListener('mouseup', stopResize, false);
        window.removeEventListener('touchend', stopResize, false);

        e.preventDefault();
        e.stopPropagation();
    }


    function initDrag(e) {
        
        videoContainer.appendChild(overlayDiv);
        if(e.type === "pointerdown" || e.type === "mousedown") {
            initialX = e.clientX - videoContainer.offsetLeft;
            initialY = e.clientY - videoContainer.offsetTop;
        } else if (e.type === "touchstart") {
            initialX = e.touches[0].clientX - videoContainer.offsetLeft;
            initialY = e.touches[0].clientY - videoContainer.offsetTop;
        }
        
        videoContainer.classList.add("grabbed");
        videoContainer.style.zIndex = highestZIndex++;


        document.addEventListener('touchmove', Drag, { passive: false});
        document.addEventListener('pointermove', Drag);
        document.addEventListener('mousemove', Drag);
    
        document.addEventListener('touchend', stopDrag);
        document.addEventListener('pointerup', stopDrag);
        document.addEventListener('mouseup', stopDrag);

        e.preventDefault();
        e.stopPropagation();
    }

    function Drag(e) {
        if (e.type === "pointermove" || e.type === "touchmove" || e.type === "mousemove") {
            var newX, newY;
            if (e.type === "pointermove" || e.type === "mousemove") {
                newX = e.clientX - initialX;
                newY = e.clientY - initialY;
            } else if (e.type == "touchmove") {
                newX = e.touches[0].clientX - initialX;
                newY = e.touches[0].clientY - initialY;
            }
            
            var contentAreaWidth = document.getElementById("contentArea").offsetWidth;
            var contentAreaHeight = document.getElementById("contentArea").offsetHeight;
           
            var streamContainerWidth = document.getElementById(id).offsetWidth;
            var streamContainerHeight = document.getElementById(id).offsetHeight;
      

            var leftPercentage = (newX / contentAreaWidth) * 100;
            var topPercentage = (newY / contentAreaHeight) * 100;


            leftPercentage = Math.max(0, Math.min(leftPercentage, 100 - (streamContainerWidth / contentAreaWidth) * 100));
            topPercentage = Math.max(0, Math.min(topPercentage, 100 - (streamContainerHeight / contentAreaHeight) * 100));
        
            videoContainer.style.left = leftPercentage + '%';
            videoContainer.style.top = topPercentage + '%';
        }
    }

    function stopDrag(e) {
        if (e.type === "pointerup" || e.type === "touchend" || e.type === "mouseup") {
            if (overlayDiv && overlayDiv.parentNode) {
                overlayDiv.parentNode.removeChild(overlayDiv);
            }
            videoContainer.classList.remove('grabbed');

            document.removeEventListener('touchmove', Drag);
            document.removeEventListener('pointermove', Drag);
            document.removeEventListener('mousemove', Drag);
        
            document.removeEventListener('touchend', stopDrag);
            document.removeEventListener('pointerup', stopDrag);
            document.removeEventListener('mouseup', stopDrag);

            e.preventDefault();
            e.stopPropagation();
        }
    }
}

function adjustAspectRatio(container) {
    var parentElement = container.parentElement;
    var originalHeight = parseFloat(parentElement.style.height.replace('%', ''));

    var width = container.offsetWidth;
    var contentAreaHeight = document.getElementById("contentArea").offsetHeight;
    

    var height = width * (9 / 16);
    var percentageHeight = (height / contentAreaHeight) * 100;

    parentElement.style.height = percentageHeight + '%';
    

    var newHeight = parseFloat(parentElement.style.height.replace('%', ''));
    var percentageTop = newHeight - originalHeight;
    console.log(percentageTop)
    var containerTop = parseFloat(parentElement.style.top.replace('%', ''));

    if(containerTop > 0 ) {
        percentageTop = percentageTop + containerTop;
        parentElement.style.top = percentageTop + '%';
    }

   
}

function applyStreamWidth() {
    var streamWidthInput = document.getElementById("streamWidth");
    streamWidthInput.addEventListener("keydown", function(event) {
        if (event.key === "Enter") {
            event.preventDefault();
            var width = parseFloat(streamWidthInput.value);
            if(width >= 0 && width <= 100) {
                videoWidth = width;

                if(!isNaN(width)) {
                    var streamContainers = document.querySelectorAll(".streamContainers");
                    streamContainers.forEach(function(container) {
                        container.style.width = width + "%";
                        var videoDiv = container.querySelector(".videoDiv");
                        adjustAspectRatio(videoDiv);

                        var iframe = container.querySelector("iframe");
                        iframe.style.width = "100%"; 
                        iframe.style.height = "100%"; 
                    });
                } else {
                    alert("Dont be a numpty, please enter numbers 0-100");
                }
            }
            
        }
    })
}

function resizeElements() {
 
    var streamContainers = document.querySelectorAll(".streamContainers");
    var contentAreaWidth = document.getElementById("contentArea").offsetWidth;
    var contentAreaHeight = document.getElementById("contentArea").offsetHeight;

    streamContainers.forEach(function(container) {

        var videoDiv = container.querySelector(".videoDiv");
        adjustAspectRatio(videoDiv);
        
        var iframe = container.querySelector("iframe");
        iframe.style.width = "100%";
        iframe.style.height = "100%";  

        var percentageLeft = (container.offsetLeft / contentAreaWidth) * 100;
      

        container.style.left = percentageLeft + "%";
    
    }); 
}

window.addEventListener('load', function() {
    addCheckboxListeners();
    refresh();
    volume();
    applyStreamWidth();
}); 

window.addEventListener('resize', resizeElements);