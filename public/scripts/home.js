let ajax = AjaxCalls;

let logoutButton = document.getElementById("logout-button");
logoutButton.addEventListener("click", function() {
  ajax.postLogout(function(error, data) {
    if(error == null) {
      location.href="/login.html";
    }
  })
});