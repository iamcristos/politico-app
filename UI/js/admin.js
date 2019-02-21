// Admin page
const div = document.getElementById('get-party');
const adminToken = sessionStorage.getItem('token');

const url =  'https://politicoapplication.herokuapp.com/api/v1/parties';
const fetchMethod = {
    method: 'GET',
    headers: {
        'x-access-token': adminToken
    }
} 

if (!confirm) {
    alert('unathourized')
    location.href = 'userLogin.html'
}

fetch(url,fetchMethod)
    .then((res)=> res.json())
    .then((data)=>{
        console.log(data)
        const parties = data.party;
        if (data.status === 200) {
            parties.forEach((party)=>{
                div.innerHTML += `<div><h3>NAME: ${party.name}</h3> <br>
                <h3>ADRESS: ${party.hqaddress}</h3> <br>
                <h3>Logourl: ${party.logourl}</h3> <br>
                <a class="grid" href="#">EDIT</a>
                <a class="grid" href="#">DELETE</a>
                </div> ` 
            })
        }
    }).catch((err)=> console.log(err))