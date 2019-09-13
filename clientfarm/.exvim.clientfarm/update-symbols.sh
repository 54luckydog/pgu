#!/bin/bash
export DEST="./.exvim.clientfarm"
export TOOLS="/Users/tu/.vim/tools/"
export TMP="${DEST}/_symbols"
export TARGET="${DEST}/symbols"
sh ${TOOLS}/shell/bash/update-symbols.sh
