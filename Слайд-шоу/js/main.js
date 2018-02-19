$(document).ready(function () {
    //клик по ссылкам верхнего уровня
    $('.slideshow_pic').on('click', function (e) {
        // запрещает дефолдное действие эл. переход по ссылке
        e.preventDefault();

        // сохраняем переменные
        var $this = $(this),
            //сохраняем li по которой кликнули
            item = $this.closest('.slideshow_item'),
            //сохраняем контент со слайдером
            container = $this.closest('.slideshow'),
            //сохраняем блок отображения вида
            display = container.find('.slideshow_display'),
            //принцип работы слайдера берем src у img  и вставляем его в блок slideshow_display
            paht = item.find('img').attr('src'),
            // время анимации
            duration =  300;

        if (!item.hasClass('active')){
            //добавили клас у актива, чтоб не нажимался анимация на одином и тодже слайде, а у остальных его убираем
            item.addClass('active').siblings().removeClass('active');
            display.find('img').fadeOut(duration, function () {
                $(this).attr('src',paht).fadeIn(duration);
            })

        }



    });
});