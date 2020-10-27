let breweriesList = []
let city = ''
let state = ''
let page = 1
const ul = document.getElementById('list-group')
const div = document.getElementById('show-panel')
const form = document.getElementById('location')
const container = document.getElementById('container')
const header = document.getElementById('header')
const breweryTitle = document.getElementById('title')
const navSearch = document.getElementById('search-bar')
const next = document.getElementById('next')
const previous = document.getElementById('previous')

const showPrevious = () => {
    if (page > 1) {
        previous.style.display = 'inline'
    } else {
        previous.style.display = 'none'
    }
}

const fetchBreweries = event => {
    event.preventDefault()
    state = event.target.state.value
    city = event.target.city.value
    page = 1
    event.target.reset()
    breweryFetch()
}

const breweryFetch = () => {
    fetch(`https://api.openbrewerydb.org/breweries?by_city=${city}&by_state=${state}&page=${page}&per_page=25`)
        .then(resp => resp.json())
        .then(breweries => renderData(breweries))
        .catch(err => console.log(err))
}

const renderData = breweries => {
    breweriesList = breweries
    ul.innerHTML = ''
    breweryTitle.innerHTML = "<h2 style='color: white' class='display-2 text-center'>Breweries:</h2>"
    breweriesList.forEach(brewery => addToBreweryList(brewery))
    if (breweriesList.length === 25) {
        next.style.display = 'inline'
    } else {
        next.style.display = 'none'
    }
    div.innerHTML = ''
}

const addToBreweryList = brewery => {
    console.log('-------------------')
    const li = `<li id=${brewery.id} class='list-group-item' data-id=${brewery.id}>${brewery.name}</li>`
    ul.innerHTML += li
}

const findBreweryInfo = event => {
    const breweryId = parseInt(event.target.dataset.id)
    const brewery = breweriesList.filter(brewery => {
        return brewery.id === breweryId
    })
    showBrewery(brewery[0])
}

const showBrewery = brewery => {
    let phoneArray = brewery.phone.split('')
    phoneArray.splice(3, 0, '-')
    phoneArray.splice(7, 0, '-')
    showPhone = phoneArray.join('')
    const search = brewery.name.split(' ').join('+') + `+${brewery.city}`
    const breweryInfo = `<h1>Name: ${brewery.name}</h1>
    <h4 class="capitalize">Type: ${brewery.brewery_type}</h4>
    <a href=${brewery.website_url} target='_blank'><h4>${brewery.name}'s Website</h4></a>
    <h4>Address: ${brewery.street} ${brewery.city}, ${brewery.state}</h4>
    <a href=https://www.google.com/maps/search/${search} target='_blank'><h4>Google Maps</h4></a>
    <h4>Phone: ${showPhone}</h4>`
    div.innerHTML = breweryInfo
}

const nextPage = () => {
    page += 1
    breweryFetch()
    showPrevious()
}

const previousPage = () => {
    page -= 1
    breweryFetch()
    showPrevious()
}

ul.addEventListener('click', findBreweryInfo)
form.addEventListener('submit', fetchBreweries)
navSearch.addEventListener('submit', fetchBreweries)
next.addEventListener('click', nextPage)
previous.addEventListener('click', previousPage)