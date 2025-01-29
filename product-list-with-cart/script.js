import { populateHTML } from "./populateHTML.js";

populateHTML();

const addToCartButtons = document.getElementsByClassName('add-to-cart-buttons');
const dessertsInCartContainer = document.getElementById('desserts-in-cart-container');

let iForOrderContainer = 0;

const images = [];

/*-----------------------*/

function loopButtons() {

    for (let button of addToCartButtons) {

        const dessertParent = button.closest('.dessert');

        const buttonDivOnActive = document.createElement('button');
        buttonDivOnActive.classList.add('add-to-cart-button-active');

        const decrement = document.createElement('span');
        decrement.classList.add('decrement-button');
        decrement.style.pointerEvents = 'inherit';
        decrement.innerText = '-';

        const quantity = document.createElement('span');
        quantity.classList.add('quantity');
        quantity.innerText = 1;

        const increment = document.createElement('span');
        increment.classList.add('increment-button');
        increment.innerText = '+';

        buttonDivOnActive.append(decrement, quantity, increment);

        const dessertParentInfo = dessertParent.children[2];

        button.onclick = () => {

            button.remove();

            dessertParent.children[0].style.border = '2px solid red';
            dessertParent.insertBefore(buttonDivOnActive, dessertParent.children[1]);

            if (dessertParentInfo.children[0].innerText === 'Crème Brûlée') {

                images.push('creme-brulee');

            } else if (dessertParentInfo.children[0].innerText === 'Panna Cotta') {

                images.push('panna-cotta');

            } else if (dessertParentInfo.children[0].innerText === 'Pie') {

                images.push('meringue');

            } else {

                images.push(dessertParentInfo.children[0].innerText.toLowerCase());
            }

            totalDessertsInCart();
            populateCart(dessertParentInfo);
        }

        decrement.onclick = () => {

            const dessertParent = decrement.closest('.dessert');

            if (quantity.innerText < 2) {

                // restore normal addToCart button

                const addToCartButton = document.createElement('button');
                addToCartButton.classList.add('add-to-cart-buttons');

                const img = document.createElement('img');
                img.setAttribute('src', '/assets/images/icon-add-to-cart.svg');
                img.classList.add('add-to-cart-button-image');

                const span = document.createElement('span');
                span.innerText = 'Add to cart';

                addToCartButton.append(img, span);

                dessertParent.children[0].style.border = 'none';
                dessertParent.children[1].remove();
                dessertParent.insertBefore(addToCartButton, dessertParent.children[1]);

                document.getElementById(`${dessertParentInfo.children[0].innerText}-dessert-in-cart`).remove();

                images.forEach(image => {

                    if (image === 'creme-brulee') {

                        let index = images.indexOf(image);
                        images.splice(index, 1);

                    } else if (image === 'panna-cotta') {

                        let index = images.indexOf(image);
                        images.splice(index, 1);

                    } else if (image === 'meringue') {

                        let index = images.indexOf(image);
                        images.splice(index, 1);

                    } else if (image === `${dessertParentInfo.children[0].innerText.toLowerCase()}`) {

                        let index = images.indexOf(image);
                        images.splice(index, 1)
                    }
                })
                loopButtons();
            }

            quantity.innerText--;

            totalDessertsInCart();
            updateCart(dessertParentInfo, quantity);

            if (dessertsInCartContainer.children.length === 1) {
                restoreEmptyCart();
            }
        }

        increment.onclick = () => {

            quantity.innerText++;

            totalDessertsInCart();
            updateCart(dessertParentInfo, quantity);
        }
    }
}
loopButtons();

/*-----------------------*/

let modifiedStringsForTotalOrderPrice = [];

