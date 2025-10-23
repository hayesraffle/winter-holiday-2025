const express = require('express');
const fs = require('fs').promises;
const path = require('path');
const app = express();

// Middleware
app.use(express.json());
app.use(express.static('.'));

// File to store votes
const VOTES_FILE = path.join(__dirname, 'votes.json');

// Initialize votes file if it doesn't exist
async function initVotes() {
    try {
        await fs.access(VOTES_FILE);
    } catch {
        await fs.writeFile(VOTES_FILE, JSON.stringify([]));
    }
}

// Get all votes
app.get('/api/votes', async (req, res) => {
    try {
        const data = await fs.readFile(VOTES_FILE, 'utf8');
        const votes = JSON.parse(data);
        res.json(votes);
    } catch (error) {
        console.error('Error reading votes:', error);
        res.status(500).json({ error: 'Failed to read votes' });
    }
});

// Submit a vote
app.post('/api/votes', async (req, res) => {
    try {
        const { name, destination, notes } = req.body;

        if (!name || !destination) {
            return res.status(400).json({ error: 'Name and destination are required' });
        }

        const data = await fs.readFile(VOTES_FILE, 'utf8');
        const votes = JSON.parse(data);

        // Check if user already voted
        const existingVoteIndex = votes.findIndex(v => v.name.toLowerCase() === name.toLowerCase());

        const newVote = {
            name,
            destination,
            notes: notes || '',
            timestamp: new Date().toISOString()
        };

        if (existingVoteIndex >= 0) {
            // Update existing vote
            votes[existingVoteIndex] = newVote;
        } else {
            // Add new vote
            votes.push(newVote);
        }

        await fs.writeFile(VOTES_FILE, JSON.stringify(votes, null, 2));
        res.json({ success: true, votes });
    } catch (error) {
        console.error('Error saving vote:', error);
        res.status(500).json({ error: 'Failed to save vote' });
    }
});

// Get vote summary
app.get('/api/votes/summary', async (req, res) => {
    try {
        const data = await fs.readFile(VOTES_FILE, 'utf8');
        const votes = JSON.parse(data);

        const summary = votes.reduce((acc, vote) => {
            acc[vote.destination] = (acc[vote.destination] || 0) + 1;
            return acc;
        }, {});

        res.json({
            total: votes.length,
            breakdown: summary,
            votes: votes
        });
    } catch (error) {
        console.error('Error reading votes:', error);
        res.status(500).json({ error: 'Failed to read votes' });
    }
});

// Delete a vote
app.delete('/api/votes/:name', async (req, res) => {
    try {
        const { name } = req.params;
        const data = await fs.readFile(VOTES_FILE, 'utf8');
        const votes = JSON.parse(data);

        const initialLength = votes.length;
        const updatedVotes = votes.filter(v => v.name.toLowerCase() !== decodeURIComponent(name).toLowerCase());

        if (updatedVotes.length === initialLength) {
            return res.status(404).json({ error: 'Vote not found' });
        }

        await fs.writeFile(VOTES_FILE, JSON.stringify(updatedVotes, null, 2));
        res.json({ success: true });
    } catch (error) {
        console.error('Error deleting vote:', error);
        res.status(500).json({ error: 'Failed to delete vote' });
    }
});

const PORT = process.env.PORT || 3000;

initVotes().then(() => {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
        console.log(`Visit http://localhost:${PORT}`);
    });
});
