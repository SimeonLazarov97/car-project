# Setup

You will need to install Node version 14 and Docker
  - to download Node visit https://nodejs.org/en/download/
  - to download Docker visit https://www.docker.com/products/docker-desktop/

## Database setup

1. run 
```docker pull postgres```

2. check your images by running 
```docker images```

3. run the container
```docker run -d -e POSTGRES_USER=test -e POSTGRES_PASSWORD=password123 --name test-database -p 5432:5432  --restart=always postgres```

4. for database tool you can use any tool, but if you don't have any installed, you can set it up easily by running another container with pgadmin with the following commands 

4.1 ```docker pull dpage/pgadmin4```

4.2 ```docker run  -p 80:80  -e 'PGADMIN_DEFAULT_EMAIL=user@test.com'  -e 'PGADMIN_DEFAULT_PASSWORD=SuperSecret'  --name dev-pgadmin  -d dpage/pgadmin4```

5. list both containers
```docker container ls```

6. to copy the IP Address of the database run
```docker inspect test-database -f "{{json .NetworkSettings.Networks}}"```

the response should look like this:
```{"bridge":{"IPAMConfig":null,"Links":null,"Aliases":null,"NetworkID":"a56ae546bc08f53b50613ded1a2f6e47e861054df76edd787febbc8bbbc73fa7","EndpointID":"4f924af02920209af3e0ed99e8a533ac872badd376496e6db7b75267165bb67f","Gateway":"172.17.0.1","IPAddress":"172.17.0.2","IPPrefixLen":16,"IPv6Gateway":"","GlobalIPv6Address":"","GlobalIPv6PrefixLen":0,"MacAddress":"02:42:ac:11:00:02","DriverOpts":null}}```

7. After youn copy the IP Address open your browser and go to `localhost:80`, then you should type the user email and the password you wrote when running the container (pgadmin container). After a successful login click "add new server". On general type choose a name and then on connection tab paste the IP Address value in the host. Port is 5432, maintanance database is postgres and if you follow me along user should be test and password should be password123.

## Server app

1. install npm packages
```npm i```

2. create .env from .env.sample file and add the proper url and port

3. run the app
```npm start```

4. After all tables are created, stop the app and run the seeds
```npx sequelize db:seed:all```

5. then you can run the backend again 

## Client app

1. go to the client folder and run `npm i`

2. create new file from .env.sample called .env and place the url from the server there.

3. run `npm run dev`