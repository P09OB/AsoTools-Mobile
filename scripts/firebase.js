// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-app.js";
import { getFirestore,query,where,getDocs, collection, addDoc,getDoc, setDoc, doc, onSnapshot, collectionGroup,updateDoc,arrayUnion} from "https://www.gstatic.com/firebasejs/9.10.0/firebase-firestore.js"
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCPllQ51fvUDszKOo4ulYc1iolQq7cSHNA",
  authDomain: "asotools-fd4f3.firebaseapp.com",
  databaseURL: "https://asotools-fd4f3-default-rtdb.firebaseio.com",
  projectId: "asotools-fd4f3",
  storageBucket: "asotools-fd4f3.appspot.com",
  messagingSenderId: "954054283858",
  appId: "1:954054283858:web:45672f84f04d4e43dbc58b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore()
const auth = getAuth();
let loggedUser = null

export const onGetUsers = (callback) => 

onSnapshot( query(collectionGroup(db, 'sesion'), where('code', '==', localStorage.getItem('code'))),callback)

export const changeUsers = (userName) =>{
  const ref = doc(db, "users", localStorage.getItem('idUser'),"sesion",localStorage.getItem('idSesion'));
  updateDoc(ref, {users: arrayUnion(userName)}).then(()=>{
    location.href="./home.html";
  })
}

export const onGetSesion = (callback) =>
onSnapshot(doc(db, 'users', localStorage.getItem('idUser'), "sesion", localStorage.getItem('idSesion')), callback)

export const setSesion = (code,answer) =>{
  const ref = doc(db, "users", localStorage.getItem('idUser'),"sesion",localStorage.getItem('idSesion'));
  updateDoc(ref, {[code]: arrayUnion(answer)}).then(()=>{
    alert("Se envio su respuesta")
  })
}

