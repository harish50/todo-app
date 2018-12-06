import * as firebase from 'firebase';

var config = {
    apiKey: "AIzaSyAPM09jl0Waz3EjAFH5Uk_qhn9ObIs53Yw",
    authDomain: "todo-39db2.firebaseapp.com",
    databaseURL: "https://todo-39db2.firebaseio.com",
    projectId: "todo-39db2",
    storageBucket: "todo-39db2.appspot.com",
    messagingSenderId: "494339148093"
};

firebase.initializeApp(config);
const database = firebase.database();
export default database;