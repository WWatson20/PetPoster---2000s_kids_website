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


///places photos using buildCardsUsingStrings function to convert data to usable DOM items
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

