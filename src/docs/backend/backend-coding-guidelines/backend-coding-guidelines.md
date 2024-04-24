<div align="center">
 Documentation
</div>

### Note

1. <p>Nest JS Check List</p>

- <https://docs.google.com/spreadsheets/d/1mCUoB-NK5GqD_vl2TtX5QhldP75RN5HY1ozatL29Yck/edit?usp=sharing>

2. <p>
   Do Not use, old libraries / packages with no latest updates (within last 6 months), which is not open source and does not have more than a million downloads. Use only NPM and YARN.
   </p>

3. <p>
   For preventing SQL injection attack, You will have to use mysql.escape() method in the backend for the all input fields entered by the user. In addition, for numeric fields check number input field tab in burger menu. - Non numeric characters shall be disabled as input from the user key board. You will also have to use mysql.escape() for all app generated inputs such as user_id, customer_id, customer_country_code etc.
   </p>

4. <p>
   Always GET only relevant data from database. Do not get or dump data that is more than what is required. For ex, implement pagination concept in table data and get only first page records. Only when the user clicks all records, get all records.
   </p>
5. ### Nest JS Documentation

- <https://docs.nestjs.com>

6. ### TypeORM Documentation

- <https://typeorm.io>

7. ### MySQl Documentation

- <https://dev.mysql.com/doc/refman/8.0/en>

8. ### Npm

- <https://www.npmjs.com>

9. ### Yarn

- <https://yarnpkg.com>

10. ### Other JavaScript Libraries Documentation

- OpenAPI

- <https://docs.nestjs.com/openapi/introduction>

- Swagger

- <https://docs.nestjs.com/openapi/introduction>

- Nest JS CLI

- <https://docs.nestjs.com/cli/overview>

- Moment JS (Parse, validate, manipulate, and display dates and times in JavaScript)

- <https://momentjs.com>

- Country City State JSON (JSON formatted data containing the world's countries, states/provinces, and cities)

- <https://github.com/khkwan0/countryCityStateJson>

---

<div align="center">
CLI Commands
</div>

### NPM

```bash
1) Install dependencies	- npm install
2) Install package - npm install [package]
3) Install dev package - npm install --save-dev [package]
4) Uninstall package - npm uninstall [package]
5) Uninstall dev package - npm uninstall --save-dev [package]
6) Update - npm update
7) Update Package - npm update [package]
8)Global install package - npm install --global [package]
9)Global uninstall package - npm uninstall --global [package]

npm init
npm run
npm test
npm login (and logout)
npm link
npm publish
npm cache clean
```

---

### YARN

```bash
1) Install dependencies	- yarn
2) Install package - yarn add [package]
3) Install dev package - yarn add --dev [package]
4) Uninstall package - yarn remove [package]
5) Uninstall dev package - yarn remove [package]
6) Update - yarn upgrade
7) Update Package - yarn upgrade [package]
8)Global install package - yarn upgrade [package]
9)Global uninstall package - yarn global remove [package]

yarn init
yarn run
yarn test
yarn login (and logout)
yarn link
yarn publish
yarn cache clean
```

---

<div align="center">
 List of JavaScript Packages and Installation Commands (which can be executed in the Windows Terminal, Command Prompt and PowerShell) 
</div>

```bash

1)Swagger - yarn add @nestjs/swagger swagger-ui-express

2) TypeORM - yarn add typeorm @nestjs/typeorm

3) MySQL Driver - yarn add mysql2

4) Bcrypt - yarn add bcrypt
- yarn add -D @types/bcrypt

5) Passport JS - yarn add passport passport-jwt @nestjs/jwt @nestjs/passport
- yarn add -D @types/passport-jwt

6) yarn add class-validator class-transformer

```

---
