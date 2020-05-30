window.addEventListener('load', function () {
    // get element
    var nav = document.querySelector('.nav');
    var cloud = document.querySelector('.cloud');
    var lis = document.querySelectorAll('li');
    // current as the starting position of the loop cloud
    var current = 0;
    // call
    for (var i = 0; i < lis.length; i++) {
        // mouse passing
        lis[i].addEventListener('mouseenter', function () {
            animate(cloud, this.offsetLeft);
        });
        // mouse away, jinDou cloud back to the starting position
        lis[i].addEventListener('mouseleave', function () {
            animate(cloud, current);
        });
        // click the mouse to take the current position as the target value
        lis[i].addEventListener('click', function () {
            current = this.offsetLeft;
            // kill everyone：clear all classes of li
            for (var i = 0; i < lis.length; i++) {
                lis[i].className = '';
            }
            // leave yourself
            this.className = 'current';
        });
    }
})