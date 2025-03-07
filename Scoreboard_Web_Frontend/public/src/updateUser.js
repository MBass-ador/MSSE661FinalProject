import { AUTH_API } from './auth.service.js';

const getUpdateValues = () => {
    const username = document.getElementById('formInputUsername').value;
    const newUsername = document.getElementById('formInputUsernameUpdate').value;
    const email = document.getElementById('formInputEmail').value;
    const password = document.getElementById('formInputPassword').value;

    return {
        username,
        newUsername,
        email,
        password
    };
};

const validate = () => {
    const { username, newUsername, email, password } = getUpdateValues();

    if (!username || !newUsername || !email || !password) {
        alert('please fill in: existing username, new username, email, and password to update your data');
        return;
    }

    return {username, newUsername, email, password};
}

const resetFormFields = () => {
    document.getElementById('formInputUsername').value = '';
    document.getElementById('formInputUsernameUpdate').value = '';
    document.getElementById('formInputEmail').value = '';
    document.getElementById('formInputPassword').value = '';
}


const updateUser = async (e) => {
    e.preventDefault();

    const values = validate();
    if (!values) return;

    const { username, newUsername, email, password } = values;

    try {
        console.log('updating user data for', username, ':', newUsername, email, password);
        const response = await fetch(`${AUTH_API}/update`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, newUsername, email, password })
        });

        console.log('Request sent to:', `http://localhost:3000/api/auth/update`);
        console.log('Request payload:', { username, newUsername, email, password });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        if (data.error) {
            alert(data.error);
        } else {
            // success
            alert("user data updated successfully");
            resetFormFields();
        }
    } catch (error) {
        console.error(error);
        alert('unable to process data update, please try again')
    }
};

// attach updateUser to the form submit event
document.getElementById('updateForm').addEventListener('submit', updateUser);