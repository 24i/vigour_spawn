#!/usr/bin/env node
'use strict'

var spawn = require('../')
var fullCommand = process.argv[2]
var commandParts = fullCommand.split(' ')
var command = commandParts.shift()
var options = process.argv[3]

if (options[0] !== '{') {
  options = { cwd: options }
} else {
  options = JSON.parse(options)
}
spawn(command, commandParts, options)
