@echo off
REM Crime Data Analysis Dashboard - Quick Commands
REM Run these commands from the project directory

ECHO.
ECHO Crime Data Analysis Dashboard - Commands
ECHO =========================================
ECHO.

REM Show menu
:MENU
ECHO.
ECHO Select an option:
ECHO 1. Install dependencies
ECHO 2. Start server (npm start)
ECHO 3. Start with auto-reload (npm run dev)
ECHO 4. View dashboard in browser
ECHO 5. View package.json
ECHO 6. View README.md
ECHO 7. View QUICKSTART.md
ECHO 8. Check Node version
ECHO 9. Exit
ECHO.
SET /P CHOICE="Enter your choice (1-9): "

IF "%CHOICE%"=="1" GOTO INSTALL
IF "%CHOICE%"=="2" GOTO START
IF "%CHOICE%"=="3" GOTO DEV
IF "%CHOICE%"=="4" GOTO BROWSER
IF "%CHOICE%"=="5" GOTO PACKAGE
IF "%CHOICE%"=="6" GOTO README
IF "%CHOICE%"=="7" GOTO QUICKSTART
IF "%CHOICE%"=="8" GOTO VERSION
IF "%CHOICE%"=="9" GOTO END
ECHO Invalid choice. Please try again.
GOTO MENU

:INSTALL
ECHO Installing dependencies...
npm install
PAUSE
GOTO MENU

:START
ECHO Starting server...
ECHO Server will run on http://localhost:5000
ECHO Press CTRL+C to stop the server
npm start
PAUSE
GOTO MENU

:DEV
ECHO Starting server with auto-reload...
ECHO Make sure nodemon is installed (npm install -g nodemon)
ECHO Server will run on http://localhost:5000
ECHO Press CTRL+C to stop the server
npm run dev
PAUSE
GOTO MENU

:BROWSER
ECHO Opening dashboard in browser...
START http://localhost:5000
ECHO.
ECHO If the page didn't open, manually visit: http://localhost:5000
ECHO Make sure the server is running first!
PAUSE
GOTO MENU

:PACKAGE
ECHO.
ECHO Opening package.json...
START notepad package.json
PAUSE
GOTO MENU

:README
ECHO.
ECHO Opening README.md...
START notepad README.md
PAUSE
GOTO MENU

:QUICKSTART
ECHO.
ECHO Opening QUICKSTART.md...
START notepad QUICKSTART.md
PAUSE
GOTO MENU

:VERSION
ECHO.
ECHO Checking Node.js version...
node --version
ECHO.
ECHO Checking npm version...
npm --version
ECHO.
PAUSE
GOTO MENU

:END
ECHO.
ECHO Goodbye!
ECHO.
PAUSE
