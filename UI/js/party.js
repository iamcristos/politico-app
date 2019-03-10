const adminToken = sessionStorage.getItem('token');
if (!adminToken) {
    location.href = 'userLogin.html'
    // alert('unathourized')
}

const form = document.getElementById('form-group');
const input = document.getElementById("submit-form");
// const input = form.elements['input']
input.addEventListener('click', ()=>{
    const divErr = document.getElementById('err');
    const divSucc =  document.getElementById('success');
    divErr.innerHTML = ''
    divSucc.innerHTML = ''
});

const createParty = (e)=>{
    e.preventDefault()
    const name = form.elements['name'].value.trim();
    console.log(name)
    const hqAddress = form.elements['hqAddress'].value.trim();
    const logourl = form.elements['logourl'].value.trim();
    const url =  'https://politicoapplication.herokuapp.com/api/v1/parties'
    const body = {name,hqAddress,logourl}
    console.log(body)
    const fetchMethod = {
        method: 'POST',
        headers: {
            'x-access-token': adminToken,
            'Accept': "application/json",
            'Content-Type': "application/json"
        },
        body: JSON.stringify(body)
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
}

form.addEventListener('submit', createParty);