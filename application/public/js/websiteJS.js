
const Username = document.getElementById('Username')
const Password = document.getElementById('Password')
const ConfirmPassword = document.getElementById('ConfirmPassword')
const form= document.getElementById('form')
const errorElement = document.getElementById('error')
const content = document.getElementById("content");


//Sourced from lecture
function buildCardsUsingStrings(data) {
    return `<div class="content-card" id="content-card">
                <img class="content-img" src="${data.url}" alt="Fake photo for id: ${data.id}" />
                <div class="content-info">
                    <p class="content-title">${data.title}</p>
                    </div>
                </div>`;
}

window.onload = (event) => {
    function fetchPhoto(){
        fetch("https://jsonplaceholder.typicode.com/albums/2/photos")
            .then(function (response){
                return response.json();
            })
            .then(function (data){
                let contentHTML = "";
                    data.forEach(function (data){
                        contentHTML += buildCardsUsingStrings(data)
                    });
                document.getElementById('content').innerHTML = contentHTML;
            });
    }
    fetchPhoto();
};



//Watches the form for registration
form.addEventListener('submit', (e) => {
        let messages = []

    //Username form testing
        if (/^[a-zA-Z]/.test(Username.value)) {
        } else{
            messages.push('Username must start with a letter')
        }
    if ((Username.value).length < 3) {
        messages.push('Username must be at least three characters long')
    }
    if (/^[a-zA-Z0-9]+$/.test(Username.value)) {
    }else{
        messages.push('Username may only contain alphanumeric characters')
    }

    //Password error form testing
    if ((Password.value).length < 8) {
        messages.push('Password must be at least eight characters long')
    }
    if (/[A-Z]+/.test(Password.value)){
    } else{
        messages.push('Password must contain a capital letter')
    }
    if (/[0-9]+/.test(Password.value)){
    } else{
        messages.push('Password must contain a number')
    }

if(/(?=.*[\/!\-+@#$^&*~\[\]])/.test(Password.value)){
} else{
    messages.push('Password must contain one of these special characters: / * - + ! @ # $ ^ & ~ [ ]')
}

if(Password.value !== ConfirmPassword.value){
    messages.push('Password and Confirm Password must match')
}

    //If there are errors, don't submit, display all errors
        if (messages.length > 0) {
            e.preventDefault()
            errorElement.innerText = messages.join(', ')
        }
    }
)

