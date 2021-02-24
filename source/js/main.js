'use strict';

(function () {
  // popup

  var body = document.querySelector('.page__body');
  var linkPopup = document.querySelector('.page-header__callback');
  var popup = document.querySelector('.popup');

  if (popup) {
    var popupIn = popup.querySelector('.popup__wrapper');
    var closeButton = popup.querySelector('.popup__close-btn');

    var popupForm = popup.querySelector('.popup__form');
    var popupName = popup.querySelector('#name-popup');
    var popupTel = popup.querySelector('#tel-popup');
    var popupText = popup.querySelector('#popup-question');

    var isStorageSupport = true;
    var storageName = '';
    var storageTel = '';
    var storageText = '';

    try {
      storageName = localStorage.getItem('name');
      storageTel = localStorage.getItem('tel');
      storageText = localStorage.getItem('text');
    } catch (err) {
      isStorageSupport = false;
    }

    linkPopup.addEventListener('click', function (evt) {
      evt.preventDefault();
      popup.classList.add('popup--open');
      body.classList.add('page__body--no-scroll');

      popupName.focus();

      if (storageName) {
        popupName.value = storageName;
        popupTel.value = storageTel;
        popupText.value = storageText;
      }
    });

    closeButton.addEventListener('click', function (evt) {
      evt.preventDefault();
      popup.classList.remove('popup--open');
      body.classList.remove('page__body--no-scroll');
    });

    popupForm.addEventListener('submit', function (evt) {
      if (!popupName.value || !popupTel.value) {
        evt.preventDefault();
      } else {
        if (isStorageSupport) {
          localStorage.setItem('name', popupName.value);
          localStorage.setItem('tel', popupTel.value);
          localStorage.setItem('text', popupText.value);
        }
      }
    });

    window.addEventListener('keydown', function (evt) {
      if (evt.key === 'Escape' || evt.key === 'Esc') {
        if (popup.classList.contains('popup--open')) {
          evt.preventDefault();
          popup.classList.remove('popup--open');
          body.classList.remove('page__body--no-scroll');
        }
      }
    });

    popup.addEventListener('click', function (evt) {
      if (evt.target !== popupIn) {
        popup.classList.remove('popup--open');
        body.classList.remove('page__body--no-scroll');
      }
    });

    popupIn.addEventListener('click', function (evt) {
      evt.stopPropagation();
    });
  }

  // scroll

  var links = document.querySelectorAll('.link-scroll');

  if (links) {
    var addSlowScroll = function (link) {
      link.addEventListener('click', function (evt) {
        evt.preventDefault();
        var id = link.getAttribute('href');

        document.querySelector(id).scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      });
    };

    for (var i = 0; i < links.length; i++) {
      addSlowScroll(links[i]);
    }
  }

  // accordion

  var accordions = document.querySelectorAll('.page-footer__accordion');
  var addSwitch = function (block) {
    var switcher = block.querySelector('.page-footer__switch');

    var closePopup = function (evt) {
      if (!(block.classList.contains('page-footer__accordion--close'))) {
        evt.stopPropagation();

        block.classList.add('page-footer__accordion--close');

        switcher.removeEventListener('click', closePopup);
      }
    };

    block.addEventListener('click', function () {
      for (var h = 0; h < accordions.length; h++) {
        accordions[h].classList.add('page-footer__accordion--close');
      }

      block.classList.remove('page-footer__accordion--close');

      switcher.addEventListener('click', closePopup);
    });
  };

  if (accordions) {
    for (var j = 0; j < accordions.length; j++) {
      accordions[j].classList.remove('page-footer__accordion--no-js');

      addSwitch(accordions[j]);
    }
  }

  // maskIn

  window.addEventListener('DOMContentLoaded', function () {
    function setCursorPosition(pos, elem) {
      elem.focus();
      if (elem.setSelectionRange) {
        elem.setSelectionRange(pos, pos);
      } else if (elem.createTextRange) {
        var range = elem.createTextRange();
        range.collapse(true);
        range.moveEnd('character', pos);
        range.moveStart('character', pos);
        range.select();
      }
    }

    var obj = {
      foo: function mask(event) {
        var matrix = '+7(___)___-__-__';
        var h = 0;
        var def = matrix.replace(/\D/g, '');
        var val = this.value.replace(/\D/g, '');
        if (def.length >= val.length) {
          val = def;
        }
        this.value = matrix.replace(/./g, function (a) {
          if (/[_\d]/.test(a) && h < val.length) {
            return val.charAt(h++);
          } else if (h >= val.length) {
            return '';
          } else {
            return a;
          }
        });
        if (event.type === 'blur') {
          if (this.value.length === 2) {
            this.value = '';
          }
        } else {
          setCursorPosition(this.value.length, this);
        }
      }
    };

    var elements = document.querySelectorAll('.input-mask');

    if (elements) {
      for (var k = 0; k < elements.length; k++) {
        elements[k].addEventListener('input', obj.foo, false);
        elements[k].addEventListener('focus', obj.foo, false);
        elements[k].addEventListener('blur', obj.foo, false);
      }
    }
  });

})();
