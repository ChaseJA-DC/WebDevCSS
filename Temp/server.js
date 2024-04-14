"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
const router = express_1.default.Router();
app.set("views", path_1.default.join(__dirname, "./views"));
app.set("view engine", "ejs");
router.get('/', function (req, res, next) {
    res.render('index', { title: 'Your Title', page: 'home' });
});
app.use('/', router);
app.use('/node_modules', express_1.default.static(path_1.default.join(__dirname, 'node_modules')));
app.use('/client', express_1.default.static(path_1.default.join(__dirname, 'client')));
app.use(function (req, res, next) {
    console.log(req.url);
    next();
});
app.listen(port, function () {
    console.log(`Server listening on port ${port}`);
});
router.get('/404', function (req, res, next) {
    res.render('index', { title: '404', page: '404', displayName: '' });
});
router.get('/about', function (req, res, next) {
    res.render('index', { title: 'About', page: 'about', displayName: '' });
});
router.get('/contact', function (req, res, next) {
    res.render('index', { title: 'Contact', page: 'contact', displayName: '' });
});
router.get('/contact-list', function (req, res, next) {
    res.render('index', { title: 'Contact List', page: 'contact-list', displayName: '' });
});
router.get('/edit', function (req, res, next) {
    res.render('index', { title: 'Edit', page: 'edit', displayName: '' });
});
router.get('/events', function (req, res, next) {
    res.render('index', { title: 'Events', page: 'events', displayName: '' });
});
router.get('/eventsplanning', function (req, res, next) {
    res.render('index', { title: 'Event Plans', page: 'eventsplanning', displayName: '' });
});
router.get('/home', function (req, res, next) {
    res.render('index', { title: 'Home', page: 'home', displayName: '' });
});
router.get('/login', function (req, res, next) {
    res.render('index', { title: 'Login', page: 'login', displayName: '' });
});
router.get('/portfolio', function (req, res, next) {
    res.render('index', { title: 'Portfolio', page: 'portfolio', displayName: '' });
});
router.get('/privacypolicy', function (req, res, next) {
    res.render('index', { title: 'PP', page: 'privacypolicy', displayName: '' });
});
router.get('/products', function (req, res, next) {
    res.render('index', { title: 'Products', page: 'products', displayName: '' });
});
router.get('/register', function (req, res, next) {
    res.render('index', { title: 'Register', page: 'register', displayName: '' });
});
router.get('/services', function (req, res, next) {
    res.render('index', { title: 'Services', page: 'services', displayName: '' });
});
router.get('/statistics', function (req, res, next) {
    res.render('index', { title: 'Stats', page: 'statistics', displayName: '' });
});
router.get('/tos', function (req, res, next) {
    res.render('index', { title: 'ToS', page: 'tos', displayName: '' });
});
exports.default = app;
//# sourceMappingURL=server.js.map