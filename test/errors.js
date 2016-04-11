var spawn = require('../')

var test = require('tape')

test("should reject if command doesn't exist", function (t) {
  t.plan(2)
  var successCount = 0
  var errorCount = 0
  return spawn('abracadabrrrrapp', { quiet: true })
    .then(function () {
      successCount += 1
    }, function () {
      errorCount += 1
    })
    .then(function (val) {
      t.equal(successCount, 0, 'success callback not called')
      t.equal(errorCount, 1, 'error callback called')
    })
})

test('should resolve if npm script exists but fails', function (t) {
  t.plan(2)
  var successCount = 0
  var errorCount = 0
  return spawn('npm run fails', { getOutput: true, quiet: true })
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
