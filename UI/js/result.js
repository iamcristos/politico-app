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

const dp = document.getElementById('profileImg')
dp.src = `${userImage}`
const inputName = document.getElementById('names')
inputName.value = `${firstname} ${lastname}`;
const inputEmail = document.getElementById('emails')
inputEmail.value = mail


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
        const div = document.getElementById("seeResult");
        div.innerHTML += ''
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
                    const data = res.data;
                    data.forEach((data)=>{
                        console.log(data)
                        const candidate = data.name;
                        const candidateScore = data.count;
                        console.log(candidate, candidateScore);
                        const div = document.getElementById("seeResult");
                        const table = `<ul class='seeResult'>
                        <li> ${candidate}       ${candidateScore} </li>
                        </ul>`
                        div.innerHTML += table
                    })                 
                } else {
                    const div = document.getElementById("seeResult");
                    const li = `<ul class= 'seeResult'><li>${res.message}</li></ul>`
                    div.innerHTML += li
                }
            })
    }
})