const AjaxCalls = (()=>{
  function sendLoginRequest(username,password,fnCallback){ 
    let xhr = new XMLHttpRequest()
    xhr.open("POST", "/login", true);
    xhr.setRequestHeader('Content-type', 'application/json');
    let loginData = {"username":username,"password":password};
    xhr.send(JSON.stringify(loginData));
    xhr.onreadystatechange = function() {
      let error = null;
      let data = null;
      if(xhr.status == 200 && xhr.readyState == 4) {
        data = xhr.responseText;
      } else {
        error = xhr.responseText;
      }
      fnCallback(error, data);
    }
  }
  function sendLogoutRequest(fnCallback){
    let xhr = new XMLHttpRequest();
    xhr.open("POST", "/logout", true);
    xhr.send();
    xhr.onreadystatechange = function() {
      let error = null;
      let data = null;
      if(xhr.status == 200 && xhr.readyState == 4) {
        data = xhr.responseText;
      } else {
        error = xhr.responseText;
      }
      fnCallback(error, data);
    }
  }
  return{
  postLogin: sendLoginRequest,
  postLogout: sendLogoutRequest
  };
  })();