function updateCart(dessertParentInfo, dessertQuantity) {

    const dessertInCartQuantity = document.getElementById(`${dessertParentInfo.children[0].innerText}-total-quantity`);

    if (dessertsInCartContainer.children.length === 2) {

        iForOrderContainer = 0;
        dessertsInCartContainer.children[1].remove();
        restoreEmptyCart();
    }

    if (dessertsInCartContainer.children.length > 2) {
        dessertInCartQuantity.innerText = `${dessertQuantity.innerText}x`;
    }

    const dessertInCartTotalPrice = document.getElementById(`${dessertParentInfo.children[0].innerText}-total-price`);
    const dessertInCartSingularPrice = document.getElementById(`${dessertParentInfo.children[0].innerText}-singular-price`);

    let multiplicand = dessertInCartSingularPrice.innerText;

    while (multiplicand.charAt(0) === '@') {
        multiplicand = multiplicand.substring(2);
    }
    multiplicand = Number(multiplicand);

    let multiplier = Number(dessertQuantity.innerText);

    dessertInCartTotalPrice.innerText = `$${(multiplier * multiplicand).toFixed(2)}`;

    // ---------------------------------------------------------------------------- //

    const totalPrices = Array.from(document.getElementsByClassName(`total-price`));

    let totalSum = 0;

    for (let i = 0; i < totalPrices.length; i++) {

        if (totalPrices[i].innerText.charAt(0) === '$') {

            modifiedStringsForTotalOrderPrice.push(totalPrices[i].innerText.substring(1));
        }
    }

    for (let i = 0; i < modifiedStringsForTotalOrderPrice.length; i++) {

        totalSum += Number(modifiedStringsForTotalOrderPrice[i]);

    }

    modifiedStringsForTotalOrderPrice.length = 0;

    document.getElementById('order-total-price').innerText = `$${totalSum.toFixed(2)}`;
}

function populateCart(dessertParentInfo) {

    dessertsInCartContainer.classList.add('desserts-in-cart-container');

    const dessertInCart = document.createElement('div');
    dessertInCart.setAttribute('id', `${dessertParentInfo.children[0].innerText}-dessert-in-cart`)
    dessertInCart.classList.add('dessert-in-cart');

    const dessertInCartInfo = document.createElement('div');
    dessertInCartInfo.classList.add('dessert-in-cart-info');

    const dessertRemoveButton = document.createElement('button');
    let lowerCased = dessertParentInfo.children[0].innerText.toLowerCase();

    if (dessertParentInfo.children[0].innerText === 'Crème Brûlée') {

        dessertRemoveButton.setAttribute('id', `creme-remove-button`);

    } else if (dessertParentInfo.children[0].innerText === 'Panna Cotta') {

        dessertRemoveButton.setAttribute('id', `panna-remove-button`);

    } else {
        dessertRemoveButton.setAttribute('id', `${lowerCased}-remove-button`);
    }

    dessertRemoveButton.classList.add('dessert-remove-button');
    dessertRemoveButton.innerText = 'X';

    const dessertName = document.createElement('h4');
    dessertName.innerText = `${dessertParentInfo.children[1].innerText}`;

    const dessertQuantityAndPricesContainer = document.createElement('div');
    dessertQuantityAndPricesContainer.classList.add('dessert-quantity-and-prices-container');

    const quantity = document.createElement('span');
    quantity.setAttribute('id', `${dessertParentInfo.children[0].innerText}-total-quantity`);
    quantity.innerText = `1x`;

    const singularAndMultiplePricesContainer = document.createElement('div');
    singularAndMultiplePricesContainer.classList.add('singular-and-multiple-prices-container');

    const singularPrice = document.createElement('span');
    singularPrice.setAttribute('id', `${dessertParentInfo.children[0].innerText}-singular-price`);
    singularPrice.innerText = `@${dessertParentInfo.children[2].innerText}`;

    const multiplePrices = document.createElement('span');
    multiplePrices.setAttribute('id', `${dessertParentInfo.children[0].innerText}-total-price`);
    multiplePrices.classList.add(`total-price`);
    multiplePrices.innerText = `${dessertParentInfo.children[2].innerText}`;

    const orderInfoContainer = document.createElement('div');
    orderInfoContainer.classList.add('order-info-container');

    const orderTotalPriceContainer = document.createElement('div');
    orderTotalPriceContainer.classList.add('order-total-price-container');

    const orderTotalText = document.createElement('span');
    orderTotalText.classList.add('order-total-text');
    orderTotalText.innerText = 'Order Total';

    const orderTotalPrice = document.createElement('span');
    orderTotalPrice.setAttribute('id', 'order-total-price')
    orderTotalPrice.classList.add('order-total-price');

    const ecoContainer = document.createElement('div');
    ecoContainer.classList.add('eco-container');

    const ecoImage = document.createElement('img');
    ecoImage.setAttribute('src', '/assets/images/icon-carbon-neutral.svg');

    const ecoText = document.createElement('p');
    ecoText.innerHTML = `This is a <b>carbon-neutral</b> delivery`;

    const orderButton = document.createElement('button');
    orderButton.setAttribute('id', 'order-button');
    orderButton.innerText = 'Confirm Order';


    ecoContainer.append(ecoImage, ecoText);
    orderTotalPriceContainer.append(orderTotalText, orderTotalPrice);
    orderInfoContainer.append(orderTotalPriceContainer, ecoContainer, orderButton);


    while (iForOrderContainer < 1) {
        dessertsInCartContainer.append(orderInfoContainer);
        iForOrderContainer++;
    }

    singularAndMultiplePricesContainer.append(singularPrice, multiplePrices);
    dessertQuantityAndPricesContainer.append(quantity, singularAndMultiplePricesContainer);
    dessertInCartInfo.append(dessertName, dessertQuantityAndPricesContainer);
    dessertInCart.append(dessertInCartInfo, dessertRemoveButton);
    dessertsInCartContainer.insertBefore(dessertInCart, dessertsInCartContainer.children[dessertsInCartContainer.children.length - 1]);


    const placeholderContainer = document.getElementById('placeholder-container');
    placeholderContainer.style.display = 'none';
    totalPriceOfAllDesserts();
    removeDessertFromCart();
    confirmOrder();
}

