const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('./keys')
const mongoose = require('mongoose')


const User = mongoose.model('users')


module.exports = (passport) => {


    passport.use(new GoogleStrategy({
            clientID: keys.googleClientID,
            clientSecret: keys.googleClientSercret,
            callbackURL: "/auth/google/callback",
            proxy: true
        }, (accessToken, refreshToken, profile, done) => {
            // console.log(accessToken)
            // console.log(profile)

            // const image = profile.photos[0].value.substring(0, profile.photos[0].value.indexOf('?'))

            const newUser = {
                googleID: profile.id,
                fname: profile.name.givenName,
                lname: profile.name.familyName,
                email: profile.emails[0].value,
                image: profile.photos[0].value
            }

            // check for existance user

            User.findOne({
                    googleID: profile.id
                })
                .then(user => {
                    if (user) {

                        done(null, user)

                    } else {
                        new User(newUser)
                            .save()
                            .then(user => done(null, user))
                    }
                })


        }),

    )

    passport.serializeUser((user, done) => {
        done(null, user.id)
    })

    passport.deserializeUser((id, done) => {
        User.findById(id)
            .then(user => done(null, user))
    })
}