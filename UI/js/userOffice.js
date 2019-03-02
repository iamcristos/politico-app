const confirm = sessionStorage.getItem('token');
const url = 'https://politicoapplication.herokuapp.com/api/v1/offices';
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

fetch(url,fetchMethod)
    .then((res)=>res.json())
    .then((data)=>{
        console.log(data)
        if (data.status === 200){
            const offices = data.office
            offices.forEach((office)=>{
                console.log(office)
                const div = document.getElementById('officeDiv');
                div.innerHTML += `<div class='vote'><a id=${office.id} href='#'>${office.name}</a></div>`
            })
        } else{
            const div = document.getElementById('officeDiv');
            div.innerHTML = `<h2>No Offices found</h2>`
        }
    })

// click to show candidate
