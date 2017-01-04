process {

    function Get-Confirmation ([string] $prompt) {
        $confirm = Read-Host -Prompt $prompt
        if ($confirm -eq 'n') { exit 1 }
    }


    Get-Confirmation 'Have you built the site first? (Y/n)'
    
    $commit_message = Read-Host -Prompt 'Commit message'

    git add --all
    git commit -m "$commit_message"
    git pull
    git push

    Get-Confirmation 'Source synchronized.. continue to publish ./build? (Y/n)'
    
    Push-Location
    Set-Location .\build
    git add --all
    git commit -m "$commit_message"
    git pull
    git push
    
    Pop-Location

    Write-Host 'Done' -ForegroundColor DarkCyan
}