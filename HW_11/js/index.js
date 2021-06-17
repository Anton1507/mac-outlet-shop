$(document).ready(function(){
    $('.slick').slick({
        infinity:true,
        autoplay:true,
        autoplaySpeed:3000,
      
    });
  });

/////////////////////////////Baner_cart/////////////////////////////////////
let banerCart = () => {
    const buttonModOne = document.querySelector('#bt1');
    buttonModOne.onclick = () => {
        inBasket(13)
    }
        

    const buttonBanerTwo = document.querySelector('#bt2');
    buttonBanerTwo.onclick = () => {
        inBasket(32)
    }

    const buttonBanerThree = document.querySelector('#bt3');
    buttonBanerThree.onclick = () => {
        inBasket(29)
    }

    const buttonBanerFor = document.querySelector('#bt4');
    buttonBanerFor.onclick = () => {
        inBasket(34)
    }

    const buttonBanerFive = document.querySelector('#bt5');
    buttonBanerFive.onclick = () => {
        inBasket(5)
    }
}

let Baner = banerCart();
////////////////////////////////////////////////////////////////////////////
const logoBask = document.querySelector('.cart-logo');
logoBask.addEventListener('click', () => { divBask.classList.toggle('show_bask') });
const divBask = document.querySelector('.shoping_container');
////////////////////////////////////modal////////////////////////////////////////////////////////////
const modal = (data) => {
    let divModal = document.querySelector('.modal_block');
    divModal.classList.add('show_modal');
    let divModalFon = document.querySelector('.modal_content');
    divModalContent = document.querySelector('.modal');
    divModalContent.innerHTML = `
     <div class="modal_img"> <img src="img/${data.imgUrl}" alt=""></div>

    <div class="modal_info">
        <h2>${data.name}</h2>
        <div class="modal_statics">
            <img src="img/icons/like_filled2.svg" alt="like">
            <span> ${data.orderInfo.reviews}% Positive reviews </br>Above avarage</span>
            <span>1327 </br> orders</span>

        </div>
        <span> Color: ${data.color}</span>
        <span> Oparating System: ${data.os}</span>
        <span> Chip: ${data.chip.name}</span>
        <span> Height: ${data.size.height}cm </span>
        <span> Width: ${data.size.width} cm </span>
        <span>Depth:  ${data.size.depth}cm </span>
        <span> Weight: ${data.size.weight} g </span>
    </div>

    <div class="modal_price">
        <h1>$ ${data.price}</h1>
        <span>Stock:  ${data.orderInfo.inStock} pcs.</span>
        
    </div> 
    
    
    `
    const divModalPrice = document.querySelector('.modal_price');
    const buttonOnModal = document.createElement('button');
    buttonOnModal.innerText = `Add to cart`;
    divModalPrice.appendChild(buttonOnModal);

    buttonOnModal.onclick = () => {
        inBasket(data.id)
    }


    divModalFon.onclick = () => divModal.classList.remove('show_modal');




}
///////////////////////////RenderCarts///////////////////////
class Cards {
    constructor() {
        this.renderCard(items);
        this.bindInputChange();
        this.bindInputChangePriceFrom();
        this.bindInputChangePriceTo();


    }
    renderCard(arr) {
        const container = document.querySelector('.carts');
        container.innerHTML = ' ';

        arr.forEach(item => {
            let a = document.createElement('div');
            container.appendChild(a);
            a.classList.add('item_block');



            const divItem = document.createElement('div');
            divItem.classList.add('item');

            const divImgLike = document.createElement('div');
            divImgLike.classList.add('likes');
            const divImgLike_add = document.createElement('img');
            divImgLike_add.setAttribute('src', 'img/icons/like_empty.svg');
            divImgLike.appendChild(divImgLike_add);

            const divImg = document.createElement('div');
            divImg.classList.add('images-item');
            const divImg_add = document.createElement('img');
            divImg_add.setAttribute('src', `img/${item.imgUrl}`);
            divImg.appendChild(divImg_add);

            const divTitle = document.createElement('div');
            divTitle.classList.add('title');
            const divTitle_conten = document.createElement('span');
            divTitle_conten.innerHTML = `${item.name}`;
            divTitle.appendChild(divTitle_conten);

            const divStatus = document.createElement('div');
            divStatus.classList.add('stock-status');
            const spanStock = document.createElement('span')
            spanStock.innerText = `${item.orderInfo.inStock} left in stock  `;
            const spanPrice = document.createElement('span');
            spanPrice.innerText = `    Price:${item.price}`
            divStatus.appendChild(spanStock);
            divStatus.appendChild(spanPrice);

            const divButton = document.createElement('div');
            divButton.classList.add('add-to-cart-item');
            const button_add = document.createElement('button');
            button_add.innerText = `Add to cart`;
            divButton.appendChild(button_add);

            const divStat = document.createElement('div');
            divStat.classList.add('stats');
            const imgStat = document.createElement('img');
            imgStat.setAttribute('src', 'img/icons/like_filled2.svg');
            const spanPost = document.createElement('span');
            spanPost.innerHTML = `${item.orderInfo.reviews}% Positive reviews </br>Above avarage`
            const spanOreder = document.createElement('span');
            spanOreder.innerHTML = `1327 </br> orders`;
            divStat.appendChild(imgStat);
            divStat.appendChild(spanPost);
            divStat.appendChild(spanOreder);

            divItem.appendChild(divImgLike);
            divItem.appendChild(divImg);
            divItem.appendChild(divTitle);
            divItem.appendChild(divStatus);
            divItem.appendChild(divButton);
            divItem.appendChild(divStat);
            a.appendChild(divItem);




            divImg.onclick = () => { modal(item) };
            divTitle.onclick = () => { modal(item) };
            divStatus.onclick = () => { modal(item) };
            divStat.onclick = () => { modal(item) };

            button_add.onclick = () => {
               inBasket(item.id)
            };



        })

    }

