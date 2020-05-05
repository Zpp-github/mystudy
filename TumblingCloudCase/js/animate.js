// animation function file

function animate(obj, target, callback) {
    // clear the previous timer first, and only keep the current timer execution
    clearInterval(obj.timer);
    obj.timer = setInterval(function () {
        // the step value needs to be written into the timer
        var step = (target - obj.offsetLeft) / 10;
        // change the step size value to an integer, without the decimal problem
        step = step > 0 ? Math.ceil(step) : Math.floor(step);
        if (obj.offsetLeft == target) {
            // stop animation、stop timer
            clearInterval(obj.timer);
            // callback function
            // if (callback) {
            //     // call function
            //     callback();
            // }
            callback && obj.callback;
        }
        obj.style.left = obj.offsetLeft + step + 'px';
    }, 10)
}