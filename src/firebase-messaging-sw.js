importScripts("https://www.gstatic.com/firebasejs/10.6.0/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.6.0/firebase-messaging-compat.js");

firebase.initializeApp({
  apiKey: "AIzaSyC3-KmYMsonAbL9vwWlTo-atg6IwHTsK8o",
  authDomain: "kanban-fire-833cc.firebaseapp.com",
  databaseURL: "https://kanban-fire-833cc-default-rtdb.firebaseio.com",
  projectId: "kanban-fire-833cc",
  storageBucket: "kanban-fire-833cc.appspot.com",
  messagingSenderId: "646530581923",
  appId: "1:646530581923:web:7adfbdc5c73978c23c8616",
  measurementId: "G-DYBFSEEP9H"
});

const messaging = firebase.messaging();
