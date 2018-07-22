
var db = require("../models");
var FacebookStrategy = require("passport-facebook").Strategy;
var User = require("../models/user");
var session = require('express-session')
console.log("----thiss is passport fb file----");
module.exports = function (app, passport) {
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(session({secret: 'keyboard cat', resave: false, saveUninitialized: true, cookie: { secure: false }}))
    
    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function (id, done) {
        User.findById(id, function (err, user) {
            done(err, user);
        });
    });


    passport.use(new FacebookStrategy({
        clientID: process.env.FACEBOOK_ID,
        clientSecret: process.env.FACEBOOK_SECRET,
        callbackURL: "https://elders-share-exp.herokuapp.com",
        profileFields: ['id', 'displayName', 'photos', 'email']

    },
        function (accessToken, refreshToken, profile, done) {
            console.log("----this is before fb----");
            console.log(profile);
            console.log("----this is after fb----");
            // User.findOrCreate(..., function(err, user) {
            //   if (err) { return done(err); }
            //   done(null, user);
            // });
                txt = JSON.stringify(profile);

            db.User.create({
                email: profile._json.email,
                password: "password",
                displayname: "test",
                firstname: "test",
                lastname: "test",
                gender: "M",
                dob: "13/13/2018",
                accounttype: "E",
                zipcode: "99999",
                lat: "1.2",
                lng: "0.2"
          
              }).then(function() {
                res.redirect(307, "/api/login");
              }).catch(function(err) {
                console.log(err);
                res.json(err);
                // res.status(422).json(err.errors[0].message);
              });





            done(null, profile);
        }
    ));

    app.get('/auth/facebook/callback', passport.authenticate('facebook', { failureRedirect: '/login' }));

    app.get('/auth/facebook', passport.authenticate('facebook', { scope: 'email' }));

    return passport;

}