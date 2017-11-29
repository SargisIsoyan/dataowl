/**
 * Created by sargis.isoyan on 22/11/2017.
 */

module.exports = function(sequelize, DataTypes) {
    let messages = sequelize.define("messages", {
        name: {type: DataTypes.STRING(50), allowNull: false},
        email: {type: DataTypes.STRING(50), allowNull: false},
        date:{type: DataTypes.DATE(50), allowNull: false},
        text:{type: DataTypes.TEXT("medium")}
    },{
        timestamps: false
    });
    return messages;
};