const loginForm = document.getElementById('login-form');
loginForm.addEventListener('submit', e => {
    e.preventDefault();
    const loginEmail = loginForm['email'].value;
    const loginPassword = loginForm['password'].value;
    if(loginEmail === "abchealthcare@gmail.com" && loginPassword === "abc@123")
    {
	    location = "maindashboard.html";
    }
    else
    {
	    location = "login-error.html";
    }
})

const showPass=(password)=>{
    const input=document.querySelector("#"+password);
    input.type="text"
}

const hidePass=(password)=>{
    const input=document.querySelector("#"+password);
    input.type="password"
}