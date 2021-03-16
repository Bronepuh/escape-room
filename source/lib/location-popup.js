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
