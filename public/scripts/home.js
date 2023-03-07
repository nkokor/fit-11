let ajax = AjaxCalls;

window.onload = function() {
  ajax.getHome(function(error, data) {
    let warning = document.getElementById("warning");
    if(error != null) {
      warning.className = "on";
    }
    else {
      warning.className = "off";
      let logoutButton = document.getElementById("logout-button");
      logoutButton.addEventListener("click", function() {
      ajax.postLogout(function(error, data) {
      if(error == null) {
        location.href="/login.html";
    }
  });
});
    }
  });
}

