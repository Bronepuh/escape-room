'use strict';
(function () {
  var pageBody = document.querySelector('.page-body');
  var pageHeader = document.querySelector('.page-header');
  var pageMain = document.querySelector('.page-main');
  var pageFooter = document.querySelector('.page-footer');
  var headerLogo = document.querySelector('.page-header__logo');
  var headerToggle = document.querySelector('.page-header__toggle');
  var descriptionButton = document.querySelector('.description__button');
  var menuItems = document.querySelectorAll('.navigation__item');
  var choiceItems = document.querySelectorAll('.choice__item');


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

  // routes

  // var resetRoutes = function () {
  //   pageBody.classList.remove('page-body--main');
  //   pageBody.classList.remove('page-body--choice');
  //   pageBody.classList.remove('page-body--promo');
  // }

  // headerLogo.addEventListener('click', function (evt) {
  //   evt.preventDefault();
  //   resetRoutes();
  //   pageBody.classList.add('page-body--main');
  //   window.location = "/";
  // })

  // descriptionButton.addEventListener('click', function (evt) {
  //   evt.preventDefault();
  //   resetRoutes();
  //   pageBody.classList.add('page-body--choice');
  // })

  // choiceItems.forEach(el => {
  //   el.addEventListener('click', function () {
  //     resetRoutes();
  //     pageBody.classList.add('page-body--promo');
  //   })
  // })

  // calendar

  var calendar = document.querySelector('.date');

  if (calendar) {
    pickmeup(calendar, {
      format: 'Y-m-d',
      render: function (date) {
        if (date < now) {
          return { disabled: true, class_name: 'date-in-past' };
        }
        return {};
      }
    });

    var now = new Date;
    console.log(now);

    var dateInput = document.querySelector('#date');
    var dateLabel = document.querySelector('label[for="date"]');
    var formTime = document.querySelector('.form__time');

    calendar.addEventListener('pickmeup-change', function (e) {
      console.log(e.detail.formatted_date); // New date according to current format
      console.log(e.detail.date);           // New date as Date object

      var choosenDate = e.detail.formatted_date;
      var date = Number(choosenDate[8] + choosenDate[9]);
      var month = Number(choosenDate[5] + choosenDate[6]);

      var monthName = {
        1: "января",
        2: "февраля",
        3: "марта",
        4: "апреля",
        5: "мая",
        6: "июня",
        7: "июля",
        8: "августа",
        9: "сентября",
        10: "октября",
        11: "ноября",
        12: "декабря"
      }

      dateInput.value = choosenDate;
      dateLabel.textContent = date + " " + monthName[month];
      pickmeup('.date').hide();
      formTime.classList.add('form__time--visible');

    })
  }


})();