function removeDessertFromCart() {

    const removeButtons = document.getElementsByClassName('dessert-remove-button');

    for (let button of removeButtons) {

        button.onclick = () => {

            button.closest('.dessert-in-cart').remove();

            const dessert = document.getElementById(`dessert-${button.getAttribute('id').split('-')[0]}`);
            const specificDessert = dessert.children[2].children[0].innerText.toLowerCase();

            let index;

            if (specificDessert === 'crème brûlée') {

                index = images.indexOf('creme-brulee');
                images.splice(index, 1);

            } else if (specificDessert === 'panna cotta') {

                index = images.indexOf('panna-cotta');
                images.splice(index, 1);

            } else if (specificDessert === 'pie') {
                
                index = images.indexOf('meringue');
                images.splice(index, 1);
            
            } else {

                index = images.indexOf(specificDessert);
                images.splice(index, 1);
            }

            const addToCartButton = document.createElement('button');
            addToCartButton.classList.add('add-to-cart-buttons');

            const img = document.createElement('img');
            img.setAttribute('src', '/assets/images/icon-add-to-cart.svg');
            img.classList.add('add-to-cart-button-image');

            const span = document.createElement('span');
            span.innerText = 'Add to cart';

            addToCartButton.append(img, span);

            dessert.children[0].style.border = 'none';
            dessert.children[1].remove();
            dessert.insertBefore(addToCartButton, dessert.children[1]);

            if (dessertsInCartContainer.children.length === 2) {

                iForOrderContainer = 0;
                dessertsInCartContainer.children[1].remove();
                restoreEmptyCart();
            }
            totalDessertsInCart();
            totalPriceOfAllDesserts();
            loopButtons();
        }
    }
}

function restoreEmptyCart() {

    const placeholderContainer = document.getElementById('placeholder-container');
    placeholderContainer.style.display = 'block';
}

/*-----------------------*/

function totalDessertsInCart() {

    const totalQuantities = document.getElementsByClassName('quantity');
    const totalDessertsInCart = document.getElementById('total-desserts-in-cart');
    let totalSum = 0;

    for (let i = 0; i < totalQuantities.length; i++) {

        totalSum += Number(totalQuantities[i].innerText);
    }

    totalDessertsInCart.innerText = totalSum
}

function totalPriceOfAllDesserts() {

    const totalPrices = Array.from(document.getElementsByClassName(`total-price`));

    let totalSum = 0;

    for (let i = 0; i < totalPrices.length; i++) {

        if (totalPrices[i].innerText.charAt(0) === '$') {

            modifiedStringsForTotalOrderPrice.push(totalPrices[i].innerText.substring(1));
        }
    }

    for (let i = 0; i < modifiedStringsForTotalOrderPrice.length; i++) {

        totalSum += Number(modifiedStringsForTotalOrderPrice[i]);

    }
    modifiedStringsForTotalOrderPrice.length = 0;

    if (document.getElementsByClassName('dessert-in-cart').length > 0) {

        document.getElementById('order-total-price').innerText = `$${totalSum.toFixed(2)}`;
    }
}

/*------------------------*/

function confirmOrder() {

    const orderButton = document.getElementById('order-button');

    orderButton.onclick = () => {

        const orderFragment = new DocumentFragment();

        const darkBackground = document.createElement('div');
        darkBackground.classList.add('dark-background');

        const orderConfirmedContainer = document.createElement('div');
        orderConfirmedContainer.classList.add('order-confirmed-container');

        const checkmarkContainer = document.createElement('div');
        checkmarkContainer.classList.add('checkmark-container');

        const checkmark = document.createElement('img');
        checkmark.setAttribute('src', '/assets/images/icon-order-confirmed.svg');

        const headingTextContainer = document.createElement('div');
        headingTextContainer.classList.add('heading-text-container');

        const heading = document.createElement('h1');
        heading.innerText = 'Order Confirmed';

        const subtext = document.createElement('p');
        subtext.innerText = 'We hope you enjoy your food';

        const finalOrdersContainer = document.createElement('div');
        finalOrdersContainer.classList.add('final-orders-container');

        const desserts = Array.from(document.getElementsByClassName('dessert-in-cart'));
        const finalOrders = [];

        for (let i = 0; i < desserts.length; i++) {

            const finalOrder = document.createElement('div');
            finalOrder.classList.add('final-order');

            const thumbnail = document.createElement('img');

            for (let j = 0; j < images.length; j++) {

                thumbnail.setAttribute('src', `/assets/images/image-${images[i]}-thumbnail.jpg`);
            }

            const finalOrderInfoContainer = document.createElement('div');
            finalOrderInfoContainer.classList.add('final-order-info-container');

            const finalOrderInfo = document.createElement('div');
            finalOrderInfo.classList.add('final-order-info');

            const finalOrderName = document.createElement('h4');
            finalOrderName.innerText = desserts[i].children[0].children[0].innerText;

            const finalOrderQuantityAndPrice = document.createElement('div');
            finalOrderQuantityAndPrice.classList.add('final-order-quantity-and-price');

            const finalOrderQuantity = document.createElement('span');
            finalOrderQuantity.innerText = desserts[i].children[0].children[1].children[0].innerText;

            const finalOrderSinglePrice = document.createElement('span');
            finalOrderSinglePrice.innerText = desserts[i].children[0].children[1].children[1].children[0].innerText;

            const finalOrderMultiplePrices = document.createElement('span');
            finalOrderMultiplePrices.innerText = desserts[i].children[0].children[1].children[1].children[1].innerText;

            finalOrderQuantityAndPrice.append(finalOrderQuantity, finalOrderSinglePrice);
            finalOrderInfoContainer.append(finalOrderName, finalOrderQuantityAndPrice)
            finalOrder.append(thumbnail, finalOrderInfoContainer, finalOrderMultiplePrices);

            finalOrders.push(finalOrder);
        }

        const finalOrderTotalContainer = document.createElement('div');
        finalOrderTotalContainer.classList.add('final-order-total-container');

        const orderTotalText = document.createElement('span');
        orderTotalText.innerText = 'Order Total';

        const orderTotalPrice = document.createElement('h2');
        orderTotalPrice.innerText = `${document.getElementById('order-total-price').innerText}`;

        const newOrderButton = document.createElement('button');
        newOrderButton.innerText = 'Start New Order';


        checkmarkContainer.append(checkmark);
        headingTextContainer.append(heading, subtext);
        finalOrderTotalContainer.append(orderTotalText, orderTotalPrice);

        finalOrders.forEach(order => finalOrdersContainer.append(order))

        finalOrdersContainer.append(finalOrderTotalContainer);
        orderConfirmedContainer.append(checkmarkContainer, headingTextContainer, finalOrdersContainer, newOrderButton);
        darkBackground.append(orderConfirmedContainer);
        orderFragment.append(darkBackground);
        document.body.append(orderFragment);

        document.body.style.overflow = 'hidden';


        newOrderButton.onclick = () => {

            window.location.reload();
        }
    }
}

console.log('%c Made by iDEA for Frontend Mentor.', 'color: hsl(108, 92.80%, 51.20%); font-family: Georgia; font-size: 2em');

console.log('%c And ideas are bulletproof...', 'color: grey;')