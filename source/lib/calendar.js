(function () {
  var titleResult = document.querySelector('.result__title');
  var dateResult = document.querySelector('.result__date');
  var timeResult = document.querySelector('.result__time');
  var buySubmitButton = document.querySelector('.button--buy');
  var priceInput = document.querySelector('#price');
  var priceResult = document.querySelector('.result__price');
  var formRadioItems = document.querySelectorAll('.inputfields__item--radio');
  var calendar = document.querySelector('.date');
  var form = document.querySelector('.page-form.form');

  if (form) {
    if (calendar) {
      window.pickmeup(calendar, {
        format: 'Y-m-d',
        render: function (date) {
          if (date < now) {
            return {
              disabled: true,
              className: 'date-in-past'
            };
          }
          return {};
        }
      });

      var now = new Date();

      var dateInput = document.querySelector('#date');
      var dateLabel = document.querySelector('.form__calendar');
      var formTime = document.querySelector('.form__time');

      calendar.addEventListener('pickmeup-change', function (e) {
        var choosenDate = e.detail.formatted_date;
        var date = Number(choosenDate[8] + choosenDate[9]);
        var month = Number(choosenDate[5] + choosenDate[6]);

        var monthName = {
          1: 'января',
          2: 'февраля',
          3: 'марта',
          4: 'апреля',
          5: 'мая',
          6: 'июня',
          7: 'июля',
          8: 'августа',
          9: 'сентября',
          10: 'октября',
          11: 'ноября',
          12: 'декабря'
        };

        titleResult.textContent = 'Вы выбрали игру';
        dateInput.value = choosenDate;
        dateLabel.textContent = date + ' ' + monthName[month];
        dateResult.textContent = date + ' ' + monthName[month];
        window.pickmeup('.date').hide();
        formTime.classList.add('form__time--visible');

      });
    }

    var getPrice = function (el) {
      var price = String(el.querySelector('span').textContent);
      var priceArray = price.split('');
      priceArray.pop();
      price = priceArray.join('');
      return price;
    };

    var renderInfo = function (el) {
      if (el.querySelector('input').checked) {
        priceInput.value = getPrice(el);
        timeResult.textContent = ' ' + 'в ' + el.querySelector('input').value;
        priceResult.textContent = 'К оплате ' + priceInput.value + ' рублей';
        buySubmitButton.classList.add('button--active');
      }
    };

    var element = formRadioItems[0];
    var element1 = formRadioItems[1];
    var element2 = formRadioItems[2];
    var element3 = formRadioItems[3];
    var element4 = formRadioItems[4];
    var element5 = formRadioItems[5];
    var element6 = formRadioItems[6];
    var element7 = formRadioItems[7];
    var element8 = formRadioItems[8];
    var element9 = formRadioItems[9];
    var element10 = formRadioItems[10];
    var element11 = formRadioItems[11];

    element.addEventListener('click', function () {
      renderInfo(element);
    });

    element1.addEventListener('click', function () {
      renderInfo(element1);
    });

    element2.addEventListener('click', function () {
      renderInfo(element2);
    });

    element3.addEventListener('click', function () {
      renderInfo(element3);
    });

    element4.addEventListener('click', function () {
      renderInfo(element4);
    });

    element5.addEventListener('click', function () {
      renderInfo(element5);
    });

    element6.addEventListener('click', function () {
      renderInfo(element6);
    });

    element7.addEventListener('click', function () {
      renderInfo(element7);
    });

    element8.addEventListener('click', function () {
      renderInfo(element8);
    });

    element9.addEventListener('click', function () {
      renderInfo(element9);
    });

    element10.addEventListener('click', function () {
      renderInfo(element10);
    });

    element11.addEventListener('click', function () {
      renderInfo(element11);
    });
  }

})();
