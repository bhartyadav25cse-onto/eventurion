@echo off
title Push Eventurion to GitHub
echo ============================================================
echo   Pushing Eventurion to GitHub (bhartyadav25cse-onto/eventurion)
echo ============================================================
echo.
cd /d "%~dp0"
git push -u origin main --force
echo.
if %ERRORLEVEL% EQU 0 (
    echo ============================================================
    echo   SUCCESS! Pushed to https://github.com/bhartyadav25cse-onto/eventurion
    echo ============================================================
) else (
    echo.
    echo If prompted, sign in via browser or enter your GitHub Personal Access Token.
)
pause
