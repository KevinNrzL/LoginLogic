const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');//mengambil data dari body suatu request HTTP
const session = require('express-session');//menyimpan sessi

const app = express();

// Baca file JSON
function finder(uid, pass) {
  // Baca file JSON
  fs.readFile('Data/data.json', 'utf8', (err, data) => {
    if (err) throw err;

    // Parsing data JSON
    const jsonData = JSON.parse(data);

    // Mencari objek dengan id dan nama tertentu
    const obj = jsonData.find(o => o.userId === uid && o.password === pass);

    // Cek apakah objek ditemukan
    if (obj) {
      console.log(`User dengan UID ${uid} dan nama ${pass} ditemukan.`);
      doSomething(obj); // memanggil fungsi doSomething jika objek ditemukan
    } else {
      res.send('Username atau password salah.');
      console.log(`User dengan UID ${uid} dan nama ${pass} tidak ditemukan.`);
    }
  });
}

function doSomething(obj) {
  session.loggedIn = true;
 
  console.log('Berhasil ')
  console.log(`Melakukan sesuatu dengan objek: ${JSON.stringify(obj)}` + '\n' +obj);
  return;
  // Lakukan sesuatu dengan objek yang ditemukan di sini
}

app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
  secret: 'secret-key', // digunakan oleh express-session untuk menghasilkan kunci enkripsi yang digunakan untuk mengenkripsi dan mendekripsi session data sebelum disimpan
  resave: true,
  saveUninitialized: true
}));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.post('/login', (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  finder(username, password);
  res.redirect('/home');

  // Mencari objek dengan id tertentu
  
  
});

app.get('/home', (req, res) => {
  if (session.loggedIn) {
    console.log('Website Selanjutnya');
    res.send('Selamat datang di website selanjutnya!');
  } else {
    res.redirect('/');
  }
});

app.listen(3000, () => {
  console.log('Server berjalan pada port 3000');
}); 
