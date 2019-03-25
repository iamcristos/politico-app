const confirm = sessionStorage.getItem('token');
const userImage= sessionStorage.getItem('image')
const firstname = sessionStorage.getItem('firstname');
const lastname = sessionStorage.getItem('lastname');
const mail = sessionStorage.getItem('email');
const image = document.getElementById('pic')
image.src= `${userImage}`;
const names = document.getElementById('fullname');
names.innerText = `${firstname} ${lastname}`;
const email = document.getElementById('email');
email.innerText = `${mail}`;

const url = 'https://politicoapplication.herokuapp.com/api/v1/parties';
 // this proxyurl was gotten from stack overflow 
 const proxyurl = "https://cors-anywhere.herokuapp.com/";
 const fetchMethod = {
     method: 'GET',
     headers: {
        'x-access-token': confirm
     }
 }

 if (!confirm) {
     location.href = 'userLogin.html'
 }

 fetch(proxyurl+url, fetchMethod)
    .then((res)=>res.json())
    .then((data)=> {console.log(data.party)
        const div = document.getElementById('item-grid');
        const divContainer = document.getElementById('grid-party')
        if (data.status === 200) {
            console.log(data)
            const res = data.party;
            res.forEach((party)=>{
                console.log(party)
            divContainer.innerHTML += `<div><h3>NAME: ${party.name}</h3> <br>
            <h3>ADRESS: ${party.hqaddress}</h3> <br>
            <img src=${party.logourl}> 
            </div> ` 
            })
        }
    })
    .catch((err)=> console.log(err))
