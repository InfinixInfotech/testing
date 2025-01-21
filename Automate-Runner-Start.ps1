# Define the Actions Runner Directory
$runnerDirectory = "C:\actions-runner"

# Check if the runner directory exists
if (!(Test-Path $runnerDirectory)) {
    Write-Host "Runner directory does not exist. Please install the runner first."
    exit 1
}

# Change to the runner directory
cd $runnerDirectory

# Check if the runner is configured
if (!(Test-Path ".\config.cmd")) {
    Write-Host "Runner not configured. Configuring the runner..."
    try {
        .\config.cmd --url https://github.com/InfinixInfotech/testing --token $env:GH_TOKEN
    } catch {
        Write-Host "Failed to configure the runner. Please check the token and URL."
        exit 1
    }
}

# Start the runner if not running
if (!(Test-Path ".\run.cmd")) {
    Write-Host "Run command not found. Please check the runner installation."
    exit 1
}

Write-Host "Runner is not running. Starting runner..."
Start-Process -FilePath ".\run.cmd" -NoNewWindow -Wait

# Install and start the runner as a service
if (Test-Path ".\svc.sh") {
    Write-Host "Installing the runner as a service..."
    try {
        & ".\svc.sh" install
        Start-Service -Name "actions.runner.MAYANK"  # Replace MAYANK with your runner's actual service name
    } catch {
        Write-Host "Failed to install or start the service."
        exit 1
    }
} else {
    Write-Host "Service script not found. Ensure the runner is properly installed."
}

