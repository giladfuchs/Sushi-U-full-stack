export const name = {
    elementType: "input",
    elementConfig: {
        type: "text",
        placeholder: "Your Name",
    },
    value: "",
    validation: {
        required: true,
        minLength: 3,
    },
    valid: false,
    touched: false,
};
export const email = {
    elementType: "input",
    elementConfig: {
        type: "email",
        placeholder: "Mail address",
    },
    value: "",
    validation: {
        required: true,
        isEmail: true,
    },
    valid: false,
    touched: false,
};
export const password = {
    elementType: "input",
    elementConfig: {
        type: "password",
        placeholder: "Password",
    },
    value: "",
    validation: {
        required: true,
        minLength: 6,
    },
    valid: false,
    touched: false,
};

export const orderMethod = {
    elementType: "select",
    elementConfig: {
        options: [
            { value: "take away", displayValue: "Take Away" },
            { value: "delivery", displayValue: "Delivery" },
        ],
    },
    value: "take away",
    validation: {},
    valid: true,
};