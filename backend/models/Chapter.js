const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Chapter = sequelize.define('Chapter', {
    storyId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'stories',
            key: 'id',
        },
    },
    chapterTitle: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    chapterContent: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
}, {
    timestamps: true,
});

module.exports = Chapter;
