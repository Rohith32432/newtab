const data =  JSON.parse(localStorage.getItem('newtab'))?.length >0 ?JSON.parse(localStorage.getItem('newtab')): [
    {
        name: 'Instagram',
        url: 'https://www.instagram.com/',
        shortcut: 'i'
    },
    {
        name: 'YouTube',
        url: 'https://www.youtube.com/',
        shortcut: 'y'
    },
    {
        name: 'Mail',
        url: 'https://mail.google.com/',
        shortcut: 'm'
    }
]; // default links

const linkdivs = document.querySelector('.container');

render()
function render(){
    data.forEach((item, index) => {
        const linkDiv = document.createElement('div');
        linkDiv.className = 'link';
        linkDiv.innerHTML = `
         <a href="${item.url}">
             <img src="https://www.google.com/s2/favicons?sz=64&domain_url=${item.url}" alt="">
         </a>
         <span data-index="${index}">x</span>
        `;
         linkdivs.appendChild(linkDiv);
    });
}
// Remove link functionality
linkdivs.addEventListener('click', (event) => {
    if (event.target.tagName === 'SPAN') {
        const index = event.target.getAttribute('data-index');
        console.log(index);
        const divi=linkdivs.querySelectorAll('.link')
        linkdivs.removeChild(divi[index])
        data.splice(index, 1); // Remove from array
        localStorage.setItem('newtab', JSON.stringify(data)); // Update localStorage
    }
});

// Modal Elements
const modal = document.getElementById('modal');
const nameInput = document.getElementById('nameInput');
const urlInput = document.getElementById('urlInput');
const sc = document.getElementById('shortcut');
const submitBtn = document.getElementById('submitBtn');

// Open modal on "New" button click
document.querySelector('.new-button').addEventListener('click', () => {
    modal.style.display = 'flex';
});

// Close modal and save data on submit button click
submitBtn.addEventListener('click', () => {
    const name = nameInput.value.trim();
    const url = urlInput.value.trim();
    const shortcut = sc.value.trim();    
    if (name && url) {
        data.push({ name, url,shortcut });
        localStorage.setItem('newtab', JSON.stringify(data)); // Update localStorage

        const linkDiv = document.createElement('div');
        linkDiv.className = 'link';
        linkDiv.innerHTML = `
         <a href="${url}">
             <img src="https://www.google.com/s2/favicons?sz=128&domain_url=${url}" alt="">
         </a>
         <span>x</span>
        `;
        linkdivs.appendChild(linkDiv); 
        nameInput.value = '';
        urlInput.value = '';
        modal.style.display = 'none';
    }
});

// Close modal when clicking outside of it
window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
    }
});

// Shortcut key functionality
window.addEventListener('keydown', (e) => {
    const Ekey = e.key.toLowerCase();
    const inputFocused = document.activeElement.matches('.name input, .modal input');

    if (!inputFocused) {
        const shortcutLink = data.find((item) => item.shortcut === Ekey);
        if (shortcutLink) {
          window.location.href=shortcutLink.url
        }
        if (Ekey === '/') {
            document.querySelector('.name input').focus();
        }
    }
});

// Add link from Google search input field on Enter
document.querySelector('.name input').addEventListener('keydown', function (e) {
    if (e.key === 'Enter') {
        const query = this.value.trim();
        if (query) {
            window.location.href = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
        }
    }
});
