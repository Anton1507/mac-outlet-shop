class ProductCard {
    constructor(item) {
        this.item = item;
    }

    renderItem() {
        return `<div class="item">
                        <div class="likes">
                            <img src="img/icons/like_empty.svg">
                        </div>
                        <div class="images-item">
                            <img src="img/${this.item.imgUrl}">
                        </div>
                        <div class="title">
                            <span>${this.item.name}</span>

                        </div>

                        <div class="stock-status">
                            <span>${this.item.orderInfo.inStock}left in stock</span></br>
                            <span>Price:${this.item.price}</span>
                        </div>
                        <div class="add-to-cart-item">
                            <button>Add to cart</button>
                        </div>
                        <div class="stats">

                            <img src="img/icons/like_filled2.svg" alt="like">
                            <span>${this.item.orderInfo.reviews}% Positive reviews </br>Above avarage</span>
                            <span>1327 </br> orders</span>

                        </div>
                    </div>`;
    }
}

class Filter {
    constructor(productList, filterOptionList, filterRootNode, productRootNode, nameSeacrhSelector) {
        this.productCardList = productList.map(x => new ProductCard(x));
        this.filterOptionList = filterOptionList;

        this.filterRootNode = filterRootNode;
        this.productRootNode = productRootNode;


        this.namePatern = '';
        this.filterRootNode.addEventListener('filterChange', () => this.filter());
        this.filterOptionList.forEach(filterOption => {
            this.filterRootNode.append(filterOption.renderFilterOption(this.filterRootNode));
        });

        let search_input = document.querySelector(nameSeacrhSelector)
        let onsearchChange = () => {
            this.namePatern = search_input.value;
            this.filter();
        };
        search_input.addEventListener('change',onsearchChange );
        search_input.addEventListener('input',onsearchChange );
    }


    filter() {
        let listOfFilteredCards = this.productCardList.filter(productCard => {
            let isFilterOk = this.filterOptionList.every(filterOption => filterOption.isValidDueToFilter(productCard.item));
            let isNameOk = productCard.item.name.includes(this.namePatern);
            return isFilterOk && isNameOk;
        });
        this.productRootNode.innerHTML = '';
        listOfFilteredCards.forEach(x => {
            let div = document.createElement('div');
            div.innerHTML = x.renderItem();
            this.productRootNode.append(div)
        });
    }
}

class FilterOption {
    constructor(name) {
        this.name = name;
    }
    isValidDueToFilter(product) { }
    renderBody(parent) { }
    renderFilterOption(parent) {

        let accordeonElement = document.createElement('div');
        accordeonElement.classList.add('accordeon');
        
        let header = document.createElement('div');
        header.classList.add("accordeon-header");
        
        header.innerText = this.name;
       



        let body = document.createElement('div');
        body.classList.add('accordeon-body');
        body.append(this.renderBody(parent));


        accordeonElement.append(header);
        accordeonElement.append(body);


        header.addEventListener('click', () => {
            header.classList.toggle('active');
            body.classList.toggle('show');
        });

        return accordeonElement;

    }
}
class CheckboxFilterOption extends FilterOption {
    constructor(name, allOptions, predicate) {
        super(name)
        this.allOptions = allOptions;
        this.checkedOptions = [];
        this.predicate = predicate;
    }
    isValidDueToFilter(product) {
        if (this.checkedOptions.length > 0) {
            return this.predicate(product, this.checkedOptions)
        } else {
            return true;
        }

    }
    renderBody(parent) {
        let div = document.createElement('div');
        this.allOptions.forEach(item => div.append(this.renderChecbox(item, parent)));
        return div;
    }
    renderChecbox(option, parent) {

        //<div><label><input type="checkbox">Red</label></div>
        let div = document.createElement('div');
        let label = document.createElement('label');
        let input = document.createElement('input');
        input.setAttribute('type', 'checkbox');
        div.append(label);
        label.append(input);
        label.append(option);
        input.addEventListener('change', () => {
            if (input.checked) {
                this.checkedOptions.push(option)
            } else {
                this.checkedOptions = this.checkedOptions.filter(checkedOption => checkedOption != option);
            }
            parent.dispatchEvent(new Event('filterChange'))
        })
        return div;

    }
}
class PriceFilterOption extends FilterOption {
    constructor(min, max) {
        super('Price')
        this.from = min;
        this.to = max;
    }
    isValidDueToFilter(product) {
        return product.price >= this.from && product.price <= this.to;
    }
    renderBody(parent) {
        let div = document.createElement('div');
        let fromInput = document.createElement('input');
        let toInput = document.createElement('input');

        fromInput.type = 'number';
        toInput.type = 'number';

        fromInput.value = this.from;
        toInput.value = this.to;

        fromInput.min = this.from;
        fromInput.max = this.to;

        toInput.min = this.from;
        toInput.max = this.to;

        div.append(fromInput, toInput);
        fromInput.addEventListener('change', () => {
            this.from = parseInt(fromInput.value);
            parent.dispatchEvent(new Event('filterChange'));

        })
        toInput.addEventListener('change', () => {
            this.to = parseInt(toInput.value);
            parent.dispatchEvent(new Event('filterChange'));
        });
        return div;
    }
}

const filterOptionList = [];
const filterRootNode = document.querySelector('.filters');
const productRootNode = document.querySelector('.carts');

const max = Math.max(...items.map(x => x.price));
const min = Math.min(...items.map(x => x.price));
filterOptionList.push(new PriceFilterOption(min, max));


const allColors = items.map(item => item.color).flat().filter((val, idx, arr) => arr.indexOf(val) == idx);
filterOptionList.push(new CheckboxFilterOption('Color', allColors, (product, checkedOptions) => {
    return product.color.some(x => checkedOptions.includes(x))
}));

const allMemory = items.map(item => item.storage).filter((val, idx, arr) => arr.indexOf(val) == idx);
filterOptionList.push(new CheckboxFilterOption('Memory', allMemory, (product, checkedOptions) => {
    return checkedOptions.includes(product.storage);
}));


const allOs = items.map(item => item.os).filter((val, idx, arr) => arr.indexOf(val) == idx);
filterOptionList.push(new CheckboxFilterOption('OS', allOs, (product, checkedOptions) => {
    return checkedOptions.includes(product.os);
}));



const DisplayRatio = {
    '2-5 inch': { min: 2, max: 5 },
    '5-7 inch': { min: 5, max: 7 },
    '7-12 inch': { min: 7, max: 12 },
    '12-16 inch': { min: 12, max: 16 },
    '16+ inch': { min: 16, max: 999 },
}



const allRatio = Object.keys(DisplayRatio);
filterOptionList.push(new CheckboxFilterOption('Display', allRatio, (product, checkedOptions) => {
    return checkedOptions.some(x => { //x = '2-5 inch'
        let range = DisplayRatio[x];
        return product.display >= range.min && product.display <= range.max;

    });
}));



const filter = new Filter(items, filterOptionList, filterRootNode, productRootNode, '.inputSearch')