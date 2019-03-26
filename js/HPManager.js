class HPManager {
    constructor(init_HP, init_max_HP, is_main_page) {
        if (is_main_page) {
            let currentHP = 0;
            let maxHP = 0;
            if (localStorage.getItem('HP') === null) {
                let HP = {
                    currentHP: init_HP,
                    maxHP: init_max_HP
                };
                HP = JSON.stringify(HP);
                localStorage.setItem('HP', HP);
            }
            else {
                currentHP = JSON.parse(localStorage.getItem('HP')).currentHP;
                maxHP = JSON.parse(localStorage.getItem('HP')).maxHP;
            }
            document.getElementById('hp-p').innerHTML = currentHP.toString() + '/' + maxHP.toString();
        }
    }

    addHP(value) {
        let v = Number(value);
        let HP = JSON.parse(localStorage.getItem('HP'));
        if (v > HP.maxHP - HP.currentHP) {
            HP.currentHP = HP.maxHP;
        }
        else {
            HP.currentHP += v;
        }
        HP = JSON.stringify(HP);
        localStorage.setItem('HP', HP);
    }
    reduceHP(value) {
        let v = Number(value);
        let HP = JSON.parse(localStorage.getItem('HP'));
        alert('受到'+v+'点伤害');
        if (v > HP.currentHP) {
            HP.currentHP = 0;
            alert('你死了...复活后道具栏将清空。');
            // Reset bag
            let bagArray = [];
            bagArray = JSON.stringify(bagArray);
            localStorage.setItem('bag', bagArray);
            
            // Reset HP
            HP.currentHP = 10;
        }
        else {
            HP.currentHP -= v;
        }
        HP = JSON.stringify(HP);
        localStorage.setItem('HP', HP);
    }
    recoverHP(value, time_ms) {
        let v = Number(value);
        setInterval(() => {
            let HP = JSON.parse(localStorage.getItem('HP'));
            if (v > HP.maxHP - HP.currentHP) {
                HP.currentHP = HP.maxHP;
            }
            else {
                HP.currentHP += v;
            }
            document.getElementById('hp-p').innerHTML = HP.currentHP.toString() + '/' + HP.maxHP.toString();
            HP = JSON.stringify(HP);
            localStorage.setItem('HP', HP);
        }, time_ms);
    }
}

