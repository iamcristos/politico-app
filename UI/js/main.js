fetch('politicoapplication.herokuapp.com/')
    .then((res)=>{
        console.log(res.body)
    })
let explorebtn= document.getElementById('explore')

explorebtn.addEventListener('click', ()=>{
    location.href='userSignup.html'
});




let nav = document.getElementById('visible');
let navFunction= ()=>{
    let navItems= document.getElementsByClassName('right');
    // navItems.forEach(item=>{
    //     item.classList.toggle('show');
    // });
    for(var i = 0; i < navItems.length; i++){
        navItems[i].classList.toggle('show');
    }
}

nav.addEventListener('click', navFunction);

