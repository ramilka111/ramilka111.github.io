function createListElement(item) {
    const root = document.createElement('div');
    const username = document.createElement('span');
    const avatar = document.createElement('img');

    username.innerHTML = `${item.name.title} ${item.name.first} ${item.name.last}`;
    username.classList.add('previewUsername');
    avatar.src = item.picture.medium;
    avatar.classList.add('previewAvatar');
    root.classList.add('previewContainer');
    root.appendChild(avatar);
    root.appendChild(username);

    root.addEventListener('click', () => {
        showPopupElement(item);
        showPopupInfo(item);
        overlay.addEventListener('click', () => {
            hidePopupElement();
        } )

    });

    return root;
}

const popup = document.getElementById('popup');
const overlay = document.getElementById('overlay');

function showPopupElement() {
    overlay.style.display = 'block';
    popup.style.display = 'flex';
}

function hidePopupElement() {
    popup.style.display = 'none';
    overlay.style.display = 'none';

    document.getElementById('popup').innerHTML = "";
}

function showPopupInfo(item) {
    const popupName = document.createElement('div');
    popupName.innerHTML = `${item.name.first} ${item.name.last}`;
    popup.appendChild(popupName);

    const largeAvatar = document.createElement('img');
    largeAvatar.src = item.picture.large;
    largeAvatar.classList.add('largeAvatar');
    popup.appendChild(largeAvatar);

    const popupStreet = document.createElement('div');
    popup.appendChild(popupStreet);
    popupStreet.innerHTML = 'Address:  ' + `${item.location.street}`;

    const popupCity = document.createElement('div');
    popup.appendChild(popupCity);
    popupCity.innerHTML = 'City:  ' + `${item.location.city}`.charAt(0).toUpperCase() + `${item.location.city}`.slice(1);

    const popupState = document.createElement('div');
    popup.appendChild(popupState);
    popupState.innerHTML = 'State:  ' + `${item.location.state}`.charAt(0).toUpperCase() + `${item.location.state}`.slice(1);

    const popupEmail = document.createElement('div');
    popup.appendChild(popupEmail);
    popupEmail.innerHTML = 'Email:  ' + `${item.email}`;

    const popupPhone = document.createElement('div');
    popup.appendChild(popupPhone);
    popupPhone.innerHTML = 'Phone number:  ' + `${item.phone}`;



}
function render(data) {
    const main = document.querySelector('main');

    // clear
    while(main.firstChild){
        main.removeChild(main.firstChild);
    }

    data.results.forEach(item => {
        main.appendChild(createListElement(item));
    })
}

let loadedData;
let sortAscending = true;
let sortBtn;

function loadData() {
    const URL = `https://api.randomuser.me/1.0/?results=50&nat=gb,us&inc=gender,name,location,email,phone,picture`;
    fetch(URL)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            loadedData = data;
            sortData(data);
            render(data);
        })
        .catch(err => {
            alert('Ooops, try again');
        })
}

function sortData(data) {
    data.results.sort((a, b) => {
        if(a.name.first < b.name.first) {
            return sortAscending ? -1 : 1;
        }
        if(a.name.first > b.name.first) {
            return sortAscending ? 1 : -1;
        }
        return 0;
    });
    return data;
}

function toggleSort() {
    sortAscending = !sortAscending;
    sortBtn.innerHTML = sortAscending ? '\t&#x2B06; Ascending' : '\t&#x2B07; Descending';

    sortData(loadedData);
    render(loadedData);
}

window.onload = function () {
    sortBtn = document.getElementById('sortBtn');
    sortBtn.addEventListener('click', toggleSort);
    loadData();
};
