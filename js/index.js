let breweriesList = []
let city = ''
let state = ''
const ul = document.getElementById('list-group')
const div = document.getElementById('show-panel')
const form = document.getElementById('location')
const container = document.getElementById('container')
const addNewBrewery = document.getElementById('add-new-brewery')
const header = document.getElementById('header')
const newBrewery = document.getElementById('new-brewery')
const breweryTitle = document.getElementById('title')
const navSearch = document.getElementById('search-bar')


const fetchBreweries = event => {
    event.preventDefault()
    state = event.target.state.value
    city = event.target.city.value
    event.target.reset()
    fetch(`https://api.openbrewerydb.org/breweries?by_city=${city}&by_state=${state}&per_page=50`)
        .then(resp => resp.json())
        .then(breweries => renderData(breweries))
        .catch(err => console.log(err))
}

const renderData = breweries => {
    breweriesList = breweries
    ul.innerHTML = ''
    breweryTitle.innerHTML = "<h2 style='color: white' class='display-2 text-center'>Breweries:</h2>"
    breweriesList.forEach(brewery => addToBreweryList(brewery))
}

const addToBreweryList = brewery => {
    const li = `<li id=${brewery.id} class='list-group-item' data-id=${brewery.id}>${brewery.name}</li>`
    ul.innerHTML += li
}

const fetchBreweryInfo = event => {
    const breweryId = parseInt(event.target.dataset.id)
    const brewery = breweriesList.filter(brewery => {
        return brewery.id === breweryId
    })
    showBrewery(brewery[0])
}

const showBrewery = brewery => {
    debugger
    const search = brewery.name.split(' ').join('+') + `+${brewery.city}`
    const breweryInfo = `<h2>Name: ${brewery.name}</h2>
    <h4 class="capitalize">Type: ${brewery.brewery_type}</h4>
    <a href=${brewery.website} target='_blank'>${brewery.name}'s Website</a>
    <h4>Address: ${brewery.street} ${brewery.city}, ${brewery.state}</h4>
    <a href=https://www.google.com/maps/search/${search} target='_blank'>Google Maps</a>`
    div.innerHTML = breweryInfo
}

ul.addEventListener('click', fetchBreweryInfo)
form.addEventListener('submit', fetchBreweries)
addNewBrewery.addEventListener('click', showNewBreweryForm)
newBrewery.addEventListener('submit', addNewBreweryFetch)
navSearch.addEventListener('submit', fetchBreweries)

showNewBreweryForm()