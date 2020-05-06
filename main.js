'use strict';
document.addEventListener('DOMContentLoaded', () => {
    const button = document.getElementById('button'),
        reset = document.getElementById('reset'),
        block = document.querySelector('.block');
    let intervalBlock,
        count = 0,
        animate = false;
    button.addEventListener('click', () => {
        if (animate) {
            intervalBlock = requestAnimationFrame(move);
            animate = false;
        } else if (!animate) {
            animate = true;
            intervalBlock = requestAnimationFrame(move);
        }
        else {
            animate = true;
            cancelAnimationFrame(intervalBlock);
        }

    });
    let move = function () {
        intervalBlock = requestAnimationFrame(move);
        count++;
        if (count < 350) {
            block.style.left = count + "px";
        } else {
            cancelAnimationFrame(intervalBlock);
        }
    };


    reset.addEventListener('click', () => {
        count = 0;
        animate = false;
        block.style.left = 0;
        cancelAnimationFrame(intervalBlock);
    });
})
