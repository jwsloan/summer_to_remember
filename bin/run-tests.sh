#!/bin/bash

# Port and path config
PORT=8000
TEST_PAGE="http://localhost:$PORT/tests/unit/index.html"

# Function to check if server is running
is_server_running() {
  lsof -i :$PORT | grep LISTEN > /dev/null
}

# Start server if not running
if is_server_running; then
  echo "Server already running on port $PORT."
else
  echo "Starting server on port $PORT with npx serve..."
  (cd "$(dirname "$0")/.." && npx serve -l $PORT . &) 
  sleep 2
fi

# Open the test runner in the default browser
if which xdg-open > /dev/null; then
  xdg-open "$TEST_PAGE"
elif which open > /dev/null; then
  open "$TEST_PAGE"
else
  echo "Please open $TEST_PAGE in your browser."
fi 