var request = require('supertest');
var expect = require('chai').expect;
var api = require('../server');
var host = process.env.API_TEST_HOST || api;

request = request(host);

describe('Notes collection [/notes]', function() {

  describe('POST', function() {
    it('should create a note', function(done) {
        var data = {
          "note" : {
            "title": "A new note",
            "description": "Note description",
            "type": "text",
            "body": "This is the body"
          }
        };

        request
          .post('/notes')
          .set('Accept', 'application/json')
          .send(data)
          .expect(201)
          .expect('Content-Type', /application\/json/)
          .end(function(err, res) {
            var note;

            var body = res.body;
            console.log('body', body);

            // Note exists
            expect(body).to.have.property('note');
            note = body.note;

            // Properties
            expect(note).to.have.property('title', 'A new note');
            expect(note).to.have.property('description', 'Note description');
            expect(note).to.have.property('type', 'text');
            expect(note).to.have.property('body', 'This is the body');
            expect(note).to.have.property('id');

            done(err);
          });
    });
  });

  describe('GET', function() {
    it('should get a note with an id', function(done) {
      var data = {
        "note" : {
          "title": "A new note",
          "description": "Note description",
          "type": "text",
          "body": "This is the body"
        }
      };

      request
        .post('/notes')
        .set('Accept', 'application/json')
        .send(data)
        .expect(201)
        .expect('Content-Type', /application\/json/)
        .end(function(err, res) {
          var body = res.body;
          console.log('body', body);
          var id = body.note.id;

          request
            .get('/notes/' + id)
            .set('Accept', 'application/json')
            .send()
            .expect(200)
            .expect('Content-Type', /application\/json/)
            .end(function(err, res) {
              var note;
              var body = res.body;
              console.log('GET body', body);

              // Note exists
              expect(body).to.have.property('note');
              note = body.note;

              // Properties
              expect(note).to.have.property('id', id);
              expect(note).to.have.property('title', 'A new note');
              expect(note).to.have.property('description', 'Note description');
              expect(note).to.have.property('type', 'text');
              expect(note).to.have.property('body', 'This is the body');

              done(err);
            });
        });
    });
  });

});
