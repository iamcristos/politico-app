const confirm = localStorage.getItem('token');
const url = 'https://politicoapplication.herokuapp.com/api/v1/parties';
 // this proxyurl was gotten from stack overflow 
 const proxyurl = "https://cors-anywhere.herokuapp.com/";
 const fetchMethod = {
     method: 'GET',
     headers: {
        'x-access-token': confirm
     }
 }
 fetch(proxyurl+url, fetchMethod)
    .then((res)=> {
        let result = res.json()
        if (result.status === 401) {
            alert('unathourized')
            location.href = 'userLogin.html'
        }
    })
    