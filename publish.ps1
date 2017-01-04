process {

    $commit_message = Read-Host -Prompt 'Commit message'

    git add --all
    git commit -m "$commit_message"
    git pull
    git push
    cd .\build
    git add --all
    git commit -m "$commit_message"
    git pull
    git push
    cd ..

}