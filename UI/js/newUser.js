const confirm = sessionStorage.getItem('token');
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
     alert('unathourized')
     location.href = 'userLogin.html'
 }

 fetch(proxyurl+url, fetchMethod)
    .then((res)=>res.json())
    .then((data)=> {console.log(data.party)
        const div = document.getElementById('item-grid');
        const divContainer = document.getElementById('grid-party')
        const name = document.createElement('h3');
        const address = document.createElement('h3');
        const logourl = document.createElement('h3');
        // let h2 = document.createElement('h3');
        if (data.status === 200) {
            console.log(data)
            const res = data.party;
            res.forEach((party)=>{
                console.log(party)
            divContainer.innerHTML += `<div><h3>NAME: ${party.name}</h3> <br>
            <h3>ADRESS: ${party.hqaddress}</h3> <br>
            <h3>Logourl: ${party.logourl}</h3> 
            </div> ` 
            })
        }
    })
    .catch((err)=> console.log(err))
