let ajax = AjaxCalls;

let loginButton = document.getElementById("button-login");
loginButton.addEventListener("click", function() {
  let username = document.getElementById("username");
  let password = document.getElementById("password");
  username = username.value;
  password=password.value;
  ajax.postLogin(username, password, function(error, data) {
    if(error == null) {
      location.href="home.html";
    } else {

    }
  });
});

