import express from 'express'
import path from 'path'

const app = express(); // Create application

const port = process.env.PORT || 3000;
const router = express.Router();

app.set("views", path.join(__dirname, "./views"));
app.set("view engine", "ejs");

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Your Title', page: 'home' }); // Make sure to pass a 'page' variable
});

app.use('/', router); // Moved up to ensure router is used before static paths
app.use('/node_modules', express.static(path.join(__dirname, 'node_modules')));
app.use('/client', express.static(path.join(__dirname, 'client')));



// This middleware will log every request URL before the router gets a chance to handle it
app.use(function (req, res, next) {
  console.log(req.url);
  next();
});

app.listen(port, function () {
  console.log(`Server listening on port ${port}`);
});

router.get('/404', function(req, res, next) {
  res.render('index', { title: '404',page: '404',displayName: '' });
});
router.get('/about', function(req, res, next) {
  res.render('index', { title: 'About',page: 'about',displayName: '' });
});
router.get('/contact', function(req, res, next) {
  res.render('index', { title: 'Contact',page: 'contact',displayName: '' });
});
router.get('/contact-list', function(req, res, next) {
  res.render('index', { title: 'Contact List',page: 'contact-list',displayName: '' });
});
router.get('/edit', function(req, res, next) {
  res.render('index', { title: 'Edit',page: 'edit',displayName: '' });
});
router.get('/events', function(req, res, next) {
  res.render('index', { title: 'Events',page: 'events',displayName: '' });
});
router.get('/eventsplanning', function(req, res, next) {
  res.render('index', { title: 'Event Plans',page: 'eventsplanning',displayName: '' });
});
router.get('/home', function(req, res, next) {
  res.render('index', { title: 'Home',page: 'home',displayName: '' });
});
router.get('/login', function(req, res, next) {
  res.render('index', { title: 'Login',page: 'login',displayName: '' });
});
router.get('/portfolio', function(req, res, next) {
  res.render('index', { title: 'Portfolio',page: 'portfolio',displayName: '' });
});
router.get('/privacypolicy', function(req, res, next) {
  res.render('index', { title: 'PP',page: 'privacypolicy',displayName: '' });
});
router.get('/products', function(req, res, next) {
  res.render('index', { title: 'Products',page: 'products',displayName: '' });
});
router.get('/register', function(req, res, next) {
  res.render('index', { title: 'Register',page: 'register',displayName: '' });
});
router.get('/services', function(req, res, next) {
  res.render('index', { title: 'Services',page: 'services',displayName: '' });
});
router.get('/statistics', function(req, res, next) {
  res.render('index', { title: 'Stats',page: 'statistics',displayName: '' });
});
router.get('/tos', function(req, res, next) {
  res.render('index', { title: 'ToS',page: 'tos',displayName: '' });
});
export default app; // It's usually at the end if you are exporting the app for testing or further modularization
