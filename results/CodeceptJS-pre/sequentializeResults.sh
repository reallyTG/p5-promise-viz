#!/bin/bash

projName=$1

a=1
for i in *.json; do
  new=$(printf "$1-processed-results-%04d.json" "$a") #04 pad to length of 4
  mv -i -- "$i" "$new"
  let a=a+1
done
