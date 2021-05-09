# Fungible Fair

A website to store Non-Fungible Tokens (NFT's) in a not so fungible way.

## Table of Contents

[API Documentation](#API Documentation)

## API Documentation

### User Routes

`POST /user`

Creates a user

`POST /user/login`

Login for a user. Returns a JWT through the Set-Cookie field

### Profile Routes

`GET /profile`

Gets profile information about the current user supplied through the JWT.

### Image Routes

`POST /image`

Uploads an image.

`POST /image/bulk`

Bulk upload for images

`DELETE /image/id/:imageID`

Deletes an image by its image ID

### Image Routes (hosted links)

`GET /image/link/name/:imageName`

Get all images with a specific name under your user. Returns an array of links and information

`GET /image/link/tag/:tagName`

sdf

`GET /image/link/all`

sdf

`GET /image/link/public`

sdf

### Image Routes (download)

`GET /image/name/:imageName`

Get all images with a specific name under your user. Returns either the image file or a zip folder depending on how many images you’re requesting

`GET /image/tag/:tagName`

Get all images tagged with the same tag.

`GET /image/all`

sdf

`GET /image/public`

sdf

### Tag Routes

`GET /tag/imageID/:imageID`

Returns all tags on the imageID.

`PUT /tag/id/:tagID/:tagName`

Updates tag
