const confirm = sessionStorage.getItem('token');


if (!confirm) {
    location.href = 'userLogin.html'
}

const url = 'https://politicoapplication.herokuapp.com/api/v1/offices';
const fetchMethod = {
     method: 'GET',
     headers: {
        'x-access-token': confirm
     }
}

let showOffices = document.getElementById('office')
fetch(url,fetchMethod)
    .then((res)=>res.json())
    .then((res)=>{
        
        const offices = res.office;
        console.log(offices)
        offices.forEach((office)=>{
            showOffices.innerHTML += `<div id='electionResult'><a href='#' id=${office.id} class="result">${office.name}</a></div>`
        })
        
    })
    .catch((error)=>console.log(error))


document.addEventListener('click', (e)=>{
    if (e.target.classList.contains('result')) {
        const id = e.target.id
        console.log(id)
        const resultUrl = `https://politicoapplication.herokuapp.com/api/v1/${id}/result`
        const resultMethod = {
            method: 'GET',
            headers: {
                'x-access-token': confirm
            }
        };

        fetch(resultUrl,resultMethod)
            .then((res)=>res.json())
            .then((res)=>{
                console.log(res)
                if (res.status === 200) {
                    console.log(res)                   
                } else {
                    const ul = document.createElement('ul');
                    const li = document.createElement('li');
                    li.innerText = res.message
                    ul.innerHTML += li;
                }
            })
    }
})