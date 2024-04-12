function Validation(values){
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
        error.password = "Name should not be empty";
    }
    else if(password_pattern.test(values.password)){

    }
    else{
        error.password = "";
    }
    return error;
}

export default Validation;