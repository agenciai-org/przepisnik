// Stała część strony pod linkiem (polecenie /udostepnij). Wygląd strony zostaje bez zmian.
(function () {
  // 1. Linki w obrębie strony (#spis, #przepis/…). Strona pod linkiem bywa pokazana w ramce, w której zwykłe
  //    kliknięcie takiego linku nic nie daje, więc adres po # zmieniamy sami.
  document.addEventListener("click", function (e) {
    var a = e.target && e.target.closest ? e.target.closest('a[href^="#"]') : null;
    if (!a || e.defaultPrevented) return;
    e.preventDefault();
    location.hash = a.getAttribute("href");
  });

  // 2. Zdjęcia są w tym pliku (window.ZDJECIA): podmieniamy adresy obrazków po nazwie pliku.
  function podmien() {
    if (!window.ZDJECIA) return;
    var obrazy = document.getElementsByTagName("img");
    for (var i = 0; i < obrazy.length; i++) {
      var src = obrazy[i].getAttribute("src") || "";
      var nazwa = src.split("/").pop();
      if (src.indexOf("data:") !== 0 && window.ZDJECIA[nazwa]) {
        obrazy[i].setAttribute("src", window.ZDJECIA[nazwa]);
      }
    }
  }
  new MutationObserver(podmien).observe(document.documentElement,
    { childList: true, subtree: true, attributes: true, attributeFilter: ["src"] });
  podmien();
})();
