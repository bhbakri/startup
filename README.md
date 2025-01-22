# Daily Quiz!

[My Notes](notes.md)

Dailyquiz.click is a website that has the user do daily questions and try to keep their streak going by doing the daily quizzes consistently and by not failing to answer the question correctly each day. The website will also include a leaderboard to see other users' high streaks.

## 🚀 Specification Deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [x] Proper use of Markdown
- [x] A concise and compelling elevator pitch
- [x] Description of key features
- [x] Description of how you will use each technology
- [x] One or more rough sketches of your application. Images must be embedded in this file using Markdown image references.

### Elevator pitch

This website is designed to challenge your general knowledge on any and all subjects by being asking a question about a random topic each day. The website is also a form of education that has the user either do their own research to answer the question, or find out new information by seeing which is the correct answer for the question of that specific day. By using a daily streak format. The website also motivates users to try and keep their streak alive while also competing with their friends, further motivating all users to continue educating themselves.

### Design
This is the login and Signup pages.

![Design image](Design-Login.png)![Design image](Design-Signup.png)

This is the page where the user will answer the question of the day.
![Design image](Design-Question.png)

This is where the user will be able to see other people's streaks.
![Design image](Design-Streak.png)


```mermaid
sequenceDiagram
    actor You
    You-->Login: Enter the website
    Login-->Signup: Create an account
    Signup-->Login: Account created
    Login-->Daily Question: Redirected to question of the day
    Daily Question-->Leaderboard: Access current streak leaderboard
```

### Key features

- The website being able to select random questions every day from third party
- Keeping track of the number of days you've gotten the question correct
- A leaderboard that keeps track of and organizes the top user's streaks

### Technologies

I am going to use the required technologies in the following ways.

- **HTML** - The HTML will be used to design the main structure and layout of the website.
- **CSS** - The CSS will be used to improve the visual appeal of the website's structure. It will also to ensure that the website is visually appealing regardless of the device used, such as a laptop or mobile phone.
- **React** - React will be used to find out what answer for the question the user selected is correct or not, while also handling whether their streak needs to increase or end.
- **Service** - The service will be used to handle the information used to login or create a new account as well as submitting the user's score and updating their streak.
- **DB/Login** - A database will be used to handle authenticating a user's login or creating a new user.
- **WebSocket** - TWebsocket will be used to provide the up-to-date leaderboard.

## 🚀 AWS deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [x] **Server deployed and accessible with custom domain name** - [My server link](https://dailyquiz.click).

## 🚀 HTML deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] **HTML pages** - I did not complete this part of the deliverable.
- [ ] **Proper HTML element usage** - I did not complete this part of the deliverable.
- [ ] **Links** - I did not complete this part of the deliverable.
- [ ] **Text** - I did not complete this part of the deliverable.
- [ ] **3rd party API placeholder** - I did not complete this part of the deliverable.
- [ ] **Images** - I did not complete this part of the deliverable.
- [ ] **Login placeholder** - I did not complete this part of the deliverable.
- [ ] **DB data placeholder** - I did not complete this part of the deliverable.
- [ ] **WebSocket placeholder** - I did not complete this part of the deliverable.

## 🚀 CSS deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] **Header, footer, and main content body** - I did not complete this part of the deliverable.
- [ ] **Navigation elements** - I did not complete this part of the deliverable.
- [ ] **Responsive to window resizing** - I did not complete this part of the deliverable.
- [ ] **Application elements** - I did not complete this part of the deliverable.
- [ ] **Application text content** - I did not complete this part of the deliverable.
- [ ] **Application images** - I did not complete this part of the deliverable.

## 🚀 React part 1: Routing deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] **Bundled using Vite** - I did not complete this part of the deliverable.
- [ ] **Components** - I did not complete this part of the deliverable.
- [ ] **Router** - Routing between login and voting components.

## 🚀 React part 2: Reactivity

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] **All functionality implemented or mocked out** - I did not complete this part of the deliverable.
- [ ] **Hooks** - I did not complete this part of the deliverable.

## 🚀 Service deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] **Node.js/Express HTTP service** - I did not complete this part of the deliverable.
- [ ] **Static middleware for frontend** - I did not complete this part of the deliverable.
- [ ] **Calls to third party endpoints** - I did not complete this part of the deliverable.
- [ ] **Backend service endpoints** - I did not complete this part of the deliverable.
- [ ] **Frontend calls service endpoints** - I did not complete this part of the deliverable.

## 🚀 DB/Login deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] **User registration** - I did not complete this part of the deliverable.
- [ ] **User login and logout** - I did not complete this part of the deliverable.
- [ ] **Stores data in MongoDB** - I did not complete this part of the deliverable.
- [ ] **Stores credentials in MongoDB** - I did not complete this part of the deliverable.
- [ ] **Restricts functionality based on authentication** - I did not complete this part of the deliverable.

## 🚀 WebSocket deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] **Backend listens for WebSocket connection** - I did not complete this part of the deliverable.
- [ ] **Frontend makes WebSocket connection** - I did not complete this part of the deliverable.
- [ ] **Data sent over WebSocket connection** - I did not complete this part of the deliverable.
- [ ] **WebSocket data displayed** - I did not complete this part of the deliverable.
- [ ] **Application is fully functional** - I did not complete this part of the deliverable.
