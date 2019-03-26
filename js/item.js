let HM = new HPManager(50, 100, false);
let IManager = new ItemManager();

/**
* 物品栏页面专用函数
*/
function returnHome() {
    window.open('index.html', '__self');
}

// 物品列表更新
function updateItemList() {
    let bagArray = JSON.parse(localStorage.getItem('bag'));
    let itemNum = 0;
    let slcArea = document.getElementById('item-selection');
    let itemName = '';
    let slcIndex = 0;
    let description = '';

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
    for (let i = 0; i < bagArray.length; i ++) {
        if (bagArray[i].name === slcArea.options[slcIndex].innerHTML) {
            description = bagArray[i].info;
            break;
        }
    }

    document.getElementById('item-num-p').innerHTML = '数量：' + slcArea.options[slcIndex].value;
    document.getElementById('item-description').innerHTML = description;
    
    document.getElementById('item-selection').addEventListener('click', () => {
        slcIndex = slcArea.selectedIndex;
        for (let i = 0; i < bagArray.length; i ++) {
            if (bagArray[i].name === slcArea.options[slcIndex].innerHTML) {
                description = bagArray[i].info;
                break;
            }
        }
        document.getElementById('item-num-p').innerHTML = '数量：' + slcArea.options[slcIndex].value;
        document.getElementById('item-description').innerHTML = description;
    });
}

// 物品使用、丢弃按钮监听
document.getElementById('use-item').addEventListener('click', () => {
    let slcArea = document.getElementById('item-selection');
    let slcIndex = slcArea.selectedIndex;
    let itemName = slcArea.options[slcIndex].innerHTML;
    
    IManager.useItem(itemName);
    window.location.reload();
});

document.getElementById('remove-item').addEventListener('click', () => {
    let slcArea = document.getElementById('item-selection');
    let slcIndex = slcArea.selectedIndex;
    let itemName = slcArea.options[slcIndex].innerHTML;
    
    IManager.removeItem(itemName);
    window.location.reload();
});


updateItemList();