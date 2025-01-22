# Define the Actions Runner Directory
$runnerDirectory = "C:\actions-runner"

# Validate if GH_TOKEN is set
if (-not $env:GH_TOKEN) {
    Write-Host "Error: GH_TOKEN environment variable is not set. Please set it and retry."
    exit 1
}

# Check if the runner is already configured
if (Test-Path "$runnerDirectory\config.cmd") {
    Write-Host "Runner is already configured, starting runner..."
    try {
        # Start the runner
        cd $runnerDirectory
        .\run.cmd
    } catch {
        Write-Host "Error: Failed to start the runner. Details: $_"
        exit 1
    }
} else {
    Write-Host "Runner not configured. Configuring the runner..."
    try {
        # Remove existing configuration if any
        if (Test-Path "$runnerDirectory\config.cmd") {
            .\config.cmd remove
        }

        # Reconfigure the runner with the correct URL and token
        .\config.cmd --url https://github.com/InfinixInfotech/testing.git --token $env:GH_TOKEN

        # Start the runner
        .\run.cmd
    } catch {
        Write-Host "Error: Failed to configure or start the runner. Details: $_"
        exit 1
    }
}
