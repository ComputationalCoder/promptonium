#!/bin/bash
# 🚀 QUICK START GUIDE - Get the Prompt Engineering Trainer running in 5 minutes!

echo "🎯 Setting up Prompt Engineering Trainer Application"
echo "=================================================="

# Step 1: Create project directory
echo "📁 Creating project directory..."
mkdir prompt-engineering-trainer
cd prompt-engineering-trainer

# Step 2: Create the backend files
echo "🔧 Creating backend files..."

# Create requirements.txt
cat > requirements.txt << 'EOF'
fastapi==0.104.1
uvicorn==0.24.0
pydantic==2.5.0
python-multipart==0.0.6
PyJWT==2.8.0
sqlite3
sentence-transformers==2.2.2
scikit-learn==1.3.2
textstat==0.7.3
python-dotenv==1.0.0
EOF

# Create main.py (copy the complete FastAPI code from artifact #2)
cat > main.py << 'EOF'
# Copy the complete FastAPI backend code from the "Complete FastAPI Backend Engine" artifact
# This is the full main.py file that powers the application
EOF

# Create database setup script (copy from artifact #3)
cat > database_setup.py << 'EOF'
# Copy the complete database setup code from the "Complete Database Setup" artifact
# This creates all tables and sample data
EOF

# Create .env file for configuration
cat > .env << 'EOF'
# Environment Configuration
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
DEBUG=True
ENVIRONMENT=development

# Optional: Add AI API keys for real integrations
# OPENAI_API_KEY=your_openai_api_key_here
# ANTHROPIC_API_KEY=your_anthropic_api_key_here
# GOOGLE_API_KEY=your_google_api_key_here
EOF

# Step 3: Create frontend structure
echo "🎨 Creating frontend structure..."
mkdir frontend
cd frontend

# Create package.json
cat > package.json << 'EOF'
{
  "name": "prompt-trainer-frontend",
  "version": "1.0.0",
  "private": true,
  "dependencies": {
    "@testing-library/jest-dom": "^5.16.4",
    "@testing-library/react": "^13.3.0",
    "@testing-library/user-event": "^13.5.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-scripts": "5.0.1",
    "recharts": "^2.8.0",
    "lucide-react": "^0.263.1",
    "web-vitals": "^2.1.4"
  },
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  },
  "eslintConfig": {
    "extends": [
      "react-app",
      "react-app/jest"
    ]
  },
  "browserslist": {
    "production": [
      ">0.2%",
      "not dead",
      "not op_mini all"
    ],
    "development": [
      "last 1 chrome version",
      "last 1 firefox version",
      "last 1 safari version"
    ]
  },
  "proxy": "http://localhost:8000"
}
EOF

# Create src directory and App.js
mkdir -p src public
cat > src/index.js << 'EOF'
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
EOF

# Create src/App.js (copy the React frontend from artifact #1)
cat > src/App.js << 'EOF'
// Copy the complete React frontend code from the "Complete Frontend" artifact
// This is the full App.js that renders the entire application
EOF

# Create basic CSS
cat > src/index.css << 'EOF'
@tailwind base;
@tailwind components;
@tailwind utilities;

body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

code {
  font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
    monospace;
}
EOF

# Create public/index.html
cat > public/index.html << 'EOF'
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <link rel="icon" href="%PUBLIC_URL%/favicon.ico" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="theme-color" content="#000000" />
    <meta name="description" content="Prompt Engineering Trainer - Master the art of AI prompting" />
    <title>Prompt Engineering Trainer</title>
    <script src="https://cdn.tailwindcss.com"></script>
  </head>
  <body>
    <noscript>You need to enable JavaScript to run this app.</noscript>
    <div id="root"></div>
  </body>
</html>
EOF

cd .. # Back to root directory

# Step 4: Create startup scripts
echo "⚡ Creating startup scripts..."

# Create start script
cat > start.sh << 'EOF'
#!/bin/bash
echo "🚀 Starting Prompt Engineering Trainer Application"
echo "================================================="

