(function () {
  var pageBody = document.querySelector('.page-body');
  var overlay = document.querySelector('.overlay');
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
})();
