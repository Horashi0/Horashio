//Start of stream section
var customCheckboxIndex = 0
var navStatus = 1;
var navClickStatus = 0;
document.addEventListener("DOMContentLoaded", function() {

    document.getElementById("menuIcon").addEventListener("click", function() {
        document.getElementById("closeIcon").style.display = "block";
        document.getElementById("menuIcon").style.display = "none";
        DisplayHamburgerMenus();
    });

    document.getElementById("closeIcon").addEventListener("click", function() {
        document.getElementById("closeIcon").style.display = "none";
        document.getElementById("menuIcon").style.display = "block";
        HideHamburgerMenus();
    });
    
    var controlPanel =  document.getElementById("controlPanel");
    var horizontalLine1 = document.getElementsByClassName("horizontalLine line1")[0];
    var horizontalLine2 = document.getElementsByClassName("horizontalLine line2")[0];
    var horizontalLine3 = document.getElementsByClassName("horizontalLine line3")[0];
    var horizontalLine4 = document.getElementsByClassName("horizontalLine line4")[0];
    document.getElementById("pullOutArrowControlPanel").addEventListener("click", function() {        
        document.getElementById("pullOutArrowControlPanel").style.display = "none";
        document.getElementById("pullInArrowControlPanel").style.display = "block";
        document.getElementById("pullOutTabControlPanel").style.display = "none";
        document.getElementById("controlPanelTitle").style.display = "block";

        if(window.innerWidth >= 771) {
            document.getElementById("contentArea").style.width = "70%";
            controlPanel.style.width = "28%";
        } else {
            navClickStatus = 1;
            document.getElementById("pullInArrowNav").click();

            controlPanel.style.width = "98%";
            controlPanel.style.top = "max(30px, 2%)";
            controlPanel.style.bottom = "max(30px, 2%)";
        }

        controlPanel.style.position = "absolute";
        controlPanel.style.display = "block";
        
        controlPanel.style.top = "max(90px, 3%)";
        controlPanel.style.bottom = "max(30px, 2%)";
        controlPanel.style.minHeight = "670px";
        controlPanel.style.right = ".5%";
        controlPanel.style.backgroundColor = "#272C43"; 
        controlPanel.style.borderRadius = "20px";
        controlPanel.style.zIndex = "999999999999999999";

        horizontalLine1.style.display = "block";
        horizontalLine2.style.display = "block";
        horizontalLine3.style.display = "block";
        horizontalLine4.style.display = "block";

        document.getElementById("controlPanelStreamsTitle").style.display = "block";
        document.getElementById("controlPanelControlsTitle").style.display = "block";
        document.getElementById("controlPanelCustomTitle").style.display = "block";
        document.getElementById("controlPanelSavableTitle").style.display = "block";

        setTimeout(resizeElements, 0);
    });
    
    document.getElementById("pullInArrowControlPanel").addEventListener("click", function() {
        document.getElementById("pullOutArrowControlPanel").style.display = "block";
        document.getElementById("pullInArrowControlPanel").style.display = "none";
        
        document.getElementById("contentArea").style.width = "97.9%";

        controlPanel.style.display = "none";
        document.getElementById("pullOutTabControlPanel").style.display = "block";
        document.getElementById("controlPanelTitle").style.display = "none";
        document.getElementById("controlPanelStreamsTitle").style.display = "none";
        document.getElementById("controlPanelControlsTitle").style.display = "none";

        horizontalLine1.style.display = "none";
        horizontalLine2.style.display = "none";
        horizontalLine3.style.display = "none";
        horizontalLine4.style.display = "none";

        document.getElementById("controlPanelCustomTitle").style.display = "none";
        document.getElementById("controlPanelSavableTitle").style.display = "none";

        if(window.innerWidth >= 771) { 
            
        } else {
            if(navStatus == 1) {
                navClickStatus = 1;
                document.getElementById("pullOutArrowNav").click();
            }
        }

        setTimeout(resizeElements, 0); 
    });

    document.getElementById("pullInArrowNav").addEventListener("click", function() {
        document.getElementById("pullInTabNav").style.display = "none";
        document.getElementById("pullOutTabNav").style.display = "block";
        document.getElementById("nav").style.visibility = "hidden";

        var contentArea = document.getElementById("contentArea");
        contentArea.style.top = "max(30px, 2%)";
        contentArea.style.bottom = "max(30px, 2%)";

        if(navClickStatus == 0) {
            navStatus = 0;
        } else {
            navClickStatus = 0;
        }

        setTimeout(resizeElements, 0);
    });

    document.getElementById("pullOutArrowNav").addEventListener("click", function() {
        document.getElementById("pullOutTabNav").style.display = "none";
        document.getElementById("pullInTabNav").style.display = "block";

        var contentArea = document.getElementById("contentArea");
        contentArea.style.top = "max(110px, 2%)";
        contentArea.style.bottom = "max(30px, 2%)";

        document.getElementById("nav").style.visibility = "visible";

        if(navClickStatus == 0) {
            navStatus = 1;
        } else {
            navClickStatus = 0;
        }
        

        setTimeout(resizeElements, 0);
    });
    
    document.getElementById("streamAddButton").addEventListener("click", function() {
        const streamTitle =  document.getElementById("streamTitle").value;
        const streamId = document.getElementById("streamId").value;

        if(!streamTitle || !streamId) {
            alert("Please input a title or id for your stream");
            return;
        } else if(streamTitle.includes(' ') || streamId.includes(' ')) {
            alert("Please, no spaces in the title or id");
            return;
        } else if(customCheckboxIndex >= 6) {
            alert("No more than 6 custom streams");
            return;
        } else if (document.getElementsByClassName(`${streamTitle}`).length > 0) {
            alert("Checkbox with title already exists");
            return;
        }

        const leftSide = document.getElementById("streamContainerLeft");
        const rightSide = document.getElementById("streamContainerRight");

        const checkboxWrapper = document.createElement("div");
        checkboxWrapper.classList.add(`checkboxWrapper`);
        checkboxWrapper.classList.add(`${streamTitle}`);

        //Creating the checkbox box and giving it a class
        const checkboxContainer = document.createElement("div");
        checkboxContainer.classList.add(`${streamTitle}`);
        checkboxContainer.classList.add("checkboxContainer");

        //Make the checkbox
        const input = document.createElement("input");
        input.type = "checkbox";
        input.id = streamTitle;
        input.name = streamTitle;
        input.value = streamId;
        input.onclick = function() {addElement(input.value, input.id)};

        // Create the label
        const label = document.createElement("label");
        label.htmlFor = streamTitle;
        label.textContent = streamTitle;

        // Create the "X" button
        const removeButton = document.createElement("button");
        removeButton.textContent = "X";
        removeButton.classList.add("removeButton");

        // Add event listener to remove the checkboxContainer
        removeButton.onclick = function() {
            stopStream(input.id);
            var container = document.getElementsByClassName(`checkboxWrapper ${streamTitle}`)[0];
            container.remove()
            customCheckboxIndex--;
        };

        // Attach everything together
        checkboxContainer.appendChild(removeButton); 
        checkboxContainer.appendChild(input);
        checkboxContainer.appendChild(label);
        
        checkboxWrapper.appendChild(checkboxContainer);

        const leftSideCount = document.getElementById("streamContainerLeft");
        const rightSideCount = document.getElementById("streamContainerRight");

        const leftSideCheckboxCount = leftSideCount.querySelectorAll('input[type="checkbox"]').length;
        const rightSideCheckboxCount = rightSideCount.querySelectorAll('input[type="checkbox"]').length;
        
        if(leftSideCheckboxCount <= rightSideCheckboxCount) {
            leftSide.appendChild(checkboxWrapper);
        } else {
            rightSide.appendChild(checkboxWrapper);
        }
        customCheckboxIndex++;
        addCheckboxListeners();
    });

    document.getElementById("saveSavableStream").addEventListener("click", function() {
        saveStreams();
    });

    document.getElementById("loadSavableStream").addEventListener("click", function() {
        loadStreams();
    });
})

