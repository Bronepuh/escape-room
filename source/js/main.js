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

    var headerToggleClickHandler = function () {
      if (pageHeader.classList.contains('page-header--closed')) {
        openMenu();
      } else {
        closeMenu();
      }
    };
  }

  if (headerToggle) {
    headerToggle.addEventListener('click', headerToggleClickHandler);
    for (var i = 0; i < menuItems.length; i++) {
      menuItems[i].addEventListener('click', closeMenu);
    }
  }
})();

(function () {
  var pageBody = document.querySelector('.page-body');
  var overlay = document.querySelector('.overlay');
  var locationPopup = document.querySelector('.popup--location');
  var locationPopupOpen = document.querySelector('.contacts__item--location');
  var locationPopupClose = document.querySelector('.popup--location .popup__close');

  var locationPopupEscPress = function (evt) {
    if (evt.key === 'Escape') {
      locationPopupCloseClickHandler();
    }
  };

  var locationPopupOpenClickHandler = function () {
    pageBody.classList.add('page-body--popup');
    locationPopup.classList.remove('popup--hidden');
    locationPopupClose.addEventListener('click', function () {
      locationPopupCloseClickHandler();
    });
    locationPopup.querySelector('.popup__close').focus();
    document.addEventListener('keydown', locationPopupEscPress);
    overlay.addEventListener('click', locationPopupCloseClickHandler);
  };

  var locationPopupCloseClickHandler = function () {
    pageBody.classList.remove('page-body--popup');
    locationPopup.classList.add('popup--hidden');
    document.removeEventListener('keydown', locationPopupEscPress);
    locationPopupClose.removeEventListener('click', function () {
      locationPopupCloseClickHandler();
    });
    overlay.removeEventListener('click', locationPopupCloseClickHandler);
  };

  locationPopupOpen.addEventListener('click', locationPopupOpenClickHandler);
})();

