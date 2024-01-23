function dynInput(cbox) {
    if (cbox.checked) {
        var div = document.createElement("div");
        div.id = cbox.name;
        div.innerHTML = '<iframe id="video" src="https://www.youtube.com/embed/0EZQaF_liXw?autoplay=1&controls=0&mute=1">';
        document.getElementById("contentArea").appendChild(div);
        dragElement(document.getElementById("video"));
    } else {
      document.getElementById(cbox.name).remove();
    }
  }

function dragElement(elmnt) {
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    elmnt.onmousedown = dragMouseDown;

    function dragMouseDown(e) {
        e = e || window.event;
        e.preventDefault();
        // Mouse position on startup
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement();
        // call function whenever cursor moves
        document.onmousemove = elementDrag;

        function elementDrag(e) {
            e = e || window.event;
            e.preventDefault();
            // Calculate new cursor position
            pos1 = pos3 - e.clientX;
            pos2 = pos4 - e.clientY;
            pos3 = e.clientX;
            pos4 = e.clientY;
            // Set elements new position
            elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
            elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
        }

        function closeDragElement() {
            // stop moving when mouse is release
            document.onmouseup = null;
            document.onmousemove = null;
        }
    }



}