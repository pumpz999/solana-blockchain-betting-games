#!/bin/bash

# Function to kill processes using a specific port
kill_port() {
    local port=$1
    echo "Checking port $port..."
    
    # Find and kill processes using the port
    local pids=$(lsof -ti:$port)
    if [ ! -z "$pids" ]; then
        echo "Killing processes on port $port:"
        for pid in $pids; do
            echo "Killing PID $pid"
            kill -9 $pid
        done
    fi
}

# Ports to check and kill
PORTS=(3000 3001 3002 3003)

# Kill processes on multiple ports
for port in "${PORTS[@]}"; do
    kill_port $port
done

# Optional: Wait a moment to ensure ports are freed
sleep 2

echo "Port cleanup complete."
