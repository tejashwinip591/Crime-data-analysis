# Crime Data Analysis Dashboard

A comprehensive web-based crime data analysis platform built with HTML, CSS, JavaScript frontend and Node.js backend. This dashboard provides real-time crime statistics, trends analysis, and geographic heatmaps.

## Features

✨ **Key Features:**
- **Real-time Crime Statistics** - Display total crimes, solved cases, and solve rates
- **Crime Trends Analysis** - Visualize crime trends from 2021-2024
- **Crime Type Distribution** - Interactive charts showing crime breakdown by type
- **City Search** - Search crime data by city using the FBI Crime Data API
- **Crime Heatmap** - Geographic visualization of crime intensity across major cities
- **Responsive Design** - Works seamlessly on desktop, tablet, and mobile devices
- **Interactive Charts** - Chart.js integration for beautiful data visualization

## Tech Stack

**Frontend:**
- HTML5
- CSS3 (with Flexbox & Grid)
- JavaScript (ES6+)
- Chart.js - Data visualization
- Axios - HTTP client

**Backend:**
- Node.js
- Express.js - Web framework
- Axios - API requests
- CORS - Cross-origin resource sharing
- Environment variables (.env)

## Project Structure

```
crimedata/
├── public/
│   ├── index.html           # Main HTML file
│   ├── styles.css           # Styling and responsive design
│   └── script.js            # Frontend JavaScript logic
├── server.js                # Express backend server
├── package.json             # Project dependencies
├── .env                     # Environment variables
└── README.md               # This file
```

## Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- npm (Node Package Manager)
- Git (optional)

### Step 1: Clone/Download the Project
```bash
cd c:\Users\svcio\Downloads\crimedata
```

### Step 2: Install Dependencies
```bash
npm install
```

This will install:
- express
- axios
- cors
- dotenv
- nodemon (dev dependency)

### Step 3: Start the Server
```bash
npm start
```

Or for development with auto-reload:
```bash
npm run dev
```

The server will start at: `http://localhost:5000`

### Step 4: Open in Browser
Navigate to: `http://localhost:5000`

## API Endpoints

### Base URL
```
http://localhost:5000/api
```

### Available Endpoints

#### 1. Health Check
```
GET /api/health
```
Returns: Server status and timestamp

#### 2. Crime Statistics
```
GET /api/crime/stats
```
Returns: Overall crime statistics including:
- Total crimes
- Crimes by type
- Solved cases
- Solve rate
- Trending direction

**Example Response:**
```json
{
  "success": true,
  "stats": {
    "totalCrimes": 12458,
    "crimesByType": {
      "theft": 5234,
      "assault": 3421,
      "robbery": 1256,
      "burglary": 1847,
      "homicide": 700
    },
    "solvedCases": 8765,
    "solveRate": 70.3,
    "trending": "downward"
  },
  "timestamp": "2024-11-29T12:00:00.000Z"
}
```

#### 3. Crime Trends
```
GET /api/crime/trends
```
Returns: Crime trends data from 2021-2024 by category

#### 4. Crime Heatmap
```
GET /api/crime/heatmap
```
Returns: Geographic crime intensity data with coordinates

#### 5. Search by City
```
GET /api/crime/city/:city
```
Parameters: `city` - City name
Returns: Crime data for the specified city (uses FBI Crime Data API)

**Example:**
```
GET /api/crime/city/newyork
```

#### 6. Search by Agency
```
GET /api/crime/agency/:agencyId
```
Parameters: `agencyId` - Agency ID
Returns: Crime data for specific agency

## Frontend Sections

### 1. Dashboard
- Overview statistics cards
- Crime type distribution (bar chart)
- Crime distribution (doughnut chart)
- Real-time metrics

### 2. Trends
- Line chart showing crime trends 2021-2024
- Multiple crime categories tracked over time
- Historical comparison

### 3. Search
- Search crime data by city name
- Display results from FBI Crime Data API
- Shows agency information and crime data

### 4. Heatmap
- Geographic crime intensity visualization
- Color-coded intensity levels (Low, Medium, High)
- Latitude and longitude coordinates
- Shows major US cities

## Environment Variables

Create a `.env` file in the root directory:

```env
PORT=5000
NODE_ENV=development
```

**Variables:**
- `PORT` - Server port (default: 5000)
- `NODE_ENV` - Environment mode (development/production)

## Data Sources

The application integrates with:
- **FBI Crime Data API** - Public crime statistics by agency and city
- **Simulated Data** - Local trend and heatmap data for demonstration

**API Used:**
```
https://api.crime-data.org/api/v1/agencies
```

