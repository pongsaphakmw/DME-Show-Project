const express = require('express');
const path = require('path');
const app = express();
const { initializeApp, applicationDefault, cert } = require('firebase-admin/app');
const { getFirestore, Timestamp, FieldValue } = require('firebase-admin/firestore');
const admin = require('firebase-admin');
const jwt = require('jsonwebtoken');


// Init Firebase
const serviceAccount = require('./serviceAccountKey.json');

initializeApp({
  credential: cert(serviceAccount)
});

const db = getFirestore();

// Setup Middleware Express App
app.use(express.static(path.join(__dirname, 'client/build')));
app.use(express.json());

// An API route

app.get('/api/test-data', async (req, res) => {
  try {
    const collectionRef = admin.firestore().collection('users');
    const snapshot = await collectionRef.get();
    if (snapshot.empty) {
      res.json([]);
    } else {
      const data = snapshot.docs && snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      res.json(data);
      
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/api/post-data', async (req, res) => {
  try {
    const data = req.body;
    const docRef = await db.collection('users').doc('MockUpUID2').set(data);
    res.json({id: docRef.id});
  }
  catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
})

app.get('*', (req,res) =>{
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

// JWT Handling



// Work Section

app.post('/api/auth/sign-up', async (req, res) => {
  try {
    const { email, password } = req.body;
    const userRecord = await admin.auth().createUser({
      email,
      password,
    });

    await db.collection('users').doc(userRecord.uid).set({
      email,
      createdAt: FieldValue.serverTimestamp(),
      detail: "",
      name: "",
      phone: "",
      role: "user",
      profileIMG: "",
    });

    res.json({ message : 'User created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/api/auth/check-user', async (req, res) => {
  try {
    const { email } = req.body;
    const userRecord = await admin.auth().getUserByEmail(email);
    res.json(true);
  } catch (error) {
    res.json(false);
  }
});

app.post('/api/auth/sign-in', async (req, res) => {
  try {
    const { email, password } = req.body;
    const userRecord = await admin.auth().getUserByEmail(email); 
    const token = await jwt.sign({ uid: userRecord.uid }, 'secret');

    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


const port = process.env.PORT || 3000;
app.listen(port);

console.log(`App listening on ${port}`);
console.log('Continue with this link: http://localhost:3000/');
console.log('Or this link: http://127.0.0.1:3000/');

