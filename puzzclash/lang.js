// Shows one language at a time. Defaults to the browser's, falls back to English.
(function () {
  var supported = ['en', 'tr'];
  var stored = null;
  try {
    stored = localStorage.getItem('puzzclash-lang');
  } catch (error) {
    stored = null;
  }
  var browser = (navigator.language || 'en').slice(0, 2);
  var initial = supported.indexOf(stored) >= 0 ? stored : supported.indexOf(browser) >= 0 ? browser : 'en';

  function apply(lang) {
    document.documentElement.lang = lang;
    document.querySelectorAll('[data-lang]').forEach(function (node) {
      node.classList.toggle('active', node.getAttribute('data-lang') === lang);
    });
    document.querySelectorAll('.langs button').forEach(function (button) {
      button.setAttribute('aria-pressed', String(button.dataset.set === lang));
    });
    try {
      localStorage.setItem('puzzclash-lang', lang);
    } catch (error) {
      /* private mode: the choice just does not persist */
    }
  }

  document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.langs button').forEach(function (button) {
      button.addEventListener('click', function () {
        apply(button.dataset.set);
      });
    });
    apply(initial);
  });
})();
