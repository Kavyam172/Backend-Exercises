// ### **Exercise 4: User Profile Page with Route Parameters**

// - **Objective**: Learn to handle route parameters and display dynamic content based on user input.
// - **Instructions**:
//     - Create a route `/profile/:username` that accepts a `username` parameter.
//     - Render a profile page that dynamically shows the username passed in the URL.
//     - Add additional data like the user’s age and favorite hobby, which is hard-coded in the backend based on the `username`.
// - **Expected Output**: A page showing the user's profile, including their name, age, and hobby.
// - **Challenge**: Display different content based on the user’s `username`.
const express = require('express');
const app = express();
const port = 3000;

const users = {
    alice: { age: 23, hobby: 'swimming' },
    bob: { age: 25, hobby: 'reading' },
    charlie: { age: 21, hobby: 'painting' },
};

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('profile');
});

app.get('/profile/:username', (req, res) => {
    const { username } = req.params;
    const user = users[username];
    if (!user) {
        res.status(404).send('User not found');
    } else {
        res.render('index', { username, ...user });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
