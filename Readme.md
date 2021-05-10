# Fungible Fair

A website to store Non-Fungible Tokens (NFT's) in a not so fungible way.

The easiest way to interface with the backend is through an API client like [Insomnia](https://insomnia.rest/) or [Postman](https://www.postman.com/). The client will deal with all authentication tokens. An insommnia project has been included for convenience.

## Table of Contents

[Quickstart](#quickstart-guide)
[API Documentation](#api-documentation)

- [File Types Supported](#file-types-supported)
- [User Routes](#user-routes)
- [Profile Routes](#profile-routes)
- [Image Routes](#image-routes)
- [Image Routes (hosted links)](#image-routes-hosted-links)
- [Image Routes (download)](#image-routes-download)
- [Tag Routes](#tag-routes)

## Quickstart Guide

1. Clone the repository

## API Documentation

### File Types Supported

Most [common image file types](https://developer.mozilla.org/en-US/docs/Web/Media/Formats/Image_types) are supported

- .apng
- .avif
- .gif
- .jpg / .jpeg
- .png
- .svg
- .webp

### User Routes

The following three routes deal with authentication. Sessions are kept through a JWT that the server sends to the client through the `Set-Cookie` field. For all routes except for the user routes, an accompanying JWT will be rquired to access the endpoints.

`POST /user`

Creates a user.

`POST /user/login`

Login for a user. Returns a JWT through the Set-Cookie field

`DELETE /user/logout`

Logout for a user. Deletes the JWT stored on the browser.

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

These endpoints would be used to disaply the images on the front end. Each endpoint will return a link at `/imageLink/{image.jpg}` along with the name of the image and the permission.

`GET /image/link/name/:imageName`

Get all of the current user's images with a specific name.

`GET /image/link/tag/:tagName`

Get all of the current user's images containing a tag that matches `tagName`.

`GET /image/link/all`

Get all of the current user's images.

`GET /image/link/public`

Get all public images regardless of ownership.

### Image Routes (download)

These endpoints would be used if a user wants to download one or many images. Each endpoint will return either the image file or a zip folder depending on how many images you’re requesting.

`GET /image/name/:imageName`

Get all of the current user's images with a specific name.

`GET /image/tag/:tagName`

Get all of the current user's images containing a tag that matches `tagName`.

`GET /image/all`

Get all of the current user's images.

`GET /image/public`

Get all public images regardless of ownership.

### Tag Routes

`GET /tag/imageID/:imageID`

Returns all tags on the imageID.

`PUT /tag/id/:tagID/:tagName`

Updates tagName
