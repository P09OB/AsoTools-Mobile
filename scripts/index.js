import {onGetUsers,changeUsers} from './firebase.js'

const bttStart = document.querySelector('.button')
const inputCode = document.querySelector('.label-code');
const code = document.querySelector('.code')
const inputName = document.querySelector('.label-name')
const name = document.querySelector('.name')
var idSesion = ''

bttStart.addEventListener('click',()=>{


    if(inputCode.classList.contains('hidden')){
        localStorage.setItem('name',name.value+"")
        if(!name.value==''){
            changeUsers(name.value)
        } else{
            alert("llene todos los campos")
        }
    } else{

        //PRIMERA VERIFICACIÓN DE SI EXISTE EL CÓDIGO
        localStorage.setItem('code',code.value+"")

        onGetUsers((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                const project = doc.data()
                localStorage.setItem('idSesion',project.id)
                localStorage.setItem('idUser',project.idUser)


                console.log(project.users )
                inputCode.classList.add('hidden')
                inputName.classList.remove('hidden')
            });

            if(inputName.classList.contains('hidden')){
                alert('Code erroneo')
            }
            
        }) 
        

    
    
    }
   
    

    

})