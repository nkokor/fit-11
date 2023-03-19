const AjaxCalls = (()=>{

  function sendLoginRequest(username, password, fnCallback){ 
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

  function sendUserRequest(fnCallback) {
    let xhr = new XMLHttpRequest();
    xhr.open("GET", "/user", true);
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

  function sendHomeRequest(fnCallback) {
    let xhr = new XMLHttpRequest();
    xhr.open("GET", "/content", true);
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
  function sendRegisterRequest(username, email, password, fnCallback) {
    let xhr = new XMLHttpRequest();
    xhr.open("POST", "/signup", true);
    xhr.setRequestHeader('Content-type', 'application/json');
    let data = {"username":username,"email":email,"password":password};
    xhr.send(JSON.stringify(data));
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

  function sendProductsRequest(fnCallback) {
    let xhr = new XMLHttpRequest();
    xhr.open("GET", "/products", true);
    xhr.setRequestHeader('Content-type', 'application/json');
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

  function sendSearchRequest(product, fnCallback) {
    let xhr = new XMLHttpRequest();
    xhr.open("GET", encodeURI("/search/" + product), true);
    xhr.setRequestHeader('Content-type', 'application/json');
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

  function sendCartRequest(fnCallback) {
    let xhr = new XMLHttpRequest();
    xhr.open("GET", "/cart", true);
    xhr.setRequestHeader('Content-type', 'application/json');
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

  function sendAddItemRequest(item, fnCallback) {
    let xhr = new XMLHttpRequest();
    xhr.open("POST", encodeURI("/add/" + item), true);
    xhr.setRequestHeader('Content-type', 'application/json');
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

  function sendRemoveItemRequest(item, fnCallback) {
    let xhr = new XMLHttpRequest();
    xhr.open("POST", encodeURI("/remove/" + item), true);
    xhr.setRequestHeader('Content-type', 'application/json');
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
    postLogout: sendLogoutRequest,
    getUser: sendUserRequest,
    getHome: sendHomeRequest,
    postRegister: sendRegisterRequest,
    getProducts: sendProductsRequest,
    getSearch: sendSearchRequest,
    getCart: sendCartRequest,
    postAddItem: sendAddItemRequest,
    postRemoveItem: sendRemoveItemRequest
  };

})();