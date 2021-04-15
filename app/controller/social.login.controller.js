const db = require("../model");
const User = db.users;
const Op = db.Sequelize.Op;
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client('837613122270-hdk3k6aikmb4uhq92ub4og8tuui38ous.apps.googleusercontent.com');

async function verify(token) {
    
    const ticket = await client.verifyIdToken({
        idToken: 'eyJhbGciOiJSUzI1NiIsImtpZCI6Ijc3NDU3MzIxOGM2ZjZhMmZlNTBlMjlhY2JjNjg2NDMyODYzZmM5YzMiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJhY2NvdW50cy5nb29nbGUuY29tIiwiYXpwIjoiODM3NjEzMTIyMjcwLWhkazNrNmFpa21iNHVocTkydWI0b2c4dHV1aTM4b3VzLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwiYXVkIjoiODM3NjEzMTIyMjcwLWhkazNrNmFpa21iNHVocTkydWI0b2c4dHV1aTM4b3VzLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwic3ViIjoiMTA2MTg1NDkwNDIxNDQ0NzE4NDIxIiwiZW1haWwiOiJyYXZpZGV3YW5nYW4xM0BnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiYXRfaGFzaCI6Im1aNHlWaWJ3eklfUnVzX3dCT19tSGciLCJuYW1lIjoiUmF2aWthbnQgRGV3YW5nYW4iLCJwaWN0dXJlIjoiaHR0cHM6Ly9saDMuZ29vZ2xldXNlcmNvbnRlbnQuY29tL2EtL0FPaDE0R2pnRkMzdnU2clFGY3lmU015NXZ5bDJTNmFIX2JMbnNwaGtfZXA4ZXc9czk2LWMiLCJnaXZlbl9uYW1lIjoiUmF2aWthbnQiLCJmYW1pbHlfbmFtZSI6IkRld2FuZ2FuIiwibG9jYWxlIjoiZW4iLCJpYXQiOjE2MTgyNzg3NjQsImV4cCI6MTYxODI4MjM2NCwianRpIjoiMmJjMzY4YmNmNzgxMGQwN2M1N2I4YWMzZThhOGUwNWNlZTBhODU2OSJ9.TmryDsRRe2LltRpaztMRqRT8tZKh15LWeG9DSR_kZhjd1qb0-yR-yU2EsFjI_3u8NBGoUs5jI8nM8stb7TxJnu-hnDUwFjL4herIOnwtWQ6xgNYdt-Lp737aysPvQ6L1zQO2yohQaT436VoTTYnZ336Sh7fcOLQtkEyLfEJeTxlmYmH3pLWaeeldhhkyxo9unqhF2DzLqZE6XxKDKlV9A2fG131KLZS5r_ikOvcfvXZh7WkFzSwhwHlg6jS2Z89qzd-FQG1Ph1ZtXaX5BwokEnSpcV94uk-yXZTQ7BQ5934RubPa_QSFl9gqtTxj-6KLQCKJeF_aLVYceCrRIzNGMw',
        audience: '837613122270-hdk3k6aikmb4uhq92ub4og8tuui38ous.apps.googleusercontent.com',  // Specify the CLIENT_ID of the app that accesses the backend
        // Or, if multiple clients access the backend:
        //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
    });
    const payload = ticket.getPayload();
    const userid = payload['sub'];
    // if (userid) {
    //     return true;
    // } else {
    //     return false;
    // }
}
//verify().catch(console.error);


// Retrieve all Tutorials from the database.
exports.socialLogin = (req, res) => {
    // Validate request
    // if (!req.body.session) {
    //     res.status(400).send({
    //         message: "Content can not be empty!"
    //     });
    //     return;
    // }

    // Create a Social Data
    // vasu test

    const { name, email, password, provider, provider_id, provider_pic, token, created_at, updated_at, active } = req.body.data;

    verify(token).then(verified => {
        const socialData = {
            name: name,
            email: email,
            password: password,
            provider: provider,
            provider_id: provider_id,
            provider_pic: provider_pic,
            token: token
            //published: req.body.published ? req.body.published : false
        };

        // Save Social Data in the database
        User.create(socialData).then(data => {
            res.send(data);
        })
            .catch(err => {
                res.status(500).send({
                    message:
                        err.message || "Some error occurred while creating the Tutorial."
                });
            });
    }).catch(console.error);






};