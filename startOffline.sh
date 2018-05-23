TMPFILE=.offline$$.log
if [ -f .offline.pid ]; then
    echo "Found file .offline.pid. Not starting."
    exit 1
fi

sls offline 2>offline.log > $TMPFILE &
PID=$!
echo $PID > .offline.pid

while ! grep "Offline listening" $TMPFILE
do sleep 1; done

rm $TMPFILE
rm offline.log