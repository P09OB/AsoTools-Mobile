import {onGetSesion, setSesion} from './firebase.js'
 const sectionWelcome = document.querySelector('.welcome')
 const sectionAnswer = document.querySelector('.inputAnswer')
 const sectionTnanks = document.querySelector('.thanks')
 const bttSend = document.querySelector('.bttNext')
 const answer = document.querySelector('.answer')
 const question = document.querySelector('.question')
 const thanks = document.querySelector('.thanks')
 const inputAnswer = document.querySelector('.inputAnswer')
 const returnBtt = document.querySelector('.return')

 var date = ''
 let obtener = ''
 let code = ''
 let counter = 0

 //Configurar
onGetSesion((querySnapshot)=>{
    question.innerHTML = ""
    const sesion = querySnapshot.data()
    if(sesion.start){
        sectionWelcome.classList.add('hidden')
        sectionAnswer.classList.remove('hidden')
        date = sesion.objQuestions[sesion.counter]
        obtener = date.question
        code = date.code
        console.log(obtener)
        console.log(code)
        question.innerHTML = date.question
    }

    console.log(sesion.completed)

    if(sesion.completed){
        thanks.classList.remove('hidden')
        sectionAnswer.classList.add('hidden')
        returnBtt.classList.remove('hidden')
    }

})

bttSend.addEventListener('click',()=>{
    console.log(code)
    setSesion(code,answer.value, localStorage.getItem('name'))
    answer.value = ''
})

returnBtt.addEventListener('click',()=>{
    location.href = "./index.html";
    
})

