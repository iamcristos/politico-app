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
    fetch(url, fetchMethod)
        .then((res)=> res.json())
        .then((data)=> {
            console.log(data)
            if (data.status === 401) {
                const li = document.createElement('li');
                const ul = document.getElementById('errMsg');
                li.innerText = data.message;
                ul.append(li);
            } else if(data.status === 400){
                const li = document.createElement('li');
                const ul = document.getElementById('errMsg');
                li.innerText = data.message;
                ul.append(li);
            } else {
                const admin = data.data[0].user.isadmin;
                const user = data.data[0].user
                    console.log(user)
                sessionStorage.setItem('email', user.email);
                sessionStorage.setItem('firstname', user.firstname);
                sessionStorage.setItem('lastname', user.lastname)
                if (admin === true) {
                    const authAdmin = data.data[0].token
                    sessionStorage.setItem('adminToken', authAdmin);
                    sessionStorage.setItem('adminImage', data.data[0].user.passportUrl);
                    alert(`Login Succesfull 
                Welcome ${data.data[0].user.firstname}`)
                location.href='admin.html'
                } else{
                    const auth = data.data[0].token
                    console.log(data.data[0].user)
                    const id = data.data[0].user.id
                    sessionStorage.setItem('token', auth);
                    sessionStorage.setItem('id', id );
                    sessionStorage.setItem('image', data.data[0].user.passportUrl)
                    const confirm = sessionStorage.getItem('token');
                    alert(`Login Succesfull 
                    Welcome ${data.data[0].user.firstname}`)
                    location.href='newUser.html'
                }
                
            }
        })
    
});


