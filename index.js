const readline = require('readline-sync')

const robots = {
  //input: require('./robots/input.js'),
  text: require('./robots/text.js'),
  //state: require('./robots/state.js'),
  //image: require('./robots/image.js'),
  //video: require('./robots/video.js'),
  //youtube: require('./robots/youtube.js')
}

async function start() {

  const content = {
   maximumSentences: 7
  }
  content.searchTerm = askAndReturnSearchTerm()
  content.prefix = askAndReturnPrefix()
  //state.save(content)

 
  //robots.input(content)
  await robots.text(content)

  function askAndReturnSearchTerm() {
    return readline.question('Type a Wikipedia search term: ')
  }

  function askAndReturnPrefix() {
    const prefixes = ['Who is', 'What is', 'The history of']
    const selectedPrefixIndex = readline.keyInSelect(prefixes, 'Choose one option: ')
    const selectedPrefixText = prefixes[selectedPrefixIndex]

    return selectedPrefixText
  }

 
  console.log(content)
  
   
  }
  
start()
  