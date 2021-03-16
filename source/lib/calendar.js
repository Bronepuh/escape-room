(function () {
  var titleResult = document.querySelector('.result__title');
  var dateResult = document.querySelector('.result__date');
  var timeResult = document.querySelector('.result__time');
  var buySubmitButton = document.querySelector('.button--buy');
  var priceInput = document.querySelector('#price');
  var priceResult = document.querySelector('.result__price');
  var formRadioItems = document.querySelectorAll('.inputfeelds__item--radio');
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

      calendar.addEventListener('pickmeup-change', function (evt) {
        var chosenDate = evt.detail.formatted_date;
        var date = evt.detail.date.getDate();
        var month = evt.detail.date.getMonth();

        var monthNumberToName = {
          0: 'января',
          1: 'февраля',
          2: 'марта',
          3: 'апреля',
          4: 'мая',
          5: 'июня',
          6: 'июля',
          7: 'августа',
          8: 'сентября',
          9: 'октября',
          10: 'ноября',
          11: 'декабря'
        };

        titleResult.textContent = 'Вы выбрали игру';
        dateInput.value = chosenDate;
        dateLabel.textContent = date + ' ' + monthNumberToName[month];
        dateResult.textContent = date + ' ' + monthNumberToName[month];
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

    formRadioItems.forEach(function (el) {
      el.addEventListener('click', function () {
        renderInfo(el);
      });
    });
  }

})();
