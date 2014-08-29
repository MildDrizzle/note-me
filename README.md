# Note-Me
 API JSON basic implementation using TDD, Node.js and Express and Gulp
 for automated tasks

## Install
```bash
$ git clone <project>
$ cd <project>
$ npm install
$ npm install -g gulp
$ npm install -g mocha
```

## Execute
```bash
$ gulp
```

## Test
```bash
$ gulp test
```

## Documentation

### Permitted HTTP methods

| Method   | Description                       |
|----------|-----------------------------------|
| `GET`    | Get a resource or a resource list |
| `POST`   | Create a resource                 |
| `PUT`    | Update a resource                 |
| `DELETE` | Delete a resource                 |

### Response Codes

| Code  | Description |
|-------|----------------------------------------------------------------|
| `200` | Success                                                        |
| `201` | Success - New resource created                                 |
| `204` | Success - No new data to response                              |
| `400` | Bad request - The request can not evaluated                    |
| `401` | Unauthorized - The user is not authenticated for this resource |
| `404` | Not Found - The resource has not exists                        |
| `422` | Unprocessable Entity - validate errors                         |
| `429` | Limit exceed - Try again later                                 |
| `500` | Server error                                                   |
| `503` | Service not available                                          |  


### To create a new note [POST]
#### Request: `[POST] /notes`
```json
{
  "note": {
    "title": "A new note",
    "description": "It is a new note posted",
    "type": "js",
    "body": "It is a body of the note"
  }
}
```
#### Response:
```json
{
  "note": {
    "id": "123"
    "title": "A new note",
    "description": "It is a new note posted",
    "type": "js",
    "body": "It is a body of the note"
  }
}
```

### To get a note [GET]
#### Request: `[GET] /notes/123`
#### Response:
```json
{
  "note": {
    "id": "123",
    "title": "A new note",
    "description": "It is a new note posted",
    "type": "js",
    "body": "It is a body of the note"
  }
}
```

### To update a note [PUT]
#### Request: `[PUT] /notes/123`
```json
{
  "note": {
    "id": "123",
    "title": "Note updated",
    "description": "It is a note updated",
    "type": "js",
    "body": "It is a body of the note"
  }
}
```
#### Response:
```json
{
  "note": {
    "id": "123",
    "title": "Note updated",
    "description": "It is a note updated",
    "type": "js",
    "body": "It is a body of the note"
  }
}
```

### Remove a note [DELETE]
#### Request: `[DELETE] /notes/123`

#### Response:
