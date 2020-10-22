


document.addEventListener('DOMContentLoaded', () => {
    const categoryDrop = document.querySelector('.select-box').querySelector('.select-control');
    const priceDrop = document.querySelector('.price-select-box').querySelector('.select-control');
    const addButtons = document.querySelectorAll('.product-box__btn');
    const infoSpan = document.querySelectorAll('.red-info');
    const inpQuantity = document.querySelectorAll('[type="number"]');
    const goodItems = document.querySelectorAll('.product-box__item');
    


    const modalButton = document.getElementById('checkout'),
        modalDelete = document.querySelector('.btn-check.delete'),
        modalCheckout = document.querySelector('.btn-check.submit');




    document.querySelector('.btn-check.continue').addEventListener('click', (e) => {
        e.preventDefault();
        showModal();
    });




modalCheckout.addEventListener('click', (e) => {
    e.preventDefault();
    let name = document.getElementById('iname').value,
    email = document.getElementById('imail').value;
    let reg = new RegExp(/^\s+/);
    if(infoSpan[0].innerText === '0') {
        alert('Корзина пуста');
    } else if(name.length < 1 || reg.test(name) || reg.test(email)) {
        alert('Поля пусты или в полях пробелы');    
    } else {
    deleteCart();
    showModal();
    alert('Спасибо за заказ ' + name);
    }    
});



modalDelete.addEventListener('click', (e) => {
    e.preventDefault();
   deleteCart();
});





function deleteCart() {
    let info = document.getElementById('infotext');
    infoSpan[0].innerText = '0';
    infoSpan[1].innerText = '0';
    info.innerText = `Нет выбранных товаров`;
}


modalButton.addEventListener('click', () => {
   let info = document.getElementById('infotext');
   if(infoSpan[0].innerText !== '0') {
       info.innerText = `Вы выбрали ${infoSpan[0].innerText} товаров к заказу на сумму ${infoSpan[1].innerText}`;
   } else {
    info.innerText = `Нет выбранных товаров`;
   }
   showModal();
});



function showModal() {
    let elem = document.getElementById("overlay");
    elem.style.visibility = (elem.style.visibility == "visible") ? "hidden" : "visible";
}





function itemsToggleByDish(items, condition, price) {
    items.forEach((item) => {
        let cost = parseInt(item.querySelector('.product-box__meta').children[0].innerText);
        if(item.classList.contains(condition) && (cost < price || price === '0')) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
});
}

const bludo = ['product-box__item', 'zavtrak', 'pervoe', 'garnir'];

categoryDrop.addEventListener('change', (event) => {
    itemsToggleByDish(goodItems, bludo[event.target.value], priceDrop.value);
    }
);

priceDrop.addEventListener('change', (event) => {
    
    itemsToggleByDish(goodItems, bludo[categoryDrop.value], event.target.value);
    }
);

inpQuantity.forEach((item) => {
    item.value = '0';
    item.addEventListener('input', () => {
        if(item.value < 0) {item.value = '0';}
    });
});

infoSpan.forEach(item => item.innerText = '0');

addButtons.forEach((item) => {
    item.addEventListener('click', () => {
        let price = parseInt(item.parentNode.children[0].innerText);
        let quantity = parseInt(item.parentNode.children[1].children[0].value);
       
        if(quantity) {
            infoSpan[0].innerText = +infoSpan[0].innerText + quantity;
            infoSpan[1].innerText = +infoSpan[1].innerText + (quantity * price);
            item.parentNode.children[1].children[0].value = '0';
        } 
    });
});

});
