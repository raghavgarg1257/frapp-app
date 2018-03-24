# Assignment

You have to create a mongodb based rest api using express.js, that performs crud operations on a collection, user and admin. You are free to either use an ORM or work directly on the mongodb native driver for nodeJs.

##### The API's for the user collection must look like these:-

1.  `GET  /user` // Used for fetching all users

2.  `GET  /user/:id` // Used for fetching a single user by id

3.  `POST  /user` // Used to create a single user

4.  `PUT  /user/:id` // Used to update a single user by id

5.  `DELETE  /user/:id` // Used for deleting a single user by id

6.  `POST  /user/login` // Used for logging in users

##### The API's for the admin collection must look like these:-

7.  `GET  /admin/:id` // Used for fetching a single admin by id

8.  `POST  /admin` // Used to create a single admin

9.  `POST  /admin/login` // Used for logging in admins


#### Schema

The User Schema looks like the following
```
firstname ==> string (required at user creation)
lastname  ==> string (required at user creation)
email     ==> string (email validation) (required at user creation)
phone     ==> string (10 digit phone validation)
password  ==> string (to be hashed before storage) (required at user creation)
```

The Admin schema looks like the following
```
firstname ==> string (required at admin creation)
lastname  ==> string (required at admin creation)
email     ==> string (email validation) (required at admin creation)
password  ==> string (to be hashed before storage) (required at admin creation)
```

#### Authentication and Authorisation

There are two kinds of users, User and Admin. Both Users and Admins must be logged in before accessing permitted routes. The following group shows access to different APIs by different users.

-   ADMIN => {1,2,4,5,7}
-   USER => {2,4}
-   PUBLIC => {3,6,8,9}

#### Requirements

1.  Both users and the admins can be created publicly using API 3 and 8.
2.  Users' email and password can't be updated.
3.  Admins' email and password can't be updated.
4.  Users' phone field is not required but should be validated as a 10 digit mobile number if provided.
