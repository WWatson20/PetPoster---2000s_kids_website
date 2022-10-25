
const Username = document.getElementById('Username')
const Password = document.getElementById('Password')
const ConfirmPassword = document.getElementById('ConfirmPassword')
const form= document.getElementById('form')
const errorElement = document.getElementById('error')
const content = document.getElementById("content");
const deleteButton = document.querySelector('#delete');
var varCounter = 0;
var contentCounter = 0;

//Sourced from lecture
function buildCardsUsingStrings(data) {
    return `<div class="content-card" id="content-card">
                            <img class="content-img" id="content-img" src="${data.url}" alt="Fake photo for id: ${data.id}" />
                            <p class="content-title">${data.title}</p>
                            
                </div>`;
}

function countContent(){
    //c contains the content cards
    let c = document.querySelectorAll('.content-card');
    //for each item in c
    contentCounter=0;
    [...c].forEach(()=> {
        contentCounter++
        //count it to know how much content there is
        document.getElementById("contentCounter").innerHTML=contentCounter;
    })
    }

if (window.location.href.match('Index.html') != null) {
    deleteButton.addEventListener('click', () => {
        //c contains the content cards
        let c = document.querySelectorAll('.content-card');
        //for each item in c
        [...c].forEach(d => {
            //add an event where if they are clicked
            d.addEventListener('click', (e) => {
                e.target.parentElement.style.opacity = '1'
                ///fade out
                let t = setInterval(() => {
                    e.target.parentElement.style.opacity -= '0.01'
                    varCounter += 1
                    //after time
                    if (varCounter >= 100) {
                        console.log("delete")
                        ///delete the item
                        e.target.parentElement.remove()
                        countContent()
                        clearInterval(t)
                        varCounter = 0


                    }

                }, 10)
            })
        });
    })
}

///places photos using buildCardsUsingStrings function to convert data to usable DOM items
if (window.location.href.match('Index.html') != null) {
    window.onload = () => {
        function fetchPhoto() {
            fetch("https://jsonplaceholder.typicode.com/albums/2/photos")
                .then(function (response) {
                    return response.json();
                })
                .then(function (data) {
                    let contentHTML = "";
                    data.forEach(function (data) {
                        contentHTML += buildCardsUsingStrings(data)


                    });
                    document.getElementById('content').innerHTML = contentHTML;
                    ///run count content once on load
                    countContent();
                });
        }

        fetchPhoto();
    };
}

    //Watches the form for registration
if (window.location.href.match('registration.html') != null) {
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
}
