let ajax = AjaxCalls;

let loginButton = document.getElementById("button-login");
loginButton.addEventListener("click", function() {
  let username = document.getElementById("username");
  let password = document.getElementById("password");
  if(username.value != null) {
    username = username.value;
  }
  else {
    username = '';
  }
  if(password.value != null) {  
    password=password.value;
  }
  else {
    password = '';
  }
  let passInput = document.getElementById("password");
  ajax.postLogin(username, password, function(error, data) {
    if(error == null) {
      location.href="home.html";
    } else {
      
    }
  });
});

