@echo off
title Eventurion - Interactive Historical Atlas of India
echo ============================================================
echo   EVENTURION - Interactive Historical Atlas of India
echo ============================================================
echo.
echo Starting local web server on port 8080...
echo Opening http://localhost:8080 in your default browser...
start http://localhost:8080
echo.
echo Press Ctrl+C in this window to stop the server when done.
echo ============================================================
echo.
python -m http.server 8080
pause