## Usage Examples

### Example 1: View Dashboard Statistics
1. Open browser to `http://localhost:5000`
2. View the dashboard with current crime statistics
3. Check trending direction and solve rates

### Example 2: Search Crime Data by City
1. Click "Search" in navigation
2. Enter a city name (e.g., "New York", "Los Angeles")
3. View results with agency information

### Example 3: Analyze Trends
1. Click "Trends" in navigation
2. View multi-year crime trend analysis
3. Compare different crime types over time

### Example 4: View Crime Heatmap
1. Click "Heatmap" in navigation
2. See crime intensity in major cities
3. Color indicates intensity level

## Code Explanation

### Backend (server.js)

**Key Components:**

1. **Express Setup**
   ```javascript
   const app = express();
   app.use(cors());
   app.use(express.json());
   app.use(express.static('public'));
   ```

2. **API Routes**
   - All routes follow RESTful principles
   - Error handling with try-catch
   - CORS enabled for frontend communication

3. **Data Integration**
   - FBI Crime Data API integration
   - Simulated local data for trends
   - Cacheable responses

### Frontend (script.js)

**Key Functions:**

1. **loadDashboard()** - Fetches and displays statistics
2. **loadTrendsChart()** - Creates trend visualization
3. **searchCity()** - Searches crime data by city
4. **displayHeatmap()** - Shows geographic data
5. **Chart Management** - Creates and destroys charts as needed

### Styling (styles.css)

**Design Features:**
- Mobile-first responsive design
- CSS Grid for layouts
- Gradient backgrounds
- Smooth transitions and animations
- Color-coded crime data
- Professional color scheme

## Customization

### Change Color Scheme
Edit CSS variables in `styles.css`:
```css
:root {
    --primary-color: #2c3e50;
    --secondary-color: #e74c3c;
    --accent-color: #3498db;
}
```

### Add Custom Data
Modify the `/api/crime/stats` endpoint in `server.js` to connect to a real database:

```javascript
app.get('/api/crime/stats', async (req, res) => {
    // Replace with your database query
    const stats = await db.getCrimeStats();
    res.json({ success: true, stats });
});
```

### Connect Real Database
1. Install database driver (MongoDB, PostgreSQL, etc.)
2. Update server.js with connection logic
3. Replace simulated data with actual queries

## Troubleshooting

### Port Already in Use
```bash
# Change PORT in .env file or:
netstat -ano | findstr :5000  # Find process
taskkill /PID <PID> /F       # Kill process
```

### CORS Error
- Ensure backend is running on correct port
- Check frontend URL matches API_BASE_URL in script.js

### Charts Not Displaying
- Verify Chart.js CDN link is active
- Check browser console for JavaScript errors
- Ensure data is being fetched from API

### API Returns No Data
- Verify internet connection (for FBI API)
- Check city spelling in search
- Verify API endpoint is correct

## Performance Optimization

**Implemented:**
- Chart instance reuse
- Debounced API calls
- CSS animations
- Responsive images
- Minified dependencies

**Further Improvements:**
- Add caching middleware
- Implement pagination
- Use IndexedDB for offline support
- Add service workers for PWA

## Security Considerations

**Current Implementations:**
- CORS enabled only for development
- Environment variables for sensitive data
- Input validation on search

**Recommendations for Production:**
- Restrict CORS to specific origins
- Implement API rate limiting
- Add authentication layer
- Use HTTPS only
- Sanitize all user inputs
- Add helmet.js middleware

## Deployment

### Deploy to Heroku
```bash
heroku login
heroku create your-app-name
git push heroku main
```

### Deploy to Vercel (Frontend)
```bash
npm install -g vercel
vercel
```

### Deploy to AWS/DigitalOcean
- Set up Node.js environment
- Configure environment variables
- Use process manager (PM2)
- Set up reverse proxy (Nginx)

## Future Enhancements

- 📊 Advanced data analytics
- 🗺️ Interactive Google Maps integration
- 📱 Mobile app version
- 🔔 Real-time notifications
- 💾 User accounts and saved searches
- 📈 Predictive analytics using ML
- 🌍 International crime data
- 🎨 Dark mode theme
- 📊 Export to CSV/PDF
- 🔍 Advanced filtering options

## License

This project is open source and available for educational and commercial use.

## Support & Contributing

For issues, questions, or improvements:
1. Check existing issues
2. Create detailed bug reports
3. Submit pull requests with improvements
4. Follow code style guidelines

## Contact

Created as a demonstration project for crime data analysis.

---

**Last Updated:** November 29, 2024
**Version:** 1.0.0
