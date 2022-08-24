

# KUPM API Documentation
Documentation for the backend API of [KU Project Manager](https://github.com/jameskbecker/ku-project-manager).
## Table of Contents
1. [Authentication API](#authentication-api)
2. [User API](#user-api)
3. [Project API](#project-api)
4. [Task API](#task-api)
5. [Invite API](#invite-api)
5. [Course API](#course-api)

## Authentication API

### Register Account
**POST** `/api/auth/register`

Registers a new account used to login to the web app.

**Request**
| Key | Type |
| -- | -- |
| firstName | string |
| lastName | string |
| email | string |
| password | string |

**Response**
| Key | Type |
| -- | -- |
| success | boolean |

### Login to Account


**POST** `/api/auth/login`

Authenticates a user's login details

**Request Body**
| Key | Type |
| -- | -- |
| email | string |
| password | string |

**Response**
| Key | Type |
| -- | -- |
| success | boolean |


### Reset Password
Resets the user's forgotten password.<br/>
**POST** `/api/auth/reset`

**Response**
| Key | Type |
| -- | -- |
| success | boolean |

## User API
### Delete Notification

**DELETE** `/api/user/{{userId}}/{notificationId}}`

Deletes a specified notification.

**Response**
| Key | Type |
| -- | -- |
| success | boolean |

### Get All Notifications
Responds with an array of recent or all of a user's notifications.<br/>
**GET** `/api/users/{{userId}}/notifications?limit=25`
**Query Parameters**
| Key | Type |
|--|--|
| limit | number |



**Response**
```ts
type NotificationData = {
	id: string;
	"type": "invite" | "comment";
	heading: string;
	subheading: string;
	body: string;
}
```
| Key | Type |
| -- | -- |
| success | boolean |
| data | NotificationData[] |

### Upcoming Tasks

**GET** `/api/users/{{userId}}/todo`

Responds with a user's upcoming tasks.

## Project API
### Get All Projects
Responds with all of a specified user's created projects.<br/>
**GET** `/api/projects?limit=5`

**Request Headers**
| Key | Value |
|--|--|
| Accept | application/json |

**Query Params**
| Key | Type | Description |
|--|--|--|
| Limit | *number* | Optional parameter for upcoming projects


### Get Single Project

**GET** `/api/projects/{{projectId}}`

Responds with detailed data of a specified project.


### Create Project

**POST** `/api/projects`

Make things easier for your teammates with a complete request description.

### Update Project

**PUT** `/api/projects/{{projectId}}`

Updates a project with the provided fields.


### Delete Project

**DELETE** `/api/projects/{{projectId}}`

Deletes the specified project.


### Get Project Tasks

**GET** `/api/projects/{{projectId}}/tasks`

Responds with a project's top-level tasks.


### Get Project Activity

**GET** `/api/projects/{{projectId}}/activity`

Responds with the activity of a specified project.


### Get Project Members

**GET** `/api/projects/{{projectId}}/members`

Responds with member data of a specified project

## Task API
### Get All Tasks

**GET** `/api/tasks`

Responds with all a user's tasks.


### Create Task

**POST** `/api/tasks`

Creates a new tasks using the specified details.


### Update Task

**PUT** `/api/tasks/{{task_id}}`

Updates the specified fields of a task.


### Delete Task

**DELETE** `/api/tasks/{{task_id}}`

Deletes the specified task.


### Get Subtasks

**GET** `/api/tasks/{{task_id}}/subtasks`

Responds with a task's subtasks.


### Get Comments

**GET** `/api/tasks/{{task_id}}`

Responds with all comments under a specified task.


### Create Comment
Posts a new comment under a specified task.<br/>
**POST** `/api/tasks/{{task_id}}/comments` 



## Invite API
### Create Invite

**POST** `/api/invites/`

Used to send a project invite to another user.

| Key | Type |
| -- | -- |
| projectId | boolean |
| email | string |
| permissions | string |
| expires | number |

**Response**
| Key | Type |
| -- | -- |
| success | boolean |
| data | |

### Accept Invite

**POST** `/api/invites/{{invite_id}}/join`

Allows a user to join a project they have been invited to.

**Request**


## Course API
***Note: Not Implemented***
### Get All Courses
Responds with a user's selected course
**GET** `/api/courses/`

### Get Single Course

**GET** `/api/courses/{{courseId}}`

### Get Course Modules

**GET** `/api/courses/{{courseId}}/modules`

### Get Course Module Assignments

**GET** `/api/courses/{{courseId}}/modules/{{moduleId}}/assignments`
