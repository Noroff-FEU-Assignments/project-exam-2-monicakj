# Project Exam 2

## Brief
An existing Social Media company has approached you to create a brand new front end for their application. While they have a list of required features, the design and user experience has not been specified. Working with the official API documentation, plan, design and build a modern front end social media application.

### API
The API that are used for this project can be found under [Social EndPoints](https://nf-api.onrender.com/docs/static/index.html) in the [Noroff API documentation](https://noroff-api-docs.netlify.app/).

## Description 
SoMe are a social media platform where users can share travel posts and images.

## Resource and URL
<table>
  <thead>
    <tr>
      <th>Resource</th>
      <td>URL</td>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>Gantt Chart</th>
      <td>https://sharing.clickup.com/43294187/g/h/1997fb-484/257a8c0c6b91b87</td>
    </tr>
    <tr>
      <th>Design Prototype</th>
      <td>https://www.figma.com/file/4ndbTBPePsVkcvWum6NXbd/Project-Exam-2---SoMe-(Prototype)?t=kASaQPSay3SzjIWS-1</td>
    </tr>
    <tr>
      <th>Style Guide</th>
      <td>https://www.figma.com/file/5OJ4kL6ENv51WchSHFOUhC/Project-Exam-2---SoMe-(Style-Guide)?node-id=0%3A1&t=kASaQPSay3SzjIWS-1</td>
    </tr>
    <tr>
      <th>Trello Board</th>
      <td>https://trello.com/invite/b/E4XvkEbI/ATTI0dd52c0468c3da50c8e37cdb98e5cd745029A8F3/project-exam-2-some</td>
    </tr>
    <tr>
      <th>Repository</th>
      <td>https://github.com/Noroff-FEU-Assignments/project-exam-2-monicakj.git</td>
    </tr>
    <tr>
      <th>Hosted Demo</th>
      <td>https://the-some-company.netlify.app/</td>
    </tr>
  </tbody>
</table>

## Built With
- React 18.2.0

## Node Modules
### Dependencies:
- "@hookform/resolvers": "^2.9.10"
- "@testing-library/jest-dom": "^5.16.5"
- "@testing-library/react": "^13.4.0"
- "@testing-library/user-event": "^13.5.0"
- "@types/prop-types": "^15.7.5"
- "axios": "^1.1.3"
- "bootstrap": "^5.2.2"
- "emoji-picker-react": "^4.4.5"
- "moment": "^2.29.4"
- "prop-types": "^15.8.1"
- "react": "^18.2.0"
- "react-bootstrap": "^2.5.0"
- "react-dom": "^18.2.0"
- "react-hook-form": "^7.39.1"
- "react-icons": "^4.7.1"
- "react-router-dom": "^6.4.3"
- "react-scripts": "5.0.1"
- "sass": "^1.55.0"
- "web-vitals": "^2.1.4"
- "yup": "^0.32.11"

## Getting Started

### Installing
1. Clone the repo with GitHub Desktop. 
2. Open the repo in Visual Studio Code. 

### Running the app
To run the app, run the following commands in VS Code Terminal:
- npm install
- npm run start

The app will be running through your localhost on port 3000.

## Access
### Login 
- Enter a valid stud.noroff.no or noroff.no email adddress.
- Enter password. 

### Register New User
- Enter name. 
- Enter a valid stud.noroff.no or noroff.no email address.
- Enter password. 

## Summary
### Running
To run the app, run the following commands in VS Code Terminal:

```bash
npm install
```
and then,

```bash 
npm run start
```
The app will be running through your localhost on port 3000.

## Access
### Login
- Enter a valid stud.noroff.no or noroff.no email adddress.
- Enter password (the password must be at least 8 characters).

### Register
- Enter name (the name value must not contain punctuation symbols apart from underscore).
- Enter a valid stud.noroff.no or noroff.no email address.
- Enter password (the password must be at least 8 characters).

## Summary
Project Exam 2 is the final project exam in my two-year front-end studies at Noroff. 
This project assignment has been fun, but also challenging due to facing multiple errors and having a hard time to figure out how to develop the entire app using JS. There have been some frustrating hours behind the computer, but I think I managed to check the requirements of the assignment. 

Even though I faced an error on Netlify (more info below) I am pleased with the final result of the app. There is always room for improvements on the app and I could add more details (images and etc.) on each page, but one thing that I have learned throughout the studies is that working with developing websites/app is a work in progress. I look forward to learn more about the development field and experiment more with developing websites/app in the future.

### Error
- An error message will appear on Netlify when trying to navigate to the Post Details page (/posts/:id) or the Profile Details page (/profile/:name) via the Latest Posts page. The Build folder has probably something to do with this error. When navigating on the Latest Posts page you won't be able to click on the "View Posts" button or the creator of the post. 

Here is how you can navigate to the Post Details page and Profile Details page via Netlify: 
- **Post Details page** (through My Profile page -> "My Posts" section)
- **Profile Details page** (through Find Friends page -> "Visit Profile" button)
