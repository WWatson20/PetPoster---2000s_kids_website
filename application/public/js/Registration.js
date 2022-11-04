const Username = document.getElementById('Username')
const Password = document.getElementById('Password')
const ConfirmPassword = document.getElementById('ConfirmPassword')
const errorElement = document.getElementById('error')
const form= document.getElementById('form')

form.addEventListener('submit', (e) => {
    console.log("submitted")
    let messages = []

    //Username form testing
    if (/^[a-zA-Z]/.test(Username.value)) {
    } else {
        messages.push('Username must start with a letter')
    }
    if ((Username.value).length < 3) {
        messages.push('Username must be at least three characters long')
    }
    if (/^[a-zA-Z0-9]+$/.test(Username.value)) {
    } else {
        messages.push('Username may only contain alphanumeric characters')
    }

    //Password error form testing
    if ((Password.value).length < 8) {
        messages.push('Password must be at least eight characters long')
    }
    if (/[A-Z]+/.test(Password.value)) {
    } else {
        messages.push('Password must contain a capital letter')
    }
    if (/[0-9]+/.test(Password.value)) {
    } else {
        messages.push('Password must contain a number')
    }
    if (/(?=.*[\/!\-+@#$^&*~\[\]])/.test(Password.value)) {
    } else {
        messages.push('Password must contain one of these special characters: / * - + ! @ # $ ^ & ~ [ ]')
    }
    if (Password.value !== ConfirmPassword.value) {
        messages.push('Password and Confirm Password must match')
    }
    console.log(messages)

    //If there are errors, don't submit, display all errors
    if (messages.length > 0) {
        e.preventDefault()
        errorElement.innerText = messages.join(', ')
    }
})