# Finance Tracker Project

## Overview
A web application that provides insights into personal financial activities. Users can view account balances, recent transactions, and spending habits through interactive charts and graphs. The project uses React.js for the frontend, Express.js for the backend, and the Plaid API for example data.

## Built With
![Express]\
![React]\
![Plaid]

## Getting Started

1. Clone repo and install dependencies

    ```
    git clone
    npm install
    ```

2. Create a Plaid account and generate a Plaid client_id and secret


3. Rename or copy the `.env.example` file to `.env`
    ```
    cp .env.example .env
    ```
    Fill out `.env` file with Plaid credentials


    
4. Run project
    ```
    npm start
    ```

5. Enter `user_good` as the username, and `pass_good` as the password for Plaid Link authentication



[React]: https://img.shields.io/badge/REACT.js%20-%20%2320232A?style=for-the-badge&logo=react&link=https%3A%2F%2Freact.dev%2F
[Express]: https://img.shields.io/badge/Express.js-%23ffffff?style=for-the-badge&logo=express&logoColor=black&link=https%3A%2F%2Fexpressjs.com%2F
[Plaid]: https://img.shields.io/badge/Plaid%20-%20grey?style=for-the-badge
