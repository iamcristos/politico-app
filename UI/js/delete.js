const btn = document.getElementsByTagName("button")
 console.log(btn)
 document.addEventListener('click', (event)=> {
    if ( event.target.classList.contains( 'deleteGridBtn' ) ) {
        // Do something...
        console.log('hello')
        
    }
}, );
