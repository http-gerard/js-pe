let errors = [];

function validateForm() {
    errors = [];
    let voornaamVeld = document.getElementById("inputVoornaam")
    let naamVeld = document.getElementById("inputNaam")
    let velden = document.forms["myForm"].elements
    let melding = "Het volgende veld is vereist: ";
    let veldenNietLeeg = ["voornaam", "naam", "gebruikersnaam", "adres", "land", "provincie", "wachtwoord", "wachtwoord1"]
    let wachtwoord = velden["wachtwoord"].value;
    let wachtwoord2 = velden["wachtwoord2"].value;
    for (var i = 0, veld; veld = velden[i++];) {
        if (veldenNietLeeg.indexOf(veld.name) > -1) {
            checkEmptyField(veld, melding)
        }
        if (veld.name === "email"){
            if (!validateEmail(veld.value)){
                errors.push("Emailadres is niet correct")
            }
        }
    }

    checkPasswords(wachtwoord, wachtwoord2)

    //add errors to div
    var errorDiv = document.getElementById('errorDiv');
    errorDiv.innerHTML = ""
    for (var i = 0; i < errors.length; i++) {
        errorDiv.innerHTML += errors[i] +  "<br />"
    }

    //check if form is valid
    if (errors.length === 0){
        document.getElementById("formValid").style.display = "block";
        return true
    } else {
        errorDiv.style.display = "block";
        return false
    }

}


function checkEmptyField(veld, melding){
    if (veld.value.length === 0){
        melding = melding + veld.name;
        errors.push(melding)
    }

}

function validateEmail(email){
    //https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return bool = re.test(String(email).toLowerCase());
}
function checkPasswords(password1, password2){
    let passwordValid = true;
    if (password1 !== password2){
        passwordValid = false;
        errors.push("wachtwoorden niet gelijk")
    }
    if (password1.length < 7 || password2.length < 7) {
        errors.push("het wachtwoord moet langer zijn als 7 tekens")
    }
}