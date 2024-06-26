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
    

    document.getElementById("dropDown").addEventListener("click", function() {
        document.getElementById("dropUp").style.display = "block";
        document.getElementById("dropDown").style.display = "none";

        document.getElementById("dropDownArea").style.display = "block";
    });
    
    document.getElementById("dropUp").addEventListener("click", function() {
        document.getElementById("dropUp").style.display = "none";
        document.getElementById("dropDown").style.display = "block";
    
        // Remove attribute instead of setting display to none because when screen resizes over 770, CSS cant style the dropDownArea
        document.getElementById("dropDownArea").removeAttribute("style");
    });

    document.getElementById("dropUpControl").addEventListener("click", function() {
        document.getElementById("dropUpControl").style.display = "none";
        document.getElementById("dropDownControl").style.display = "block";
        
        document.getElementById("controlBar").style.display = "grid";

    });

    document.getElementById("dropDownControl").addEventListener("click", function() {
        document.getElementById("dropUpControl").style.display = "block";
        document.getElementById("dropDownControl").style.display = "none";
        
        document.getElementById("controlBar").style.display = "none";
    });

    document.getElementById("dropUpControlArea").addEventListener("click", function() {
        document.getElementById("dropUpControlArea").style.display = "none";
        document.getElementById("dropDownControlArea").style.display = "block";
        
        document.getElementById("dropDownArea").style.display = "block";

    });

    document.getElementById("dropDownControlArea").addEventListener("click", function() {
        document.getElementById("dropUpControlArea").style.display = "block";
        document.getElementById("dropDownControlArea").style.display = "none";
        
        document.getElementById("dropDownArea").style.display = "none";
    });
    
})

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

        document.getElementById("dropDown").removeAttribute("style");
        document.getElementById("dropUp").removeAttribute("style");

        document.getElementById("closeIcon").removeAttribute("style");
        document.getElementById("menuIcon").removeAttribute("style");
    } 
}

window.addEventListener("resize", RemoveAddElements);
window.addEventListener("load", function() {
    RemoveAddElements();  
})