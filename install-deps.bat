@echo off
echo Installing dependencies...
call npm install
echo.
echo Dependencies installed successfully!
echo.
echo You can now run the following commands:
echo   npm run dev     - Start development server
echo   npm run build   - Build for production
echo   npm run lint    - Run ESLint
echo   npm run format  - Format code with Prettier
pause