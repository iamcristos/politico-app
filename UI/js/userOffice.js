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
        if (data.status === 200){
            const offices = data.office
            offices.forEach((office)=>{
                const div = document.getElementById('officeDiv');
                const officeName = [];
                officeName.push(office.name)
                div.innerHTML += `<div class='vote'><a class='officeId' id=${office.id} href='#'>${office.name}</a><br></div>`
            })
        } else{
            const div = document.getElementById('officeDiv');
            div.innerHTML = `<h2>No Offices found</h2>`
        }
    })

// click to show candidate
document.addEventListener('click', (e)=>{
    if (e.target.classList.contains('officeId')){
        console.log('u clicked a tag')
        const form = document.getElementById('form') 
        form.innerHTML = ''
        form.innerHTML = `<button type='submit'>Vote</button><br>`
        const officeId = e.target.id
        // console.log(officeId);
        const url = 'https://politicoapplication.herokuapp.com/api/v1/office/register';
        const fetchMethod = {
            method: 'GET',
            headers: {
                'x-access-token': confirm
            }
        }
        const User = []
        const userUrl = `https://politicoapplication.herokuapp.com/api/v1/users`
        // Fetch all users
        fetch(userUrl)
            .then((res)=>res.json())
            .then((user)=>{
                if(user.status === 200){
                    const users = user.user;
                    User.push(users)
                    return User
                }
            })
        const candidateInfo = []
        fetch(url,fetchMethod)
            .then((res)=>res.json())
            .then((data)=>{
                if (data.status === 200){
                    const candidates = data.data
                    candidates.forEach((candidate)=>{
                        if (candidate.office == officeId){
                            console.log(User)                   
                            User[0].map((item)=>{
                                if ( candidate.candidate == item.id) {
                                    console.log(item.firstname + item.lastname)
                                    console.log(candidate);
                                    const voteValue = [candidate.office, candidate.id]
                                    const id = sessionStorage.getItem('id')
                                   const div = document.getElementById('officeDiv')
                                   const form = document.getElementById('form') 
                                   form.innerHTML += `<input type="radio" name='office' id=${id} value=${voteValue}> ${item.firstname} ${item.lastname} <br>` 
                                //    form.addEventListener('submit', (e)=>{
                                //     e.preventDefault();
                                //     const vote = form.elements[candidate.office].value
                                //     console.log(vote)
                                // })
                                }
                               })
                        } 
                    })
                    const form = document.getElementById('form') 
                    form.classList.toggle('formvote');
                }
            })
    }
})

const form = document.getElementById('form');
// form.addEventListener('submit', (e)=>{
//     e.preventDefault();
//     const vote = form.elements[1].value
//     console.log(vote)
// })