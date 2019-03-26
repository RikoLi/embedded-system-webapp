function returnHome() {
    window.open('index.html', '__self');
}

function updateItemList() {
    let bagArray = JSON.parse(localStorage.getItem('bag'));
    for (let i = 0; i < 3; i ++) {
        let itemName = bagArray[i].name;
        let itemNum = bagArray[i].number;
        let slcArea = document.getElementById('item-selection');
        let newOpt = document.createElement('option')
        let optText = document.createTextNode(itemName);
        
        newOpt.appendChild(optText);
        slcArea.appendChild(newOpt);
    }
}

updateItemList();