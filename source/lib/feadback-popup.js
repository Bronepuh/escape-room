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

  if (feedbackPopupOpen) {
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
  }

  // validation
  if (feedbackPopup) {
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

        var simbolsArray = ['#', '@', '$', '<', '>', '%', '.', '!', '?', '"', '\'', '&', '|', '\\', '§', '¶', '+', '-', '=', '*', ',', '/'];

        var checkAvailability = function (arr, val) {
          return arr.some(function (arrVal) {
            return val === arrVal;
          });
        };

        var checkValidationName = function (arrName) {

          var wrongName = false;

          for (var index = 0; index < arrName.length; index++) {
            var name = arrName[index];

            for (var simbolIndex = 0; simbolIndex < name.length; simbolIndex++) {
              var simbol = name[simbolIndex];
              var wrongSimbol = checkAvailability(simbolsArray, simbol);

              if (wrongSimbol) {
                wrongName = true;
              }
            }

            if (wrongName) {
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
  }

})();
