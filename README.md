# backend-blog-api
An api to power the fronted for a Blog app.

### This API FOLLOWS THE RESTful Architecture

## API Routes

| Route                                   | Method       | Description                                           | Request Body / Params                                             | Response / Notes                                |
|----------------------------------------|-------------|-------------------------------------------------------|------------------------------------------------------------------|------------------------------------------------|
| `/signup`                               | POST        | Register a new user                                   | `{ "email": "string", "u_name": "string", "password": "string" }` | `{ "message": "User created successfully", "user": { ... } }` |
| `/signin`                               | POST        | Authenticate a user and receive JWT token            | `{ "email": "string", "password": "string" }`                     | `{ "message": "Logged in successfully", "user": { ... }, "token": "JWT_TOKEN" }` |
| `/posts`                                | GET         | Get all posts                                        | None                                                             | `{ "message": "Fetched all posts", "posts": [ ... ] }` |
| `/posts`                                | POST        | Create a new post (JWT required)                     | `{ "title": "string", "blog": "string", "privacy": 0|1 }`        | `{ "message": "Post has been created", "post": { ... } }` |
| `/posts/:postId`                        | GET         | Get a single post by ID                               | `postId` in URL                                                  | `{ "message": "Fetched the post", "post": { ... } }` |
| `/posts/:postId`                        | PUT         | Update a post (JWT required)                          | `{ "title": "string", "blog": "string" }`                        | `{ "message": "Post updated successfully", "post": { ... } }` |
| `/posts/:postId`                        | DELETE      | Delete a post (JWT required)                          | `postId` in URL                                                  | `{ "message": "Post deleted successfully" }` |
| `/posts/:postId/comments`               | GET         | Get all comments for a post                            | `postId` in URL                                                  | `{ "message": "Fetched comments", "comments": [ ... ] }` |
| `/posts/:postId/comments`               | POST        | Add a comment to a post (JWT required)                | `{ "comment": "string" }`                                        | `{ "message": "Comment posted successfully", "comment": { ... } }` |
| `/posts/:postId/comments/:commentId`   | PUT         | Update a comment (JWT required)                        | `{ "comment": "string" }`                                        | `{ "message": "Comment updated", "comment": { ... } }` |
| `/posts/:postId/comments/:commentId`   | DELETE      | Delete a comment (JWT required)                        | `commentId` in URL                                               | `{ "message": "Comment deleted successfully" }` |


The following API is a learning project, and can be configured to match the required use cases. 

If any issues / suggestion , please feel free to reach out I am eager for some constructive critisicm. 
