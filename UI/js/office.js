const adminToken = sessionStorage.getItem('token');
if (!adminToken) {
    alert('unathourized')
    location.href = 'userLogin.html'
}

const form = document.getElementById('form-group');

const createOffice = (e)=>{
    e.preventDefault()
    const name = form.elements['name'].value.trim();
    const type = form.elements['type'].value.trim();
    const url =  'https://politicoapplication.herokuapp.com/api/v1/offices';
    const fetchMethod = {
        method: 'POST',
        headers: {
            'x-access-token': adminToken
        },
        body: {name,type}
    } 

    fetch(url,fetchMethod)
        .then((res)=>res.json())
        .then((data)=>console.log(data))
};

form.addEventListener('submit',createOffice);