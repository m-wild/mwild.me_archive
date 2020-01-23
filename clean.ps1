$build_out_dir = "./build"
$node_dir = "./node_modules"

if (Test-Path $build_out_dir) {
    Remove-Item -Recurse -Force $build_out_dir
}


if ($args.Contains("--all")) {
    if (Test-Path $node_dir) {
        Remove-Item -Recurse -Force $node_dir
    }
}
