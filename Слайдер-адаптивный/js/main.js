var flag = true,
    timerDuration = 5000,
    timer = 0;
// название модуля
var slider = (function() {
    //private обычно здесь указываются общие переменные используемые в модуле и функции

    return{
        // публичные методы , доступные из вне модуля
        //те функции которые будут вызфваться по загрузки документа . зависит от задачи
        init: function () {
            var _this = this;
            // создадим точки
            _this.createDots();
            //включим автопереключение
            _this.avtoSwitch();


            $('.slider_controls_button').on('click', function(e) {
                e.preventDefault();

                //сохранить тот слайд который надо подвинуть
                var $this =$(this),
                  //сохраним все слайды
                    slides = $this.closest('.slider').find('.slider_item'),
                    //сохраним активный
                    activeSlide = slides.filter('.active'),
                    nextSlide = activeSlide.next(),
                    prevSlide = activeSlide.prev(),
                    firstSlide = slides.first(),
                    lastSlide = slides.last();
                _this.clearTimer();

                if($this.hasClass('slider_controls_button_next')){

                    if(nextSlide.length){
                        //если кликнули то вызываем метод
                        _this.moveSlide(nextSlide, 'forward');
                    }else{
                        _this.moveSlide(firstSlide, 'forward');
                    }

                }
                else {
                    if(prevSlide.length){
                        //если кликнули то вызываем метод
                        _this.moveSlide(prevSlide, 'backward');
                    }else{
                        _this.moveSlide(lastSlide, 'backward');
                    }

                }
            });
            //клик по точкам

            $('.slider_dots-link').on('click', function(e) {
                e.preventDefault();
                var
                    $this = $(this),
                    dots = $this.closest('.slider_dots').find('.slider_dots-item'),
                    //активная точка
                    activeDot = dots.filter('.active'),
                    //текущая точка
                    dot = $this.closest('.slider_dots-item'),
                    //
                    curDotNum = dot.index(),
                    //определяе позицию слайдов , и определяем куда листать следующий слайд
                    direction = (activeDot.index() < curDotNum) ? 'forward' : 'backward',
                    reqSlide = $this.closest('.slider').find('.slider-item').eq(curDotNum);
                if (!dot.hasClass('active')){
                    _this.clearTimer();
                    _this.moveSlide(reqSlide, direction);
                }

            });
        },


        //функция которая будет двигать наши слайды
        //в функию запишем слай который нужно подвинуть и направление анимации
        moveSlide: function(slide, direction) {

            var
                _this = this,
                //пишем относительно контейнера для слайдера, чтобы можно было на странице использовать много слайдеров
                container = slide.closest('.slider'),
                slides = container.find('.slider_item'),
                //ищем кла актив
                activeSlide = slides.filter('.active'),
                //берется значение ширины у первого слайда
                slideWidth = slides.width(),
                //врямя за каторое будет проходить анимация
                duration = 1000,
                //сохранить позицию css в которую будем передвигать новый слайд
                reqCssPosition = 0,
                //сохраним необходимое смещение на количество рх.
                reqSlideStrafe = 0;


            if (flag){
                flag = false;
                //если направление анимации в перед то
                if (direction  === 'forward'){
                    //отодвигаем на ширину активного слайда
                    reqCssPosition = slideWidth;
                    //наше смещение будет равно ширене слайда
                    reqSlideStrafe = -slideWidth;

                }else if(direction === 'backward'){
                    //отодвигаем на ширину активного слайда
                    reqCssPosition = -slideWidth;
                    //наше смещение будет равно ширене слайда
                    reqSlideStrafe = slideWidth;
                }
                //слайд который передали обычным css сместим его на нужную позицию и добавим класс слайда который в анимации
                slide.css('left', reqCssPosition).addClass('inslide');

                //ищем слайд надкоторым будет произведена анимация
                var movableSlide = slides.filter('.inslide');

                //
                activeSlide.animate({left: reqSlideStrafe}, duration);
                //
                movableSlide.animate({left:0}, duration, function () {
                    //преводим все эл к ихночальному положению
                    var $this = $(this);
                    //возращяем  лефт к нулю(или к 15 это зависит от css) и удалим активный класс
                    slides.css('left', '0').removeClass("active");
                    //меняем классу inslide  на актив
                    $this.toggleClass('inslide active');
                    //активные liточки зависящие от слайдов
                    _this.setActiveDot(container.find('.slider_dots'));
                    flag = true;
                });
            }
        },


        createDots: function(){
            var
                _this = this,
                container = $(".slider");

                var
            //разметка для точек
            dotMarkup = ' <li class="slider_dots-item ">\
                <a href="#" class="slider_dots-link"></a>\
                </li>';
            container.each(function () {
                var $this = $(this),
                    slides = $this.find('.slider_item'),
                    dotContainer = $this.find('.slider_dots');

                for (var i = 0; i < slides.size(); i++){
                    dotContainer.append(dotMarkup);
                }
                _this.setActiveDot(dotContainer);
            } );

        },

        setActiveDot: function (containet) {
            var slides = containet.closest('.slider_list_wrap').find('.slider_item');
            containet
                .find('.slider_dots-item')
                //найдем ту точку которая соответствует позиции активного слайда, в наборе всех слайдов
                .eq(slides.filter('.active').index())
                .addClass('active')
                .siblings()
                .removeClass('active');
        },
        avtoSwitch : function () {
            var _this = this;

            timer = setInterval(function () {
                var slides = $('.slider_list .slider_item'),
                    activeSlide = slides.filter('.active'),
                    nextSlide = activeSlide.next(),
                    firstSlide = slides.first();

                if(nextSlide.length){
                    //если кликнули то вызываем метод
                    _this.moveSlide(nextSlide, 'forward');
                }else{
                    _this.moveSlide(firstSlide, 'forward');
                }

            }, timerDuration );

            
        },
        //чвтобы после клика таймер обнулялся
        clearTimer: function () {
            if(timer){
                clearInterval(timer);
                this.avtoSwitch();
            }

        }

    }
}());
$(document).ready(function () {
    //проверяем есть ли слайдер на странице, то мы его будем показывать
    if ($('.slider').length){
slider.init();
    }

});