var spawn = require('../../')

describe('spawn', function () {
  it("should reject if command doesn't exist", function () {
    var successCb = sinon.spy()
    var errorCb = sinon.spy()
    return spawn('abracadabrrrrapp')
      .then(successCb, errorCb)
      .then(function (val) {
        expect(successCb).not.called
        expect(errorCb).called
      })
  })
  it('should reject if npm script exists but fails', function () {
    return spawn('npm run fails', { getOutput: true })
      .then(function (val) {
        console.log('val', val.indexOf('ERR!') > -1)
      })
  })
})
