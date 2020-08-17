//const imageDownloader = require('image-downloader')
const google = require('googleapis').google
const customSearch = google.customsearch('v1')
const state = require('./state.js')

const googleSearchCredentials = require('../credentials/google-search.json')

async function robot(){
    const content = state.load()

  await fetchImagesOfAllSentences(content)
  //await downloadAllImages(content)

  state.save(content)

  async function fetchImagesOfAllSentences(content) {
    
    for(const sentence of content.sentences){
        const query = `${content.searchTerm} ${sentence.keywords[0]}`
        sentence.images = await fetchGoogleAndReturnImagesLinks(query)

        sentence.googleSearchQuery = query
    }
    
   /* for (let sentenceIndex = 0; sentenceIndex < content.sentences.length; sentenceIndex++) {
      let query

      if (sentenceIndex === 0) {
        query = `${content.searchTerm}`
      } else {
        query = `${content.searchTerm} ${content.sentences[sentenceIndex].keywords[0]}`
      }

      console.log(`> [image-robot] Querying Google Images with: "${query}"`)

      content.sentences[sentenceIndex].images = await fetchGoogleAndReturnImagesLinks(query)
      content.sentences[sentenceIndex].googleSearchQuery = query
    } */
  }
    
    
    const imagesArray = await fetchGoogleAndReturnImagesLinks('Ball')
    console.dir(imagesArray, {depth:null})
    process.exit[0]


  async function fetchGoogleAndReturnImagesLinks(query) {
    const response = await customSearch.cse.list({
      auth: googleSearchCredentials.apiKey,
      cx: googleSearchCredentials.searchEngineId,
      q: query,
      searchType: 'image',
      num: 2
    })

    const imagesUrl = response.data.items.map((item) => {
      return item.link
    })

    return imagesUrl
  }
}

module.exports = robot