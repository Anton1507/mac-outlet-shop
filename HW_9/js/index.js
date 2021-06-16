/////////////////////////slick slider///////////////////////////////////////
$(document).ready(function(){
    $('.slick').slick({
        infinity:true,
        autoplay:true,
        autoplaySpeed:3000,
        adaptiveHeight:true,
      
    });
  });



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
        localStorage.setItem(`${data.id}`, undefined ? 1 : Number(localStorage.getItem(`${data.id}`)) == 4 ? 4 : Number(localStorage.getItem(`${data.id}`)) + 1);
        return new Basket();
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
                localStorage.setItem(`${item.id}`, undefined ? 1 : Number(localStorage.getItem(`${item.id}`)) == 4 ? 4 : Number(localStorage.getItem(`${item.id}`)) + 1);
                return new Basket();
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


