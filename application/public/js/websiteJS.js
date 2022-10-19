function validateForm(Username) {
    let x = document.forms["Username"].value;
    if (x == "") {
        alert("Name must be filled out");
        return false;
    }
}