(function () {
  var pageBody = document.querySelector('.page-body');
  var feedbackForm = document.querySelector('.form--feedback');
  var inputWrappers = document.querySelectorAll('.inputfeelds__input-wrapper');
  var userNameInput = document.querySelector('#user-name');
  var userEmailInput = document.querySelector('#user-email');
  var inputMsgs = document.querySelectorAll('.inputfeelds__item--feedback span');
  var overlay = document.querySelector('.overlay');
  var feedbackPopupOpen = document.querySelector('.page-footer__question');
  var feedbackPopupClose = document.querySelector('.popup--feedback .popup__close');
  var feedbackSubmitButton = document.querySelector('.button--feedback');
  var feedbackPopup = document.querySelector('.popup--feedback');

  var clearInputs = function () {
    userNameInput.value = '';
    userEmailInput.value = '';
  };

  var clearInputClasses = function (el) {
    el.classList.remove('inputfeelds__input-wrapper--success');
    el.classList.remove('inputfeelds__input-wrapper--error');
  };

  var feedbackPopupEscPress = function (evt) {
    if (evt.key === 'Escape') {
      feedbackPopupCloseClickHandler();
    }
  };

  var feedbackPopupOpenClickHandler = function () {
    clearInputs();
    clearInputClasses(inputWrappers[0]);
    clearInputClasses(inputWrappers[1]);
    feedbackSubmitButton.disabled = true;
    pageBody.classList.add('page-body--popup');
    feedbackPopup.classList.remove('popup--hidden');
    feedbackPopupClose.addEventListener('click', function () {
      feedbackPopupCloseClickHandler();
    });
    feedbackPopup.querySelector('.popup__close').focus();
    document.addEventListener('keydown', feedbackPopupEscPress);
    overlay.addEventListener('click', feedbackPopupCloseClickHandler);
    userNameInput.focus();
  };

  var feedbackPopupCloseClickHandler = function () {
    pageBody.classList.remove('page-body--popup');
    feedbackPopup.classList.add('popup--hidden');
    document.removeEventListener('keydown', feedbackPopupEscPress);
    feedbackPopupClose.removeEventListener('click', function () {
      feedbackPopupCloseClickHandler();
    });
    overlay.removeEventListener('click', feedbackPopupCloseClickHandler);
  };

  feedbackPopupOpen.addEventListener('click', feedbackPopupOpenClickHandler);

  // validation
  var checkValidationFeedbackForm = function () {

    // name
    var minNameLength = 2;
    var maxNameLength = 10;
    var submitName = false;

    var userNameInputHandler = function () {
      var inputNameValue = userNameInput.value;
      var inputNameArr = inputNameValue.split(' ');

      var showNameError = function () {
        userNameInput.setCustomValidity('');
        clearInputClasses(inputWrappers[0]);
        inputWrappers[0].classList.add('inputfeelds__input-wrapper--error');
        submitName = false;
      };

      var showNameSuccess = function () {
        userNameInput.setCustomValidity('');
        clearInputClasses(inputWrappers[0]);
        inputWrappers[0].classList.add('inputfeelds__input-wrapper--success');
        inputMsgs[0].textContent = '';
        submitName = true;
      };

      var checkValidationName = function (arrName) {
        for (var index = 0; index < arrName.length; index++) {
          var name = arrName[index];
          if (name.includes('#') || name.includes('@') || name.includes('$') || name.includes('<') || name.includes('>') || name.includes('%') || name.includes('.') || name.includes('!') || name.includes('?') || name.includes('"') || name.includes('\'') || name.includes('&') || name.includes('|') || name.includes('\\') || name.includes('§') || name.includes('¶') || name.includes('+') || name.includes('-') || name.includes('=') || name.includes('*') || name.includes(',') || name.includes('/')) {
            showNameError();
            inputMsgs[0].textContent = 'Имя не должно содержать спецсимволы (#, @, $ и т. п.), знаки пунктуации, эмодзи и т.п.';
          } else if (name.length < minNameLength) {
            showNameError();
            inputMsgs[0].textContent = 'Имя должно состоять из 2-х и более символов';
          } else if (name.length > maxNameLength) {
            showNameError();
            inputMsgs[0].textContent = 'Имя не должно быть длиннее 10 символов';
          } else if (name.length === 0) {
            showNameError();
            inputMsgs[0].textContent = 'Вы ничего не ввели';
          } else {
            showNameSuccess();
          }
        }
      };

      checkValidationName(inputNameArr);
      if (submitName && submitEmail) {
        feedbackSubmitButton.disabled = false;
      } else {
        feedbackSubmitButton.disabled = true;
      }
    };

    userNameInput.addEventListener('input', userNameInputHandler);

    // email
    var submitEmail = false;

    var userEmailInputHandler = function () {
      var inputEmailValue = userEmailInput.value;

      var showEmailError = function () {
        userEmailInput.setCustomValidity('');
        inputMsgs[1].textContent = 'Введён некорректный e-mail, попробуйте заново';
        clearInputClasses(inputWrappers[1]);
        inputWrappers[1].classList.add('inputfeelds__input-wrapper--error');
      };

      var showEmailSuccess = function () {
        userEmailInput.setCustomValidity('');
        clearInputClasses(inputWrappers[1]);
        inputWrappers[1].classList.add('inputfeelds__input-wrapper--success');
        inputMsgs[1].textContent = '';
      };

      var checkValidationEmail = function (arrEmail) {

        submitEmail = /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/.test(arrEmail);

        if (submitEmail) {
          showEmailSuccess();
        } else {
          showEmailError();
        }
      };

      checkValidationEmail(inputEmailValue);

      if (submitName && submitEmail) {
        feedbackSubmitButton.disabled = false;
      } else {
        feedbackSubmitButton.disabled = true;
      }
    };

    userEmailInput.addEventListener('input', userEmailInputHandler);
  };

  checkValidationFeedbackForm();

  // локалСторадж
  feedbackForm.addEventListener('submit', function () {
    localStorage.clear();
    localStorage.setItem('name', userNameInput.value);
    localStorage.setItem('email', userEmailInput.value);
  });
})();

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
        var date = Number(chosenDate[8] + chosenDate[9]);
        var month = Number(chosenDate[5] + chosenDate[6]);

        var monthNumberToName = {
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
