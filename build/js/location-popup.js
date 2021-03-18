'use strict';
(function () {
  var pageBody = document.querySelector('.page-body');
  var overlay = document.querySelector('.overlay');
  var locationPopup = document.querySelector('.popup--location');
  var locationPopupFirstItem = document.querySelector('.location__detected');
  var locationPopupOpen = document.querySelector('.contacts__item--location');
  var locationPopupClose = document.querySelector('.popup--location .popup__close');

  if (locationPopupOpen) {
    var locationPopupEscHandler = function (evt) {
      if (evt.key === 'Escape') {
        closePopup();
      }
    };

    var openPopup = function () {
      pageBody.classList.add('page-body--popup');
      locationPopup.classList.remove('popup--hidden');
      locationPopupClose.addEventListener('click', function () {
        closePopup();
      });
      document.addEventListener('keydown', locationPopupEscHandler);
      overlay.addEventListener('click', function () {
        closePopup();
      });
      locationPopupFirstItem.focus();
    };

    var closePopup = function () {
      pageBody.classList.remove('page-body--popup');
      locationPopup.classList.add('popup--hidden');
      document.removeEventListener('keydown', locationPopupEscHandler);
      locationPopupClose.removeEventListener('click', function () {
        closePopup();
      });
      overlay.removeEventListener('click', function () {
        closePopup();
      });
    };

    locationPopupOpen.addEventListener('click', function (evt) {
      evt.preventDefault();
      openPopup();
    });
  }
})();
