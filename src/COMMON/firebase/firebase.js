import * as firebase from 'firebase';
 
const firebaseConfig = {
    apiKey: "AIzaSyBcZDU90vaVh4mnRInS_GVoEMaiHfkeysw",
    authDomain: "bookreader-65d7d.firebaseapp.com",
    databaseURL: "https://bookreader-65d7d.firebaseio.com",
    projectId: "bookreader-65d7d",
    storageBucket: "bookreader-65d7d.appspot.com",
    messagingSenderId: "559786087665",
    appId: "1:559786087665:web:6e9292055e7d6656a20550"
  };
 
const firebaseApp = firebase.initializeApp(firebaseConfig);
 


export default class Firebase{
 
  constructor(){
 
    firebaseApp.auth().onAuthStateChanged(function(user) {
      if (user) {
        //Fai qualcosa..
      } else {
        this.auth();
      }
    }.bind(this));
  }
 
  auth(){
    firebase.auth().signInWithEmailAndPassword("pippo@pluto.com", "****").catch(function(error) {
      console.error("Errore durante l'autenticazione..", error.code, error.message);
    });
  }
 
  print(refValue){
    console.log("RefValue print: ", refValue);
 
    this.itemsRef = firebaseApp.database().ref(refValue);
    console.log("Ecco la reference: ", this.itemsRef);
 
    this.itemsRef.on('value', function(elem){
      console.log("elem: ", elem);
 
      elem.forEach(function(e){
        console.log("e.val() ", e.val());
        console.log("e.val().name ", e.val().name);
        console.log("e.key ", e.key);
      });
    });
  }
 
  save(refValue, newDataItem){
    console.log("RefValue save: ", refValue);
 
    firebaseApp.database().ref(refValue + newDataItem.id).set(newDataItem).then(function(result){
        console.log("Salvato con successo..!");
      }.bind(this), function(error){
        console.error("Errore durante il salvataggio..");
      }.bind(this));
  }
}