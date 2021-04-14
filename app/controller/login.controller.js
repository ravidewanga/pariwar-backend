const dotenv = require('dotenv').config();
const SECRET = process.env.TOKEN_SECRET;

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client('837613122270-hdk3k6aikmb4uhq92ub4og8tuui38ous.apps.googleusercontent.com');
const db = require("../model");
const User = db.users;
const Op = db.Sequelize.Op;

async function verify(id_token) {
    const ticket = await client.verifyIdToken({
        idToken: id_token,
        audience: '837613122270-hdk3k6aikmb4uhq92ub4og8tuui38ous.apps.googleusercontent.com',  // Specify the CLIENT_ID of the app that accesses the backend
        // Or, if multiple clients access the backend:
        //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
    });
    const payload = ticket.getPayload();
    const userid = payload['sub'];
    return true;
}

function isEmailUnique(email) {
    return User.count({ where: { email: email } })
        .then(count => {
            if (count != 0) {
                return false;
            }
            return true;
        });
}

// Retrieve all Tutorials from the database.
const socialLogin = (req, res) => {
    const { name, email, password, provider, provider_id, provider_pic, access_token, id_token } = req.body.data;

    const socialData = {
        name: name,
        email: email,
        password: password,
        provider: provider,
        provider_id: provider_id,
        provider_pic: provider_pic,
        access_token: access_token,
        id_token: id_token
        //published: req.body.published ? req.body.published : false
    };

    verify(id_token).then(verified => {
        isEmailUnique(email).then(isUnique => {
            if (isUnique) {
                User.create(socialData).then(data => {
                    res.send(data);
                }).catch(err => {
                    res.status(500).send({
                        message:
                            err.message || "Some error occurred while creating the Tutorial."
                    });
                });
            } else {
                //-----------update token----------------
                User.update({ 
                    provider_id: provider_id,
                    provider_pic: provider_pic,
                    access_token: access_token,
                    id_token: id_token
                    }, {
                    where: {
                        email: email
                    }
                });
                res.send(socialData);
            }
        });
    }).catch(console.error);
};


const customLogin = async (req,res) =>  {
    // jwt.verify('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MTgzODI3MDEsImV4cCI6MTYxODM4NDUwMX0.6Xy-konGd-6mQN_d9vGIi_a3JvNHAXYWEvU0RFp9Jf0', SECRET, function(err, decoded) {
    //     console.log(decoded) // bar
    // });    
    const {email,password} = req.body;
    User.findAll({where:{email:email}}).then(data=>{
        const dbPassword = data[0].dataValues.password;
        //console.log(password);
        const valid = await bcrypt.compare(password,dbPassword);
        //console.log(valid);
        if(!valid){
            res.status(404).send({
                message:"Incorrect Password."
            });
            return;
        }
        //--------generate jwt token-----------
        const token = jwt.sign({
            id:data[0].dataValues.id,
            name:data[0].dataValues.name,
            email:data[0].dataValues.email
         }, SECRET, { expiresIn: '1800s' });
        
        res.status(200).send({
            message:"Login successfully.",
            token:token
          });
    }).catch(err=>{
        res.status(500).send({
            message:
              err.message || "Some error occurred while retrieving tutorials."
          });
    });
}

module.exports = {
    socialLogin,
    customLogin
}