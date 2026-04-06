╔════════════════════════════════════════════════════════════════════════════════╗
║                 CRIME DATA ANALYSIS DASHBOARD - SETUP GUIDE                    ║
╚════════════════════════════════════════════════════════════════════════════════╝

🚀 QUICK START (3 STEPS)
════════════════════════════════════════════════════════════════════════════════

STEP 1: Open PowerShell or Command Prompt
────────────────────────────────────────────────────────────────────────────────
   - Press Windows + R
   - Type "cmd" or "powershell"
   - Press Enter

STEP 2: Navigate to Project Directory
────────────────────────────────────────────────────────────────────────────────
   cd c:\Users\svcio\Downloads\crimedata

STEP 3: Run Installation and Start
────────────────────────────────────────────────────────────────────────────────
   npm install
   npm start

✅ Open browser: http://localhost:5000

════════════════════════════════════════════════════════════════════════════════

📋 DETAILED SETUP INSTRUCTIONS
════════════════════════════════════════════════════════════════════════════════

Prerequisites Check:
─────────────────────────────────────────────────────────────────────────────
✓ Node.js installed? Check: node --version
✓ npm installed?     Check: npm --version
✓ Git installed?     Optional (for version control)

If Node.js not installed:
→ Download from https://nodejs.org/ (LTS version)
→ Run installer with default options

Installation Steps:
─────────────────────────────────────────────────────────────────────────────
1. Open Terminal/PowerShell in project directory
2. Install all dependencies:
   
   npm install
   
   This installs:
   - express (web framework)
   - axios (HTTP client)
   - cors (cross-origin support)
   - dotenv (configuration)
   - nodemon (auto-reload for development)

3. Verify installation:
   
   npm list

Starting the Server:
─────────────────────────────────────────────────────────────────────────────
Production Mode:
   npm start
   
Development Mode (auto-reload on file changes):
   npm run dev

Expected Output:
   Crime Data Analysis Server running on http://localhost:5000
   API endpoints:
     GET /api/health - Health check
     GET /api/crime/stats - Crime statistics
     GET /api/crime/trends - Crime trends
     ...

Access Dashboard:
─────────────────────────────────────────────────────────────────────────────
Open your browser and navigate to:
   
   http://localhost:5000

You should see:
   ✓ Header with "Crime Data Analysis Dashboard"
   ✓ Navigation menu (Dashboard, Trends, Search, Heatmap)
   ✓ Crime statistics cards
   ✓ Interactive charts

════════════════════════════════════════════════════════════════════════════════

🔧 TROUBLESHOOTING
════════════════════════════════════════════════════════════════════════════════

Problem: "npm: command not found"
Solution: 
   - Node.js not installed or PATH not set
   - Restart terminal after installing Node.js
   - Reinstall Node.js if issue persists

Problem: "Port 5000 already in use"
Solution:
   Option A: Change port in .env file
            Change "PORT=5000" to "PORT=8000"
   
   Option B: Find and stop process using port 5000
            netstat -ano | findstr :5000
            taskkill /PID <pid_number> /F

Problem: "CORS error in browser console"
Solution:
   - Ensure backend is running
   - Check API_BASE_URL in public/script.js matches your server
   - Default should be: http://localhost:5000/api

Problem: "Charts not displaying"
Solution:
   - Refresh the page (Ctrl+R or Cmd+R)
   - Check browser console for JavaScript errors
   - Verify internet connection (for CDN links)
   - Try a different browser

Problem: "Axios 404 errors"
Solution:
   - Verify server is running: npm start
   - Check backend API endpoints in server.js
   - Verify API_BASE_URL in script.js is correct

Problem: "Cannot find module 'express'"
Solution:
   - Run: npm install
   - Make sure you're in the correct directory
   - Check node_modules folder exists

════════════════════════════════════════════════════════════════════════════════

📁 PROJECT STRUCTURE
════════════════════════════════════════════════════════════════════════════════

crimedata/
├── 📄 server.js               ← Backend API
├── 📄 package.json            ← Dependencies
├── 📄 .env                    ← Configuration
├── 📁 public/
│   ├── 📄 index.html          ← Main page
│   ├── 📄 styles.css          ← Styling
│   └── 📄 script.js           ← Frontend logic
├── 📄 README.md               ← Full documentation
├── 📄 QUICKSTART.md           ← Quick guide
├── 📄 PROJECT_SUMMARY.md      ← Project overview
├── 📄 API_SETUP_GUIDE.js      ← Database setup
├── 📄 SAMPLE_DATA.js          ← Test data
├── 📄 run.bat                 ← Quick command menu
└── 📄 .gitignore              ← Git ignore rules

════════════════════════════════════════════════════════════════════════════════

🌐 API ENDPOINTS (for testing)
════════════════════════════════════════════════════════════════════════════════

Open these in your browser to test:

1. Health Check
   http://localhost:5000/api/health

2. Crime Statistics
   http://localhost:5000/api/crime/stats

3. Crime Trends
   http://localhost:5000/api/crime/trends

