///testing:
var passport = require("passport"),
    FacebookStrategy = require("passport-facebook").Strategy;

module.exports = function(){
    passport.use(new FacebookStrategy({
        clientID: process.env.FACEBOOK_ID,
        clientSecret: process.env.FACEBOOK_SECRET,
        callbackURL: "https://localhost:3000"
    },
        function (req, accessToken, refreshToken, profile, done) {
            var user={};
            user.email = profile.email[0].value;
            // user.image = profile._json.image.url;
            user.displayName = profile.displayName;

            user.facebook = {};
            user.facebook.id  = profile.id;
            user.facebook.token = accessToken;
            done(null, profile);
        }
    ));
}