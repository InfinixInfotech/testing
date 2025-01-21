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

# Verify if the runner is already running
$runnerProcess = Get-Process -Name "run" -ErrorAction SilentlyContinue
if ($runnerProcess) {
    Write-Host "Runner is already running."
} else {
    Write-Host "Starting the runner..."
    Start-Process -FilePath ".\run.cmd" -NoNewWindow -Wait
}

# Install and start the runner as a service
if (Test-Path ".\svc.cmd") {
    Write-Host "Installing the runner as a service..."
    try {
        # Install the service
        .\svc.cmd install

        # Dynamically determine the service name
        $serviceName = (Get-ChildItem "C:\actions-runner" -Recurse -Filter "*.service").BaseName

        if ($serviceName) {
            Start-Service -Name $serviceName
            Write-Host "Service '$serviceName' started successfully."
        } else {
            Write-Host "Service name could not be determined. Please verify the runner installation."
        }
    } catch {
        Write-Host "Failed to install or start the service. Error: $_"
        exit 1
    }
} else {
    Write-Host "Service script (svc.cmd) not found. Ensure the runner is properly installed."
}
