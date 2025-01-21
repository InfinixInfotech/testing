# Define the Actions Runner Directory
$runnerDirectory = "C:\actions-runner"

# Check if the runner is already configured
if (Test-Path "$runnerDirectory\config.cmd") {
    Write-Host "Runner is already configured, starting runner..."
} else {
    Write-Host "Runner not configured. Configuring the runner..."
    # Remove existing configuration if any
    if (Test-Path "$runnerDirectory\config.cmd") {
        .\config.cmd remove
    }

    # Reconfigure the runner
    .\config.cmd --url https://github.com/InfinixInfotech/testing --token $env:GH_TOKEN
}

# Check if the runner is already running
$runnerProcess = Get-Process -Name "actions-runner" -ErrorAction SilentlyContinue
if ($runnerProcess -eq $null) {
    Write-Host "Runner is not running. Starting runner..."
    # Start the runner as a service to ensure it runs continuously
    Start-Process -FilePath "$runnerDirectory\run.cmd" -NoNewWindow -Wait
} else {
    Write-Host "Runner is already running."
}

# Install the runner as a service if it's not already installed
$service = Get-Service -Name "actions-runner" -ErrorAction SilentlyContinue
if ($service -eq $null) {
    Write-Host "Installing the runner as a service..."
    & "$runnerDirectory\svc.sh" install
    Start-Service -Name "actions-runner"
} else {
    Write-Host "Runner service is already installed and running."
}
