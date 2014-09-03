'use strict';

var request = require('supertest-as-promised');
var expect = require('chai').expect;
var _ = require('lodash');
var api = require('../server.js');
var mongoose = require('mongoose');
var host = process.env.API_TEST_HOST || api;

request = request(host);

function createNote() {
  var id;
  var data = {
    'title': 'A new note',
    'description': 'Description of the note',
    'type': 'text',
    'content': 'the body of the note'
  };

  return request
    .post('/notes')
    .set('Accept', 'application/json')
    .send(data)
    .expect(201)
    .expect('Content-Type', /application\/json/)
  .then(function getNote(res) {
    console.log(res.body);
    this.id = res.body._id;
  }.bind(this));
}

describe('Notes Collection [/notes]', function() {
  beforeEach(function () {
    mongoose.connect('mongodb://localhost/noteme-test', function() {
      console.log('Test Database connected!');
    });
  });

  afterEach(function () {
    mongoose.disconnect(function () {
      console.log('Test Database disconnected!');
    });
  });

  describe('POST', function() {
    it('should be create a note', function(done) {
      var data = {
        'title': 'A new note',
        'description': 'Description of the note',
        'type': 'text',
        'content': 'the body of the note'
      };

      request
        .post('/notes')
        .set('Accept', 'application/json')
        .send(data)
        .expect(201)
        .expect('Content-Type', /application\/json/)
        .end(function(err, res) {
          var note = res.body;

          // Properties
          expect(note).to.have.property('title', 'A new note');
          expect(note).to.have.property('description', 'Description of the note');
          expect(note).to.have.property('type', 'text');
          expect(note).to.have.property('content', 'the body of the note');
          expect(note).to.have.property('_id');

          done(err);
        });
    });
  });

  describe.only('GET', function() {
    beforeEach(createNote);

    it('should be get a note with an id', function(done) {
      var id = this.id;

      return request.get('/notes/' + id)
        .set('Accept', 'application/json')
        .send()
        .expect(200)
        .expect('Content-Type', /application\/json/)
      .then(function assertions(res) {
        var note = res.body;

        // Properties
        expect(note).to.have.property('_id', id);
        expect(note).to.have.property('title', 'A new note');
        expect(note).to.have.property('description', 'Description of the note');
        expect(note).to.have.property('type', 'text');
        expect(note).to.have.property('content', 'the body of the note');
        done();
      }, done);

    });

    xit('should be get all the notes', function(done) {
        var id1;
        var id2;

        var data1 = {
          'note': {
            'title': 'A new note',
            'description': 'Description of the note',
            'type': 'text',
            'body': 'the body of the note'
          }
        };
        var data2 = {
          'note': {
            'title': 'A new note',
            'description': 'Description of the note',
            'type': 'text',
            'body': 'the body of the note'
          }
        };

        request
          .post('/notes')
          .set('Accept', 'application/json')
          .send(data1)
          .expect(201)
          .expect('Content-Type', /application\/json/)
        .then(function createAnotherNote(res) {
          id1 = res.body.note.id;
          return request
            .post('/notes')
            .set('Accept', 'application/json')
            .send(data2)
            .expect(201)
            .expect('Content-Type', /application\/json/);
        })
        .then(function getNotes(res) {
          id2 = res.body.note.id;
          return request
            .get('/notes')
            .set('Accept', 'application/json')
            .expect(200)
            .expect('Content-Type', /application\/json/);
        }, done)
        .then(function assertions(res) {
          var body = res.body;

          expect(body).to.have.property('notes');
          expect(body.notes)
            .to.be.an('array')
            .and.to.have.length.above(2);

          var notes = body.notes;
          var note1 = _.find(notes, { id: id1 });
          var note2 = _.find(notes, { id: id2 });

          // Note1 properties
          expect(note1).to.have.property('id', id1);
          expect(note1).to.have.property('title', 'A new note');
          expect(note1).to.have.property('description', 'Description of the note');
          expect(note1).to.have.property('type', 'text');
          expect(note1).to.have.property('body', 'the body of the note');

          // Note2 properties
          expect(note2).to.have.property('id', id2);
          expect(note2).to.have.property('title', 'A new note');
          expect(note2).to.have.property('description', 'Description of the note');
          expect(note2).to.have.property('type', 'text');
          expect(note2).to.have.property('body', 'the body of the note');

          done();
        }, done);
    });

  });

  describe('PUT', function() {
    it('should be update a note with an id', function(done) {
      var id;
      var data = {
        'note': {
          'title': 'A new note',
          'description': 'Description of the note',
          'type': 'text',
          'body': 'the body of the note'
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
          'note': {
            'title': 'An updated note',
            'description': 'New Description of the note',
            'type': 'text',
            'body': 'the new body of the note'
          }
        };

        id = res.body.note.id;

        return request.put('/notes/' + id)
          .set('Accept', 'application/json')
          .send(update)
          .expect(200)
          .expect('Content-Type', /application\/json/);
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
        'note': {
          'title': 'A new note',
          'description': 'Description of the note',
          'type': 'text',
          'body': 'the body of the note'
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
          .expect(204);
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
          .expect(404);
      }, done)

      .then(function confirmation(res) {
        var body = res.body;
        expect(body).to.be.empty;
        done();
      }, done);
    });
  });

});
