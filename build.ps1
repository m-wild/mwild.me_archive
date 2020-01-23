if (-not (Test-Path "node_modules")) {
    Write-Output "Installing dependencies"
    npm install
}

node index.js $args
