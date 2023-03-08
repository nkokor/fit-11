let ajax = AjaxCalls;

window.onload = function() {
  ajax.getHome(function(error, data) {
    let warning = document.getElementById("warning");
    if(error != null) {
      warning.className = "on";
    }
    else {
      warning.className = "off";
      let head = document.getElementsByTagName("head")[0];
      let script = document.createElement("script");
      script.src = "https://kit.fontawesome.com/10ba21a9a2.js";
      script.crossOrigin = "anonymous";
      head.appendChild(script);
      let content = document.getElementById("content");
      let menu = document.createElement("div");
      menu.id = "main-menu";
      let logo = document.createElement("img");
      logo.id = "logo";
      logo.src = "/transparent-logo.png";
      menu.appendChild(logo);
      let home = document.createElement("p");
      home.className = "menu-item";
      home.innerText = "HOME";
      menu.appendChild(home);
      let about = document.createElement("p");
      about.className = "menu-item";
      about.innerText = "ABOUT US";
      menu.appendChild(about);
      let workouts = document.createElement("p");
      workouts.className = "menu-item";
      workouts.innerText = "HOME";
      menu.appendChild(workouts);
      let products = document.createElement("p");
      products.className = "menu-item";
      products.innerText = "PRODUCTS";
      menu.appendChild(products);
      let logout = document.createElement("button");
      logout.id = "logout-button";
      let arrow = document.createElement("i");
      arrow.className = "fa fa sign-out";
      arrow.id = "arrow";
      logout.appendChild(arrow);
      menu.appendChild(logout);
      let header = document.createElement("img");
      header.id = "head-image";
      header.src = "/header.jpg";
      let trainings = document.createElement("div");
      trainings.id = "trainings";
      let weights = document.createElement("div");
      weights.className = "circle";
      let weightsImg = document.createElement("img");
      weightsImg.className = "circle";
      weightsImg.src = "/weight-training.jpg";
      let weightsLink = document.createElement("p");
      weightsLink.innerText = "WEIGHT TRAINING";
      weights.appendChild(weightsImg);
      weights.appendChild(weightsLink);
      let pilates = document.createElement("div");
      pilates.className = "circle";
      let pilatesImg = document.createElement("img");
      pilatesImg.className = "circle";
      pilatesImg.src = "/pilates.jpg";
      let pilatesLink = document.createElement("p");
      pilatesLink.innerText = "PILATES";
      pilates.appendChild(pilatesImg);
      pilates.appendChild(pilatesLink);
      let yoga = document.createElement("div");
      yoga.className = "circle";
      let yogaImg = document.createElement("img");
      yogaImg.className = "circle";
      yogaImg.src = "/yogaclass.jpg";
      let yogaLink = document.createElement("p");
      yogaLink.innerText = "YOGA";
      yoga.appendChild(yogaImg);
      yoga.appendChild(yogaLink);
      let zumba = document.createElement("div");
      zumba.className = "circle";
      let zumbaImg = document.createElement("img");
      zumbaImg.className = "circle";
      zumbaImg.src = "/zumba.jpg";
      let zumbaLink = document.createElement("p");
      zumbaLink.innerText = "ZUMBA";
      zumba.appendChild(zumbaImg);
      zumba.appendChild(zumbaLink);
      trainings.appendChild(weights);
      trainings.appendChild(pilates);
      trainings.appendChild(yoga);
      trainings.appendChild(zumba);
      content.appendChild(menu);
      content.appendChild(header);
      content.appendChild(trainings);
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

