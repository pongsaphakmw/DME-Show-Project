const express = require('express');
const path = require('path');
const app = express();
const { initializeApp, applicationDefault, cert } = require('firebase-admin/app');
const { getFirestore, Timestamp, FieldValue } = require('firebase-admin/firestore');
const admin = require('firebase-admin');

// Init Firebase
const serviceAccount = require('./serviceAccountKey.json');
const { getAuth } = require('firebase/auth');

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

// Cookies Handling
const csrf = require('csurf');
const cookieParser = require('cookie-parser');
const csrfProtection = csrf({ cookie: true });
// const cookieSession = require('cookie-session');

app.use(cookieParser());
// app.use(csrfProtection);

app.get('/api/auth/csrf-token', csrfProtection, (req, res) => {
  if (req.session.csrf === undefined) {
    req.session.csrf = randomBytes(100).toString('base64'); // convert random data to a string
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

app.post('/api/auth/check-user', async (req, res) => {
  try {
    const { email } = req.body;
    const userRecord = await admin.auth().getUserByEmail(email);
    res.json(true);
  } catch (error) {
    res.json(false);
  }
});

app.post('/api/auth/sign-in', csrfProtection, async (req, res) => {
  try {
    const { user } = req.body;
    const { uid } = user;

    if (!uid) {
      return res.status(400).json({ error: 'Invalid user information' });
    }

    if (!req.csrfToken || req.csrfToken() === req.headers['x-csrf-token']) {
      return res.status(403).send('Invalid CSRF token');
    }

    const expiresIn = 60 * 60 * 24 * 5 * 1000;
    const userRecord = await admin.auth().createCustomToken(uid);
    const token = userRecord;

    try {
      const sessionCookie = await getAuth().createSessionCookie(token, { expiresIn });

      const options = { maxAge: expiresIn, httpOnly: true, secure: true };
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
    const decodedToken = await admin.auth().verifyIdToken(token);
    const uid = decodedToken.uid;
    res.json({ uid: uid , verified: true});
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});


const port = process.env.PORT || 3000;
app.listen(port);

console.log(`App listening on ${port}`);
console.log('Continue with this link: http://localhost:3000/');
console.log('Or this link: http://127.0.0.1:3000/');

