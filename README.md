[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-24ddc0f5d75046c5622901739e7c5dd533143b0c8e959d652212380cedb1ea36.svg)](https://classroom.github.com/a/6BOvYMwN)

# PeerPrep Group 26

## To access the project:

1. In your local machine, create a DNS resolution for the domain name `peer-prep-group-26.com` and IP address `34.36.225.131`.

- For `Windows`:
  - Open a terminal with administrative rights and navigate to the directory with the `/etc/hosts` file with
    ```
    cd C:\Windows\System32\drivers\etc\
    ```
  - and then open using any editor. For example using notepad:
    ```
    notepad hosts
    ```
  - add this line at the bottom of the file:
    ```
    34.36.225.131   peer-prep-group-26.com
    ```
- For `MacOS`:
  - Open a terminal and open the `/etc/hosts` file with a text editor with administrative rights. For example using nano:
    ```
    sudo nano /etc/hosts
    ```
  - add this line at the bottom of the file:
    ```
    34.36.225.131   peer-prep-group-26.com
    ```

2. Open a browser and access the application at `http://peer-prep-group-26.com` .

## To run the project locally:

- Using `docker compose`:
  1. First, ensure that the necessary environment variable files are present (the environment variables are located in the `Project-environmentVariables.txt` file in the submission for the "Sharing Assignment Private Info" Canvas assignment for Group 26).
  2. From the project root, navigate into the backend directory with `cd backend` then run:
     ```
     docker compose up
     ```
     Note: ensure that the Docker engine is running first to run Docker commands.
  3. From the project root, navigate into the frontend directory with `cd frontend` and install dependencies with `npm install` .
  4. then run:
     ```
     npm run dev
     ```
  5. Access the application from a browser at `http://localhost:3000` .
- Without using docker:
  1. First, ensure that the necessary environment variable files are present (the environment variables are located in the `Project-environmentVariables.txt` file in the submission for the "Sharing Assignment Private Info" Canvas assignment for Group 26).
  2. From the project root, navigate into the backend directory with `cd backend` then run each service individually:
     - User service:
       - install dependencies with `npm install` then run `npm run start`
     - AI service:
       - install dependencies with `npm install` then run `npm run start`
     - Question service:
       - install dependencies with `npm install` then run `npm run dev`
     - Matching service:
       - install dependencies with `npm install` then run `npm run dev`
     - Collaboration service:
       - install dependencies with `npm install` then run `npm run dev`
  3. From the project root, navigate into the frontend directory with `cd frontend` then run:
     ```
     npm run dev
     ```
  4. Access the application from a browser at `http://localhost:3000` .
