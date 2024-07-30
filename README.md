# Pixel6

A React-based application to manage customer details, including the ability to add,read, update, and delete customer records. The application features step-by-step forms and dynamically colored customer cards based on the data provided.

## Table of Contents

- [Features](#features)
- [Demo](https://pixel6-by-satya.netlify.app/)
- [Installation](https://github.com/satya-prasanna-lenka/pixel6)


## Features

- **Add Customer Details**: Fill out a form with customer details such as PAN number, full name, email, mobile number, and address.
- **Update Customer Details**: Edit existing customer details with pre-filled forms.
- **Delete Customer Details**: Remove customer records with a confirmation prompt.
- **Dynamic Card Colors**: Customer cards are displayed with colors dynamically set based on the provided data (blue, green, yellow).
- **Validation**: Form validation for required fields and proper data formats.
- **Step-by-Step Form**: Easy navigation through multi-step forms.

## Demo

Check out the live demo of the app [here](https://pixel6-by-satya.netlify.app/)

## Installation

To run this project locally, follow these steps:

1. **Clone the repository**:
    ```bash
    git clone https://github.com/satya-prasanna-lenka/pixel6
    cd pixel6
    ```

2. **Install dependencies**:
    ```bash
    npm install
    ```

3. **Start the development server**:
    ```bash
    npm start
    ```

The application will be available at `http://localhost:5173`.

## Usage

### Adding a Customer

1. Click on the "Add Customer" button.
2. Fill in the customer details in the step-by-step form.
3. Click "Submit" to save the customer details.

### Updating a Customer

1. Click on the customer card you wish to update.
2. Edit the customer details in the form.
3. Click "Update" to save the changes.

### Deleting a Customer

1. Click on the delete button on the customer card.
2. Confirm the deletion in the prompt.

## Technologies Used

- **Frontend**: React, CSS
- **Backend**: N/A (Using local storage for data persistence)
- **Libraries**: Axios, React Router, React Toastify
