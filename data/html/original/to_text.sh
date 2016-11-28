#!/bin/bash

for i in `seq 336 422`
do
	echo "converting $i"
	cat $i.htm | ../../node_modules/.bin/html-to-text > converted/$i.htm
done
