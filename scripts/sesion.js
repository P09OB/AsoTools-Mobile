import { onGetSesion, setSesion, onGetProyect } from './firebase.js'
const sectionWelcome = document.querySelector('.welcome')
const sectionAnswer = document.querySelector('.inputAnswer')
const sectionTnanks = document.querySelector('.thanks')
const bttSend = document.querySelector('.bttNext')
const answer = document.querySelector('.answer')
const question = document.querySelector('.question')
const thanks = document.querySelector('.thanks')
const inputAnswer = document.querySelector('.inputAnswer')
const returnBtt = document.querySelector('.return')
const standby = document.querySelector('.standby')

const sectionEmojis = document.querySelector('.emojis')
const veryBad = document.querySelector('.veryBad')
const bad = document.querySelector('.bad')
const regular = document.querySelector('.regular')
const nice = document.querySelector('.nice')

var valVeryBad = false
var valBad = false
var valRegular = false
var valNice = false

var date = ''
var dateEvaluate, obtEvaluate, codeEvaluate = ''
let obtener = ''
let code = ''
let sesion = ''
let selection = ''
let counter = 0

//Cambiar configuración
onGetSesion((querySnapshot) => {
    question.innerHTML = ""
    sesion = querySnapshot.data()
    localStorage.setItem('idProyect', sesion.idProyect)
    if (sesion.start) {
        sectionWelcome.classList.add('hidden')
        sectionAnswer.classList.remove('hidden')

        if (sesion.idMethodology === 'Árbol de sueños, preocupaciones y compromisos') {

            date = sesion.objQuestions[sesion.counter]
            obtener = date.question
            code = date.code
            question.innerHTML = date.question
            sectionAnswer.classList.remove('hidden')
            answer.classList.remove('hidden')
            sectionEmojis.classList.add('hidden')

        }

        if (sesion.evaluateAns) {
            answer.classList.add('hidden')
            dateEvaluate = sesion.objEvaluate[sesion.counter]
            obtEvaluate = dateEvaluate.evaluate.answer
            codeEvaluate = dateEvaluate.code
            question.innerHTML = obtEvaluate

            if (counter == sesion.counter & sesion.completed == false) {

                sectionEmojis.classList.remove('hidden')
                standby.classList.add('hidden')
                question.classList.remove('hidden')
                bttSend.classList.remove('hidden')
            } else if (sesion.completed == false) {
                sectionEmojis.classList.add('hidden')
                standby.classList.remove('hidden')
                question.classList.add('hidden')
                bttSend.classList.add('hidden')
            } else {
                thanks.classList.remove('hidden')
                sectionAnswer.classList.add('hidden')
                returnBtt.classList.remove('hidden')
            }
        }


        if (sesion.idMethodology === 'Árbol del problema') {
            date = sesion.objQuestions[sesion.counter]
            obtener = date.question
            code = date.code
            question.innerHTML = date.question
            if (counter == sesion.counter) {
                sectionAnswer.classList.remove('hidden')
                answer.classList.remove('hidden')
                sectionEmojis.classList.add('hidden')
                standby.classList.add('hidden')


            } else {
                sectionAnswer.classList.add('hidden')
                answer.classList.add('hidden')
                sectionEmojis.classList.remove('hidden')
                standby.classList.remove('hidden')



            }

        }


    }

    if (sesion.completed) {
        thanks.classList.remove('hidden')
        sectionAnswer.classList.add('hidden')
        returnBtt.classList.remove('hidden')

    }

})

veryBad.addEventListener('click', () => {
    valVeryBad = true
    valBad = false
    valRegular = false
    valNice = false
    emojis()
})

bad.addEventListener('click', () => {
    valBad = true
    valVeryBad = false
    valRegular = false
    valNice = false
    emojis()
})

regular.addEventListener('click', () => {
    valRegular = true
    valBad = false
    valVeryBad = false
    valNice = false
    emojis()
})

nice.addEventListener('click', () => {
    valNice = true
    valRegular = false
    valBad = false
    valVeryBad = false
    emojis()
})

function emojis() {
    if (valVeryBad) {
        veryBad.src = './imgs/emojiMMal.png'
        selection = 'veryBad'
    } else {
        veryBad.src = './imgs/emojiMMG.png'

    }
    if (valBad) {
        bad.src = './imgs/emojiMal.png'
        selection = 'bad'


    } else {
        bad.src = './imgs/emojiMG.png'

    }
    if (valRegular) {
        regular.src = './imgs/emojiRegular.png'
        selection = 'regular'

    } else {
        regular.src = './imgs/emojiMR.png'

    }
    if (valNice) {
        nice.src = './imgs/emojiBien.png'
        selection = 'nice'

    } else {
        nice.src = './imgs/emojiBG.png'

    }


}

bttSend.addEventListener('click', () => {

    if (sesion.idMethodology === 'Árbol de sueños, preocupaciones y compromisos') {
        setSesion(code, answer.value, localStorage.getItem('name'))
        answer.value = ''
    }

    if (sesion.idMethodology === 'Análisis diferenciado del bienestar') {

        setSesion(codeEvaluate, selection, localStorage.getItem('name'))
        selection = ''
        valVeryBad = false
        valBad = false
        valRegular = false
        valNice = false
        emojis()
        counter = sesion.counter + 1
    }

    if (sesion.idMethodology === 'Árbol del problema') {

        if(counter <= 2){
            setSesion(localStorage.getItem('group'), answer.value, localStorage.getItem('name'))
            answer.value = ''
            counter = sesion.counter + 1
        } else {
            if(counter >= 3){
                let group = localStorage.getItem('group')+'Con'
                setSesion(group, answer.value, localStorage.getItem('name'))
                answer.value = ''
                counter = sesion.counter + 1
            }
        }
        

    }
})

returnBtt.addEventListener('click', () => {
    location.href = "./index.html";

})

