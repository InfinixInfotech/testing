# Define the Actions Runner Directory
$runnerDirectory = "C:\actions-runner"

# Check if the runner is already configured
if (Test-Path "$runnerDirectory\config.cmd") {
    Write-Host "Runner is already configured, starting runner..."
    # Start the runner
    cd $runnerDirectory
    .\run.cmd
} else {
    Write-Host "Runner not configured. Configuring the runner..."
    # Remove existing configuration if any
    if (Test-Path "$runnerDirectory\config.cmd") {
        .\config.cmd remove
    }

    # Reconfigure the runner with the correct URL and token
    .\config.cmd --url https://github.com/InfinixInfotech/testing.git --token $env:GH_TOKEN

    # Start the runner
    .\run.cmd
}
