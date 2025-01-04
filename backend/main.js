const express = require('express');
const cors = require('cors');
const sequelize = require('./config/database');
const Story = require("./models/Story");
const Chapter = require("./models/Chapter");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

sequelize.authenticate()
    .then(() => console.log('Connected to Database'))
    .catch(err => console.log('Unable to connect: ', err));

sequelize.sync({alter: true})
    .then(() => console.log('Database synced'))
    .catch((err) => console.log('Unable to synced: ', err));

app.get('/api/stories', async(req, res) => {
    try {
        const stories = await Story.findAll();
        res.status(200).json(stories.map(story => ({
            ...story.toJSON(),
            tags: story.tags.split(','),
        })));
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/api/stories/:storyid', async (req, res) => {
    try {
        const story = await Story.findByPk(req.params.storyid);
        if (!story) {
            return res.status(404).json({ error: 'Story not found' });
        }
        res.json({
            ...story.toJSON(),
            tags: story.tags.split(','),
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post('/api/stories', async (req, res) => {
    try {
        const { title, author, category, tags, status } = req.body;
        const newStory = await Story.create({
            title,
            author,
            category,
            tags: tags.join(','),
            status,
        });
        res.status(201).json(newStory);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

app.put('/api/stories/:storyid', async (req, res) => {
    try {
        const story = await Story.findByPk(req.params.storyid);
        if (!story) {
            return res.status(404).json({ error: 'Story not found' });
        }
        const { title, author, category, tags, status } = req.body;
        story.title = title;
        story.author = author;
        story.category = category;
        story.tags = tags.join(',');
        story.status = status;
        await story.save();
        res.json(story);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

app.delete('/api/stories/:storyid', async (req, res) => {
    try {
        const story = await Story.findByPk(req.params.storyid);
        if (!story) {
            return res.status(404).json({ error: 'Story not found' });
        }
        await story.destroy();
        res.json({ message: 'Story deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

//-----------------------------------------------------------------------------------------------------------//

app.get('/api/stories/:storyid/chapter', async (req, res) => {
    try {
        const storyId = req.params.storyid;

        const chapter = await Chapter.findAll({
            where: {storyId}
        });

        res.status(200).json(chapter);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
});

app.get('/api/chapter/:chapterid', async(req, res) => {
    try {
        const chapter = await Chapter.findByPk(req.params.chapterid);
        if(!chapter) {
            return res.status(404).json({error: 'Chapter not found'});
        }
        res.status(200).json(chapter)
    } catch (error) {
        res.status(500).json({error: error.message});
    }
});

app.post('/api/stories/:chapterid/chapter', async (req, res) => {
    try {
        const id = req.params.chapterid;
        const { chapterTitle, chapterContent } = req.body;

        const chapter = await Chapter.create({
            storyId: id,
            chapterTitle: chapterTitle,
            chapterContent: chapterContent,
        });

        res.status(201).json({chapter})
    } catch (error) {
        res.status(500).json({error: error.message})
    }
});

app.put('/api/chapter/:chapterid', async (req, res) => {
    try {
        const chapterId = req.params.chapterid;
        const { newChapterTitle, newChapterContent } = req.body;

        const chapter = await Chapter.findByPk(chapterId);
        if (!chapter) {
            return res.status(404).json({ error: 'Chapter not found' });
        }

        chapter.chapterTitle = newChapterTitle;
        chapter.chapterContent = newChapterContent;
        await chapter.save();

        res.status(200).json(chapter);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});


app.delete('/api/chapter/:chapterid', async (req, res) => {
    try {
        const chapterId = req.params.chapterid;

        const chapter = await Chapter.findByPk(chapterId);
        if (!chapter) {
            return res.status(404).json({ error: 'Chapter not found' });
        }

        await chapter.destroy();
        res.status(200).json({ message: 'Chapter deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
