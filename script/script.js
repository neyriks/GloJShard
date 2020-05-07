'use strict';
document.addEventListener('DOMContentLoaded', () => {
    // Timer
    function countTimer(deadline) {
        const timerHours = document.querySelector('#timer-hours'),
            timerMinutes = document.querySelector('#timer-minutes'),
            timerSeconds = document.querySelector('#timer-seconds');


        function getTimeRemaining() {
            const dateStop = new Date(deadline).getTime(),
                dateNow = new Date().getTime(),
                timeRemaining = (dateStop - dateNow) / 1000,
                seconds = Math.floor(timeRemaining % 60),
                minutes = Math.floor((timeRemaining / 60) % 60),
                hours = Math.floor(timeRemaining / 60 / 60);
            return { timeRemaining, hours, minutes, seconds };
        }

        function formatTime(time) {
            if (time < 10) {
                time = '0' + time;
            }
            return time;
        }

        const updateTimer = setInterval(() => {
            const timer = getTimeRemaining();
            timerHours.textContent = formatTime(timer.hours);
            timerMinutes.textContent = formatTime(timer.minutes);
            timerSeconds.textContent = formatTime(timer.seconds);

            if (timer.timeRemaining < 0) {
                clearInterval(updateTimer);
                timerHours.textContent = '00';
                timerMinutes.textContent = '00';
                timerSeconds.textContent = '00';
            }
        }, 1000);
    }
    countTimer('30 may 2020');
    // Menu
    const toogleMenu = () => {
        const btnMenu = document.querySelector('.menu'),
            menu = document.querySelector('menu');

        const handlerMenu = () => {
            menu.classList.toggle('active-menu');
        };
        btnMenu.addEventListener('click', handlerMenu);
        menu.addEventListener('click', event => {
            const target = event.target;
            if (target.classList.contains('close-btn')) {
                handlerMenu();
            } else if (target.closest('li')) {
                handlerMenu();
            }
            return;
        });
        const anchors = document.querySelectorAll('li>a[href^="#"]'),
            btnScrollDown = document.querySelector('a[href="#service-block"]'),
            links = [...anchors, btnScrollDown];

        for (const anchor of links) {
            anchor.addEventListener('click', event => {
                event.preventDefault();
                const blockID = anchor.getAttribute('href');
                document.querySelector('' + blockID).scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            });
        }
        // Убираем анимацию у телефонов
        let count = -100;
        const menuAnimation = () => {
            if (document.documentElement.clientWidth  < 768) { // Проверка на экран
                menu.style.transition = 'none';
                return;
            }
            const fps = requestAnimationFrame(menuAnimation); //вычисляем фпс
            count += 2;
            menu.style.transform = `translate ${count}%`;
            if (count === 0) {
                cancelAnimationFrame(fps);
            }
        };
        menuAnimation();
    };
    toogleMenu();
    //popup
    const togglePopUp = () => {
        const popup = document.querySelector('.popup'),
            popupBtn = document.querySelectorAll('.popup-btn'),
            popupClose = document.querySelector('.popup-close'),
            popupContent = document.querySelector('.popup-content');
        popupBtn.forEach(elem => {
            elem.addEventListener('click', () => {
                popup.style.display = 'block';
                popupContent.style.opacity = 0;
                function animate({ duration, draw, timing }) {
                    const start = performance.now();
                    requestAnimationFrame(function animate(time) {
                        let timeFraction = (time - start) / duration;
                        if (timeFraction > 1) {
                            timeFraction = 1;
                        }
                        const progress = timing(timeFraction);
                        draw(progress);
                        if (timeFraction < 1) {
                            requestAnimationFrame(animate);
                        }
                    });
                }
                animate({
                    duration: 1000,
                    timing(timeFraction) {
                        return timeFraction;
                    },
                    draw(progress) {
                        popupContent.style.opacity = progress * 1;
                    },
                });
            });
        });
        popupClose.addEventListener('click', () => {
            popup.style.display = 'none';
        });
        document.addEventListener('click', e => {
            if (e.target === popup) {
                popup.style.display = 'none';
            }
        });
    };
    togglePopUp();
    // табы
    const tabs = () => {
        const tabHeader = document.querySelector('.service-header'),
            tab = tabHeader.querySelectorAll('.service-header-tab'),
            tabContent = document.querySelectorAll('.service-tab');

        const toggleTabContent = index => {
            for (let i = 0; i < tabContent.length; i++) {
                if (index === i) {
                    tab[i].classList.add('active');
                    tabContent[i].classList.remove('d-none');
                } else {
                    tab[i].classList.remove('active');
                    tabContent[i].classList.add('d-none');
                }
            }
        };

        tabHeader.addEventListener('click', event => {
            let target = event.target;
            target = target.closest('.service-header-tab');
            if (target) {
                tab.forEach((item, i) => {
                    if (item === target) {
                        toggleTabContent(i);
                    }
                });
            }
        });
    };
    tabs();
    // Слайдер
    const slider = () => {
        const slide = document.querySelectorAll('.portfolio-item'),
            slider = document.querySelector('.portfolio-content'),
            portfolioDots = document.querySelector('.portfolio-dots');

        let currentSlide = 0,
            interval;
        for (let i = 0; i < slide.length; i++) { // проверяем с длиной массива slide
            portfolioDots.insertAdjacentHTML('beforeend', // Добавить в конце
                `<li class="dot ${i === 0 ? 'dot-active' : ''}"></li>` // li с классом dot
            );
        }
        const dot = document.querySelectorAll('.dot');
        const prevSlide = (elem, index, strClass) => {
            elem[index].classList.remove(strClass);
        };
        const nextSlide = (elem, index, strClass) => {
            elem[index].classList.add(strClass);
        };
        const autoPlaySlide = () => {
            prevSlide(slide, currentSlide, 'portfolio-item-active');
            prevSlide(dot, currentSlide, 'dot-active');
            currentSlide++;
            if (currentSlide >= slide.length) {
                currentSlide = 0;
            }
            nextSlide(slide, currentSlide, 'portfolio-item-active');
            nextSlide(dot, currentSlide, 'dot-active');
        };
        const startSlide = (time = 3000) => {
            interval = setInterval(autoPlaySlide, time);
        };
        const stopSlide = () => {
            clearInterval(interval);
        };

        slider.addEventListener('click', event => {
            event.preventDefault();
            const target = event.target;
            if (!target.matches('.portfolio-btn, .dot')) {
                return;
            }
            prevSlide(slide, currentSlide, 'portfolio-item-active');
            prevSlide(dot, currentSlide, 'dot-active');
            if (target.matches('#arrow-right')) {
                currentSlide++;
            } else if (target.matches('#arrow-left')) {
                currentSlide--;
            } else if (target.matches('.dot')) {
                dot.forEach((elem, index) => {
                    if (elem === target) {
                        currentSlide = index;
                    }
                });
            }
            if (currentSlide >= slide.length) {
                currentSlide = 0;
            }
            if (currentSlide < 0) {
                currentSlide = slide.length - 1;
            }
            nextSlide(slide, currentSlide, 'portfolio-item-active');
            nextSlide(dot, currentSlide, 'dot-active');
        });

        slider.addEventListener('mouseover', event => {
            if (event.target.matches('.portfolio-btn') || event.target.matches('.dot')) {
                stopSlide();
            }
        });
        slider.addEventListener('mouseout', event => {
            if (event.target.matches('.portfolio-btn') || event.target.matches('.dot')) {
                startSlide();
            }
        });
        startSlide(1500);
    };
    // Калькулятор, проверка на ввод букв.
    const calculator = () => {
        const input = document.querySelectorAll('input[type=number]');
        input.forEach(e => {
            e.addEventListener('input', e => {
                e.target.value = e.target.value.replace(/\D/gi, '');
            });
        });
    };
    calculator();
    // Смена аватара
    const images = () => {
        const img = document.querySelectorAll('.command__photo');
        let oldSrc;
        img.forEach(img => {
            img.addEventListener('mouseenter', e => {
                oldSrc = e.target.src;
                event.target.src = event.target.dataset.img;
            });
            img.addEventListener('mouseout', e => {
                const oldImg = e.target;
                oldImg.src = oldSrc;
                // event.target.img = event.target.oldImg;
            });
        });
    };
    images();
    slider();

    // Калькулятор
    const calc = (price = 100) => {
        const calcBlock = document.querySelector('.calc-block'),
            calcType = document.querySelector('.calc-type'),
            calcSquare = document.querySelector('.calc-square'),
            calcDay = document.querySelector('.calc-day'),
            calcCount = document.querySelector('.calc-count'),
            totalValue = document.getElementById('total');

        const countSum = () => {
            let total = 0,
                countValue = 1,
                dayValue = 1;
            const typeValue = calcType.options[calcType.selectedIndex].value,
                squareValue = +calcSquare.value;
            if (calcCount.value > 1) {
                countValue += (calcCount.value - 1) / 10;
            }
            if (calcDay.value && calcDay.value < 5) {
                dayValue *= 2;
            } else if (calcDay.value && calcDay.value < 10) {
                dayValue *= 1.5;
            }
            if (typeValue && squareValue) {
                total = price * typeValue * squareValue * countValue * dayValue;
            }
            totalValue.textContent = total;
        };
        calcBlock.addEventListener('change', () => {
            const target = event.target;
            // Можно через if (target.matches)
            if (target === calcType || target === calcSquare || target === calcCount || target === calcDay) {
                countSum();
            }
        });
    };
    calc(100);
    //send-ajax-form
    const sendForm = () => {
        const errorMessage = 'Что-то пошло не так',
            successMessage = 'Спасибо! Мы скоро с вами свяжемся!',
            forms = document.querySelectorAll('form'),
            statusMessage = document.createElement('div');
        statusMessage.style.cssText = 'font-size: 2rem; color: #fff;';
        const preLoader = () => `<style>
.myContainer {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
    width: 100%;
  overflow: hidden;
  animation-delay: 1s;
  background-color: rgba(0,0,0,0.33);
position: fixed;
  left: 0;
  top: 0;
	z-index: 999;
}

.item-1 {
  width: 20px;
  height: 20px;
  background: #f583a1;
  border-radius: 50%;
  background-color: #eed968;
  margin: 7px;
  display: flex;
  justify-content: center;
  align-items: center;
}
@keyframes scale {
  0% {
    transform: scale(1);
  }
  50%,
    75% {
    transform: scale(2.5);
  }
  78%, 100% {
    opacity: 0;
  }
}
.item-1:before {
  content: '';
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: #eed968;
  opacity: 0.7;
  animation: scale 2s infinite cubic-bezier(0, 0, 0.49, 1.02);
  animation-delay: 200ms;
  transition: 0.5s all ease;
  transform: scale(1);
}

.item-2 {
  width: 20px;
  height: 20px;
  background: #f583a1;
  border-radius: 50%;
  background-color: #eece68;
  margin: 7px;
  display: flex;
  justify-content: center;
  align-items: center;
}
@keyframes scale {
  0% {
    transform: scale(1);
  }
  50%,
    75% {
    transform: scale(2.5);
  }
  78%, 100% {
    opacity: 0;
  }
}
.item-2:before {
  content: '';
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: #eece68;
  opacity: 0.7;
  animation: scale 2s infinite cubic-bezier(0, 0, 0.49, 1.02);
  animation-delay: 400ms;
  transition: 0.5s all ease;
  transform: scale(1);
}

.item-3 {
  width: 20px;
  height: 20px;
  background: #f583a1;
  border-radius: 50%;
  background-color: #eec368;
  margin: 7px;
  display: flex;
  justify-content: center;
  align-items: center;
}
@keyframes scale {
  0% {
    transform: scale(1);
  }
  50%,
    75% {
    transform: scale(2.5);
  }
  78%, 100% {
    opacity: 0;
  }
}
.item-3:before {
  content: '';
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: #eec368;
  opacity: 0.7;
  animation: scale 2s infinite cubic-bezier(0, 0, 0.49, 1.02);
  animation-delay: 600ms;
  transition: 0.5s all ease;
  transform: scale(1);
}

.item-4 {
  width: 20px;
  height: 20px;
  background: #f583a1;
  border-radius: 50%;
  background-color: #eead68;
  margin: 7px;
  display: flex;
  justify-content: center;
  align-items: center;
}
@keyframes scale {
  0% {
    transform: scale(1);
  }
  50%,
    75% {
    transform: scale(2.5);
  }
  78%, 100% {
    opacity: 0;
  }
}
.item-4:before {
  content: '';
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: #eead68;
  opacity: 0.7;
  animation: scale 2s infinite cubic-bezier(0, 0, 0.49, 1.02);
  animation-delay: 800ms;
  transition: 0.5s all ease;
  transform: scale(1);
}

.item-5 {
  width: 20px;
  height: 20px;
  background: #f583a1;
  border-radius: 50%;
  background-color: #ee8c68;
  margin: 7px;
  display: flex;
  justify-content: center;
  align-items: center;
}
@keyframes scale {
  0% {
    transform: scale(1);
  }
  50%,
    75% {
    transform: scale(2.5);
  }
  78%, 100% {
    opacity: 0;
  }
}
.item-5:before {
  content: '';
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: #ee8c68;
  opacity: 0.7;
  animation: scale 2s infinite cubic-bezier(0, 0, 0.49, 1.02);
  animation-delay: 1000ms;
  transition: 0.5s all ease;
  transform: scale(1);
}
              </style>
              <div class="myContainer">
                <div class="item-1"></div>
                <div class="item-2"></div>
                <div class="item-3"></div>
                <div class="item-4"></div>
                <div class="item-5"></div>
                </div>
              `;
        const postData = body => fetch('./server.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });
        const removeStatusMessage = () => {
            if (!statusMessage) {
                return;
            } else {
                setTimeout(() => {
                    statusMessage.remove();
                }, 5000);
            }
        };
        const success = () => {
            statusMessage.textContent = successMessage;
            removeStatusMessage();
        };
        const error = () => {
            statusMessage.textContent = errorMessage;
            statusMessage.style.cssText = `font-size: 2rem;
            color: red; `;
            removeStatusMessage();
        };
        forms.forEach(form => {
            form.addEventListener('submit', event => {
                event.preventDefault();
                form.appendChild(statusMessage);
                statusMessage.insertAdjacentHTML(`beforeend`, preLoader());
                const formData = new FormData(form);
                const body = {};
                formData.forEach((val, key) => {
                    body[key] = val;
                });
                postData(body).then(success, response => {
                    if (response.status !== 200) {
                        throw new Error('Status network not 200');
                    }
                }).catch(error);
                form.reset();
            });
            // Валидация формы.
            form.addEventListener('input', event => {
                const target = event.target;
                if (target.name === 'user_phone') {
                    target.value = target.value.replace(/[^\\+\d]/g, '');
                }
                if (target.name === 'user_name' || target.name === 'user_message') {
                    target.value = target.value.replace(/[^а-я ]/gi, '');
                }
            });
        });
    };
    sendForm();
});
