//UkrInSoft test task
//Created by Vitaliy Bodnar

(function () {

    'use strict';

    // slider section identify
    var elem = document.getElementById('vbslider');

    var slider = {
        // options
        container: elem,    // slider block
        arrows: true,   // navigation arrows
        autoplay: true,    // automatic change slides
        autoplaytime: 2000,    // pause between slides change
        hoverpause: true,   // pause when mouse is over slider

        // functions
        // get array of elements
        arr: function () {
            var arr = this.container.getElementsByTagName('div');
            return arr;
        },

        // set container size and styles
        contSize: function() {
            this.container.style.position = 'relative';
            var parentCont = this.container.parentNode;
            this.container.style.width = parentCont.offsetWidth * this.arr().length + 'px';
            this.container.style.height = this.arr()[0].offsetHeight + 'px';
            return parentCont;
        },

        // set slides sizes
        slides: function() {
            this.arr()[0].style.left = '0';
            var arrLength = this.arr().length,
                width = this.contSize().offsetWidth;

            for (var i = 0; i < arrLength; i++) {
                var item = this.arr()[i];
                item.style.width = width + 'px';
                item.className = 'slide';
            }
        },

        // add buttons if option arrows => true;
        addArrows: function() {
            var left = document.createElement('button'),
                right = document.createElement('button');
            left.id = 'prev';
            right.id = 'next';
            this.container.parentNode.appendChild(left);
            this.container.parentNode.appendChild(right);
        },

        // arrows styles and height
        arrowsHeight: function () {
            document.getElementById('prev').style.height = this.contSize().offsetHeight - 4 + 'px';
            document.getElementById('next').style.height = this.contSize().offsetHeight - 4 + 'px';
        },

        // actions
        navigation: function () {
            var outerCont = this.contSize(),
                move = outerCont.offsetWidth,
                index = 0,
                nextBtn = document.getElementById('next'),
                prevBtn = document.getElementById('prev'),
                cont = this.container,
                arr = this.arr();

                // setting move distance
                function countmove() {
                    cont.style.transform = 'translateX(' + index * -move + 'px)';
                }

                // recount distance when window was resized
                window.addEventListener('resize', function(){
                    move = outerCont.offsetWidth;
                    countmove();
                });

            // to next slide func
            function nextSlide() {
                index++;
                countmove();
                if (index === arr.length) {
                    index = 0;
                    cont.style.transform = 'translateX(0px)';
                }
            }

            //to previous slide func
            function prevSlide() {
                index--;
                countmove();
                if (index < 0) {
                    cont.style.transform = 'translateX(' + ((arr.length * -move) + move) + 'px)';
                    index = arr.length - 1;
                }
            }

            // disable button after click (for epileptic users =) )
            function disableBtn(btn) {
                btn.disabled = true;
                setTimeout(function () {
                    btn.disabled = false;
                },500);
            }

            //set functions on btn.click
            nextBtn.onclick = function () {
                nextSlide();
                disableBtn(this);
            };
            prevBtn.onclick = function () {
                prevSlide();
                disableBtn(this);
            };


            // if autoplay option => true
            var autoplay = this.autoplay,
                autoplaytime = this.autoplaytime,
                hoverpause = this.hoverpause,
                container = this.container.parentNode;

            (function () {
                if (autoplay) {
                    // autoplay func
                    function repeatPlay() {
                        var interval = setInterval(function () {
                            nextSlide();
                        }, autoplaytime);
                        //pause autoplay on hover
                        if (hoverpause) {
                            container.onmouseover = function () {
                                clearInterval(interval);
                            };
                        }
                    }
                    repeatPlay();
                    // start autoplay when mouse out of slider
                    if (hoverpause) {
                        container.onmouseout = function () {
                            repeatPlay();
                        };
                    }
                }
            }());
        }
    };

    // call functions
    function vbslider(elem) {
        slider.arr();
        slider.contSize();
        slider.slides();
        if (slider.arrows) {
            slider.addArrows();
            slider.arrowsHeight();
        }
        slider.navigation();

        //recall functions on resize window
        window.addEventListener('resize', function(){
            slider.contSize();
            slider.slides();
            if (slider.arrows) {
                slider.arrowsHeight();
            }
        }, true);
    };

    // call slider
    vbslider(elem);

})();