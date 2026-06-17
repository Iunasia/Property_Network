const {DataTypes} = require('sequelize')
const sequelize = require('../config/database')

const Notification = sequelize.define('Notification', {
    notif_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    type: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    message: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    is_read: {
        type: DataTypes.BOOLEAN,
        defauultValue: false,
    },
    buyer_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    
}, {
    tableName: 'Notifications',
    timestamps: true,
}
)

module.exports = Notification