async function loadStreams() {
    prepareCheckboxes();
    const streamNumberOption = document.getElementById("savableStreamDropdown").value
    const savedLayoutJSON = localStorage.getItem(`streamLayout${streamNumberOption}`); 
        
    if(savedLayoutJSON) {
        const savedLayout = JSON.parse(savedLayoutJSON);

        const leftSide = document.getElementById("streamContainerLeft");
        const rightSide = document.getElementById("streamContainerRight");    

        savedLayout.customCheckboxes.forEach((customObj) => {
            const customKey = Object.keys(customObj)[0];
            const customData = customObj[customKey][0];

            var streamId = customData.id;
            var streamTitle = customData.name;

            if (document.getElementsByClassName(`${streamTitle}`).length > 0) {
                return;
            }
                
            const checkboxWrapper = document.createElement("div");
            checkboxWrapper.classList.add(`checkboxWrapper`);
            checkboxWrapper.classList.add(`${streamTitle}`);

            //Creating the checkbox box and giving it a class
            const checkboxContainer = document.createElement("div");
            checkboxContainer.classList.add(`${streamTitle}`);
            checkboxContainer.classList.add("checkboxContainer");

            //Make the checkbox
            const input = document.createElement("input");
            input.type = "checkbox";
            input.id = streamTitle;
            input.name = streamTitle;
            input.value = streamId;
            input.onclick = function() {addElement(input.value, input.id)};
            

            if(customData.checked == true) {
                input.checked = true;
                addElement(input.value, input.id);
            }

            // Create the label
            const label = document.createElement("label");
            label.htmlFor = streamTitle;
            label.textContent = streamTitle;

            // Create the "X" button
            const removeButton = document.createElement("button");
            removeButton.textContent = "X";
            removeButton.classList.add("removeButton");

            // Add event listener to remove the checkboxContainer
            removeButton.onclick = function() {
                stopStream(input.id);
                var container = document.getElementsByClassName(`checkboxWrapper ${streamTitle}`)[0];
                container.remove()
                customCheckboxIndex--;
            };

            // Attach everything together
            checkboxContainer.appendChild(removeButton); 
            checkboxContainer.appendChild(input);
            checkboxContainer.appendChild(label);
            
            checkboxWrapper.appendChild(checkboxContainer);

            const leftSideCount = document.getElementById("streamContainerLeft");
            const rightSideCount = document.getElementById("streamContainerRight");

            const leftSideCheckboxCount = leftSideCount.querySelectorAll('input[type="checkbox"]').length;
            const rightSideCheckboxCount = rightSideCount.querySelectorAll('input[type="checkbox"]').length;
            
            if(leftSideCheckboxCount <= rightSideCheckboxCount) {
                leftSide.appendChild(checkboxWrapper);
            } else {
                rightSide.appendChild(checkboxWrapper);
            }

            setTimeout(() => {
                const stream = document.getElementById(`${streamTitle}Div`);
                if(stream) {
                    stream.style.width = customData.width;
                    adjustAspectRatio(stream.querySelector(".videoDiv"));
                    stream.style.left = customData.xAxis + "%";
                    stream.style.top = customData.yAxis + "%";
                }
            }, 0);

            addCheckboxListeners();

            customCheckboxIndex++;
        })

        const checkboxesData = await FetchCheckboxData();
 
        savedLayout.streams.forEach((streamObj) => {
            const streamKey = Object.keys(streamObj)[0];
            const streamData = streamObj[streamKey][0]; // Access the first item in the array
        
            const streamTitle = streamData.name;
            if(checkboxesData.find(item => item.id === streamTitle)) {
                const streamId = checkboxesData.find(item => item.id === streamTitle).value; 
                addElement(streamId, streamTitle);
            } else {
                console.error(`No checkbox found for streamTitle: ${streamTitle}`);
                return;
            }
            
            setTimeout(() => {
                document.getElementById(streamTitle).checked = true;

                const stream = document.getElementById(`${streamTitle}Div`);
                if(stream) {
                    stream.style.width = streamData.width;
                    adjustAspectRatio(stream.querySelector(".videoDiv"));
                    stream.style.left = streamData.xAxis + "%";
                    console.log("yAxis: ", streamData.yAxis);
                    stream.style.top = streamData.yAxis + "%";
                    console.log("StreamY: ", stream.style.top);      
                }
                
            }, 0);
           
        })
}
}

