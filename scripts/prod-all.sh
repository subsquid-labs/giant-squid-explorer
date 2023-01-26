dir=manifests
for entry in "$dir"/*
do
  name=$(grep 'name:' $entry | cut -d\   -f2 )
  version=$(grep 'version:' $entry | cut -d\   -f2 )
  yes | npx sqd prod "$name@v$version"
  echo "$name@v$version" aliased
done
