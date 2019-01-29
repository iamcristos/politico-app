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

let form= document.getElementById('form-group')

form.addEventListener('submit', (e)=>{
    location.href='user.html'
    e.preventDefault()
});


