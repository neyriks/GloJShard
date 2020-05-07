'use strict';
document.addEventListener('DOMContentLoaded', () =>{
    let body = document.querySelector('body');
    function DomElement(selector, height, width, bg, position = 'absolute') {
        this.selector = selector;
        this.height = height;
        this.width = width;
        this.bg = bg;
        this.position = position;
}
    DomElement.prototype.randomMethod = function() {
        let newEl;
        if(this.selector[0] === '.') {
            newEl = document.createElement('div');
            newEl.className = (this.selector.split('.')[1]);
        } else if(this.selector[0] === '#') {
            newEl = document.createElement('p');
            newEl.id = (this.selector.split('#')[1]);
        } 
        newEl.style.cssText=`
            height: ${this.height}px;
            background: ${this.bg};
            width: ${this.width}px;
            font-size: ${this.fontSize}px;
            position: ${this.position};
        `;
        newEl.textContent = 'Zombie';
        body.append(newEl);
};
let newEl = new DomElement('.square', 100, 100, 'black', 'absolute');
let left = 0;
let top = 0;
    document.addEventListener('keydown', (e) => {
            const square = document.querySelector('.square');
            if(e.key === 'ArrowRight') {
                square.style.left = left + 'px';
                left+=10;
            }
            else if(e.key === 'ArrowLeft') {
                square.style.left = left + 'px';
                left-=10;
            } else if (e.key === 'ArrowUp') {
                square.style.top = top + 'px';
                top -=10;
            } else if (e.key === 'ArrowDown') {
                square.style.top = top + 'px';
                top +=10;
            }
    });
newEl.randomMethod();
});