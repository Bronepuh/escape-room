'use strict';
(function () {
  var pageBody = document.querySelector('.page-body');
  var pageHeader = document.querySelector('.page-header');
  var pageMain = document.querySelector('.page-main');
  var pageFooter = document.querySelector('.page-footer');
  var headerToggle = document.querySelector('.page-header__toggle');
  var feedbackForm = document.querySelector('.form--feadback');
  var menuItems = document.querySelectorAll('.navigation__item');
  var inputWrappers = document.querySelectorAll('.inputfealds__input-wrapper');
  var userNameInput = document.querySelector('#user-name');
  var userEmailInput = document.querySelector('#user-email');
  var inputMsgs = document.querySelectorAll('.inputfields__item--feadback span');

  if (pageBody && locationPopup) {
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
    var feadbsckSubmitButton = document.querySelector('.button--feadback');
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

    if (formRadioList) {
      var renderInfo = function (el) {
        var getPrice = function () {
          var price = String(el.querySelector('span').textContent);
          var priceArray = price.split('');
          priceArray.pop();
          price = priceArray.join('');
          return price;
        };

        if (el.querySelector('input').checked) {
          priceInput.value = getPrice();
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

    // location-popup
    var locationPopup = document.querySelector('.popup--location');
    var locationPopupButton = document.querySelector('.contacts__item--location');

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

    locationPopupButton.addEventListener('click', openLocationPopup);

    // feadback-popup
    var overlay = document.querySelector('.overlay');
    var feadbackPopupButton = document.querySelector('.page-footer__question');
    var feadbackPopup = document.querySelector('.popup--feadback');

    var clearInputs = function () {
      userNameInput.value = '';
      userEmailInput.value = '';
    };

    var clearNameClasses = function () {
      inputWrappers[0].classList.remove('inputfealds__input-wrapper--success');
      inputWrappers[0].classList.remove('inputfealds__input-wrapper--error');
    };

    var clearEmailClasses = function () {
      inputWrappers[1].classList.remove('inputfealds__input-wrapper--success');
      inputWrappers[1].classList.remove('inputfealds__input-wrapper--error');
    };


    var feadbackPopupEscPress = function (evt) {
      if (evt.key === 'Escape') {
        closeFeadbackPopup();
      }
    };

    var openFeadbackPopup = function () {
      clearInputs();
      clearNameClasses();
      clearEmailClasses();
      feadbsckSubmitButton.disabled = true;
      pageBody.classList.add('page-body--popup');
      feadbackPopup.classList.remove('popup--hidden');
      feadbackPopup.querySelector('.popup__close').addEventListener('click', function () {
        closeFeadbackPopup();
      });
      feadbackPopup.querySelector('.popup__close').focus();
      document.addEventListener('keydown', feadbackPopupEscPress);
      overlay.addEventListener('click', closeFeadbackPopup);
      userNameInput.focus();
    };

    var closeFeadbackPopup = function () {
      pageBody.classList.remove('page-body--popup');
      feadbackPopup.classList.add('popup--hidden');
      document.removeEventListener('keydown', feadbackPopupEscPress);
      feadbackPopup.querySelector('.popup__close').removeEventListener('click', function () {
        closeFeadbackPopup();
      });
      overlay.removeEventListener('click', closeFeadbackPopup);
    };

    feadbackPopupButton.addEventListener('click', openFeadbackPopup);

    // validation
    var checkValidationFeadbackForm = function () {
      var minNameLenght = 2;
      var maxNameLenght = 10;

      // name
      var submitName = false;

      userNameInput.addEventListener('input', function () {
        var inputNameValue = userNameInput.value;
        var inputNameArr = inputNameValue.split(' ');

        var showNameError = function () {
          userNameInput.setCustomValidity('');
          clearNameClasses();
          inputWrappers[0].classList.add('inputfealds__input-wrapper--error');
          submitName = false;
        };

        var showNameSuccess = function () {
          userNameInput.setCustomValidity('');
          clearNameClasses();
          inputWrappers[0].classList.add('inputfealds__input-wrapper--success');
          inputMsgs[0].textContent = '';
          submitName = true;
        };

        var checkValidationName = function (arrName) {

          for (var index = 0; index < arrName.length; index++) {

            var name = arrName[index];

            if (name.includes('#') || name.includes('@') || name.includes('$') || name.includes('<') || name.includes('>') || name.includes('%') || name.includes('.') || name.includes('!') || name.includes('?') || name.includes('"') || name.includes('\'') || name.includes('&') || name.includes('|') || name.includes('\\') || name.includes('§') || name.includes('¶') || name.includes('+') || name.includes('-') || name.includes('=') || name.includes('*') || name.includes(',') || name.includes('/')) {
              showNameError();
              inputMsgs[0].textContent = 'Имя не должно содержать спецсимволы (#, @, $ и т. п.), знаки пунктуации, эмодзи и т.п.';
            } else if (name.length < minNameLenght) {
              showNameError();
              inputMsgs[0].textContent = 'Имя должно состоять из 2-х и более символов';
            } else if (name.length > maxNameLenght) {
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
          feadbsckSubmitButton.disabled = false;
        } else {
          feadbsckSubmitButton.disabled = true;
        }
      });

      // email
      var submitEmail = false;

      userEmailInput.addEventListener('input', function () {

        var inputEmailValue = userEmailInput.value;

        var showEmailError = function () {
          userEmailInput.setCustomValidity('');
          inputMsgs[1].textContent = 'Введён некорректный e-mail, попробуйте заново';
          clearEmailClasses();
          inputWrappers[1].classList.add('inputfealds__input-wrapper--error');
        };

        var showEmailSuccess = function () {
          userEmailInput.setCustomValidity('');
          clearEmailClasses();
          inputWrappers[1].classList.add('inputfealds__input-wrapper--success');
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
          feadbsckSubmitButton.disabled = false;
        } else {
          feadbsckSubmitButton.disabled = true;
        }
      });
    };

    checkValidationFeadbackForm();

    // локалСторадж
    feedbackForm.addEventListener('submit', function () {
      localStorage.clear();
      localStorage.setItem('name', userNameInput.value);
      localStorage.setItem('email', userEmailInput.value);
    });
  }

})();
