# Frapp Assignment

This repo is the solution to the Frapp Test.

## Problem Statement
Document [problem.md](https://github.com/raghavgarg1257/frapp-app/blob/master/problem.md)

Please refer the above doc for problem statement.

## To run the code (APIs)
You just need NodeJS Environment to run this code.

```
git clone git@github.com:raghavgarg1257/frapp-app.git
cd frapp-app
npm install
cp .env.example .env # edit the credentials in .env file
npm run serve:dev # it will expose the app on mentioned port
```

## Postman Collection

You can use this [collection](https://www.getpostman.com/collections/e4f23af2bdd309119faa) for testing the above APIs.

**Note:**
-   Please first create an environment without any variables.
-   To access protected API just run the login api and it will auto populate the environment with variable and values.
