# k-means

> Online demo/visualization for k-means clustering process: https://kmeans.js.org

[![kmeans.js.org](https://img.shields.io/badge/kmeans.js.org-%F0%9F%93%88-A333C8.svg?style=flat-square)](https://kmeans.js.org)
[![Build Status](https://travis-ci.com/Jeff-Tian/k-means.svg?branch=master)](https://travis-ci.com/Jeff-Tian/k-means)

# Run on local machine
```
npm install
bower install
gulp
```
And then open browser and navigate to http://localhost:60004

# Screen shot:
![k-means screen shot](./assets/screenshot.png)


## Generate deploy key
```bash
ssh-keygen -t rsa -b 4096 -C "$(git config user.email)" -f gh-pages -N ""
# You will get 2 files:
#   gh-pages.pub (public key)
#   gh-pages     (private key)
```
