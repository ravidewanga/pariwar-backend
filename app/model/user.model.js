const Sequelize = require("sequelize");
module.exports = (sequelize) => {
    const User = sequelize.define("user", {
        name: {type: Sequelize.STRING},
        email: {type: Sequelize.STRING},
        password: {type: Sequelize.STRING},
        provider: {type: Sequelize.STRING},
        provider_pic: {type: Sequelize.STRING},
        access_token: {type: Sequelize.STRING},
        id_token: {type: Sequelize.STRING},
        createdAt: {type: Sequelize.DATE},
        updatedAt: {type: Sequelize.DATE},
        active: {type: Sequelize.BOOLEAN}
    });
    return User;
};