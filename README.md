# Setup

You will need Node version 14 and Docker

## Database setup

then run the following command
```docker pull postgres```
you can check your images by running this command
```docker images```
run the container
```docker run -d -e POSTGRES_USER=test -e POSTGRES_PASSWORD=password123 --name test-database -p 5432:5432  --restart=always postgres```
for database tool you can use any tool, but if you dont have some installed you can set it up easy by running another container with pgadmin with following commands 
```docker pull dpage/pgadmin4```
```docker run  -p 80:80  -e 'PGADMIN_DEFAULT_EMAIL=user@test.com'  -e 'PGADMIN_DEFAULT_PASSWORD=SuperSecret'  --name dev-pgadmin  -d dpage/pgadmin4```
now you can list both containers like this
```docker container ls```
You can go and copy ip address of the database by running
```docker inspect test-database -f "{{json .NetworkSettings.Networks}}"```
the response should look like this:
```{"bridge":{"IPAMConfig":null,"Links":null,"Aliases":null,"NetworkID":"a56ae546bc08f53b50613ded1a2f6e47e861054df76edd787febbc8bbbc73fa7","EndpointID":"4f924af02920209af3e0ed99e8a533ac872badd376496e6db7b75267165bb67f","Gateway":"172.17.0.1","IPAddress":"172.17.0.2","IPPrefixLen":16,"IPv6Gateway":"","GlobalIPv6Address":"","GlobalIPv6PrefixLen":0,"MacAddress":"02:42:ac:11:00:02","DriverOpts":null}}```
you need to copy IPAddress
and let's test everything. Open your browser and go to `localhost:80`, then you should type the user email and the password you wrote when running the container. (pgadmin container).
After successful login click add new server. On general type choose a name and then on connection tab paste the IPAddress's value in the host, port is 5432, maintanance database is postgress and if you follow me along user should be test and password should be password123.

## Server app

first install npm packages
```npm i```

create .env from .env.sample file and add the proper url and port

then run the app
```npm start```

After all of the tables are created, stop the app and run the seeds
```npx sequelize db:seed:all```

after that you can run the backend again 

## Client app

go to the client folder and run `npm i`

then create new file from .env.sample called .env and place the url from the server there.

then run `npm run dev`