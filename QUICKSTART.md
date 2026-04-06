# Quick Start Guide - Crime Data Analysis Dashboard

## 🚀 Get Started in 3 Minutes

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Start the Server
```bash
npm start
```

You should see:
```
Crime Data Analysis Server running on http://localhost:5000
API endpoints:
  GET /api/health - Health check
  GET /api/crime/stats - Crime statistics
  GET /api/crime/trends - Crime trends
  GET /api/crime/heatmap - Crime heatmap data
  GET /api/crime/city/:city - Crime data by city
  GET /api/crime/agency/:agencyId - Crime data by agency
```

### Step 3: Open in Browser
Visit: `http://localhost:5000`

---

## 📊 Dashboard Features

### Dashboard Tab
- View total crimes, solved cases, and solve rates
- Interactive bar chart of crimes by type
- Doughnut chart showing crime distribution

### Trends Tab
- Line chart showing crime trends from 2021-2024
- Track multiple crime categories over time
- Analyze historical patterns

### Search Tab
- Search crime data by city name
- Get real data from FBI Crime Data API
- View agency information and statistics

### Heatmap Tab
- See crime intensity across major US cities
- Color-coded by intensity (Low, Medium, High)
- Geographic coordinates displayed

---

## 🔗 API Examples

### Test in Browser or Postman

**Health Check:**
```
http://localhost:5000/api/health
```

**Crime Statistics:**
```
http://localhost:5000/api/crime/stats
```

**Crime Trends:**
```
http://localhost:5000/api/crime/trends
```

**Crime Heatmap:**
```
http://localhost:5000/api/crime/heatmap
```

**Search City (e.g., New York):**
```
http://localhost:5000/api/crime/city/newyork
```

---

## 🛠️ Development Mode

For automatic reload on file changes:
```bash
npm run dev
```
(Requires nodemon: installed via `npm install`)

---

## 🐛 Troubleshooting

**Q: Port 5000 already in use?**
- Change PORT in `.env` file
- Or kill the process: `taskkill /PID <pid> /F`

**Q: CORS errors in browser console?**
- Ensure server is running on localhost:5000
- Check frontend URL in script.js (API_BASE_URL)

**Q: Charts not showing?**
- Refresh the page
- Check browser console for errors
- Verify internet connection (for CDN links)

**Q: Search returns no results?**
- Check city spelling
- Try a major city: New York, Los Angeles, Chicago
- FBI API might need time to respond

---

## 📁 File Structure

```
crimedata/
├── public/
│   ├── index.html       ← Main page
│   ├── styles.css       ← Styling
│   └── script.js        ← Frontend logic
├── server.js            ← Backend API
├── package.json         ← Dependencies
├── .env                 ← Configuration
├── .gitignore          ← Git ignore rules
├── README.md           ← Full documentation
└── QUICKSTART.md       ← This file
```

---

## 🎨 Customization

### Change Server Port
Edit `.env`:
```env
PORT=8080
```

### Change API Base URL
Edit `public/script.js`:
```javascript
const API_BASE_URL = 'http://localhost:8080/api';
```

### Add More Crime Types
Edit `server.js` in the `/api/crime/stats` route:
```javascript
crimesByType: {
    theft: 5234,
    assault: 3421,
    // Add more here
}
```

---

## 📚 Next Steps

1. **Explore the Dashboard** - Click through all tabs
2. **Test the Search** - Try searching for different cities
3. **Check the API** - Open API endpoints in browser
4. **Modify Data** - Edit stats in server.js
5. **Add Database** - Connect MongoDB/PostgreSQL
6. **Deploy** - Push to Heroku or AWS

---

## 🌐 Integrations

Currently integrated with:
- **FBI Crime Data API** - Public crime statistics
- **Chart.js** - Data visualization
- **Axios** - HTTP requests

### To Add More Data Sources:
1. Get API key from data provider
2. Add endpoint to server.js
3. Call it from script.js
4. Display data in dashboard

---

## 💡 Tips

- Use browser DevTools (F12) to debug
- Check console tab for errors
- Use Network tab to see API calls
- Test APIs with Postman for easier debugging
- Keep .env file secure (don't commit to git)

---

## ✅ You're All Set!

Your Crime Data Analysis Dashboard is ready to use. 
Start exploring crime statistics and trends! 🎉

For detailed documentation, see **README.md**
