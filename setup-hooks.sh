#!/bin/bash

echo "🔧 Setting up git hooks for Summer to Remember..."

# Check if we're in a git repository
if [ ! -d ".git" ]; then
    echo "❌ Error: Not in a git repository"
    exit 1
fi

# Install dependencies if not already installed
if [ ! -d "node_modules/@playwright" ]; then
    echo "📦 Installing dependencies..."
    npm install
fi

echo "🎭 Installing Playwright browsers..."
npx playwright install --with-deps chromium

# Backup existing pre-commit hook if it exists
if [ -f ".git/hooks/pre-commit" ]; then
    cp .git/hooks/pre-commit .git/hooks/pre-commit.backup 2>/dev/null || true
fi

# Make sure pre-commit hook is executable
chmod +x .git/hooks/pre-commit

echo "✅ Git hooks setup complete!"
echo ""
echo "The pre-commit hook will now run:"
echo "  📦 npm run build"
echo "  🔍 npm run test:html"  
echo "  🧭 npm run test:nav"
echo ""
echo "To test manually:"
echo "  npm run test        # Build + HTML validation"
echo "  npm run test:nav    # Navigation tests (requires dev server)"