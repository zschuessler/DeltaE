var elements = document.getElementsByTagName('script')

Array.prototype.forEach.call(elements, function (element) {
    if (element.type.indexOf('math/tex') != -1) {
        // Extract math markdown
        var textToRender = element.innerText || element.textContent;

        // Create span for KaTeX
        var katexElement = document.createElement('span');

        // Support inline and display math
        if (element.type.indexOf('mode=display') != -1) {
            katexElement.className += "math-display";
            textToRender = '\\displaystyle {' + textToRender + '}';
        } else {
            katexElement.className += "math-inline";
        }

        katex.render(textToRender, katexElement);
        element.parentNode.insertBefore(katexElement, element);
    }

});

$(document).ready(function() {
    var currentUrl = window.location.href;

    if (-1 !== currentUrl.indexOf('/learn')) {
        $('.page-link_learn').addClass('nav-active');
    } else if (-1 !== currentUrl.indexOf('/demo')) {
        $('.page-link_demos').addClass('nav-active');
    } else {
        $('.page-link_home').addClass('nav-active');
    }
});