function prepareCheckboxes() {
    var checkboxes = document.querySelectorAll('input[type="checkbox"]');
    var removeButtons = document.querySelectorAll('.removeButton');

    removeButtons.forEach(function(removeButton) {
        removeButton.click();
    })
    checkboxes.forEach(function(checkbox) {
        checkbox.checked = false;
        stopStream(checkbox.id);
    })    

    
}

async function saveStreams() {
    var contentAreaWidth = document.getElementById("contentArea").offsetWidth;
    var contentAreaHeight = document.getElementById("contentArea").offsetHeight;

    const streams = [];
    const customStreams = [];
    var standardStreamNames = [];

    const checkboxesData = await FetchCheckboxData();
    standardStreamNames = checkboxesData.map(checkboxesData => checkboxesData.id);
    console.log(standardStreamNames);

    const customCheckboxes =  document.querySelectorAll(".checkboxWrapper");

    customCheckboxes.forEach((checkboxWrapper, index) => {
        const checkbox = checkboxWrapper.querySelector('input[type="checkbox"]');
        const streamTitle = checkbox ? checkbox.id : null;
        const checkedStatus = checkbox ? checkbox.checked : false;

        if(streamTitle && !standardStreamNames.includes(streamTitle) && checkedStatus == false) {
            customStreams.push({
                [`CustomStream${index + 1}`]: [{
                    name: streamTitle,
                    id: checkbox ? checkbox.value : null,
                    width: null,
                    xAxis: null,
                    yAxis: null,
                    checked: checkedStatus
                }]
            });
        }
    })


    document.querySelectorAll(".streamContainers").forEach((stream, index) => {
        const streamTitle = stream.id.replace('Div', '');
        const streamWidth = stream.style.width;
        const streamY = (stream.offsetTop / contentAreaHeight) * 100;
        const streamX = (stream.offsetLeft / contentAreaWidth) * 100;

        if(!standardStreamNames.includes(streamTitle)) {
            const customCheckboxes = document.querySelectorAll(".checkboxWrapper input[type='checkbox']");
            const associatedCheckbox = Array.from(customCheckboxes).find(checkbox => checkbox.id === streamTitle);
            
            const container =  document.getElementsByClassName(`checkboxWrapper ${streamTitle}`)[0];
            const checkedStatus = container.querySelector('input[type="checkbox"]').checked;
            
            customStreams.push({
                [`CustomStream${index + 1}`]: [{
                    name: streamTitle,
                    id: associatedCheckbox ? associatedCheckbox.value : null,
                    width: streamWidth,
                    xAxis: streamX,
                    yAxis: streamY,
                    checked: checkedStatus
                }]
            })
        } else {
            streams.push({
                [`Stream${index + 1}`]: [{
                    name: streamTitle,
                    width: streamWidth,
                    xAxis: streamX,
                    yAxis: streamY
                }]
            })
        }
        
    });

    const layout = {
        customCheckboxes: customStreams,
        streams: streams
    };

    const layoutJSON = JSON.stringify(layout, null, 4);
    console.log(layoutJSON);

    const streamNumberOption = document.getElementById("savableStreamDropdown").value

    localStorage.setItem(`streamLayout${streamNumberOption}`, layoutJSON);
}

