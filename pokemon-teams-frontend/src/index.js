const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`
const main = document.querySelector("main")

// we have an anonomus function that actually invocks loadTrainers
document.addEventListener("DOMContentLoaded", () => loadTrainers())

// ananonumus function
const loadTrainers = () => {
    // as soon as this dom content is loaded this function should actually fire a fetch request
    //.. to /trainers
        fetch(TRAINERS_URL)
        .then(res => res.json())
        .then(json => {
            json.forEach(trainer => renderTrainer(trainer))
        })
}

const renderTrainer = (trainerHash) => {
    const div = document.createElement("div")
    const p = document.createElement("p")
    const button = document.createElement("button")
    const ul = document.createElement("ul")

    div.setAttribute("class", "card")
    div.setAttribute("data-id", trainerHash.id)
    p.innerHTML = trainerHash.name
    button.setAttribute("data-trainer-id", trainerHash.id)
    button.innerHTML = "Add Pokemon"
    button.addEventListener("click", createPokemon )// ***** attach event listener to button (click) *****
    // listen to a click event and invock an external function
    // The first child inside the div is the paragraph
    div.appendChild(p)
    div.appendChild(button)
    div.appendChild(ul)
    //^^ this is not on the page yet

    main.appendChild(div) // we finally append the div that we created
    trainerHash.pokemons.forEach(pokemon => renderPokemon(pokemon))
}

// since we dont have class or id to build directly for getelement by id or getelement by class
// we want something string and dinamic at the same time so ``
// we are targeting a div and we're targeting a data ID we can say okay
// when we target a specific attribute the css selector says in [] the attribute name
// data-id.
//  How do we get the trainer id?
const renderPokemon = (pokemon) => {
    // the ul is being created has been appended and then we should be able to target
    // it because it's already been created and appended specifically when this happens -> div.appendChild(ul)
    // now the ul has been retrieved
    const ul = document.querySelector(`div[data-id="${pokemon.trainer_id}"]`)
    const li = document.createElement("li")
    const button = document.createElement("button")
    //^^ what we retrieve/ create

    //VV what we set
    li.innerHTML = `${pokemon.nickname} (${pokemon.species})`
    button.setAttribute("class", "release")
    button.setAttribute("data-pokemon-id", pokemon.id)
    button.innerHTML = "Realease"
    button.addEventListener("click", deletePokemon )// ***** attach event listener to button (click) *****


    li.appendChild(button)
    ul.appendChild(li)
}

const createPokemon = (e) => {
    e.preventDefault()
    const configObj = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({trainer_id: e.target.dataset.trainerId})
    }
    fetch(POKEMONS_URL, configObj)
    .then(res => res.json())
    .then(json => {
        console.log("Yuppie!")
    })
}

const deletePokemon = (e) => {
    e.preventDefault()

}
