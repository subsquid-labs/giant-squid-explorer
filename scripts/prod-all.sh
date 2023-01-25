# SPECIFY VERSION AS 1ST ARGUMENT
dir=manifests
prefix=gs-explorer-
for entry in "$dir"/*
do
  project=$(echo $entry | cut -d/ -f 2 | cut -d. -f 1 )
  yes | npx sqd prod "$prefix$project@$1"
  echo "$project aliased"
done
