#!/usr/bin/env zsh

function dcr() {
    docker compose stop $1
    docker compose rm $1
    docker compose up -d $1
}
