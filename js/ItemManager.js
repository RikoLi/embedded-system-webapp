/**
 * 道具管理类
*/
// Define ItemManager class
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
                alert('你获得了'+number+'个['+name+']！');

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
            alert('你获得了'+number+'个['+name+']！');
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
                    alert('你丢弃了'+removeNum+'个['+name+']！');
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
            alert('你丢失了['+item.name+']！');
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
        let hp = 0;
        alert('使用了['+name+']!');
        switch(name) {
            case '止痛药':
            hp = (Math.random()+8).toFixed(0);
            HM.addHP(hp);
            alert('回复了'+hp+'点生命！');
            break;

            case '绷带':
            hp = (Math.random()+3).toFixed(0);
            HM.addHP(hp);
            alert('回复了'+hp+'点生命！');
            break;

            case '抗生素':
            hp = (Math.random()*8+12).toFixed(0);
            HM.addHP(hp);
            alert('回复了'+hp+'点生命！');
            break;

            case '急救箱':
            hp = (Math.random()*20+20).toFixed(0);
            HM.addHP(hp);
            alert('回复了'+hp+'点生命！');
            break;
        }
    }
}