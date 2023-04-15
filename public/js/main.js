//const { makeRunning } = require("../../controllers/todos")
var audio = new Audio('sound/zapsplatAlarm.mp3')
const deleteBtn = document.querySelectorAll('.del')
const mediItem = document.querySelectorAll('.not')
const mediComplete = document.querySelectorAll('.completed')
const startTimer = document.querySelectorAll('.time')
const notRunning = document.querySelectorAll('.running')
const running = document.querySelectorAll('.notRunning')




Array.from(notRunning).forEach((el)=>{
    el.addEventListener('click',pauseRunning)
})

Array.from(startTimer).forEach((el) => {
    el.addEventListener('click',fireAllFunctions)

    window.addEventListener("DOMContentLoaded",function(event){
        if(el.classList.contains('running')){
            let val = parseInt(el.textContent);
            this.setInterval(()=>{
                val--;
                el.textContent=val
            },60000)
        }
    })
    setInterval(()=>{
        if(el.textContent==0 && el.classList.contains('running')){
            audio.play();
            console.log('audioplayin');
        }
    },1000)
    audio.pause()
    
});


Array.from(running).forEach((el)=>{
    el.addEventListener('click',makeRunning)
})

Array.from(deleteBtn).forEach((el)=>{
    el.addEventListener('click', deleteMedi)
})

Array.from(mediItem).forEach((el)=>{
    el.addEventListener('click', markComplete)
})

Array.from(mediComplete).forEach((el)=>{
    el.addEventListener('click', markIncomplete)
})



function fireAllFunctions(event){
    setInterval(clientClick.bind(null,event),60000)
   countDown(event)
   console.log('rooning')
}


function clientClick(event){
    let elem = event.target;
    let val = parseInt(elem.textContent);
    val--;
    elem.textContent = val;
   
}



 async function countDown(event){
    const mediId = event.target.parentNode.dataset.id
    try{
        const response = await fetch('medi/startTime',{
            method:'put',
            headers:{'Content-type':'application/json'},
            body:JSON.stringify({
                'mediIdFromJSFile': mediId,
            }),  
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    } catch(err){
        console.log(err)
    }
}

async function pauseRunning(){
    const mediId = this.parentNode.dataset.id
    try{
        const response = await fetch('medi/notRunning', {
            method: 'put',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                'mediIdFromJSFile': mediId
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    }catch(err){
        console.log(err)
    }
}

  

async function deleteMedi(){
    const mediId = this.parentNode.dataset.id
    try{
        const response = await fetch('medi/deleteMedi', {
            method: 'delete',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                'mediIdFromJSFile': mediId
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    }catch(err){
        console.log(err)
    }
}

async function markComplete(){
    const mediId = this.parentNode.dataset.id
    try{
        const response = await fetch('medi/markComplete', {
            method: 'put',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                'mediIdFromJSFile': mediId,
                
            })
            
        })
        const data = await response.json()
        console.log(mediId)
        console.log(data)
        location.reload()
    }catch(err){
        console.log(err)
    }
}

async function markIncomplete(){
    const mediId = this.parentNode.dataset.id
    try{
        const response = await fetch('medi/markIncomplete', {
            method: 'put',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                'mediIdFromJSFile': mediId
            })
        })
        console.log(mediId)
        const data = await response.json()
        console.log(data)
        location.reload()
    }catch(err){
        console.log(err)
    }
}
async function makeRunning(){
    const mediId = this.parentNode.dataset.id
    try{
        const response = await fetch('medi/makeRunning', {
            method: 'put',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                'mediIdFromJSFile': mediId,
                
            })
            
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    }catch(err){
        console.log(err)
    }
}


