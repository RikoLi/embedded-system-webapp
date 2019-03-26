function returnHome() {
    window.open('index.html', '__self');
}

function updateItemList() {
    let bagArray = JSON.parse(localStorage.getItem('bag'));
    let itemNum = 0;
    let slcArea = document.getElementById('item-selection');
    let itemName = '';
    let slcIndex = 0;

    for (let i = 0; i < bagArray.length; i ++) {
        itemName = bagArray[i].name;
        itemNum = bagArray[i].number;
        slcArea = document.getElementById('item-selection');

        let newOpt = document.createElement('option')
        let optText = document.createTextNode(itemName);
        
        newOpt.appendChild(optText);
        newOpt.setAttribute('value', itemNum+'');
        slcArea.appendChild(newOpt);       
    }

    slcIndex = slcArea.selectedIndex;
    document.getElementById('item-num-p').innerHTML = '数量：' + slcArea.options[slcIndex].value;
}

updateItemList();