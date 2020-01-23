$build_out_dir = "./build"
$target_repo = "https://github.com/tehmantra/tehmantra.github.io.git"

if (-not (Test-Path $build_out_dir)) {
    Write-Host "ERR: Build output directory ($build_out_dir) is missing." -ForegroundColor Red
    return
}

if ((Get-ChildItem $build_out_dir | Measure-Object).Count -eq 0) {
    Write-Host "ERR: Build output directory ($build_out_dir) is empty." -ForegroundColor Red
    return
}

$confirm = Read-Host "This will deploy the site to production. Continue? Y/(N)"
if ($confirm -inotlike "y*") {
    return
}

$commit = (git rev-parse HEAD).substring(0,8)

Push-Location
Set-Location $build_out_dir
git init
git add .
git commit -m "Production build for ${commit}"
git push --force $target_repo master:master

Pop-Location
