const adminToken = sessionStorage.getItem('token');
if (!adminToken) {
    alert('unathourized')
    location.href = 'userLogin.html'
}

const form = document.getElementById('form-group');
form.addEventListener('click',(e)=>{
    const divErr = document.getElementById('err');
    const divSucc = document.getElementById('success');
    divErr.innerHTML = ""
    divSucc.innerHTML = "" 
})

const userUrl = `https://politicoapplication.herokuapp.com/api/v1/users`
// Fetch all users
fetch(userUrl)
    .then((res)=>res.json())
    .then((user)=>{
        if(user.status === 200){
            const users = user.user;
            users.forEach((user)=>{
                const usersSelect = form.elements['user'];
                const id = user.id;
                usersSelect.innerHTML += `<option value=${id}>${user.firstname} ${user.lastname}</option>`
            })
        }
    });

// fetch all parties
const partyUrl = `https://politicoapplication.herokuapp.com/api/v1/parties`
console.log(adminToken)
const getFetch = {
    method: 'GET',
    headers: {
    'x-access-token': adminToken,
    'Accept': "application/json",
    'Content-Type': "application/json"
    }
}
fetch(partyUrl,getFetch)
    .then((res)=>res.json())
    .then((parties)=>{
        console.log(parties)
        if (parties.status === 200){
            const party = parties.party;
            party.forEach((party)=>{
                console.log(party)
                const partySelect = form.elements['party'];
                const id = party.id;
                partySelect.innerHTML += `<option value=${id}>${party.name}</option>`
            })
        }
    });

// Fetch offices
const officeUrl = `https://politicoapplication.herokuapp.com/api/v1/offices`
fetch(officeUrl,getFetch)
    .then((res)=>res.json())
    .then((office)=>{
        // console.log(office)
        if(office.status === 200){
            const offices = office.office;
            offices.forEach((office)=>{
                // console.log(office)
                const id = office.id;
                const officeSelect = form.elements['office'];
                officeSelect.innerHTML += `<option value=${id}>${office.type}: ${office.name}</option>`
            })
        }
    });
    
// create candidate
console.log(form)
form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const candidate = form.elements['user'].value
    console.log(candidate)
    const party = form.elements['party'].value
    const office = form.elements['office'].value
    const id = office
    const url = `https://politicoapplication.herokuapp.com/api/v1/office/${id}/register`
    const body = {candidate,party,office}
    const fetchCandidate = {
        method: 'POST',
        headers: {
        'x-access-token': adminToken,
        'Accept': "application/json",
        'Content-Type': "application/json"
        },
        body: JSON.stringify(body)
    };

    fetch(url,fetchCandidate)
        .then((res)=>res.json())
        .then((candidate)=>{
            console.log(candidate)
            if (candidate.status === 400){
                const msg = candidate.message
                msg.forEach((msg)=>{
                    const div = document.getElementById('err');
                    div.innerHTML += `<ul><li>${msg}</li></ul>`
                })
            } else if(candidate.status === 422){
                const msg = candidate.message
                    const div = document.getElementById('err');
                    div.innerHTML += `<ul><li>${msg}</li></ul>`
            } else {
                const msg = candidate.message
                const div = document.getElementById('success');
                 div.innerHTML += `<ul><li>${msg}</li></ul>`
            }
        })
})
    