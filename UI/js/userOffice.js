const confirm = sessionStorage.getItem('token');
const url = 'https://politicoapplication.herokuapp.com/api/v1/offices';
const fetchMethod = {
     method: 'GET',
     headers: {
        'x-access-token': confirm
     }
}

if (!confirm) {
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
        const success = document.getElementById('success')
        success.innerHTML = ""
        const err = document.getElementById('err')
        err.innerHTML = ""
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
                                    const voteValue = [candidate.office, candidate.id,]
                                    console.log(voteValue)
                                    const id = sessionStorage.getItem('id')
                                   const div = document.getElementById('officeDiv')
                                   const form = document.getElementById('form') 
                                   form.innerHTML += `<input type="radio" name='office' id=${id} value=${voteValue} class='${item.firstname} ${item.lastname}'> ${item.firstname} ${item.lastname} <br>` 
                                }
                               })
                        } 
                    })
                    const form = document.getElementById('form') 
                    form.classList.toggle('formvote');
                }
            });
        form.addEventListener('submit',(e)=>{
            e.preventDefault()
            const voteInput = document.querySelector('input[name=office]:checked')
            const voterInput = voteInput.value;
            console.log(voteInput);
            const name = voteInput.className
            console.log(name)
            // const voteUrl = 'https://politicoapplication.herokuapp.com/api/v1/votes';
            const voteUrl = 'http://localhost:3000/api/v1/votes'
            const office = voterInput[0]
            console.log(office)
            const voter = voteInput.id
            console.log(voter + "id")
            const candidate = voterInput[2]
            console.log(candidate)
            const body = {office,voter,candidate,name}
            const fetchVote = {
                method: 'POST',
                headers: {
                    'x-access-token': confirm,
                    'Accept': "application/json",
                    'Content-Type': "application/json"
                },
                body: JSON.stringify(body)
            };

            fetch(voteUrl,fetchVote)
                .then((res)=>res.json())
                .then((data)=>{
                    console.log(data)
                    if (data.status === 200) {
                        const success = document.getElementById('success')
                        success.innerHTML = `<h3>Your vote is registered successfully</h3>`
                    } else {
                        const err = document.getElementById('err')
                        err.innerHTML = `<h3>${data.message}</h3>`
                    }
                })
        })
        
    }
})

