const adminToken = sessionStorage.getItem('token');
if (!adminToken) {
    alert('unathourized')
    location.href = 'userLogin.html'
}

const form = document.getElementById('form-group');
const name = form.elements['name']
name.addEventListener('keydown',()=>{
    const div = document.getElementById('err');
    const success = document.getElementById('success');
    div.innerHTML = ''
    success.innerHTML = ''
})
const createOffice = (e)=>{
    e.preventDefault()
    const name = form.elements['name'].value.trim();
    console.log(name)
    const type = form.elements['type'].value.trim();
    const url =  'https://politicoapplication.herokuapp.com/api/v1/offices'
    const body = {name,type}
    console.log(body)
    const fetchMethod = {
        method: 'POST',
        headers: {
            'x-access-token': adminToken,
            'Accept': "application/json",
            'Content-Type': "application/json"
        },
        body: JSON.stringify(body)
    } 

    fetch(url,fetchMethod)
        .then((res)=>res.json())
        .then((data)=>{console.log(data)
        if (data.status === 400){
            const errMsg = data.msg;
            errMsg.forEach((msg)=>{
                const div = document.getElementById('err');
                div.innerHTML += `<ul><li id=errMsg> ${msg} </li></ul>`
            })
        } else if(data.status === 422) {
            console.log(data)
            const msg = data.message;
                const div = document.getElementById('err');
                div.innerHTML += `<ul><li id=errMsg>Office Already Exist
                 ${msg} </li></ul>`
        } else {
            console.log(data)
            const msg = data.office.name
            const div = document.getElementById('success');
                div.innerHTML += `<ul><li id=errMsg>Succesfully created
                 ${msg} </li></ul>`
        }
    })
};

form.addEventListener('submit',createOffice);