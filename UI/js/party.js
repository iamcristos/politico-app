const adminToken = sessionStorage.getItem('adminToken');
const adminImage = sessionStorage.getItem('adminImage');
const firstname = sessionStorage.getItem('firstname');
const lastname = sessionStorage.getItem('lastname');
const mail = sessionStorage.getItem('email');
const image = document.getElementById('pic')
image.src= `${adminImage}`;
const names = document.getElementById('fullname');
names.innerText = `${firstname} ${lastname}`;
const email = document.getElementById('email');
email.innerText = `${mail}`;

if (!adminToken) {
    location.href = 'userLogin.html'
    // alert('unathourized')
}

const form = document.getElementById('form-group');
const input = document.getElementById("submit-form");

input.addEventListener('click', ()=>{
    const divErr = document.getElementById('err');
    const divSucc =  document.getElementById('success');
    divErr.innerHTML = ''
    divSucc.innerHTML = ''
});

const createParty = (e)=>{
    e.preventDefault()
    const name = form.elements['name'].value.trim();
    const hqAddress = form.elements['hqAddress'].value.trim();
    const logourl = form.elements['logourl'].files[0];

    let newParty = new FormData()
    newParty.append('name', name);
    newParty.append('hqAddress', hqAddress);
    newParty.append('logourl', logourl)
    const url =  'https://politicoapplication.herokuapp.com/api/v1/parties'
    
    const fetchMethod = {
        method: 'POST',
        headers: {
            'x-access-token': adminToken
        },
        body: newParty
    } 

    fetch(url,fetchMethod)
        .then((res)=>res.json())
        .then((data)=>{
            console.log(data)
            if (data.status === 400){
                const messages = data.msg;
                messages.forEach((msg)=>{
                    const divErr = document.getElementById('err');  
                    divErr.innerHTML += `<ul>
                    <li>${msg}</li>
                    </ul>`
                })
            } else if(data.status=== 422){
                const msg = data.message;
                const divErr = document.getElementById('err');  
                    divErr.innerHTML += `<ul>
                    <li>${msg}</li>
                    </ul>`
            } else {
                console.log(data)
                const divSucc =  document.getElementById('success');
                const msg = data.message;  
                    divSucc.innerHTML += `<ul>
                    <li>${data.party.name}
                    ${msg}</li>
                    </ul>`
            }

        })
        .catch((err)=>{
            console.log(err)
        })
}

form.addEventListener('submit', createParty);