var request = require('supertest');
var api = require('../server');
var host = process.env.API_TEST_HOST || api;

request = request(host);

describe('Notes collection [/notes]', function() {

  describe('POST', function() {
    it('should create a note', function(done) {
        return true;
    });
  });

});
