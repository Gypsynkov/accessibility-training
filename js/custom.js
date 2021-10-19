(function () {
  var burger = document.querySelector(".burger");
  var menu = document.querySelector("#" + burger.dataset.target);
  burger.addEventListener("click", function () {
    burger.classList.toggle("is-active");
    menu.classList.toggle("is-active");
  });
})();

document.querySelectorAll("#nav li").forEach(function (navEl) {
  navEl.onclick = function () {
    toggleTab(this.id, this.dataset.target);
  };
});

function toggleTab(selectedNav, targetId) {
  var navEls = document.querySelectorAll("#nav li");

  navEls.forEach(function (navEl) {
    if (navEl.id == selectedNav) {
      navEl.classList.add("is-active");
    } else {
      if (navEl.classList.contains("is-active")) {
        navEl.classList.remove("is-active");
      }
    }
  });

  var tabs = document.querySelectorAll(".tab-pane");

  tabs.forEach(function (tab) {
    if (tab.id == targetId) {
      tab.style.display = "block";
    } else {
      tab.style.display = "none";
    }
  });
}

(function () {
  const keyCodes = {
    end: 35,
    home: 36,
    left: 37,
    right: 39,
    enter: 13,
    space: 32,
  };
  const arrow = {
    37: -1,
    39: 1,
  };

  function keydownEvent(event) {
    const key = event.keyCode;

    switch (key) {
      case keyCodes.end:
        event.preventDefault();
        focusLastTab();
        break;
      case keyCodes.home:
        event.preventDefault();
        focusFirstTab();
        break;
    }
  }
  const tabsPane = document.querySelectorAll('[role="tab"]');

  function addListeners(tab, index) {
    tab.addEventListener("keydown", keydownEvent);
    tab.addEventListener("keyup", keyupEvent);
    tab.index = index;
  }

  function focusFirstTab() {
    tabsPane[0].focus();
  }

  function focusLastTab() {
    tabsPane[tabs.length - 1].focus();
  }

  tabsPane.forEach(addListeners);

  function arrowControl(event) {
    var currentKey = event.keyCode;
    if (arrow[currentKey]) {
      var target = event.target;
      if (target.index !== undefined) {
        if (tabsPane[target.index + arrow[currentKey]]) {
          tabsPane[target.index + arrow[currentKey]].focus();
        } else if (currentKey === keyCodes.left) {
          focusLastTab();
        } else if (currentKey === keyCodes.right) {
          focusFirstTab();
        }
      }
    }
  }

  const tabPanels = document.querySelectorAll('[role="tabpanel"]');
  function deactiveTabs() {
    tabsPane.forEach((item) => {
      item.setAttribute("tabindex", "-1");
      item.setAttribute("aria-selected", "false");
    });

    

    tabPanels.forEach((item) => {
      if (item.classList.contains("is-active")) {
        item.classList.remove("is-active");
      }
    });
  }

  function activeTab(item) {
    deactiveTabs();
    item.removeAttribute("tabindex");
    item.setAttribute("aria-selected", "true");
    var controls = item.getAttribute("aria-controls");
    document.getElementById(controls).classList.add("is-active");
  }

  function keyupEvent(event) {
    var key = event.keyCode;

    switch (key) {
      case keyCodes.left:
      case keyCodes.right:
        arrowControl(event);
        break;

      case keyCodes.enter:
      case keyCodes.space:
        activeTab(event.target);
        break;
    }
  }
})();
