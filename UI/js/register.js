
const createUser = (e) => {
    const ul = document.getElementById('msgErr');
    ul.innerHTML = ""
    e.preventDefault()
    const image = document.querySelector("input[type='file']");
    const firstname = document.getElementById('fn').value.trim()
    const lastname = document.getElementById('ln').value.trim()
    const othername = document.getElementById('on').value.trim()
    const email = document.getElementById('em').value.trim()
    const phoneNumber = document.getElementById('pn').value
    const password = document.getElementById('pass1').value
    const password2 = document.getElementById('pass2').value
    
    const errMsg = []
    try {
        if (firstname === '')  throw Error('firstname required');
        if (lastname === '')  throw Error('lastname is required');
        if (password != password2) throw Error('password must match')
    } catch (error) {
        
        console.log(error)
        const ul = document.getElementById('msgErr');
        let li = document.createElement('li')
        li.innerText = error
            ul.append(li)
        console.log(errMsg)
    }

    let userForm = new FormData();
    

    userForm.append('firstname', firstname)
    userForm.append('lastname', lastname)
    userForm.append('othername', othername)
    userForm.append('email', email)
    userForm.append('phoneNumber', phoneNumber)
    userForm.append('passportUrl', image.files[0])
    userForm.append('password', password)
    // fetching api
    
    const url = 'https://politicoapplication.herokuapp.com/api/v1/auth/signup';
    
    const fetchMethod = {
        method: "POST",
        body: userForm
    }
    fetch(url,fetchMethod)
        .then((res)=> res.json())
        .then((data)=>{            
            if (data.status === 400) {
                let message = data.message
                const ul = document.getElementById('msgErr');
                message.map((msg)=>{
                let li = document.createElement('li')
                li.innerText = msg
                   ul.append(li)
                });
             const div = document.getElementById('error')   
                
            } else{
                alert('registration successfull')
                location.href = 'userLogin.html'
            }
        })
        .catch((err)=> console.log(err))
    }

document.getElementById('form-group').addEventListener('submit', createUser);