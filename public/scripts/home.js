let ajax = AjaxCalls;

function openHome(content) {
  let headerDiv = document.createElement("div");
  headerDiv.id = "header-div";
  let header = document.createElement("img");
  header.id = "head-image";
  header.src = "/header.jpg";
  let welcome = document.createElement("p");
  welcome.innerText = "Fit-11";
  welcome.id = "welcome";
  let message = document.createElement("p");
  message.innerText = "Where dreams become reality.";
  message.id = "message";
  let videoButton = document.createElement("p");
  videoButton.innerText = "PLAY VIDEO";
  videoButton.id = "video-button";
  headerDiv.appendChild(header);
  headerDiv.appendChild(welcome);
  headerDiv.appendChild(message);
  headerDiv.appendChild(videoButton);
  content.appendChild(headerDiv);
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
  content.appendChild(trainings);
}

function openProducts(content, products) {
  content.innerHTML = '';
  for(let i = 0; i < products.length; i++) {
    let productDiv = document.createElement("div");
    productDiv.className = "product-div";
    let image = document.createElement("img");
    image.className = "product-image";
    image.src = products[i].image;
    let title = document.createElement("p");
    title.className = "product-title";
    title.innerText = products[i].title;
    let price = document.createElement("p");
    price.className = "product-price";
    price.innerText = products[i].price + '$';
    let addButton = document.createElement("p");
    if(products[i].availability > 0) {
      addButton.innerText = "Add to cart";
      addButton.className = "add-button";
      let icon = document.createElement("i");
      icon.className = "fa fa-shopping-cart";
      addButton.appendChild(icon);
    } else {
      addButton.innerText = "Out of stock";
      addButton.className = "out-of-stock-button";
    }
    productDiv.appendChild(image);
    productDiv.appendChild(title);
    productDiv.appendChild(price);
    productDiv.appendChild(addButton);
    content.appendChild(productDiv)
  }
  return content;
}

window.onload = function() {
  let head = document.getElementsByTagName("head")[0];
  let script = document.createElement("script");
  script.src = "https://kit.fontawesome.com/10ba21a9a2.js";
  script.crossOrigin = "anonymous";
  head.appendChild(script);
  let content = document.getElementById("content");
  content.id = "content";
  let menu = document.createElement("div");
  menu.id = "main-menu";
  let logo = document.createElement("img");
  logo.id = "logo";
  logo.src = "/transparent-logo.png";
  menu.appendChild(logo);

  //home
  let home = document.createElement("p");
  home.className = "menu-item";
  home.innerText = "HOME";
  home.addEventListener("click", function() {
    let content = document.getElementById("main-div");
    content.innerText = '';
    openHome(content);
  });
  menu.appendChild(home);

  //about
  let about = document.createElement("p");
  about.className = "menu-item";
  about.innerText = "ABOUT US";
  about.addEventListener("click", function() {
    let content = document.getElementById("main-div");
    content.innerText = '';
  });
  menu.appendChild(about);

  //workouts
  let workouts = document.createElement("p");
  workouts.className = "menu-item";
  workouts.innerText = "WORKOUTS";
  workouts.addEventListener("click", function() {
    let content = document.getElementById("main-div");
    content.innerText = '';
  });
  menu.appendChild(workouts);

  //products
  let products = document.createElement("p");
  products.className = "menu-item";
  products.innerText = "PRODUCTS";
  products.id = "products";
  products.addEventListener("click", function() {
    let content = document.getElementById("main-div");
    content.innerText = '';
    let topDiv = document.createElement("div");
    topDiv.id = "top-div";
    let productsDiv = document.createElement("div");
    productsDiv.id = "products-div";
    let searchDiv = document.createElement("div");
    searchDiv.id = "search-div";
    let searchBar = document.createElement("input");
    searchBar.id = "search";
    searchBar.type = "text";
    searchBar.placeholder = "Search products";
    let icon = document.createElement("i");
    icon.className = "fa-solid fa-search";
    icon.id = "search-icon";
    icon.ariaHidden = "false";
    searchDiv.appendChild(icon);
    searchDiv.appendChild(searchBar);
    let searchButton = document.createElement("p");
    searchButton.id = "search-button";
    searchButton.innerText = "Search";
    searchButton.addEventListener("click", function(e) {
      let product = document.getElementById("search");
      product = product.value;
      if(product != null) {
        ajax.getSearch(product, function(error, data) {
          if(error == null) {
            content.appendChild(openProducts(productsDiv, JSON.parse(data)));
          } else {
            productsDiv.innerHTML = '';
            let noResults = document.createElement('p');
            noResults.innerText = "No results found.";
            noResults.id = "no-results"
            productsDiv.appendChild(noResults);
           }
          });
        }
      }
    );
    searchDiv.appendChild(searchButton);
    let cartButton = document.createElement("p");
    cartButton.innerText = "View cart";
    cartButton.id = "cart";
    let cartIcon = document.createElement("i");
    cartIcon.className = "fa fa-shopping-cart";
    cartButton.appendChild(cartIcon);
    topDiv.appendChild(searchDiv);
    topDiv.appendChild(cartButton);
    ajax.getProducts(function(error, data) {
      if(error == null) {
        openProducts(productsDiv, JSON.parse(data));
        content.appendChild(productsDiv);
      } else {
        let warning = document.createElement('p');
        warning.id = "warning";
        productsDiv.innerHTML = '';
        productsDiv.appendChild(warning);
        content.appendChild(productsDiv);
      }
    });
    content.appendChild(topDiv);
    content.appendChild(productsDiv);
  });
  menu.appendChild(products);

  //account info space
  let accountDiv = document.createElement("div");
  accountDiv.id = "account-div";
  let login = document.createElement("p");
  let signup = document.createElement("p");
  login.innerText = "LOG IN";
  signup.innerText = "SIGN UP";
  login.className = "account-button";
  signup.className = "account-button";
  signup.id = "signup-button";

  login.addEventListener("click", function() {
    location.href = "login.html";
  });

  signup.addEventListener("click", function() {
    location.href = "signin.html";
  });

  accountDiv.appendChild(login);
  accountDiv.appendChild(signup);
  menu.appendChild(accountDiv);

  let mainContent = document.createElement("div");
  mainContent.id = "main-div";

  openHome(mainContent);

  content.appendChild(menu);
  content.appendChild(mainContent);
}


