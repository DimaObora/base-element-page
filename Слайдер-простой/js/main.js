$(document).ready(function () {
    //клик по ссылкам верхнего уровня
    $('.slider_controls_button').on('click', function (e) {
        // запрещает дефолдное действие эл. переход по ссылке
        e.preventDefault();

        var $this = $(this),
            //обвертка всего слайдера
            container = $this.closest('.slider'),
            //сохраним список
            list = container.find('.slider_list'),
            // сохраним все items
            items = container.find('.slider_item'),
            //сохраним активный слайд
            activeSlide = items.filter('.active'),
            //сохраним следующий от активного
            nextSlide = activeSlide.next(),
            //и предыдущий
            prevSlide = activeSlide.prev(),
            //сохраним первый
            firstSlide = items.first(),
            // и последний слайд
            lastSlide = items.last(),
            //для вычитания позиции слайда
            sliderOffdet = container.offset().left,
            //пустая переменная в которую будет записываться положение искомого слайда
            reqPos = 0;

        //если есть класс next ,  листаем в право
        if ($(this).hasClass('slider_controls_button_next')) {
            //проверяем есть ли слайд
            if (nextSlide.length) {
                findReqPos(nextSlide);
                removeActiveClass(nextSlide);
            }
            //если нет то ищем первый слайд
            else {
                findReqPos(firstSlide);
                removeActiveClass(firstSlide);
            }
        }
        // листает в лево
        else {
            //проверяем есть ли слайд
            if (prevSlide.length) {
                findReqPos(prevSlide);
                removeActiveClass(prevSlide);
            }
            // если нет то ищем последний слайд
            else {
                findReqPos(lastSlide);
                removeActiveClass(lastSlide);
            }
        }
        //список будем менять css
        list.css('left', '-=' + reqPos + 'px');
        //функция удаления активного класса
        function removeActiveClass(reqSlide) {
            reqSlide.addClass('active').siblings().removeClass('active');

        }
        //функция для поиска позиции
        function findReqPos(slide) {
            reqPos = slide.offset().left - sliderOffdet;
        }

    });
});