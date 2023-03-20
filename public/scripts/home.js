let ajax = AjaxCalls;

function clearContent(contentDiv) {
  contentDiv.innerHTML = null;
}

function addLoginButtons(accountDiv) {

  let login = document.createElement("p");
  login.innerText = "LOG IN";
  login.className = "account-button";
  let signup = document.createElement("p");
  signup.innerText = "SIGN UP";
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
}

function changeMenuItemColor(menuItem) {
  let menuItems = document.getElementsByClassName("menu-item");
  for(let i = 0; i < menuItems.length; i += 1) {
    if(menuItems[i].id == menuItem.id) {
      menuItems[i].style.color = "rgb(157, 144, 122)";
    } else {
      menuItems[i].style.color = "black";
    }
  }
}

function preparePage(contentDiv, menuItem) {
  clearContent(contentDiv);
  changeMenuItemColor(menuItem);
}

function showHome(contentDiv, menuItem) {
  preparePage(contentDiv, menuItem);
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
  contentDiv.appendChild(headerDiv);
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
  contentDiv.appendChild(trainings);
}

function showProducts(contentDiv, menuItem) {
  preparePage(contentDiv, menuItem);
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
  
    searchDiv.appendChild(searchButton);
    let cartButton = document.createElement("p");
    cartButton.innerText = "View cart";
    cartButton.id = "cart";
    let cartIcon = document.createElement("i");
    cartIcon.className = "fa fa-shopping-cart";
    cartButton.appendChild(cartIcon);
    cartButton.addEventListener("click", function() {
      ajax.getCart(function(error, data) {
        if(error == null) {
          showCart(contentDiv, JSON.parse(data));
        } else {
        }
      });
    });
    topDiv.appendChild(searchDiv);
    topDiv.appendChild(cartButton);
    ajax.getProducts(function(error, data) {
      if(error == null) {
        showCatalogue(productsDiv, JSON.parse(data));
        contentDiv.appendChild(productsDiv);
      } else {
        let warning = document.createElement('p');
        warning.id = "warning";
        productsDiv.innerHTML = '';
        productsDiv.appendChild(warning);
        contentDiv.appendChild(productsDiv);
      }
    });
    contentDiv.appendChild(topDiv);
    contentDiv.appendChild(productsDiv);
}


function showAbout(contentDiv, menuItem) {
  preparePage(contentDiv, menuItem);
  let aboutContent = document.createElement("div");
  aboutContent.id = "about-div";
  let header1 = document.createElement("h2");
  header1.className = "header";
  header1.innerText = "OUR STORY";
  let introduction = document.createElement("p");
  introduction.className = "paragraph";
  introduction.innerText = "Instead of being just another gym equipment retailer, our founders wanted to be the best in the industry and set their minds to doing so! Over the last two decades Gym and Fitness has grown into one of Australia’s largest online fitness equipment retailers, helping thousands of customers live longer, happier and healthier lives.";
  let header2 = document.createElement("h2");
  header2.className = "header";
  header2.innerText = "OUR VALUES";
  let values = document.createElement("p");
  values.className = "paragraph";
  values.innerText = "For 20 years helping customers reach their fitness goals has been at the heart of what we do and why we do it! We live and breathe our six core values and four brand promises  — which speak of our commitment to our customers, staff, the industry and our business as a whole.";
  aboutContent.appendChild(header1);
  aboutContent.appendChild(introduction);
  aboutContent.appendChild(header2);
  aboutContent.appendChild(values);

  contentDiv.appendChild(aboutContent);
}

function showWorkouts(contentDiv, menuItem) {
  preparePage(contentDiv, menuItem);
}