    bindInputChange() {
        const input = document.querySelector('.inputSearch');
        input.oninput = c => {
            findService.search = c.target.value;
        }
    }
    bindInputChangePriceFrom() {
        const input_from = document.querySelector('.input_from');
        input_from.setAttribute('value', 179);
        input_from.oninput = a => {

            findService.priceFrom = a.target.value;
        }
    }
    bindInputChangePriceTo() {
        const input_to = document.querySelector('.input_to');
        input_to.setAttribute('value', 2800)
        input_to.oninput = b => {
            findService.priceTo = b.target.value
        }
    }

}
const view = new Cards();
////////////////////////////////////////////////////////
class FindService {
    #search = '';
    #priceFrom = '1';
    #priceTo = '10000';
    #os = [];
    #colors = [];
    #storage = [];
    #display = [];
    constructor() {


    }
    get priceFrom() {
        return this.#priceFrom;
    }
    set priceFrom(value) {
        this.#priceFrom = value;
        this.renderFiltredItems();

    }
    get priceTo() {
        return this.#priceTo;
    }
    set priceTo(value) {
        if (value == null) {
            this.#priceTo = 9999
        } else {
            this.#priceTo = value
        }
        this.renderFiltredItems();
    }
    get search() {
        return this.#search.toLowerCase();

    }
    set search(value) {
        this.#search = value;
        this.renderFiltredItems();

    }
    get colors() {
        return this.#colors
    }
    set colors(color) {
        if (this.#colors.includes(color)) {
            this.#colors = this.#colors.filter(c => color !== c)

        } else { this.#colors.push(color) }

        this.renderFiltredItems();
    }
    get os() {
        return this.#os;
    }
    set os(os) {
        if (this.#os.includes(os)) {
            this.#os = this.#os.filter(c => os !== c)

        } else { this.#os.push(os) }

        this.renderFiltredItems();
    }
    get storage() {
        return this.#storage;
    }
    set storage(storage) {
        if (this.#storage.includes(storage)) {
            this.#storage = this.#storage.filter(c => storage !== c);

        } else { this.#storage.push(storage) }
        this.renderFiltredItems();
    }
    get display() {
        return this.#display;
    }
    set display(display) {
        if (this.#display.includes(display)) {
            this.#display = this.#display.filter(c => display !== c)
        } else { this.#display.push(display) }
        this.renderFiltredItems();
    }

    getFiltredItems() {
        return items.filter(item => {
            const isSearch = item.name.toLowerCase().includes(this.search);
            if (!isSearch) return false;


            const isPrise = true
            if (item.price >= this.#priceFrom && item.price <= this.#priceTo) { } else { return false };


            let isColorExist = true;
            this.colors.forEach(color => {
                if (!item.color.includes(color)) {
                    isColorExist = false
                }
            })
            if (!isColorExist) return false

            let isOsExist = true;
            this.os.forEach(os => {
                if (item.os !==os) {
                    isOsExist = false
                }
            })
            if (!isOsExist) return false

            let isStorageExist = true;
            this.storage.forEach(storage => {
                if (item.storage !== storage) {
                    isStorageExist = false;
                }
            })
            if (!isStorageExist) return false

            let isDisplayExist = true;
            this.display.forEach(display => {
                if (item.display !== display) {
                    isDisplayExist = false
                }
            })
            if (!isDisplayExist) return false;


            return true;

        });
    }

    renderFiltredItems() {
        const result = this.getFiltredItems();
        view.renderCard(result);
    }




}
const findService = new FindService;
////////////////////////////////////////////////////////
class Filters {
    constructor() {
        this.data = [

            {
                name: 'Color',
                options: this.initialColors,
                type: 'colors'
            },
            {
                name: 'Os',
                options: this.initialOs,
                type: 'os'
            },
            {
                name: 'Storage',
                options: this.initialStorage,
                type: 'storage'
            },
            {
                name: 'Display',
                options: this.initialDisplay,
                type: 'display'
            }
        ]
        this.renderFilters();
    }

    get initialColors() {
        const arrOfColors = [];
        items
            .map(item => item.color)
            .forEach(colors => {
                const result = colors.filter(c => !arrOfColors.includes(c))
                arrOfColors.push(...result)

            });
        return arrOfColors;
    }
    get initialOs() {

        return items

            .map(item => item.os)
            .filter((item, index, arr) => arr.indexOf(item) == index);



    }
    get initialStorage() {
        return items
            .map(item => item.storage)
            .filter((item, index, arr) => arr.indexOf(item) == index)
            .sort((a, b) => a - b);
    }
    get initialDisplay() {
        return items
            .map(item => item.display)
            .filter((item, index, arr) => arr.indexOf(item) == index)
            .sort((a, b) => a - b);
    }
    renderFilter(filterData) {
        const container = document.createElement('div');
        container.classList.add('filter_items');

        const logoDiv = document.createElement('div');
        logoDiv.classList.add('filter_items_logo');
        logoDiv.innerHTML = `<strong> ${filterData.name}</strong>`

        const chevron = document.createElement('div');
        chevron.classList.add('acardion-chevron');


        const divCheckbox = document.createElement('div');
        divCheckbox.classList.add('filter_items_checkbox');

        filterData.options.forEach(option => {
            const checkbox = document.createElement('input')
            checkbox.type = 'checkbox';

            const label = document.createElement('label');
            if (option != null) { label.innerText = option } else { return };



            checkbox.onchange = () => {
                findService[filterData.type] = option;
            }

            logoDiv.appendChild(chevron);
            label.appendChild(checkbox);
            divCheckbox.appendChild(label);

            container.appendChild(logoDiv);
            container.appendChild(divCheckbox);



        })


        const filt_log = document.querySelector('.filter_items_logo');
        filt_log.onclick = () => { price_filt() }

        logoDiv.addEventListener('click', () => {

            chevron.classList.toggle('active');
            divCheckbox.classList.toggle("show");
        });

        return container;
    }
    renderFilters() {
        const filterEl = document.querySelector('.filters');
        filterEl.append(...this.data.map(item => this.renderFilter(item)))
    }

}

new Filters();
///////////////////////////arcadion_filter_price/////////////////////////////////////////
price_filt = () => {
    const filt_log = document.querySelector('.filter_items_logo');
    const filt_check = document.querySelector('.filter_items_checkbox');
    const filt_shevron = document.querySelector('.acardion-chevron');

    filt_check.classList.toggle('show');
    filt_shevron.classList.toggle('active');
}
/////////////////////////////filter_dipslay///////////////////////////////////////////////////////////
filter_button = () => {
    const button_filt = document.querySelector('.filter-button');
    const filters = document.querySelector('.filters');
    button_filt.addEventListener('click', () => {

        filters.classList.toggle('show_filt');
    });
}
const fil_b = filter_button()
//////////////////////////////////basket///////////////////////
inBasket =(id)=>{
    let num = Number(localStorage.getItem(id));
        
    console.log(num);

    if (num == undefined){
        localStorage.setItem(id,1)
    }else{
        if(num>=4){
            return
        }else{
            localStorage.setItem(id,num+1)
        }
    }
    return  new Basket()
}
class Basket {

    constructor() {
        this.renderBasket();
        this.renderBasketCart();


    }
    renderBasket() {
        divBask.innerHTML = ` <div class="heder_shoping">
        <h2>Shoping Cart</h2>
        <span>Checkout is almost done!</span>
    </div>
    <div class="shoping_carts">
        
    </div>`
    }

    renderBasketCart() {
        const divShoping_carts = document.querySelector('.shoping_carts');

        const arrayOfKeysLocal = Object.keys(localStorage);


        let priceAcc = [];






        arrayOfKeysLocal.forEach(id => {

            const is = items.filter(item => item.id == id);
            const isItem = is[0];

            let numbers = localStorage.getItem(id);


            const divShop_cart = document.createElement('div');
            divShop_cart.classList.add('shop_cart');

            const imgCart = document.createElement('img');
            imgCart.setAttribute('src', 'img/' + `${isItem.imgUrl}`);

            const shop_name = document.createElement('div');
            shop_name.classList.add('shop_name');
            const nameItem = document.createElement('span')
            nameItem.innerText = `${isItem.name}`;
            const shop_price = document.createElement('div');
            shop_price.classList.add('shop_price');
            shop_price.innerText = '$' + `${isItem.price}`
            shop_name.appendChild(nameItem);
            shop_name.appendChild(shop_price);

            const shop_button = document.createElement('div');
            shop_button.classList.add('shop_button');
            let buttonLess = document.createElement('button');
            buttonLess.classList.add('buttonLess')
            buttonLess.innerText = '<';
            const shop_number = document.createElement('div');
            shop_number.innerText = `${numbers}`;
            const buttonMore = document.createElement('button');
            buttonMore.innerText = ">";
            const buttonDelet = document.createElement('button');
            buttonDelet.innerText = "X";
            shop_button.appendChild(buttonLess);
            shop_button.appendChild(shop_number);
            shop_button.appendChild(buttonMore);
            shop_button.appendChild(buttonDelet);

            divShop_cart.appendChild(imgCart);
            divShop_cart.appendChild(shop_name);
            divShop_cart.appendChild(shop_button);





            divShoping_carts.appendChild(divShop_cart);

            buttonLess.onclick = () => {
                let oldNumers = localStorage.getItem(id);
                let newNumbers = Number(oldNumers) - 1;
                if (newNumbers > 0) {
                    localStorage.setItem(`${id}`, `${newNumbers}`)
                } else {

                    buttonLess.classList.add('button-not-activ');

                }
                return new Basket();
            }
            buttonMore.onclick = () => {
                let oldNumber = localStorage.getItem(id);
                let newNumber = Number(oldNumber) + 1;
                if (newNumber < 5) {
                    localStorage.setItem(`${id}`, `${newNumber}`)
                } else {
                    localStorage.setItem(id, 4);
                }
                ;
                return new Basket();
            }
            buttonDelet.onclick = () => {

                localStorage.removeItem(id);
                return new Basket();
            }


            items.map(item => {
                if (item.id == id) {
                    item.price
                    return priceAcc.push(item.price * `${Number(localStorage.getItem(id))}`)
                } return
            })




        })

        let sumBask = priceAcc.reduce((prev, value) => { return prev + value }, 0);
        let numberInBask = Object.values(localStorage);
        let allProductInBask = numberInBask.reduce((prev, value) => { return prev + Number(value) }, 0);
        const divcartElips = document.querySelector('.cart-minElips');
        divcartElips.innerText = `${allProductInBask}`



        const divSumLine = document.createElement('div');
        divSumLine.classList.add('sum_line');

        const spanSumLine = document.createElement('span');
        spanSumLine.innerText = `Total amound: `
        const strongSpanSumLine = document.createElement('strong');
        strongSpanSumLine.innerText = `${allProductInBask} ptc`;
        spanSumLine.appendChild(strongSpanSumLine);

        const spanTwoSumLine = document.createElement('span');
        spanTwoSumLine.innerText = `Total price: `;
        const strongSpanTwoSumLine = document.createElement('strong');
        strongSpanTwoSumLine.innerText = `${sumBask} $`;
        spanTwoSumLine.appendChild(strongSpanTwoSumLine);

        divSumLine.appendChild(spanSumLine);
        divSumLine.appendChild(spanTwoSumLine);

        const buttonInBasket = document.createElement('button');
        buttonInBasket.classList.add('shop_buy')
        buttonInBasket.innerText = 'Buy';



        divBask.appendChild(divSumLine);
        divBask.appendChild(buttonInBasket);



    }



}

const bask = new Basket();

