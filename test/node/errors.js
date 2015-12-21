var spawn = require('../../')

describe('spawn', function () {
  it('should reject if command fails', function () {
    var successCb = sinon.spy()
    var errorCb = sinon.spy()
    return spawn('abracadabrrrrapp')
      .then(successCb, errorCb)
      .then(function (val) {
        expect(successCb).not.called
        expect(errorCb).called
      })
  })
})
