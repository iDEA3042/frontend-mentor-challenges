import data from './data.json' with {type: 'json'};

const desserts = {
    waffle: {
        image: document.getElementById('dessert-waffle-image'),
        category: document.getElementById('dessert-waffle-category'),
        name: document.getElementById('dessert-waffle-name'),
        price: document.getElementById('dessert-waffle-price')
    },
    cremeBrulee: {
        image: document.getElementById('dessert-creme-brulee-image'),
        category: document.getElementById('dessert-creme-brulee-category'),
        name: document.getElementById('dessert-creme-brulee-name'),
        price: document.getElementById('dessert-creme-brulee-price')
    },
    macaron: {
        image: document.getElementById('dessert-macaron-image'),
        category: document.getElementById('dessert-macaron-category'),
        name: document.getElementById('dessert-macaron-name'),
        price: document.getElementById('dessert-macaron-price')
    },
    tiramisu: {
        image: document.getElementById('dessert-tiramisu-image'),
        category: document.getElementById('dessert-tiramisu-category'),
        name: document.getElementById('dessert-tiramisu-name'),
        price: document.getElementById('dessert-tiramisu-price')
    },
    baklava: {
        image: document.getElementById('dessert-baklava-image'),
        category: document.getElementById('dessert-baklava-category'),
        name: document.getElementById('dessert-baklava-name'),
        price: document.getElementById('dessert-baklava-price')
    },
    pie: {
        image: document.getElementById('dessert-pie-image'),
        category: document.getElementById('dessert-pie-category'),
        name: document.getElementById('dessert-pie-name'),
        price: document.getElementById('dessert-pie-price')
    },
    cake: {
        image: document.getElementById('dessert-cake-image'),
        category: document.getElementById('dessert-cake-category'),
        name: document.getElementById('dessert-cake-name'),
        price: document.getElementById('dessert-cake-price')
    },
    brownie: {
        image: document.getElementById('dessert-brownie-image'),
        category: document.getElementById('dessert-brownie-category'),
        name: document.getElementById('dessert-brownie-name'),
        price: document.getElementById('dessert-brownie-price')
    },
    pannaCotta: {
        image: document.getElementById('dessert-panna-cotta-image'),
        category: document.getElementById('dessert-panna-cotta-category'),
        name: document.getElementById('dessert-panna-cotta-name'),
        price: document.getElementById('dessert-panna-cotta-price')
    }
}

const jsonData = {
    waffle: {
        image: {
            thumbnail: data[0].image.thumbnail,
            mobile: data[0].image.mobile,
            tablet: data[0].image.tablet,
            desktop: data[0].image.desktop
        },
        category: data[0].category,
        name: data[0].name,
        price: data[0].price
    },
    cremeBrulee: {
        image: {
            thumbnail: data[1].image.thumbnail,
            mobile: data[1].image.mobile,
            tablet: data[1].image.tablet,
            desktop: data[1].image.desktop
        },
        category: data[1].category,
        name: data[1].name,
        price: data[1].price
    },
    macaron: {
        image: {
            thumbnail: data[2].image.thumbnail,
            mobile: data[2].image.mobile,
            tablet: data[2].image.tablet,
            desktop: data[2].image.desktop
        },
        category: data[2].category,
        name: data[2].name,
        price: data[2].price
    },
    tiramisu: {
        image: {
            thumbnail: data[3].image.thumbnail,
            mobile: data[3].image.mobile,
            tablet: data[3].image.tablet,
            desktop: data[3].image.desktop
        },
        category: data[3].category,
        name: data[3].name,
        price: data[3].price
    },
    baklava: {
        image: {
            thumbnail: data[4].image.thumbnail,
            mobile: data[4].image.mobile,
            tablet: data[4].image.tablet,
            desktop: data[4].image.desktop
        },
        category: data[4].category,
        name: data[4].name,
        price: data[4].price
    },
    pie: {
        image: {
            thumbnail: data[5].image.thumbnail,
            mobile: data[5].image.mobile,
            tablet: data[5].image.tablet,
            desktop: data[5].image.desktop
        },
        category: data[5].category,
        name: data[5].name,
        price: data[5].price
    },
    cake: {
        image: {
            thumbnail: data[6].image.thumbnail,
            mobile: data[6].image.mobile,
            tablet: data[6].image.tablet,
            desktop: data[6].image.desktop
        },
        category: data[6].category,
        name: data[6].name,
        price: data[6].price
    },
    brownie: {
        image: {
            thumbnail: data[7].image.thumbnail,
            mobile: data[7].image.mobile,
            tablet: data[7].image.tablet,
            desktop: data[7].image.desktop
        },
        category: data[7].category,
        name: data[7].name,
        price: data[7].price
    },
    pannaCotta: {
        image: {
            thumbnail: data[8].image.thumbnail,
            mobile: data[8].image.mobile,
            tablet: data[8].image.tablet,
            desktop: data[8].image.desktop
        },
        category: data[8].category,
        name: data[8].name,
        price: data[8].price
    }
}

export function populateHTML() {

    for (let i in desserts) {

        if (document.body.clientWidth >= 320 && document.body.clientWidth < 768) {

            desserts[i].image.setAttribute('src', jsonData[i].image.mobile);

        } else if (document.body.clientWidth >= 768 && document.body.clientWidth < 1024) {

            desserts[i].image.setAttribute('src', jsonData[i].image.tablet);

        } else {

            desserts[i].image.setAttribute('src', jsonData[i].image.desktop);
        }

        desserts[i].category.innerText = jsonData[i].category;
        desserts[i].name.innerText = jsonData[i].name;
        desserts[i].price.innerText = `$${jsonData[i].price.toFixed(2)}`;
    }
}