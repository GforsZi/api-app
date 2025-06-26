# api-app using express and prisma

Basic crud application using express for javascript framework and prisma for database orm.

## How to install

1.  clone github repo
    `git clone https://github.com/GforsZi/api-app.git`
2.  select repo and install dependencies
    `cd api-app`
    `npm install`
3.  open vscode
    `code .`
4.  create file .env and copy all text in .env.example to .env
5.  make your own config
6.  generate prisma client
    `npx prisma generate`
7.  run the project
    `npm run dev`
8.  basic testing using crul
    `curl -X GET localhost:<port>/api/v1/users`