# Check if Python virtual environment exists
if [ ! -d "venv" ]; then
    echo "📦 Creating Python virtual environment..."
    python3 -m venv venv
fi

# Activate virtual environment
echo "🐍 Activating Python virtual environment..."
source venv/bin/activate

# Install Python dependencies
echo "📚 Installing Python dependencies..."
pip install -r requirements.txt

# Setup database with sample data
echo "🗄️ Setting up database..."
python database_setup.py

# Start backend in background
echo "🔧 Starting FastAPI backend..."
uvicorn main:app --reload --host 0.0.0.0 --port 8000 &
BACKEND_PID=$!

# Wait a moment for backend to start
sleep 3

# Check if frontend directory exists and has package.json
if [ -f "frontend/package.json" ]; then
    echo "🎨 Starting React frontend..."
    cd frontend
    
    # Install frontend dependencies if needed
    if [ ! -d "node_modules" ]; then
        echo "📦 Installing Node.js dependencies..."
        npm install
    fi
    
    # Start frontend
    npm start &
    FRONTEND_PID=$!
    cd ..
else
    echo "⚠️ Frontend not found. You can still use the API at http://localhost:8000/docs"
fi

echo ""
echo "🎉 Application Started Successfully!"
echo "=================================="
echo "🌐 Frontend:        http://localhost:3000"
echo "🔧 Backend API:     http://localhost:8000"
echo "📚 API Docs:        http://localhost:8000/docs"
echo "🔍 Health Check:    http://localhost:8000/api/health"
echo ""
echo "🔑 Demo Login:"
echo "Username: demo_user"
echo "Password: password123"
echo ""
echo "Press Ctrl+C to stop all services"

# Keep script running
wait
EOF

chmod +x start.sh

# Create stop script
cat > stop.sh << 'EOF'
#!/bin/bash
echo "🛑 Stopping Prompt Engineering Trainer Application..."

# Kill any running uvicorn processes
pkill -f "uvicorn main:app"

# Kill any running npm processes
pkill -f "npm start"

echo "✅ All services stopped"
EOF

chmod +x stop.sh

# Create development setup script
cat > setup-dev.sh << 'EOF'
#!/bin/bash
echo "🛠️ Setting up Development Environment"
echo "===================================="

# Install Python dependencies
echo "📚 Installing Python dependencies..."
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt

# Setup database
echo "🗄️ Initializing database with sample data..."
python database_setup.py

# Install frontend dependencies
if [ -d "frontend" ]; then
    echo "📦 Installing frontend dependencies..."
    cd frontend
    npm install
    cd ..
fi

echo ""
echo "✅ Development environment ready!"
echo "Run ./start.sh to start the application"
EOF

chmod +x setup-dev.sh

# Final instructions
echo ""
echo "🎉 PROJECT SETUP COMPLETE!"
echo "=========================="
echo ""
echo "📋 What was created:"
echo "   📁 Complete project structure"
echo "   🐍 Python FastAPI backend"
echo "   ⚛️ React frontend application"
echo "   🗄️ SQLite database with sample data"
echo "   🚀 Startup and management scripts"
echo ""
echo "🚀 NEXT STEPS:"
echo "1. Copy the code from the artifacts into the respective files:"
echo "   - Copy 'Complete FastAPI Backend Engine' → main.py"
echo "   - Copy 'Complete Database Setup' → database_setup.py"
echo "   - Copy 'Complete Frontend' → frontend/src/App.js"
echo ""
echo "2. Run the setup:"
echo "   ./setup-dev.sh"
echo ""
echo "3. Start the application:"
echo "   ./start.sh"
echo ""
echo "4. Open your browser:"
echo "   http://localhost:3000"
echo ""
echo "5. Login with demo credentials:"
echo "   Username: demo_user"
echo "   Password: password123"
echo ""
echo "🎯 Your Prompt Engineering Trainer is ready!"
EOF
