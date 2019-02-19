const form= document.getElementById('form-group')

form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const email = form.elements['email'].value.trim()
    console.log(email)
    const password = form.elements['password'].value
    const body = {email,password}
    const url = 'https://politicoapplication.herokuapp.com/api/v1/auth/login';
    // proxyurl was gotten from stackoverflow to fix cors access
    const proxyurl = "https://cors-anywhere.herokuapp.com/"
    const fetchMethod = {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
                'Accept': "application/json",
                'Content-Type': "application/json",
        }
    }
    fetch(proxyurl+ url, fetchMethod)
        .then((res)=> res.json())
        .then((data)=> {
            console.log(data)
            if (data.status === 401) {
                const li = document.createElement('li');
                const ul = document.getElementById('errMsg');
                li.innerText = data.message;
                ul.append(li);
            } else {
                const auth = data.data[0].token
                localStorage.setItem('token', auth);
                const confirm = localStorage.getItem('token');
                alert(`Login Succesfull 
                Welcome ${data.data[0].user.firstname}`)
                location.href='newUser.html'
            }
        })
    
});


