## Local project setup steps

- Clone this repo to your local machine
- Create ```.env``` file based on ```.example.env``` and fill out following variables: ```POSTGRES_PASSWORD,PGADMIN_EMAIL,PGADMIN_PASSWORD,PORT```

- Run ```docker compose up --build```
- Open pgAdmin on ```http://localhost:5050/``` and set up new server
- Fill out remaining variables in ```.env``` file
- Open Swagger on ```http://localhost:3000/api#```

