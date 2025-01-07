const Story = require('./Story');
const Chapter = require('./Chapter');

Story.hasMany(Chapter, {
    foreignKey: 'storyId',
    as: 'chapters',
    onDelete: 'CASCADE',
    hooks: true,
});
Chapter.belongsTo(Story, {
    foreignKey: 'storyId',
    as: 'story',
});

module.exports = { Story, Chapter };