function DisplayHamburgerMenus()
{
    let SpaceNews = document.getElementById('SpaceNews');
    let Stream = document.getElementById('Stream')
    let About = document.getElementById('About');
   
    SpaceNews.style.display = "block";
    SpaceNews.style.position = "absolute";
    SpaceNews.style.right = "20px";
    SpaceNews.style.top = "70px";
    SpaceNews.style.paddingTop = "20px";
    SpaceNews.style.paddingBottom = "20px";
    SpaceNews.style.fontSize = "30px";
    SpaceNews.style.color = "#F5F2F8";
    SpaceNews.style.zIndex = "99999999";

    Stream.style.display = "block";
    Stream.style.position = "absolute";
    Stream.style.right = "20px";
    Stream.style.top = "140px";
    Stream.style.paddingTop = "20px";
    Stream.style.paddingBottom = "20px";
    Stream.style.fontSize = "30px";
    Stream.style.color = "#F5F2F8";
    Stream.style.zIndex = "99999999";

    About.style.display = "block";
    About.style.position = "absolute";
    About.style.right = "20px";
    About.style.top = "210px";
    About.style.paddingTop = "20px";
    About.style.paddingBottom = "20px";
    About.style.fontSize = "30px";
    About.style.color = "#F5F2F8";
    About.style.zIndex = "99999999";
}

function HideHamburgerMenus()
{
    document.getElementById("SpaceNews").style.display = "none";
    document.getElementById("Stream").style.display = "none";
    document.getElementById("About").style.display = "none";
}

function RemoveAddElements() {
    const screenWidth = window.innerWidth;
    if (screenWidth > 770) {
        // Reset nav text
        document.getElementById("SpaceNews").removeAttribute('style');
        document.getElementById("Stream").removeAttribute('style');
        document.getElementById("About").removeAttribute('style');

        document.getElementById("closeIcon").removeAttribute("style");
        document.getElementById("menuIcon").removeAttribute("style");
    }
}

async function FetchCheckboxData() {
    try {
        const response = await fetch("../Json/stream.json");
        const data = await response.json();
        return data;
    } catch(error) {
        console.error("Error fetching checkbox data, please contact @Horashi0 on Twitter, ", error);
        return [];
    }
}

