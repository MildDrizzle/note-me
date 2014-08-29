var request = require('supertest-as-promised');
var expect = require('chai').expect;
var api = require('../server.js');
var host = process.env.API_TEST_HOST || api;

request = request(host);

describe('Notes Collection [/notes]', function() {

  describe('POST', function() {
    it('should be create a note', function(done) {
      var data = {
        "note": {
          "title": "A new note",
          "description": "Description of the note",
          "type": "text",
          "body": "the body of the note"
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
          expect(note).to.have.property('description', 'Description of the note');
          expect(note).to.have.property('type', 'text');
          expect(note).to.have.property('body', 'the body of the note');
          expect(note).to.have.property('id');

          done(err);
        });
    });
  });

  describe('GET', function() {
    it('should be get a note with an id', function(done) {
      var id;
      var data = {
        "note": {
          "title": "A new note",
          "description": "Description of the note",
          "type": "text",
          "body": "the body of the note"
        }
      };

      request
        .post('/notes')
        .set('Accept', 'application/json')
        .send(data)
        .expect(201)
        .expect('Content-Type', /application\/json/)
      .then(function getNote(res) {
        id = res.body.note.id;

        return request.get('/notes/' + id)
          .set('Accept', 'application/json')
          .send()
          .expect(200)
          .expect('Content-Type', /application\/json/)
      }, done)
      .then(function assertions(res) {
        var note;
        var body = res.body;

        // Note exists
        expect(body).to.have.property('note');
        note = body.note;

        // Properties
        expect(note).to.have.property('id', id);
        expect(note).to.have.property('title', 'A new note');
        expect(note).to.have.property('description', 'Description of the note');
        expect(note).to.have.property('type', 'text');
        expect(note).to.have.property('body', 'the body of the note');
        done();
      }, done);

    });
  });

  describe('GET', function() {
    it('should be update a note with an id', function(done) {
      var id;
      var data = {
        "note": {
          "title": "A new note",
          "description": "Description of the note",
          "type": "text",
          "body": "the body of the note"
        }
      };

      request
        .post('/notes')
        .set('Accept', 'application/json')
        .send(data)
        .expect(201)
        .expect('Content-Type', /application\/json/)
      .then(function getNote(res) {
        var update = {
          "note": {
            "title": "An updated note",
            "description": "New Description of the note",
            "type": "text",
            "body": "the new body of the note"
          }
        };

        id = res.body.note.id;

        return request.put('/notes/' + id)
          .set('Accept', 'application/json')
          .send(update)
          .expect(200)
          .expect('Content-Type', /application\/json/)
      }, done)
      .then(function assertions(res) {
        var note;
        var body = res.body;

        // Note exists
        expect(body).to.have.property('note');
        expect(body.note)
          .to.be.an('array')
          .and.to.have.length(1);
        note = body.note[0];

        // Properties
        expect(note).to.have.property('id', id);
        expect(note).to.have.property('title', 'An updated note');
        expect(note).to.have.property('description', 'New Description of the note');
        expect(note).to.have.property('type', 'text');
        expect(note).to.have.property('body', 'the new body of the note');
        done();
      }, done);

    });
  });

  describe('DELETE', function() {
    it('should be delete a note with an id', function(done) {
      var id;
      var data = {
        "note": {
          "title": "A new note",
          "description": "Description of the note",
          "type": "text",
          "body": "the body of the note"
        }
      };

      request
        .post('/notes')
        .set('Accept', 'application/json')
        .send(data)
        .expect(201)
        .expect('Content-Type', /application\/json/)

      .then(function deleteNote(res) {
        id = res.body.note.id;

        return request.delete('/notes/' + id)
          .set('Accept', 'application/json')
          .expect(204)
      }, done)

      .then(function assertion(res) {
        var note;
        var body = res.body;

        // Empty response
        expect(body).to.be.empty;

        // Test if the resource has been deleted
        return request.get('/notes/' + id)
          .set('Accept', 'application/json')
          .send()
          .expect(404)
      }, done)

      .then(function confirmation(res) {
        var body = res.body;
        expect(body).to.be.empty;
        done();
      }, done);
    });
  });

});
