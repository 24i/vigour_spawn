'use strict'

var proc = require('child_process')
var log = require('npmlog')
var _isArray = require('lodash.isarray')
var _isPlainObject = require('lodash.isplainobject')

/**
 * @id spawn
 * @function spawn
 * @param command {String} - A command name or a full command string
 * @param [args] {Array|Object} - An array of arguments (or extra arguments) for the command OR the opts Object (see below)
 * @param [opts] {Object} - Options to pass along to `process.spawn`, plus the following additional options
 * @param [opts.quiet] {Boolean} - Suppresses logging of the actual command executed (logged by default). Default: false
 * @param [opts.getOutput] {Boolean} - Promise will resolve with everything anything the command sent to stdout and stderr
 * @param [opts.verbose] {Boolean} - Logs whatever the command sent to stdout and stderr
 * @returns prom {Promise} - Resolves when child process is completed
 */
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
