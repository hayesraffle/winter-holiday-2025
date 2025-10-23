# Winter Break 2025 Family Vacation Planner

Interactive website for planning a family vacation with real-time voting functionality.

## Features

- **4 Destination Options**: Baja California, Southwest USA, Oaxaca, Tulum
- **Horizontal Carousels**: Day-by-day itinerary previews with images
- **Real-time Voting**: Family members can vote and see results instantly
- **Vote Persistence**: All votes saved to server
- **Clean Minimal Design**: White backgrounds, no borders, simple UI

## Local Development

```bash
# Install dependencies
npm install

# Run the server
npm start

# Or use nodemon for development
npm run dev
```

Visit http://localhost:3000

## Deploy to Railway

### Prerequisites
- Railway account (https://railway.app/)
- Git repository

### Deployment Steps

1. **Initialize Git (if not already done)**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   ```

2. **Deploy to Railway**
   ```bash
   # Install Railway CLI
   npm install -g @railway/cli

   # Login
   railway login

   # Create new project
   railway init

   # Deploy
   railway up
   ```

3. **Alternative: Deploy via GitHub**
   - Push your code to GitHub
   - Go to https://railway.app/new
   - Click "Deploy from GitHub repo"
   - Select your repository
   - Railway will auto-detect Node.js and deploy

## API Endpoints

- `GET /api/votes` - Get all votes
- `POST /api/votes` - Submit a vote (requires `name`, `destination`, optional `notes`)
- `GET /api/votes/summary` - Get vote summary with breakdown

## Vote Data Structure

```json
{
  "name": "John",
  "destination": "Baja California",
  "notes": "Excited about whale sharks!",
  "timestamp": "2025-01-15T10:30:00.000Z"
}
```

## File Structure

```
.
├── index.html          # Main website
├── server.js           # Express backend
├── package.json        # Dependencies
├── railway.json        # Railway configuration
├── votes.json          # Vote storage (auto-created)
└── README.md          # This file
```

## Environment Variables

No environment variables required for basic setup. The server uses:
- `PORT` (default: 3000)

## Tech Stack

- **Frontend**: Vanilla HTML/CSS/JavaScript
- **Backend**: Node.js + Express
- **Hosting**: Railway
- **Database**: JSON file storage (simple, no database needed)
