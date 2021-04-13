const db = require("../model");
const User = db.users;
const Op = db.Sequelize.Op;
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client('837613122270-hdk3k6aikmb4uhq92ub4og8tuui38ous.apps.googleusercontent.com');

async function verify(token) {
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: '837613122270-hdk3k6aikmb4uhq92ub4og8tuui38ous.apps.googleusercontent.com',  // Specify the CLIENT_ID of the app that accesses the backend
        // Or, if multiple clients access the backend:
        //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
    });
    const payload = ticket.getPayload();
    const userid = payload['sub'];
    console.log(userid);
    // If request specified a G Suite domain:
    // const domain = payload['hd'];
    return true;
}

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
    const { name, email, password, provider, provider_id, provider_pic, token, created_at, updated_at, active } = req.body.data;

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

    verify(token).then( verified => {
        //console.log('check'+ verified);
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