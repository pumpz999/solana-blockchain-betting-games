#!/bin/bash

# Kill processes using ports 3000-3010
for port in {3000..3010}; do
  pid=$(lsof -ti:$port)
  if [ ! -z "$pid" ]; then
    echo "Killing process on port $port"
    kill -9 $pid
  fi
done
