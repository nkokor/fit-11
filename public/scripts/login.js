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

function prijaviKorisnika() {
  let inputKorisnickogImena = document.getElementById("korisnickoIme");
  let inputLozinke = document.getElementById("lozinka");
  let korisnickoIme = inputKorisnickogImena.value;
  let lozinka = inputLozinke.value;
  ajax.postLogin(korisnickoIme, lozinka, function(error, data) {
      if(error == null) {
        let upozorenje = document.getElementById("upozorenjeON");
        if(upozorenje != null) {
          upozorenje.id = "upozorenjeOFF";
        }
        location.href = "predmeti.html";
      } 
      else {
        let upozorenje = document.getElementById("upozorenjeOFF");
        if(upozorenje != null) {
          upozorenje.id = "upozorenjeON";
        }
      }
  });
}