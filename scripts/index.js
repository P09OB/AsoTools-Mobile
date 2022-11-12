import {onGetUsers,changeUsers,groupUsers} from './firebase.js'

const bttStart = document.querySelector('.button')
const inputCode = document.querySelector('.label-code');
const code = document.querySelector('.code')
const inputName = document.querySelector('.label-name')
const name = document.querySelector('.name')
const select= document.querySelector('.select')
const group = document.getElementById('type')
var idSesion = ''
var project = ''

bttStart.addEventListener('click',()=>{


    if(inputCode.classList.contains('hidden')){
        localStorage.setItem('name',name.value+"")
        localStorage.setItem('group',group.value+"")

        if(!name.value==''){
            if(project.idMethodology == 'Árbol del problema'){
                groupUsers(name.value,group.value)
            } else{
                changeUsers(name.value)
            }
            name.value = ''

        } else{
            alert("Llene todos los campos")
        }
    } else{

        localStorage.setItem('code',code.value+"")
        code.value = ''

        onGetUsers((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                project = doc.data()
                if(project.idMethodology == 'Árbol del problema'){
                    select.classList.remove('hidden')
                }
                localStorage.setItem('idSesion',project.id)
                localStorage.setItem('idUser',project.idUser)

                inputCode.classList.add('hidden')
                inputName.classList.remove('hidden')
            });

            if(inputName.classList.contains('hidden')){
                alert('Código incorrecto')
            }            
        }) 
    }
})