let form= document.getElementById('form-group')

form.addEventListener('submit', (e)=>{
    let email= form.elements['email'];
    let password= form.elements['password']
    let password2= form.elements['password2']
    let errorMsg= document.getElementById('error');
    if (email.value.length<1) {
        errorMsg.textContent='required';
        errorMsg.style.color= 'red'
        email.focus();
    } else if (password.value.length<1) {
        errorMsg.textContent='required';
        errorMsg.style.color= 'red'
        password.focus();
    } else if (password.value.length<1) {
        errorMsg.textContent='required';
        errorMsg.style.color= 'red'
        password2.focus();
    }

    else{
        location.href='userLogin.html'
    }
    e.preventDefault()
});

