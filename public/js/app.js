const form = document.querySelector('form')
const search = document.querySelector('input')
const p1 = document.querySelector('.p1')
const p2 = document.querySelector('.p2')


form.addEventListener('submit',(event)=>{
    event.preventDefault()
    p1.textContent = 'Loading...'
    const location = search.value
    fetch('/weather?address='+location).then((response)=>{
    response.json().then((data)=>{
        if(data.error)
        {
            p1.textContent = data.error
            return;
        }
        p1.textContent = data.address
        p2.textContent = data.forecast
    })
})
})