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
            if (!(veld.value === "")){
                if (!validateEmail(veld.value)){
                    errors.push("Emailadres is niet correct")
                }
            }
        }
    }

    //call validate functions
    validatePayment(document.querySelectorAll('input[name="flexRadioDefault"]'));
    checkPasswords(wachtwoord, wachtwoord2);
    checkPC(document.getElementById("inputPostcode"));
    checkTermsAndConditions(document.getElementById("flexCheckVoorwaarden"));



    //add errors to div
    var errorDiv = document.getElementById('errorDiv');
    errorDiv.innerHTML = ""
    for (var i = 0; i < errors.length; i++) {
        errorDiv.innerHTML += errors[i] +  "<br />"
    }

    //check if form is valid
    if (errors.length === 0){
        document.getElementById("formValid").style.display = "block";
        document.getElementById("betalingswijze").style.display = "block";
        //to prevent refreshing we return false 
        return false;
    } else {
        errorDiv.style.display = "block";
        return false;
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
    //const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    //return bool = re.test(String(email).toLowerCase());
    let validEmail = true;
    let splittedArray = email.split("@");
    let gebruikersnaam = splittedArray[0];
    let domein = splittedArray[1];
    if (gebruikersnaam.length < 1){
        errors.push("De gebruikersnaam van het email adres moet minstens 1 karakter lang zijn")
        validEmail = false;

    }
    if (gebruikersnaam[0] === "." || gebruikersnaam[0] === "-") {
        errors.push("De gebruikersnaam van het email adres mag niet met een punt of koppelteken beginnen")
        validEmail = false;
    } 
    else if (!onlyLettersNumbersUnderscoresDotsDashes(gebruikersnaam)){
            errors.push("De gebruikersnaam van het email adres mag alleen nummers, letters, underscores, punten en koppeltekens bevatten")
            validEmail = false;
    }

    if (!domein.match(/^[a-zA-Z0-9]/)) {
        errors.push("Het domein moet met een nummer of letter beginnen")
        validEmail = false;
    }

    return validEmail;

}

function checkPC(veld) {
    let postcode = veld.value;
    if (postcode == null || postcode == ""){
        errors.push("Het veld postcode is vereist.")
    } else if (postcode < 1000 || postcode > 9999) {
        errors.push("De waarde van postcode moet tussen 1000 en 9999 liggen.")
    }
}

function checkTermsAndConditions(veld){
    if (!veld.checked){
        errors.push("De algemene voorwaarden moeten goedgekeurd worden")
    }
}


function onlyLettersNumbersUnderscoresDotsDashes(str) {
    return str.match("^[A-Za-z0-9._-]+$");
  }



function checkPasswords(password1, password2){
    let passwordValid = true;
    if (password1 !== password2){
        passwordValid = false;
        errors.push("wachtwoorden niet gelijk")
    }
    if (password1.length < 7 || password2.length < 7) {
        passwordValid = false;
        errors.push("het wachtwoord moet langer zijn als 7 tekens")
    }
    if (password1.length === 0){
        passwordValid = false;
        errors.push("wachtwoord1 is leeg")
    }
    if (password2.length === 0){
        passwordValid = false;
        errors.push("wachtwoord2 is leeg")
    }
}

function validatePayment(veld){
    const rbs = veld;
    let selectedValue;
    for (const rb of rbs) {
        if (rb.checked) {
            selectedValue = rb.value;
            break;
        }
    }
    
    if (selectedValue==null){
        errors.push("er is geen betalingswijze geselecteerd")
    } else {
        document.getElementById("betalingswijze").innerHTML = "<h4>Betalingswijze</h4>";
        document.getElementById("betalingswijze").style.background = "#5F9EA0";
        document.getElementById("betalingswijze").innerHTML += "Je betalingswijze is " + selectedValue;
    }


}