/**
 * 道具管理类
 * 使用export暴露给main.js
*/

// Define ItemManager class
export class ItemManager {
    constructor() {
        // Create a bag array
        let bagArray = [];
        bagArray = JSON.stringify(bagArray);
        localStorage.setItem('bag', bagArray);
    }


    addItem(id, name, number, type, info) {
        let bagArray = JSON.parse(localStorage.getItem('bag'));
        let enableNew = true;

        // Add old item
        for (let i = 0; i < bagArray.length; i++) {
            if (bagArray[i].name === name && bagArray[i].type !== 'weapon') {
                bagArray[i].number += number;
                let temp = JSON.stringify(bagArray);
                localStorage.setItem('bag', temp);
                enableNew = false;
                break;
            }
            if (bagArray[i].type === 'weapon') {
                alert('获得重复武器，故不再放入背包。');
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
            bagArray = JSON.parse(localStorage.getItem('bag'));
            bagArray.push(item);
            let temp = JSON.stringify(bagArray);
            localStorage.setItem('bag', temp);
        }
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
                this.applyItemEffect(bagArray[i].id);
                let temp = JSON.stringify(bagArray);
                localStorage.setItem('bag', temp);
                break;
            }
        }
    }

    // Item effects
    applyItemEffect(id) {
        switch(id) {
            case 0:
                break;
        }
    }
}



