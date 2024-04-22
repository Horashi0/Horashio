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
})

function DisplayHamburgerMenus()
{
    let SpaceNews = document.getElementById('SpaceNews');
    let Blog = document.getElementById('Blog');
    let Stream = document.getElementById('Stream')
   
    SpaceNews.style.display = "block";
    SpaceNews.style.position = "absolute";
    SpaceNews.style.right = "20px";
    SpaceNews.style.top = "70px";
    SpaceNews.style.paddingTop = "20px";
    SpaceNews.style.paddingBottom = "20px";
    SpaceNews.style.fontSize = "30px";
    SpaceNews.style.color = "#F5F2F8";
    SpaceNews.style.zIndex = "99999999";

    Blog.style.display = "block";
    Blog.style.position = "absolute";
    Blog.style.right = "20px";
    Blog.style.top = "140px";
    Blog.style.paddingTop = "20px";
    Blog.style.paddingBottom = "20px";
    Blog.style.fontSize = "30px";
    Blog.style.color = "#F5F2F8";
    Blog.style.zIndex = "99999999";


    Stream.style.display = "block";
    Stream.style.position = "absolute";
    Stream.style.right = "20px";
    Stream.style.top = "210px";
    Stream.style.paddingTop = "20px";
    Stream.style.paddingBottom = "20px";
    Stream.style.fontSize = "30px";
    Stream.style.color = "#F5F2F8";
    Stream.style.zIndex = "99999999";
}

function HideHamburgerMenus()
{
    document.getElementById("SpaceNews").style.display = "none";
    document.getElementById("Blog").style.display = "none";
    document.getElementById("Stream").style.display = "none";
}

function RemoveAddElements() {
    const screenWidth = window.innerWidth;
    if (screenWidth > 770) {
        document.getElementById("SpaceNews").removeAttribute('style');
        document.getElementById("Blog").removeAttribute('style');
        document.getElementById("Stream").removeAttribute('style');
    } 
}

window.addEventListener("resize", RemoveAddElements);
window.addEventListener("load", function() {
    RemoveAddElements();  
})