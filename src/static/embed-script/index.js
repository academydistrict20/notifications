import getMessage from '@/services/axios.js'

async function init() {
  try {
    let messages = await getMessage()
    console.log(messages)
  } catch (err) {
    console.log(`something went wrong ${err}`)
  }
}

init()
