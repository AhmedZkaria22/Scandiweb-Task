

export const handelGender = (e, propSetState) => {
    propSetState(`${e.target.name}`);
    const genderBtn = document.querySelectorAll('.navbar__gender-filter button');
    for (let i = 0; i < genderBtn.length; i++) {
        if( genderBtn[i] === e.target ){ 
            e.target.classList.add('activeGender');
        }else{ genderBtn[i].classList.remove('activeGender'); }
    }
}

export const handelSizes = (e) => {
    const curBtn = e.target;
    const availBtns = document.querySelectorAll('.cartItem-sizes button:not(.disable-size)');
    for(let i = 0; i< availBtns.length; i++){
        availBtns[i].classList.remove('activeSize');
        availBtns[i].classList.add('available-size');
        if( availBtns[i] === curBtn ){ 
            availBtns[i].classList.remove('available-size');
            availBtns[i].classList.add('activeSize'); 
        }
    }
}


export const handelTotal = (array) => {
    let total = 0;
    for( let i = 0; i < array.length; i++ ){
        total += (parseFloat(array[i].price) * array[i].amount);
    }
    console.log(total);
    return total;
}

export const handelCurrency = (string, propSetState) => {
    propSetState(string)
}


export const ShowCategoriesList = (elem, actionElem, actionElemSib, actionStart) => {
    actionElem.style.display = 'none';
    actionElemSib.style.display = 'inline-block';
    if( actionElem === actionStart ){ elem.style.display = 'flex';
    }else{ elem.style.display = 'none'; }
}

export const handelCategory = (e, propSetState) => {
    propSetState(`${e.target.name}`);
    const genderBtn = document.querySelectorAll('.category-list button');
    for (let i = 0; i < genderBtn.length; i++) {
        if( genderBtn[i] === e.target ){ 
            e.target.classList.add('activeGender');
        }else{ genderBtn[i].classList.remove('activeGender'); }
    }
}