async function DisplayCheckboxes() {
    const checkboxesData = await FetchCheckboxData();
    const controlPanel = document.getElementById("controlPanel");

    const leftSide = document.getElementById("leftSide");
    const rightSide = document.getElementById("rightSide");

    var index = 0

    checkboxesData.forEach(checkbox => {
        const checkboxWrapper = document.createElement("div");
        checkboxWrapper.classList.add("checkboxWrapper");

        //Creating the checkbox box and giving it a class
        const checkboxContainer = document.createElement("div");
        checkboxContainer.classList.add(`${checkbox.name}`);
        checkboxContainer.classList.add("checkboxContainer");

        //Make the checkbox
        const input = document.createElement("input");
        input.type = "checkbox";
        input.id = checkbox.id;
        input.name = checkbox.name;
        input.value = checkbox.value;
        input.onclick = function() {addElement(this.value, this.id)};

        // Create the label
        const label = document.createElement("label");
        label.htmlFor = checkbox.id;
        label.textContent = checkbox.name;

        // Attach everything together
        checkboxContainer.appendChild(input);
        checkboxContainer.appendChild(label);
        checkboxWrapper.appendChild(checkboxContainer);

        if (index % 2 === 0) {
            leftSide.appendChild(checkboxWrapper);
        } else {
            rightSide.appendChild(checkboxWrapper);
        }
        index++;
    })
}

// End of stream section

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

function videoHandleModifier() {
    var showVideoHandler = document.getElementById("showVideoHandler");
    var hideVideoHandler = document.getElementById("hideVideoHandler");
      

    showVideoHandler.style.display = "none";
    hideVideoHandler.style.display = "block";

    showVideoHandler.addEventListener("click", function() {
        showVideoHandler.style.display = "none";
        hideVideoHandler.style.display = "block";

        var streams = document.getElementsByClassName("streamContainers");
        for (var i = 0; i < streams.length; i++) {
            var streamId = streams[i].id;
            var videoContainer = document.getElementById(streamId);

            if(videoContainer) {
                if(videoContainer.parentNode) {
                    var videoHandler = videoContainer.querySelector(".videoHandler"); 
                    videoHandler.style.display = "block";
                }
            }
        }
    });

    hideVideoHandler.addEventListener("click", function() {
        showVideoHandler.style.display = "block";
        hideVideoHandler.style.display = "none";

        var streams = document.getElementsByClassName("streamContainers");
        for (var i = 0; i < streams.length; i++) {
            var streamId = streams[i].id;
            var videoContainer = document.getElementById(streamId);

            if(videoContainer) {
                if(videoContainer.parentNode) {
                    var videoHandler = videoContainer.querySelector(".videoHandler"); // Select the child by class name
                    videoHandler.style.display = "none";
                }
            }
        }
    });
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
        videoContainer.style.width = "50%";
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
            } else {
                alert("Dont be a numpty, please enter numbers 0-100");
            }
            
        }
    })
}


function resizeElements() {
    var streamContainers = document.querySelectorAll(".streamContainers");
    var contentArea = document.getElementById("contentArea");
    var contentAreaWidth = contentArea.width;
    var contentAreaHeight = contentArea.height;

    streamContainers.forEach(function(container) {
        var videoDiv = container.querySelector(".videoDiv");
        adjustAspectRatio(videoDiv);
        
        var iframe = container.querySelector("iframe");
        iframe.style.width = "100%";
        iframe.style.height = "100%";  

        console.log(container.top);
        var percentageLeft = ((container.left - contentArea.left) / contentAreaWidth) * 100;
        var percentageTop = ((container.top - contentArea.top) / contentAreaHeight) * 100;

        container.style.left = percentageLeft + "%";
        container.style.top = percentageTop + "%";
    }); 
}


window.addEventListener('load', function() {
    addCheckboxListeners();
    refresh();
    volume();
    videoHandleModifier();
    applyStreamWidth();
}); 

window.addEventListener('resize', resizeElements);

window.addEventListener("resize", RemoveAddElements);
window.addEventListener("load", function() {
    RemoveAddElements();  
})

// Listen for fullscreen changes
document.addEventListener('fullscreenchange', function() {
    resizeElements();
});

// This is for browser compatibility as different browsers use different events
document.addEventListener('webkitfullscreenchange', function() {
    resizeElements();
});
document.addEventListener('mozfullscreenchange', function() {
    resizeElements();
});
document.addEventListener('msfullscreenchange', function() {
    resizeElements();
});