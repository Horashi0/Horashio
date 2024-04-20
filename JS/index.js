function DisplayHamburger()
{
    document.querySelector('.hamburger').addEventListener('click', function() {
        document.querySelector('.closeIcon').style.display = 'inline';
        document.querySelector('.menuIcon').style.display = 'none';
    });
    DisplayHamburgerMenus();
}

function HideHamburger()
{
    document.querySelector('.hamburger').addEventListener('click', function() {
        document.querySelector('.closeIcon').style.display = 'none';
        document.querySelector('.menuIcon').style.display = 'inline';
    });
    HideHamburgerMenus();
}

function DisplayDropDown()
{
    document.querySelector('.expand').addEventListener('click', function() {
        document.querySelector('.dropUp').style.display = 'block';
        document.querySelector('.dropDown').style.display = 'none';
        console.log("top of the morning to ya lady")
        document.querySelector('.dropDownArea').style.display = 'block';
        
    });
}

function HideDropDown()
{
    document.querySelector('.expand').addEventListener('click', function() {
        document.querySelector('.dropUp').style.display = 'none';
        document.querySelector('.dropDown').style.display = 'block';

        document.querySelector('.dropDownArea').style.display = 'none';
    });
}


function DisplayHamburgerMenus()
{
    let SpaceNews = document.getElementById('SpaceNews');
    let Blog = document.getElementById('Blog');
    let Stream = document.getElementById('Stream')
   
    SpaceNews.style.cssText = `
        display: inline;   
        
        position: absolute;
        right: 20px;
        top: 70px;
        padding-top: 20px;
        padding-bottom: 20px;
        font-size: 30px;
    
        color: #F5F2F8;
        z-index: 99999999;
    `
    /*SpaceNews.style.display = "inline";
    SpaceNews.style.position = "absolute";
    SpaceNews.style.right = "20px";
    SpaceNews.style.top = "70px";
    SpaceNews.style.paddingTop = "20px";
    SpaceNews.style.paddingBottom = "20px";
    SpaceNews.style.fontSize = "30px";
    SpaceNews.style.color = "#F5F2F8";*/

    Blog.style.cssText = `
        display: inline;   
        
        position: absolute;
        right: 20px;
        top: 140px;
        padding-top: 20px;
        padding-bottom: 20px;
        font-size: 30px;
    
        color: #F5F2F8;
        z-index: 99999999;
    `

    Stream.style.cssText = `
        display: inline;   
            
        position: absolute;
        right: 20px;
        top: 210px;
        padding-top: 20px;
        padding-bottom: 20px;
        font-size: 30px;

        color: #F5F2F8;
        z-index: 99999999;
    `
    
}

function HideHamburgerMenus()
{
    document.getElementById('SpaceNews').style.display = 'none';
    document.getElementById('Blog').style.display = "none";
    document.getElementById('Stream').style.display = "none";
}

function RemoveAddElements() {
    const screenWidth = window.innerWidth;
    if (screenWidth > 770) {
        document.getElementById('SpaceNews').removeAttribute('style');
        document.getElementById('Blog').removeAttribute('style');
        document.getElementById('Stream').removeAttribute('style');

        document.querySelector('.dropDownArea').style.display = 'block';
    } else if (screenWidth < 770) {
        document.querySelector('.closeIcon').style.display = 'none';
        document.querySelector('.menuIcon').style.display = 'block'; 

        document.querySelector('.dropUp').style.display = 'none';
        document.querySelector('.dropDown').style.display = 'block'; 
    }
}

window.addEventListener('resize', RemoveAddElements);


window.addEventListener('load', function() {
    RemoveAddElements();

    document.querySelector('.dropDownArea').style.display = 'none';
})