function showCart(contentDiv, items) {
  contentDiv.innerHTML = '';
  let totalCost = 0;
  let headDiv = document.createElement("div");
  headDiv.id = "cart-head-div";
  let backButton = document.createElement("p");
  backButton.id = "back-button";
  backButton.innerText = "Back to shop";
  backButton.addEventListener("click", function() {
    showProducts();
  });
  headDiv.appendChild(backButton);
  let title = document.createElement("p");
  title.id = "items-number";
  title.innerText = "Your cart (" + items.length + " items)";
  headDiv.appendChild(title);
  contentDiv.appendChild(headDiv);
  if(items == null || items.length == 0) {
    let emptyCart = document.createElement("p");
    emptyCart.innerText = "Your cart is empty.";
    emptyCart.className = "empty-cart";
    contentDiv.appendChild(emptyCart);
  } else {
    let labelDiv = document.createElement("div");
    labelDiv.id = "label-div";
    let itemsDiv = document.createElement("div");
    itemsDiv.className = "items-div";
    let titleHead = document.createElement("p");
    titleHead.id = "title-head";
    titleHead.innerText = "Item";
    let priceHead = document.createElement("p");
    priceHead.id = "price-head";
    priceHead.innerText = "Price";
    let quantityHead = document.createElement("p");
    quantityHead.id = "quantity-head";
    quantityHead.innerText = "Quantity";
    let totalHead = document.createElement("p");
    totalHead.id = "total-head";
    totalHead.innerText = "Total";
    labelDiv.appendChild(titleHead);
    labelDiv.appendChild(priceHead);
    labelDiv.appendChild(quantityHead);
    labelDiv.appendChild(totalHead);
    itemsDiv.appendChild(labelDiv);
    for(let i = 0; i < items.length; i++) {
      let itemDiv = document.createElement("div");
      itemDiv.className = "item-div";

      let itemLink = document.createElement("div");
      itemLink.className = "item-link";
      let itemImage = document.createElement("img");
      itemImage.className = "item-image";
      itemImage.src = items[i].image;
      let itemTitle = document.createElement("p");
      itemTitle.className = "item-title";
      itemTitle.innerText = items[i].title;
      itemLink.appendChild(itemImage);
      itemLink.appendChild(itemTitle);

      let itemPrice = document.createElement("p");
      itemPrice.className = "item-price";
      itemPrice.innerText = "$" + items[i].price;

      let quantityDiv = document.createElement("div");
      quantityDiv.className = "quantity-div";
      let minusButton = document.createElement("p");
      minusButton.innerText = "-";
      minusButton.className = "quantity-button";
      let itemQuantity = document.createElement("p");
      itemQuantity.innerText = "1";
      itemQuantity.className = "item-quantity";
      let plusButton = document.createElement("p");
      plusButton.innerText = "+";
      plusButton.className = "quantity-button";
      quantityDiv.appendChild(minusButton);
      quantityDiv.appendChild(itemQuantity);
      quantityDiv.appendChild(plusButton);

      let totalPrice = document.createElement("p");
      totalPrice.innerText = "$" + items[i].price;
      totalPrice.className = "total-price";
      totalCost += items[i].price;
      itemDiv.appendChild(itemLink);
      itemDiv.appendChild(itemPrice);
      itemDiv.appendChild(quantityDiv);
      itemDiv.appendChild(totalPrice);
      let removeButton = document.createElement("p");
      removeButton.className = "remove-item";
      removeButton.innerText = "Remove from cart";
      removeButton.addEventListener("click", function() {
        ajax.postRemoveItem(itemTitle.innerText, function(error, data) {
          if(error == null) {
            showCart(contentDiv, JSON.parse(data));
          }
        });
      });
      itemDiv.appendChild(removeButton);
      itemsDiv.appendChild(itemDiv);
    }
    let totalCostDiv = document.createElement("div");
    totalCostDiv.id = "total-cost-div";
    let empty = document.createElement("div");
    totalCostDiv.appendChild(empty);
    let totalCostLabel = document.createElement("p");
    totalCostLabel.id = "total-label";
    totalCostLabel.innerText = "Total: ";
    let totalCostNumber = document.createElement("p");
    totalCostNumber.innerText = "$" + totalCost;
    totalCostDiv.appendChild(totalCostLabel);
    totalCostDiv.appendChild(totalCostNumber);
    itemsDiv.appendChild(totalCostDiv);
    let checkout = document.createElement("div");
    checkout.id = "checkout-div";
    let emptySpace = document.createElement("div");
    checkout.appendChild(emptySpace);
    let checkoutButton = document.createElement("p");
    checkoutButton.innerText = "CHECKOUT";
    checkoutButton.id = "checkout-button";
    checkout.appendChild(checkoutButton);
    itemsDiv.appendChild(checkout);
    contentDiv.appendChild(itemsDiv);
  }
}

function showCatalogue(content, products) {
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
      addButton.addEventListener("click", function() {
        ajax.postAddItem(title.innerText, function(error, data) {
          if(error == null) {
            console.log(" nema error")
          } else {
            console.log(" error")
          }
        });
      });
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

  let contentDiv = document.getElementById("main-div");
  
  //home
  let home = document.getElementById("home");
  home.addEventListener("click", function() {
    showHome(contentDiv, home);
  });

  //about
  let about = document.getElementById("about");
  about.addEventListener("click", function() {
    showAbout(contentDiv, about);
  });

  //workouts
  let workouts = document.getElementById("workouts");
  workouts.addEventListener("click", function() {
    showWorkouts(contentDiv, workouts);
  });

  //products
  let products = document.getElementById("products");
  products.addEventListener("click", function() {
    showProducts(contentDiv, products);
  });

  //account info space
  let accountDiv = document.getElementById("account-div");

  ajax.getUser(function(error, data) {
    accountDiv.innerHTML = "";
    if(error == null) {
      let userImage = document.createElement("img");
      userImage.id = "user-image";
      userImage.src = JSON.parse(data).profileImage;
      let username = document.createElement("p");
      username.id = "username";
      username.innerText = JSON.parse(data).username;
      let dropMenu = document.createElement("i");
      dropMenu.className = "arrow-down";
      accountDiv.appendChild(userImage);
      accountDiv.appendChild(username);
      accountDiv.appendChild(dropMenu);
    } else {
        addLoginButtons(accountDiv);
    }
  });
  showHome(contentDiv, home);
}


let mainDiv = document.getElementById("main-div")
mainDiv.addEventListener('click', function(event) {
  if(event.target.id == "search-button") {
    let product = document.getElementById("search");
      product = product.value;
      if(product != null) {
        ajax.getSearch(product, function(error, data) {
          if(error == null) {
            content.appendChild(showCatalogue(productsDiv, JSON.parse(data)));
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
});

