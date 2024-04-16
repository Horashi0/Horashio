function highlightCurrentPage() {
    var currentPage = location.pathname.split("/").pop();
    var links = document.querySelectorAll('.menu-item');
    links.forEach(function(link) {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('load', function() {
    highlightCurrentPage();
});