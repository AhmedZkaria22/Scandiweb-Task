/*
    store : 
        Products : {
            id, title, description, price, category, gender, sizes
        }
*/

/*
    user : 
        add , delete , update , read in new collection for each user , but firstly try on store
*/

const FakeData = [
    {
        id: 1, 
        title: "Apollo Running Short", 
        description: "Find stunning women's cocktail dresses and party dresses. Stand out in lace and metallic cocktail dresses and party dresses from all your favorite brands.", 
        price: "50.00", 
        category: "All Clothes", 
        gender: "women",
        sizes: "m l",
        selected: false,
        amount: 1

    },
    {
        id: 2, 
        title: "Apollo Running Short", 
        description: "Find stunning women's cocktail dresses and party dresses. Stand out in lace and metallic cocktail dresses and party dresses from all your favorite brands.", 
        price: "75.00", 
        category: "All Tech", 
        gender: "women",
        sizes: "xs s",
        selected: true,
        amount: 1

    },
    {
        id: 3, 
        title: "Apollo Running Short", 
        description: "Find stunning women's cocktail dresses and party dresses. Stand out in lace and metallic cocktail dresses and party dresses from all your favorite brands.", 
        price: "75.00", 
        category: "All Clothes", 
        gender: "men",
        sizes: "s l",
        selected: false,
        amount: 1

    },
    {
        id: 4, 
        title: "Apollo Running Short", 
        description: "Find stunning women's cocktail dresses and party dresses. Stand out in lace and metallic cocktail dresses and party dresses from all your favorite brands.", 
        price: "50.00", 
        category: "All Tech", 
        gender: "men",
        sizes: "xs l",
        selected: true,
        amount: 1

    },
    {
        id: 5, 
        title: "Apollo Running Short", 
        description: "Find stunning women's cocktail dresses and party dresses. Stand out in lace and metallic cocktail dresses and party dresses from all your favorite brands.", 
        price: "50.00", 
        category: "All Clothes", 
        gender: "kids",
        sizes: "s",
        selected: false,
        amount: 1

    },
    {
        id: 6, 
        title: "Apollo Running Short", 
        description: "Find stunning women's cocktail dresses and party dresses. Stand out in lace and metallic cocktail dresses and party dresses from all your favorite brands.", 
        price: "50.00", 
        category: "All Tech", 
        gender: "kids",
        sizes: "s",
        selected: false,
        amount: 1

    },
];

module.exports = { FakeData };