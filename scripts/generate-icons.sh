#!/bin/bash

echo 'generate for iphone'
for size in 100 114 120 128 144 152 16 167 172 180 192 20 216 29 32 40 48 50 512 55 58 58 60 64 72 76 80 87 88 92 
do
  sips ./public/images/1024.png -Z ${size} -o public/images/${size}.png
done

echo 'generate for android'
for size in 144 192 36 48 72 96
do
  sips ./public/images/1024.png -Z ${size} -o public/images/android-icon-${size}x${size}.png
done

echo 'generate for windows'
for size in 144 150 310 70
do
  sips ./public/images/1024.png -Z ${size} -o public/images/ms-icon-${size}x${size}.png
done

echo 'generate logo'
for size in 300 272 400 80
do
  sips ./public/images/1024.png -Z ${size} -o public/images/logo-${size}x${size}.png
done

echo 'generate favicon'
for size in 16 32 96
do
  sips ./public/images/1024.png -Z ${size} -o public/images/favicon-${size}x${size}.png
done

echo 'generate icons ico and ico'
 magick convert ./public/images/android-icon-96x96.png  public/images/logo.icns
 magick convert ./public/images/android-icon-96x96.png  public/images/logo.ico
 magick convert ./public/images/android-icon-96x96.png  public/images/logo.png
