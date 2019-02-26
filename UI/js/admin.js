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

if (!adminToken) {
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
                <a class="grid" id=${party.id} href="#">EDIT</a>
                <button class="deleteGridBtn" id=${party.id} href="#">DELETE</button>
                </div> ` 
               
            })
        }
    }).catch((err)=> console.log(err))


// const btn = document.querySelectorAll(".deleteGridBtn")
// delete a party
const btn = document.getElementsByTagName("button")
 console.log(btn)
 document.addEventListener('click', (event)=> {
    if ( event.target.classList.contains( 'deleteGridBtn' ) ) {
        console.log('hello')
        const id= event.target.id
        const url =  `https://politicoapplication.herokuapp.com/api/v1/parties/${id}`
        console.log(url)
    const fetchMethod = {
        method: 'DELETE',
        headers: {
            'x-access-token': adminToken,
            'Accept': "application/json",
            'Content-Type': "application/json"
        }
    };
    fetch(url,fetchMethod)
        .then((res)=>res.json())
        .then((party)=>{
            console.log(party)
            if (party.status===200) {
                alert(`${party.party[0].name} ${party.message}`);
                location.href = 'admin.html'
            }
        }) 

}   
},false );

// Edit political party
document.addEventListener('click', (e)=>{
    if (e.target.classList.contains('grid')) {
        console.log('hello Edit')
        const id= event.target.id
        const form = document.getElementById('edit')
        console.log(form)
        form.classList.toggle('form');
        // edit
        console.log(id)
        form.addEventListener('submit', (e)=>{
            e.preventDefault()
            console.log(id)
            const url =  `https://politicoapplication.herokuapp.com/api/v1/parties/${id}`
            const name = form.elements['party'].value.trim()
            console.log(name)
            const body = {name}
            console.log(body)
            console.log(url)
            const fetchMethod = {
            method: 'PATCH',
            headers: {
                'x-access-token': adminToken,
                'Accept': "application/json",
                'Content-Type': "application/json"
            },
            body: JSON.stringify(body)
        };
        // fetch request
        fetch(url,fetchMethod)
            .then((res)=>res.json())
            .then((party)=>{console.log(party)
            if (party.status===200) {
                alert(`${party.message[0].name} changed successfully`)
                location.href = 'admin.html' 
            } else if(party.status===404) {
                alert('Party already exist')
                location.href = 'admin.html'
            }
            })
        })
        
    }
}, false)
   
   