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
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
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
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
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

<<<<<<< HEAD
app.post('/api/test-post-data', async (req,res) => {
  try {
    const data = req.body;
    const collectionRef =db.collection('test_data').doc('leza').set(data);
  }
  catch (eror) {
    console.error(error);
    res.status(500).json({error:'Inrernal server error'})
  }
});

app.post('/api/support-data', async (req,res) => {
  try {
    const data = req.body;
    data['TimeStamp']=FieldValue.serverTimestamp()
    const collectionRef =db.collection('support_data').doc(data.email).set(data);
  }
  catch (eror) {
    console.error(error);
    res.status(500).json({error:'Inrernal server error'})
  }
});
=======
app.post('/api/test-post-data', async (req, res) => {
  try{
    const data = req.body
    const collectionRef = await db.collection('test_data').doc('Tor').set(data);
  }
  catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
}})

>>>>>>> origin/Torja

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

<<<<<<< HEAD
=======


>>>>>>> origin/Torja
// Cookies Handling

app.get('/api/auth/csrf-token', csrfProtection, (req, res) => {
  // console.log('req.session.csrf', req.session.csrf);
  if (req.session.csrf === undefined) {
    req.session.csrf = randomBytes(100).toString('base64'); // convert random data to a string
    // console.log('req.session.csrf', req.session.csrf);
    return res.status(200).json({ csrfToken: req.session.csrf });
  }
  res.status(200).json({ csrfToken: req.session.csrf });
});

// Authentications Section

app.post('/api/auth/sign-up', async (req, res) => {
  try {
    const { name ,email ,password } = req.body;
    console.log(name);
    const userRecord = await admin.auth().createUser({
      name,
      email,
      password,
    });

    await db.collection('users').doc(userRecord.uid).set({
      email,
      createdAt: FieldValue.serverTimestamp(),
      detail: "",
      name: name,
      phone: "",
      role: "user",
      profileIMG: "",
          
    });

<<<<<<< HEAD
    await db.collection('users')
    .doc(userRecord.uid)
    .collection('Followers')
    .doc('static')
    .set({
      followers: 0,
    });

    await db.collection('users')
    .doc(userRecord.uid)
    .collection('Following')
    .doc('static')
    .set({
      following: 0,
    });

    await db.collection('users')
    .doc(userRecord.uid)
    .collection('Posts')
    .doc('static')
    .set({
      posts: 0,
    });

    await db.collection('users')
    .doc(userRecord.uid)
    .collection('Saved')
    .doc('static')
    .set({
      saved: 0,
    });

    await db.collection('users')
    .doc(userRecord.uid)
    .collection('Notifications')
    .doc('static')
    .set({
      notifications: 0,
    });

    await db.collection('users')
    .doc(userRecord.uid)
    .collection('Chats')
    .doc('static')
    .set({
      chats: 0,
    });

    res.json({ message : 'User created successfully' });
=======
    await db.collection('term-policy').doc('agreement').collection('UID').doc(userRecord.uid).set({
    });
    

        res.json({ message : 'User created successfully' });
>>>>>>> origin/Torja
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/auth/sign-in-with-google', async (req, res) => {
  try {
    const { user } = req.body;

    checkUser = await db.collection('users').doc(user.uid).get();
    if (checkUser.exists) {
      console.log('User already exists');
      res.json({ message : 'User already exists' });
    } else {
      console.log('Creating new user');
    await db.collection('users').doc(user.uid).set({
      email: user.email,
      createdAt: FieldValue.serverTimestamp(),
      detail: "",
      name: user.displayName,
      phone: "",
      role: "user",
      profileIMG: user.photoURL,
    });

    await db.collection('users')
    .doc(user.uid)
    .collection('Followers')
    .doc('static')
    .set({
      followers: 0,
    });

    await db.collection('users')
    .doc(user.uid)
    .collection('Following')
    .doc('static')
    .set({
      following: 0,
    });

    await db.collection('users')
    .doc(user.uid)
    .collection('Posts')
    .doc('static')
    .set({
      posts: 0,
    });

    await db.collection('users')
    .doc(user.uid)
    .collection('Saved')
    .doc('static')
    .set({
      saved: 0,
    });

    await db.collection('users')
    .doc(user.uid)
    .collection('Notifications')
    .doc('static')
    .set({
      notifications: 0,
    });

    await db.collection('users')
    .doc(user.uid)
    .collection('Chats')
    .doc('static')
    .set({
      chats: 0,
    });

    res.json({ message : 'User created successfully' });}

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

<<<<<<< HEAD
// Term and Policy Section
app.get('/api/term-policy', async (req, res) => {
  try {
=======
app.get('/api/term-policy', async (req, res) =>{
  try{
>>>>>>> origin/Torja
    const collectionRef = admin.firestore().collection('term-policy');
    const snapshot = await collectionRef.get();
    if (snapshot.empty) {
      res.json([]);
<<<<<<< HEAD
    } else {
      const data = snapshot.docs && snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      res.json(data);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Support Section


// Post Section

app.post('/api/post-upload/:postId', async (req, res) => {
  try {
    req.params.postId = crypto.randomUUID();
    const { postId } = req.params;
    const { post, user } = req.body;
    const uid = user.uid;
    const doc = await db.collection('posts').doc(postId).set({
      context:post,
      createdAt: FieldValue.serverTimestamp(),
      likes: 0,
      comments: 0,
      postTitle: postId,
      postIMG: "",
    });

    await db.collection('users').doc(uid).collection('Posts').doc(postId).set({
      postId: postId,
    });

    const static = db.collection('users').doc(uid).collection('Posts').count()
    await db.collection('users').doc(uid).collection('Posts').doc('static').update({
      posts: static-1,
    });
    res.json({ message : 'Post uploaded successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/api/posts/:postId', async (req, res) => {
  try {
    const { postId } = req.params;
    const doc = await db.collection('posts').doc(postId).get();
    if (doc.exists) {
      const data = doc.data();
      res.json(data);
    } else {
      console.log('No such document!');
      res.json({});
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
=======
    } else{
      const data = snapshot.docs && snapshot.docs.map(doc => ({ id: doc.id, ...doc.data()}));
      res.json(data);
    }
    
  }catch (error){
    console.error(error);
    res.status(500).json({ error: 'Internal server error'});
  }
});


>>>>>>> origin/Torja
app.get('*', (req,res) =>{
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

<<<<<<< HEAD
=======


>>>>>>> origin/Torja

const port = process.env.PORT || 3000;
app.listen(port);

console.log(`App listening on ${port}`);
console.log('Continue with this link: http://localhost:3000/');
console.log('Or this link: http://127.0.0.1:3000/');


