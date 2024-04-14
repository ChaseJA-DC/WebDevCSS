import express from 'express';
import mongoose from "mongoose";
import Contact from "../models/contact";

const router = express.Router();



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
  Contact.find().then(function(contacts: any){
    console.log(contacts);
  }).catch(function(err: string){
    console.error("Encountered an Error reading form the Database" + err);
    res.end();
  });
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
export default router;