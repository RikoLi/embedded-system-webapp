/**
* 重新定义、实例化一个ItemManager。

* ES6标准允许使用关键字export, import实现模块化管理，
* 但是考虑到移动端设备的适配对部分关键字可能有不支持的情况，
* 于是再次定义、实例化同样的类对象。
*/
class ItemManager {
    constructor() {
        // Create a bag array
        if (localStorage.getItem('bag') === null) {
            let bagArray = [];
            bagArray = JSON.stringify(bagArray);
            localStorage.setItem('bag', bagArray);
        }
    }

    checkWeapon() {
        let bagArray = JSON.parse(localStorage.getItem('bag'));
        let weapon_amount = 0;
        for (let i = 0; i < bagArray.length; i ++) {
            if (bagArray[i].type === 'weapon') {
                ++ weapon_amount;
            }
        }
        return weapon_amount;
    }


    addItem(id, name, number, type, info) {
        let bagArray = JSON.parse(localStorage.getItem('bag'));
        let enableNew = true;

        // Add old item
        for (let i = 0; i < bagArray.length; i++) {
            if (bagArray[i].name === name) {
                bagArray[i].number += number;
                let temp = JSON.stringify(bagArray);
                localStorage.setItem('bag', temp);
                alert('你获得了'+number+'个'+name+'！');

                enableNew = false;
                break;
            }
        }
        if (enableNew) {
            // Add new item
            let item = {
                id: id, //Number
                name: name, //String
                number: number, //Number
                type: type, //String
                info: info //String
            }
            bagArray.push(item);
            let temp = JSON.stringify(bagArray);
            localStorage.setItem('bag', temp);
            alert('你获得了'+number+'个'+name+'！');
        }
    }

    removeItem(name) {
        let removeNum = prompt('输入丢弃数目（正整数）：');
        if (typeof(Number(removeNum)) === 'number' && confirm('确定要丢弃吗？')) {
            let bagArray = JSON.parse(localStorage.getItem('bag'));
            for (let i = 0; i < bagArray.length; i++) {
                if (bagArray[i].name === name) {
                    if (removeNum > bagArray[i].number) {
                        removeNum = bagArray[i].number;
                    }
                    bagArray[i].number -= removeNum;
                    if (bagArray[i].number <= 0) {
                        bagArray.splice(i, 1);
                    }
                    let temp = JSON.stringify(bagArray);
                    localStorage.setItem('bag', temp);
                    alert('你丢弃了'+removeNum+'个'+name+'！');
                    break;
                }
            }
        }
        else {
            alert('输入信息非法！');
        }
    }

    dropItem() {
        let bagArray = JSON.parse(localStorage.getItem('bag'));
        let item = bagArray.pop();

        if (item === undefined) {
            alert('背包已空！');
        }
        else {
            alert('你丢失了'+item.name+'！');
        }
        localStorage.setItem('bag', JSON.stringify(bagArray));
    }


    useItem(name) {
        let bagArray = JSON.parse(localStorage.getItem('bag'));
        for (let i = 0; i < bagArray.length; i++) {
            if (bagArray[i].name === name) {
                if (bagArray[i].number-1 === 0) {
                    bagArray.splice(i, 1);
                }
                else {
                    --bagArray[i].number;
                }
                let temp = JSON.stringify(bagArray);
                localStorage.setItem('bag', temp);
                this.applyItemEffect(name);
                break;
            }
        }
    }

    // Item effects
    applyItemEffect(name) {
        alert('Use'+name); //Test
        // switch(id) {
        //     case 0:
        //     alert('使用了'+itemLib[id].name);
        //     break;

            
        //     // To be continued...
        //     case 1:
            
        //     break;
        // }
    }
}
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