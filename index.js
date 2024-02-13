import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://realtime-db--wac-default-rtdb.firebaseio.com/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const endorsementsInDB = ref(database, "endorsementList")

const inputFieldEl = document.getElementById("input-field")
const publishBtnEl = document.getElementById("publish-btn")
const endorsementTextEl = document.getElementById("endorsement-text")

publishBtnEl.addEventListener("click", function(){
  let inputValue = inputFieldEl.value
  
  push(endorsementsInDB, inputValue)
  
  clearInputFieldEl()
})

onValue(endorsementsInDB, function(snapshot) {
    if (snapshot.exists()) {
        let itemsArray = Object.entries(snapshot.val())
    
        clearendorsementTextEl()
        
        for (let i = 0; i < itemsArray.length; i++) {
            let currentItem = itemsArray[i]
            let currentItemID = currentItem[0]
            let currentItemValue = currentItem[1]
            
            appendItemToEndorsementTextEl(currentItem)
        }    
    } else {
        endorsementTextEl.innerHTML = "Type some motivational stuff above"
    }
})

function clearendorsementTextEl() {
    endorsementTextEl.innerHTML = ""
}

function clearInputFieldEl() {
    inputFieldEl.value = ""
}

function appendItemToEndorsementTextEl(item) {
    let itemID = item[0]
    let itemValue = item[1]
    
    let newEl = document.createElement("li")
    
    newEl.textContent = itemValue
    
    newEl.addEventListener("click", function() {
        let exactLocationOfItemInDB = ref(database, `endorsementList/${itemID}`)
        
        remove(exactLocationOfItemInDB)
    })
    
    endorsementTextEl.append(newEl)
}