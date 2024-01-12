require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const PORT = 6005;
const session = require("express-session")
const passport = require("passport")
const OAuth2Strategy = require("passport-google-oauth2").Strategy
require("./database/connection")
const userdb = require("./model/userSchema")
const axios = require("axios");

//in dotenv
const clientid = process.env.CLIENT_ID
const clientsecret = process.env.CLIENT_SECRET

app.use(cors({
    origin: "http://localhost:3000",
    methods: "GET,POST,PUT,DELETE,PATCH",
    credentials: true
}));
app.use(express.json());

// setup session
app.use(session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: true
}))

// setuppassport
app.use(passport.initialize());
app.use(passport.session());

passport.use(
    new OAuth2Strategy({
        clientID: clientid,
        clientSecret: clientsecret,
        callbackURL: "/auth/google/callback",
        scope: ["profile", "email"]
    },
        async (accessToken, refreshToken, profile, done) => {
            try {
                let user = await userdb.findOne({ googleId: profile.id });

                if (!user) {
                    user = new userdb({
                        googleId: profile.id,
                        googleName: profile.displayName,
                        email: profile.emails[0].value,

                        name: "null",
                        phoneNo: 0,
                        regNo: 0,
                        branch: "null",
                        learnerid: "null",
                        upiID: "null",
                        txnID: "null",
                        screenshot: "null",
                        hackathon: false
                    });

                    await user.save();
                }

                return done(null, user)
            } catch (error) {
                return done(error, null)
            }
        }
    )
)

passport.serializeUser((user, done) => {
    done(null, user);
})

passport.deserializeUser((user, done) => {
    done(null, user);
});

// initial google ouath login
app.get("/auth/google", passport.authenticate("google", { scope: ["profile", "email"] }));

app.get("/auth/google/callback", passport.authenticate("google", {
    successRedirect: "http://localhost:3000/registration-form",
    failureRedirect: "http://localhost:3000/*"
}))

app.get("/login/success", async (req, res) => {

    if (req.user) {
        res.status(200).json({ message: "user Login", user: req.user })
    } else {
        res.status(400).json({ message: "Not Authorized" })
    }
})

app.get("/logout", (req, res, next) => {
    req.logout(function (err) {
        if (err) { return next(err) }
        res.redirect("http://localhost:3000");
    })
})

app.get("/getUser", async (req, res) => {
    const user = req.user;

    if (user) {
        res.json({ selectedWorkshops: user.selectedWorkshops });
    } else {
        res.json({ selectedWorkshops: [] });
    }
});

app.patch("/updateUser", async (req, res) => {
    try {
        const data =await userdb.findByIdAndUpdate(
            req.params.id,
            req.body,
        );
        res.send(data);
    } catch (error) {
        res.status(500).send(error.message);
        console.log(error.message)
    }
    

    // const user = req.data;
    // const { selectedWorkshops } = req.body;

    // if (!user) {
    //     return res.status(401).json({ message: "Not authenticated" });
    // }

    // try {
    //     user.selectedWorkshops = selectedWorkshops;
    //     await user.save();

    //     res.json({ message: 'Workshops updated successfully!', user });
    // } catch (error) {
    //     res.status(500).send(error.message);
    //     console.log(error.message);
    // }
});
app.get("/api/workshops", (req, res) => {
    const workshops = [
      { workshopNumber: 1, timing: 'Morning' },
      { workshopNumber: 2, timing: 'Afternoon' },
      { workshopNumber: 3, timing: 'Morning' },
      { workshopNumber: 4, timing: 'Afternoon' },
      { workshopNumber: 5, timing: 'Morning' },
      { workshopNumber: 6, timing: 'Afternoon' },
      { workshopNumber: 7, timing: 'Morning' },
      { workshopNumber: 8, timing: 'Afternoon' },
    ];
    res.json(workshops);
  });

const router = express.Router()

app.patch('/register/:id', async (req, res) => {
        // const { error } = userdb.validate(req.body);
        // if (error) return res.status(400).send(error.details[0].message);

        // const user = await userdb.findById(req.params.id);
        // if (!user) return res.status(404).send("User not found...");
        // const { name, phoneNo, regNo, branch, learnerid, upiID, txnID, screenshot } = req.body;

        try {
            const registered = await userdb.findByIdAndUpdate(
                req.params.id,
                req.body,
                // {
                //     branch,
                //     learnerid,
                //     name,
                //     phoneNo,
                //     regNo,
                //     screenshot,
                //     txnID,
                //     upiID
                // },
                );
            res.send(registered);
        } catch (error) {
            res.status(500).send(error.message);
            console.log(error.message);
        }
    })

app.listen(PORT, () => {
    console.log(`server start at port no ${PORT}`)
})