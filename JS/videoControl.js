function addElement() {
    var videoContainer = document.createElement("div");
    var videoHandler = document.createElement("div");
    var videoDiv = document.createElement("div");

    videoDiv.style.width = "100%";
    videoDiv.style.backgroundColor = "red";

    videoContainer.style.backgroundColor = "white";

    videoHandler.style.width = "100%";
    videoHandler.style.height = "50px";
    videoHandler.style.backgroundColor = "blue";

    videoContainer.appendChild(videoHandler);
    videoContainer.appendChild(videoDiv);
    document.getElementById("contentArea").appendChild(videoContainer);

    videoContainer.style.width = "40%";
   

   setTimeout(function() {
    adjustAspectRatio(videoDiv);
   }, 0);
    

    
};

addElement();

function adjustAspectRatio(container) {
    var width = container.offsetWidth;
    var height = width * (9/16);
    container.style.height = height + 'px';
}