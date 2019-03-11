const form= document.getElementById('form-group');
form.addEventListener('submit', (e) => {
    e.preventDefault()
    const firstname = form.elements['firstname'].value.trim();
    const lastname = form.elements['lastname'].value.trim();
    const othername = form.elements['othername'].value.trim();
    const email = form.elements['email'].value;
    const passportUrl = form.elements['passportUrl'].value;
    console.log(passportUrl)
    const phoneNumber = form.elements['phone'].value;
    const password= form.elements['password'].value
    const password2= form.elements['password2'].value
    const isadmin = true
    const errMsg = []
    try {
        if (firstname === '')  new Error('firstname required');
        if (lastname === '')  new Error('lastname is required');

    } catch (error) {
        console.log(errMsg)
        console.log(error)
        for (let i=0; i<error.length; i++){
            errMsg.push(error[i])
        }
        console.log(errMsg)
    }
    // fetching api
    const data ={firstname,lastname,othername,email,passportUrl,phoneNumber,password,password2,isadmin}
    const url = 'https://politicoapplication.herokuapp.com/api/v1/auth/signup';
    // this proxyurl was gotten from stack overflow 
    // const proxyurl = "https://cors-anywhere.herokuapp.com/";
    const fetchMethod = {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            'Accept': "application/json",
            'Content-Type': "application/json"
    }
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
});