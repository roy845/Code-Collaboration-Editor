# Collaboration Code Editor

This project implements code editor that each user that is signed up and logged in can share. there is also admin dashboard for managing code rooms,users and roles.

## Table of Contents

- [Project Overview](#project-overview)
- [Architecture Design](#architecture-design)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Screenshots](#screenshots)

## Project Overview

The <b> Collaboration Code Editor </b> is a web-based platform that allows users to collaboratively write, edit, and manage code in real time. The platform provides features such as code sharing, syntax highlighting, and live updates, making it an ideal tool for developers working in teams or conducting coding interviews. Users can sign up, log in, and create or join code rooms to collaborate seamlessly. Additionally, the platform includes an admin dashboard where administrators can manage code rooms, users, and their roles efficiently. This project aims to foster collaboration, enhance productivity, and streamline team workflows by providing an intuitive and interactive coding environment.

## Architecture Design

![alt text](assets/code-collaboration-editor-system-achitecture.png)

## Technologies Used

| **Technology**     | **Logo**                                                                                                                                                                      |
| ------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Docker**         | <img src="https://icon-icons.com/icons2/2699/PNG/512/docker_official_logo_icon_169250.png" width="100px" height="100px">                                                      |
| **Docker Compose** | <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7swv72e-AJAfT3hZdULsmYXetYSldgE78ag&s" width="100px" height="100px">                                         |
| **React**          | <img src="https://upload.wikimedia.org/wikipedia/he/a/a7/React-icon.svg" width="100px" height="100px">                                                                        |
| **Redux**          | <img src="https://www.svgrepo.com/show/303557/redux-logo.svg" width="100px" height="100px">                                                                                   |
| **TailwindCSS**    | <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_BuIzY141a5nIZoGEQkFYPN_f3bQddC4uu5ctRPO1Ftp6BNy_iV5foebwEIYesnZLA6c&usqp=CAU" width="100px" height="100px"> |
| **TypeScript**     | <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTuiTDrB4jE3RaO72W0feOQP1XcZhjTrOBuYcqcXNSIQKeOx4iaA75cEZVN5BDrkQcLYK0&usqp=CAU" width="100px" height="100px"> |
| **NodeJS**         | <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6Hd-Hz0vOuWyFXYO3xUrG4_bJQ0wcmd-DtA&s" width="100px" height="100px">                                         |
| **ExpressJS**      | <img src="https://cdn.groovetechnology.com/wp-content/uploads/2023/08/expressjs.png" width="100px" height="100px">                                                            |
| **SocketIO**       | <img src="https://ik.imagekit.io/ably/ghost/prod/2021/03/socket-io-logo-1.jpeg?tr=w-1728,q-50" width="100px" height="100px">                                                  |

## Installation

Clone the repository and ensure you have the latest NodeJS and VSCODE MongoDB Compass (if you want to use mongodb locally) installed on your machine.

- <b> git clone </b> https://github.com/roy845/Code-Collaboration-Editor.git

<b> Client </b>

<b>1.</b> Type the command <b> cd client </b> in the terminal to change to client directory.
<b>2.</b> Type <b> npm install </b> <b> OR </b> <b> npm i </b> (for short) in the terminal to install the project dependecies.
<b>3.</b> Type <b> npm start </b> to start the local development server.

<b> Server </b>

<b>1.</b> Type the command <b> cd server </b> in the terminal to change to server directory.
<b>2.</b> Create <b> .env </b> file at the root of the server directory with these fields:

<b> PORT=
MONGO_INITDB_ROOT_USERNAME=
MONGO_INITDB_ROOT_PASSWORD=
MONGO_URL=
JWT_SECRET=
JWT_EXPIRES_IN=
JWT_REFRESH_TOKEN_EXPIRES_IN=
EMAIL_USERNAME=
EMAIL_PASSWORD= </b>

<b>3.</b> Type the command <b> npm install </b> <b> OR </b> <b> npm i </b> (for short) in the terminal to install the project dependecies.
<b>4.</b> Type the command <b> docker-compose up -d </b> in the terminal to run the MongoDB container in detached mode.
<b>5.</b> Type npm <b> run dev </b> to start the local development server.

## Screenshots

<b> Auth </b>

<b> Login Page </b>
![alt text](assets/image.png)

<b> Register Page </b>
![alt text](assets/image-1.png)

<b> Forgot Password Page </b>
![alt text](assets/image-2.png)

<b> Reset Password Page </b>
![alt text](assets/image-3.png)

<b> Home (Join/Create Room) </b>
![alt text](assets/image-4.png)

<b> Code Editor </b>
![alt text](assets/image-5.png)

<b> Profile </b>
![alt text](assets/image-7.png)

<b> Admin </b>
![alt text](assets/image-6.png)

<b> Admin/Rooms </b>
![alt text](assets/image-8.png)

<b> Admin/Rooms Graph Count </b>
![alt text](assets/image-14.png)

<b> Admin/Room Details </b>
![alt text](assets/image-11.png)

<b> Admin/Users </b>
![alt text](assets/image-9.png)

<b> Admin/Users Graph Count </b>
![alt text](assets/image-15.png)

<b> Admin/User Details </b>
![alt text](assets/image-12.png)

<b> Admin/Roles </b>
![alt text](assets/image-10.png)

<b> Admin/Roles Graph Count </b>
![alt text](assets/image-17.png)

<b> Admin/Role Details </b>
![alt text](assets/image-13.png)

<b> Admin/Create new Role </b>
![alt text](assets/image-16.png)
