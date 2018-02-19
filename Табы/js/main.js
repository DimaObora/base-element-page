$(document).ready(function () {
    $('.tabs_controls-link').on('click', function (e) {
        // запрещает дефолдное действие эл. переход по ссылке
        e.preventDefault();

        // указываем переменную li  найдем ее относительно jq
        var item = $(this).closest('.tabs_controls-item'),
            // li сонтент скрывать показывать
         contentItem =  $('.tabs_item')  ,
            // берем свойство data
            itemPosition = item.data('class');

        //найдем li по фильтру с контентом
        contentItem.filter('.tabs_item_' + itemPosition)
        // добавим эл.
            .add(item)
            //добовляем клас актив
            .addClass('active')
            //удаляек актив у остальных эл
            .siblings()
            .removeClass('active');


    });
});