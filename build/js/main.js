'use strict';
(function () {
  var pageBody = document.querySelector('.page-body');
  var pageHeader = document.querySelector('.page-header');
  var pageMain = document.querySelector('.page-main');
  var pageFooter = document.querySelector('.page-footer');
  var headerToggle = document.querySelector('.page-header__toggle');
  var menuItems = document.querySelectorAll('.navigation__item');

  if (pageHeader) {
    pageHeader.classList.remove('page-header--nojs');
    pageFooter.classList.remove('page-footer--nojs');
    pageHeader.classList.add('page-header--closed');
  }

  if (pageHeader && pageBody) {
    var openMenu = function () {
      pageHeader.classList.remove('page-header--closed');
      pageHeader.classList.add('page-header--opened');
      pageFooter.classList.add('page-footer--visible');
      pageFooter.classList.add('page-footer--absolute');
      pageMain.classList.add('visually-hidden');
    };

    var closeMenu = function () {
      pageHeader.classList.add('page-header--closed');
      pageHeader.classList.remove('page-header--opened');
      pageFooter.classList.remove('page-footer--visible');
      pageFooter.classList.remove('page-footer--absolute');
      pageMain.classList.remove('visually-hidden');
    };

    var togglePageHeader = function () {
      if (pageHeader.classList.contains('page-header--closed')) {
        openMenu();
      } else {
        closeMenu();
      }
    };
  }

  if (headerToggle) {
    headerToggle.addEventListener('click', togglePageHeader);
    for (var i = 0; i < menuItems.length; i++) {
      menuItems[i].addEventListener('click', closeMenu);
    }
  }

  // calendar & form
  var titleResult = document.querySelector('.result__title');
  var dateResult = document.querySelector('.result__date');
  var timeResult = document.querySelector('.result__time');
  var buySubmitButton = document.querySelector('.button--buy');
  var priceInput = document.querySelector('#price');
  var priceResult = document.querySelector('.result__price');
  var formRadioList = document.querySelector('.form__radio-list');
  var formRadioItems = document.querySelectorAll('.form__radio-item');
  var calendar = document.querySelector('.date');

  if (calendar) {
    window.pickmeup(calendar, {
      format: 'Y-m-d',
      render: function (date) {
        if (date < now) {
          return {disabled: true, class_name: 'date-in-past'};
        }
        return {};
      }
    });

    var now = new Date;

    var dateInput = document.querySelector('#date');
    var dateLabel = document.querySelector('.form__calendar');
    var formTime = document.querySelector('.form__time');

    calendar.addEventListener('pickmeup-change', function (e) {
      // console.log(e.detail.formatted_date); // New date according to current format
      // console.log(e.detail.date); // New date as Date object

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
  };

  if (formRadioList) {
    formRadioItems.forEach(el =>
      el.addEventListener('click', function () {
        if (el.querySelector('input').checked) {

          var getPrice = function () {
            var price = String(el.querySelector('span').textContent);
            var priceArray = price.split('');
            priceArray.pop();
            price = priceArray.join('');
            return price;
          }

          priceInput.value = getPrice();
          timeResult.textContent = ' ' + 'в ' + el.querySelector('input').value;
          priceResult.textContent = 'К оплате ' + priceInput.value + ' рублей';
          buySubmitButton.classList.add('button--active');
        }
      }));
  }

  //location-popup
  var locationPopup = document.querySelector('.popup--location');
  var locationPopupButton = document.querySelector('.contacts__link--location');

  var locationPopupEscPress = function (evt) {
    if (evt.key === 'Escape') {
      closeLocationPopup();
    }
  };

  var openLocationPopup = function () {
    pageBody.classList.add('page-body--popup');
    locationPopup.classList.remove('popup--hidden');
    locationPopup.querySelector('.popup__close').addEventListener('click', function () {
      closeLocationPopup();
    });
    locationPopup.querySelector('.popup__close').focus();
    document.addEventListener('keydown', locationPopupEscPress);
    overlay.addEventListener('click', closeLocationPopup);
  };

  var closeLocationPopup = function () {
    pageBody.classList.remove('page-body--popup');
    locationPopup.classList.add('popup--hidden');
    document.removeEventListener('keydown', locationPopupEscPress);
    locationPopup.querySelector('.popup__close').removeEventListener('click', function () {
      closeLocationPopup();
    });
    overlay.removeEventListener('click', closeLocationPopup);
  };

  //feadback-popup
  var overlay = document.querySelector('.overlay');
  var feadbackPopupButton = document.querySelector('.page-footer__question');
  var feadbackPopup = document.querySelector('.popup--feadback');

  var FeadbackPopupEscPress = function (evt) {
    if (evt.key === 'Escape') {
      closeFeadbackPopup();
    }
  };

  var openFeadbackPopup = function () {
    pageBody.classList.add('page-body--popup');
    feadbackPopup.classList.remove('popup--hidden');
    feadbackPopup.querySelector('.popup__close').addEventListener('click', function () {
      closeFeadbackPopup();
    });
    feadbackPopup.querySelector('.popup__close').focus();
    document.addEventListener('keydown', FeadbackPopupEscPress);
    overlay.addEventListener('click', closeFeadbackPopup);
  };

  var closeFeadbackPopup = function () {
    pageBody.classList.remove('page-body--popup');
    feadbackPopup.classList.add('popup--hidden');
    document.removeEventListener('keydown', FeadbackPopupEscPress);
    feadbackPopup.querySelector('.popup__close').removeEventListener('click', function () {
      closeFeadbackPopup();
    });
    overlay.removeEventListener('click', closeFeadbackPopup);
  };

  locationPopupButton.addEventListener('click', openLocationPopup);
  feadbackPopupButton.addEventListener('click', openFeadbackPopup);

})();
