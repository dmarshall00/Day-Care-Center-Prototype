export function Validation(values){
    let error = {}
    const password_pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,}$/;

    if(values.username === "")
    {
        error.username = "Name should not be empty";
    }
    // else if(test){}
    else{
        error.username = "";
    }

    if(values.password === "")
    {
        error.password = "Password should not be empty";
    }
    else if(password_pattern.test(values.password)){
        error.password = "Bad password";
    }
    else{
        error.password = "";
    }

    if(values.User === "")
    {
        error.User = 'Please select the user';
    }
    else
    {
        error.User = ''
    }

    return error;
}

export function CheckValidation(errors)
{
    return (errors.username === "" && errors.password === "" && errors.User === '');
}