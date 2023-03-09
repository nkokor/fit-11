let ajax = AjaxCalls;

let loginButton = document.getElementById("login");
loginButton.addEventListener("click", function() {
  location.href = "login.html";
});

let signupButton = document.getElementById("signup");
signupButton.addEventListener("click", function() {
  let username = document.getElementById("username").value;
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;
  ajax.postRegister(username, email, password, function(error, data) {
    if(error == null) {
      location.href = "login.html";
    }
    else {
      
    }
  });
});

