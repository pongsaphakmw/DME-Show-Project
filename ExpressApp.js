const express = require('express');
const path = require('path');
const app = express();
const { initializeApp, applicationDefault, cert } = require('firebase-admin/app');
const { getFirestore, Timestamp, FieldValue } = require('firebase-admin/firestore');
const admin = require('firebase-admin');
const csrf = require('csurf');
const cookieParser = require('cookie-parser');
const csrfProtection = csrf({ cookie: true });
const session = require('express-session');
const { randomBytes, verify } = require('crypto');
// const { getAuth } = require('firebase/auth');
// const cookieSession = require('cookie-session');


// Init Firebase
const serviceAccount = require('./serviceAccountKey.json');
const firebaseApp = initializeApp({
  credential: cert(serviceAccount)
});


const db = getFirestore();

// Setup Middleware Express App
app.use(express.static(path.join(__dirname, 'client/build')));
app.use(express.json());
app.use(cookieParser());
app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: true,
  cookie: { 
    secure: false,
    maxAge: 60 * 60 * 24 * 5 * 1000,
   }
}));

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

// Cookies Handling
// app.use(csrfProtection);

app.get('/api/auth/csrf-token', csrfProtection, (req, res) => {
  // console.log('req.session.csrf', req.session.csrf);
  if (req.session.csrf === undefined) {
    req.session.csrf = randomBytes(100).toString('base64'); // convert random data to a string
    // console.log('req.session.csrf', req.session.csrf);
    return res.status(200).json({ csrfToken: req.session.csrf });
  }
  res.status(200).json({ csrfToken: req.session.csrf });
});


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
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/auth/sign-up-with-google', async (req, res) => {
  try {
    const { user } = req.body;

    await db.collection('users').doc(user.uid).set({
      email: user.email,
      createdAt: FieldValue.serverTimestamp(),
      detail: "",
      name: user.displayName,
      phone: "",
      role: "user",
      profileIMG: user.photoURL,
    });

    res.json({ message : 'User created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
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
    const { user, idToken } = req.body;

    if (user === undefined) {
      return res.status(400).json({ error: 'Invalid user information' });
    }

    const expiresIn = 60 * 60 * 24 * 2 * 1000;
    
    try {
      const sessionCookie = await admin.auth().createSessionCookie(idToken,  { expiresIn: expiresIn } );

      const options = { maxAge: expiresIn, secure: false };
      res.cookie('session', sessionCookie, options);
      res.end(JSON.stringify({ status: 'success' }));
    } catch (error) {
      console.error(error);
      return res.status(401).send('UNAUTHORIZED REQUEST!');
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/auth/check-token', async (req, res) => {
  try {
    const { token } = req.body;
    // console.log('token', token);
    const decodedToken = await admin.auth().verifyIdToken(token);
    const uid = decodedToken.uid;
    res.json({ uid: uid , verified: true});
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});


app.get('*', (req,res) =>{
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
});


const port = process.env.PORT || 3000;
app.listen(port);

console.log(`App listening on ${port}`);
console.log('Continue with this link: http://localhost:3000/');
console.log('Or this link: http://127.0.0.1:3000/');

