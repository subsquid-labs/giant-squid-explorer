search_dir=manifests
for entry in "$search_dir"/*
do
  npx sqd deploy . -m "$entry" -u --no-stream-logs
  echo "$entry deployed"
done