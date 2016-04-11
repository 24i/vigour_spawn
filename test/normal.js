var spawn = require('../')

var test = require('tape')

test('should resolve if command succeeds', function (t) {
  t.plan(2)
  var successCount = 0
  var errorCount = 0
  return spawn('echo a', { quiet: true })
    .then(function () {
      successCount += 1
    }, function () {
      errorCount += 1
    })
    .then(function (val) {
      t.equal(successCount, 1, 'success callback called')
      t.equal(errorCount, 0, 'error callback not called')
    })
})