4. Crime Heatmap
   http://localhost:5000/api/crime/heatmap

5. Search by City
   http://localhost:5000/api/crime/city/newyork

6. Search by Agency
   http://localhost:5000/api/crime/agency/example-agency

════════════════════════════════════════════════════════════════════════════════

💻 USEFUL COMMANDS
════════════════════════════════════════════════════════════════════════════════

npm install              Install all dependencies
npm start               Start production server
npm run dev             Start with auto-reload
node --version          Check Node.js version
npm --version           Check npm version
npm list                Show installed packages
npm update              Update all packages
npm outdated            Show outdated packages
npm uninstall <pkg>     Remove a package
npm cache clean --force Clear npm cache
netstat -ano | findstr :5000  Find process on port 5000
taskkill /PID <pid> /F Kill a process

════════════════════════════════════════════════════════════════════════════════

🚀 NEXT STEPS AFTER INSTALLATION
════════════════════════════════════════════════════════════════════════════════

1. ✓ Verify Server is Running
   → Check terminal shows: "Server running on http://localhost:5000"

2. ✓ Open Dashboard
   → Navigate to http://localhost:5000 in browser

3. ✓ Explore Features
   → Click "Dashboard" → View statistics
   → Click "Trends" → View trend charts
   → Click "Search" → Try searching for a city
   → Click "Heatmap" → See crime intensity map

4. ✓ Check Console (Optional)
   → Press F12 in browser
   → Go to Console tab
   → Should see no errors

5. ✓ Customize (Optional)
   → Edit colors in public/styles.css
   → Change data in server.js
   → Add more crime types to the data

6. ✓ Deploy (Advanced)
   → See README.md for deployment options
   → Heroku, AWS, DigitalOcean, etc.

════════════════════════════════════════════════════════════════════════════════

📚 DOCUMENTATION FILES
════════════════════════════════════════════════════════════════════════════════

README.md               - Complete documentation (40+ sections)
QUICKSTART.md          - 3-minute quick start guide
PROJECT_SUMMARY.md     - Project overview and statistics
API_SETUP_GUIDE.js     - Database integration examples
SAMPLE_DATA.js         - Test data for development
SETUP.md               - This file

════════════════════════════════════════════════════════════════════════════════

🎯 TESTING THE APPLICATION
════════════════════════════════════════════════════════════════════════════════

Dashboard Testing:
   1. Load http://localhost:5000
   2. Check KPI cards display numbers
   3. Check charts render correctly
   4. Check responsive design on mobile

Trends Testing:
   1. Click "Trends" tab
   2. Verify line chart displays
   3. Check multiple crime types shown
   4. Verify years 2021-2024 on x-axis

Search Testing:
   1. Click "Search" tab
   2. Enter "newyork" (or other city)
   3. Click Search button
   4. Verify results appear

Heatmap Testing:
   1. Click "Heatmap" tab
   2. Verify cities display with intensity
   3. Check colors (red=high, orange=medium, yellow=low)
   4. Verify coordinates shown

════════════════════════════════════════════════════════════════════════════════

❓ FREQUENTLY ASKED QUESTIONS
════════════════════════════════════════════════════════════════════════════════

Q: Do I need internet connection?
A: For the FBI Crime Data API integration, yes. Charts work offline after loading.

Q: Can I run on a different port?
A: Yes, change PORT in .env file (e.g., PORT=8080)

Q: How do I stop the server?
A: Press Ctrl+C in the terminal

Q: Can I use this in production?
A: Yes! See README.md section "Deployment"

Q: How do I customize the data?
A: Edit server.js and update the crime statistics
   See API_SETUP_GUIDE.js for database integration

Q: Is there a mobile version?
A: The responsive design works on mobile/tablet
   Native app possible with React Native/Flutter

Q: Can I change the colors?
A: Yes! Edit public/styles.css and change CSS variables
   :root section at the top

Q: How do I add more charts?
A: Add canvas in public/index.html
   Create function in public/script.js
   Use Chart.js library

════════════════════════════════════════════════════════════════════════════════

✅ SUCCESS INDICATORS
════════════════════════════════════════════════════════════════════════════════

Your setup is successful when:
   ✓ npm install completes without errors
   ✓ npm start shows "Server running on http://localhost:5000"
   ✓ Browser loads http://localhost:5000 successfully
   ✓ Dashboard displays crime statistics
   ✓ Charts render with data
   ✓ No errors in browser console (F12)
   ✓ Navigation tabs are clickable
   ✓ Search returns results for cities

════════════════════════════════════════════════════════════════════════════════

🎉 CONGRATULATIONS!

You now have a complete crime data analysis dashboard set up and running!

Next: Explore the features and customize as needed.

For more information, see:
   - README.md (full documentation)
   - QUICKSTART.md (quick guide)
   - PROJECT_SUMMARY.md (project overview)

════════════════════════════════════════════════════════════════════════════════

Happy coding! 🚀

Last Updated: November 29, 2024
Version: 1.0.0
