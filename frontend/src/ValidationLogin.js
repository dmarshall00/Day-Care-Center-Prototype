function Validation(values){
    let error = {}
    const password_pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,}$/;

    if(values.user === "")
    {
        error.username = "Name should not be empty";
    }
    // else if(test){}
    else{
        error.username = "";
    }

    if(values.pwd === "")
    {
        error.password = "Name should not be empty";
    }
    else if(password_pattern.test(values.pwd)){
        error.password = "Bad password";
    }
    else{
        error.password = "";
    }
    return error;
}

export default Validation;