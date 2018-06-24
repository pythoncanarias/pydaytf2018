#!/bin/bash

git push
ssh micropython.pythoncanarias.es "cd ~/pydaytf2018; git pull"
