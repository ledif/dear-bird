#!/bin/bash

for i in `seq 336 422`
do
  if [ ! -f $i.htm ]; then
    echo "file $i.htm not found"
  fi
done
