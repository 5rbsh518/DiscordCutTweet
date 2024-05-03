let myQut = []
let addButton
let questionHolder
let sendButton
let token
let questionNum = 1
let channelID
let time
if (typeof authHeader === 'undefined') {
  var authHeader = ''
  var apiPrefix = ''
  var api = ''
  var timeout = ''
  var apiCall = ''
  var setup = ''
  var delay = 0
}
document.addEventListener("DOMContentLoaded", (event) => {
    addButton = document.getElementById("addButton")
    sendButton = document.getElementById("sendButton")
    questionHolder = document.getElementById("questionHolder")
    token = document.getElementById("tokenPlaceholder")
    channelID = document.getElementById("roomIDNumber")
    time = document.getElementById("sleepTime")
    addButton.addEventListener("click",(e) => {
        e.preventDefault()
        let questionLabel = document.createElement("label")
        questionLabel.for = `question${++questionNum}`
        questionLabel.classList.add("form-label")
        questionLabel.textContent = `Question ${questionNum}`
        questionHolder.appendChild(questionLabel)
        let questionInput = document.createElement("input")
        questionInput.type = "text"
        questionInput.classList.add("form-control")
        questionInput.classList.add("question")
        questionInput.id = `question${questionNum}` 
        questionHolder.appendChild(questionInput)
    })

    sendButton.addEventListener("click", (e) => {
      e.preventDefault()
      let questions = document.querySelectorAll("input.question ")
      questions.forEach((e) => {
        myQut.push(e.value)
      }) 
      console.log(myQut)
      askQuestion()
    })
  });


  authHeader = ""
  apiPrefix = 'https://discord.com/api/v9'
  apiCall = (apiPath, body, method = 'GET') =>
    fetch(apiPrefix + apiPath, {
      body: body ? JSON.stringify(body) : undefined,
      headers: {
        Accept: '*/*',
        'Accept-Language': 'en-US',
        Authorization: token.value,
        'Content-Type': 'application/json',
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) discord/0.0.309 Chrome/83.0.4103.122 Electron/9.3.5 Safari/537.36',
      },
      method
    })
      .then(res => (res.status === 200 ? res.json() : Promise.resolve()))
      .catch(console.error)

  api = {
    sendMessage(channelId, message, tts) {
      return apiCall(`/channels/${channelId}/messages`, { content: message, tts: !!tts }, 'POST')
    }
  }

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
async function askQuestion(){
  for(i = 0; i < myQut.length; ++i){
    await api.sendMessage(channelID.value, myQut[i] +"@here")
    await sleep(time.value)
  }
  await api.sendMessage(channelID.value, "خلاص خلصت الاسئلة بحه @here")
}