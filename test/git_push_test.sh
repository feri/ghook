#!/bin/sh -e
#
# Reads a simple payload from a file and sends it 
# to a remote location where ghook is supposed to be listening
#
GHOOK_SERVER="http://ghook.local"
PAYLOAD="git_push_payload.json"
CMD="curl"
ARGS="-v -d@$PAYLOAD"
HDRS="--header Content-type:application/json"
${CMD} ${ARGS} ${HDRS} ${GHOOK_SERVER}
