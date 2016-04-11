'use strict'

var proc = require('child_process')
var log = require('npmlog')
var _isArray = require('lodash.isArray')
var _isPlainObject = require('lodash.isPlainObject')

module.exports = exports = function (command, args, opts) {
  // get command
  var parts = command.split(' ')
  var cmd = parts.shift()
  // get args and opts
  if (!args) {
    args = parts
  } else {
    if (_isArray(args)) {
      args = parts.concat(args)
    } else if (_isPlainObject(args)) {
      opts = args
      args = parts
    } else {
      args = parts
    }
  }
  var showOpts = true
  if (!opts) {
    showOpts = false
    opts = {}
  }

  // log.info('cmd', cmd)
  // log.info('args', args)
  // log.info('opts', opts)

  // promise child process completion
  return new Promise(function (resolve, reject) {
    if (!opts.quiet) {
      log.info('$',
        cmd,
        args.join(' '),
        showOpts ? '# ' + JSON.stringify(opts) : '')
    }
    var running = proc.spawn(cmd, args, opts)
    var output = ''
    if (opts.getOutput) {
      running.stdout.on('data', function (chunk) {
        output += chunk.toString()
      })
      running.stderr.on('data', function (chunk) {
        output += chunk.toString()
      })
    }
    running.on('error', function (err) {
      reject(err)
    })
    running.on('close', function () {
      if (opts.verbose) {
        log.info('> ', output)
      }
      resolve(output)
    })
  })
}
