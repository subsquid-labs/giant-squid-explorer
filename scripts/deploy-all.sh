dir=manifests
for entry in "$dir"/*
do
  npx sqd deploy . -m "$entry" -o "giant-squid" -u --no-stream-logs
  echo "$entry deployed"
done