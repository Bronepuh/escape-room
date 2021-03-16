(function () {
  var pageBody = document.querySelector('.page-body');
  var feedbackForm = document.querySelector('.form--feedback');
  var inputWrappers = document.querySelectorAll('.inputfealds__input-wrapper');
  var userNameInput = document.querySelector('#user-name');
  var userEmailInput = document.querySelector('#user-email');
  var inputMsgs = document.querySelectorAll('.inputfields__item--feedback span');
  var overlay = document.querySelector('.overlay');
  var feedbackPopupButton = document.querySelector('.page-footer__question');
  var feedbackSubmitButton = document.querySelector('.button--feedback');
  var feedbackPopup = document.querySelector('.popup--feedback');

  var clearInputs = function () {
    userNameInput.value = '';
    userEmailInput.value = '';
  };

  var clearInputClasses = function (el) {
    el.classList.remove('inputfealds__input-wrapper--success');
    el.classList.remove('inputfealds__input-wrapper--error');
  };

  var feedbackPopupEscPress = function (evt) {
    if (evt.key === 'Escape') {
      closeFeedbackPopup();
    }
  };

  var openFeedbackPopup = function () {
    clearInputs();
    clearInputClasses(inputWrappers[0]);
    clearInputClasses(inputWrappers[1]);
    feedbackSubmitButton.disabled = true;
    pageBody.classList.add('page-body--popup');
    feedbackPopup.classList.remove('popup--hidden');
    feedbackPopup.querySelector('.popup__close').addEventListener('click', function () {
      closeFeedbackPopup();
    });
    feedbackPopup.querySelector('.popup__close').focus();
    document.addEventListener('keydown', feedbackPopupEscPress);
    overlay.addEventListener('click', closeFeedbackPopup);
    userNameInput.focus();
  };

  var closeFeedbackPopup = function () {
    pageBody.classList.remove('page-body--popup');
    feedbackPopup.classList.add('popup--hidden');
    document.removeEventListener('keydown', feedbackPopupEscPress);
    feedbackPopup.querySelector('.popup__close').removeEventListener('click', function () {
      closeFeedbackPopup();
    });
    overlay.removeEventListener('click', closeFeedbackPopup);
  };

  feedbackPopupButton.addEventListener('click', openFeedbackPopup);

  // validation
  var checkValidationFeedbackForm = function () {
    var minNameLength = 2;
    var maxNameLength = 10;

    // name
    var submitName = false;

    userNameInput.addEventListener('input', function () {
      var inputNameValue = userNameInput.value;
      var inputNameArr = inputNameValue.split(' ');

      var showNameError = function () {
        userNameInput.setCustomValidity('');
        clearInputClasses(inputWrappers[0]);
        inputWrappers[0].classList.add('inputfealds__input-wrapper--error');
        submitName = false;
      };

      var showNameSuccess = function () {
        userNameInput.setCustomValidity('');
        clearInputClasses(inputWrappers[0]);
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
        feedbackSubmitButton.disabled = false;
      } else {
        feedbackSubmitButton.disabled = true;
      }

      // feedbackSubmitButton.disabled = !Boolean(submitName && submitEmail);

    });

    // email
    var submitEmail = false;

    userEmailInput.addEventListener('input', function () {

      var inputEmailValue = userEmailInput.value;

      var showEmailError = function () {
        userEmailInput.setCustomValidity('');
        inputMsgs[1].textContent = 'Введён некорректный e-mail, попробуйте заново';
        clearInputClasses(inputWrappers[1]);
        inputWrappers[1].classList.add('inputfealds__input-wrapper--error');
      };

      var showEmailSuccess = function () {
        userEmailInput.setCustomValidity('');
        clearInputClasses(inputWrappers[1]);
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
        feedbackSubmitButton.disabled = false;
      } else {
        feedbackSubmitButton.disabled = true;
      }

      // feedbackSubmitButton.disabled = !Boolean(submitName && submitEmail);
    });
  };

  checkValidationFeedbackForm();

  // локалСторадж
  feedbackForm.addEventListener('submit', function () {
    localStorage.clear();
    localStorage.setItem('name', userNameInput.value);
    localStorage.setItem('email', userEmailInput.value);
  });
})();
