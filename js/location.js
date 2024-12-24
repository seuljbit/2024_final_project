document.addEventListener("DOMContentLoaded", () => {
    const locationHeader = document.getElementById('locationHeader');
    const toggle = document.querySelector('.toggle')

    toggle.addEventListener('click', () => {
        locationHeader.classList.toggle('active')
        console.log(locationHeader.classList);
    })
});