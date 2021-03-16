(function () {
  var pageBody = document.querySelector('.page-body');
  var feedbackForm = document.querySelector('.form--feadback');
  var inputWrappers = document.querySelectorAll('.inputfealds__input-wrapper');
  var userNameInput = document.querySelector('#user-name');
  var userEmailInput = document.querySelector('#user-email');
  var inputMsgs = document.querySelectorAll('.inputfields__item--feadback span');
  var overlay = document.querySelector('.overlay');
  var feadbackPopupButton = document.querySelector('.page-footer__question');
  var feadbackSubmitButton = document.querySelector('.button--feadback');
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
    feadbackSubmitButton.disabled = true;
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
    var minNameLength = 2;
    var maxNameLength = 10;

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
        feadbackSubmitButton.disabled = false;
      } else {
        feadbackSubmitButton.disabled = true;
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
        feadbackSubmitButton.disabled = false;
      } else {
        feadbackSubmitButton.disabled = true;
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
})();
