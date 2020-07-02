const quoteContainer = document.getElementById('quote-container')
const quoteText = document.getElementById('quote')
const authorText = document.getElementById('author')
const twitterBtn = document.getElementById('twitter')
const newQuoteBtn = document.getElementById('new-quote')
const loader = document.getElementById('loader')

function showLoadingSpinner() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}
function removeLoadingSpinner() {
    if (!loader.hidden) {
        loader.hidden = true;
        quoteContainer.hidden = false;
    }
}

async function getQuoteAPI() {
    showLoadingSpinner()
    const proxyUrl = 'https://cors-anywhere.herokuapp.com/'
    const apiUrl = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json'

    try {
        const response = await fetch(proxyUrl + apiUrl)
        const data = await response.json()
        // Sanatization
        const authorTextNode = document.createTextNode(data.quoteAuthor)
        const quoteTextNode = document.createTextNode(data.quoteText)
        if (data.quoteAuthor === '') {
            authorText.append('Unknown')
        } else {
            authorText.append(authorTextNode)
        }

        if (data.quoteText.lenght > 50) {
            quoteText.classList.add('long-quote')
        } else {
            quoteText.classList.remove('long-quote')
        }
        quoteText.append(quoteTextNode)
        removeLoadingSpinner()
    } catch (error) {
        getQuoteAPI()
        console.log('whoops, no quote', error)
    }
}

function tweetQuote() {
    const quote = quoteText.innerText;
    const author = authorText.innerText;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
    window.open(twitterUrl, '_blank')
}

newQuoteBtn.addEventListener('click', getQuoteAPI)
twitterBtn.addEventListener('click', tweetQuote)

// On Load
getQuoteAPI()