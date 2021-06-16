/////////////////////////slick slider///////////////////////////////////////
$(document).ready(function(){
    $('.slick').slick({
        infinity:true,
        autoplay:true,
        autoplaySpeed:3000,
        adaptiveHeight:true,
      
    });
  });


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




           



        })

    }

   

}
const view = new Cards();
////////////////////////////////////////////////////////

