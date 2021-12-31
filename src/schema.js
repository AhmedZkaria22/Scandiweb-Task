const { GraphQLSchema, GraphQLObjectType, GraphQLList, GraphQLInt, GraphQLString, GraphQLBoolean } = require("graphql");
const ProductsData = require('../db.json') ;


const ProductType = new GraphQLObjectType({
    name: 'ProductsData',
    fields: {
        id: { type: GraphQLInt }, 
        title: { type: GraphQLString },
        description: { type: GraphQLString },
        price: { type: GraphQLString },
        category: { type: GraphQLString },
        gender: { type: GraphQLString },
        sizes: { type: GraphQLString },
        selected: { type: GraphQLBoolean },
        amount: { type: GraphQLInt }
    }
});


const rootQuery = new GraphQLObjectType({
    name: 'RootQuery',
    fields: {
        ProductsData: { 
            type: GraphQLList(ProductType), 
            resolve: () => {
                return ProductsData ;
            }
        },
        ProductsDataById: {
            type: ProductType,
            args:{ id: {type: GraphQLInt} },
            resolve: (_, {id}) => {
                // sendData = ProductsData.find( prod => prod.id === id );
                // return sendData;
                return ProductsData.find( prod => prod.id === id );
            }
        },
        ProductsDataByGender: {
            type: GraphQLList(ProductType),
            args:{ gender: {type: GraphQLString} },
            resolve: (_, {gender}) => {
                // sendData = ProductsData.filter( prod => prod.gender === gender );
                // return sendData;
                return ProductsData.filter( prod => prod.gender === gender );
            }
        },
        ProductsDataByCategory: {
            type: GraphQLList(ProductType),
            args:{ categ: {type: GraphQLString} },
            resolve: (_, {categ}) => {
                return ProductsData.filter( prod => prod.category.split(' ').indexOf(categ) !== -1 );
            }
        },
        ProductsDataByGender_Category: {
            type: GraphQLList(ProductType),
            args:{ gender: {type: GraphQLString},   categ: {type: GraphQLString} },
            resolve: (_, {gender, categ}) => {
                return ProductsData.filter( prod => (prod.category.split(' ').indexOf(categ) !== -1 && prod.gender === gender) );
            }
        },

        UserProductsCart: {
            type: GraphQLList(ProductType),
            resolve: () => {
                // let CartData = ProductsData.filter( prod => prod.selected === true );
                // return CartData;
                return ProductsData.filter( prod => prod.selected === true );
            }
        }
    }
});


const rootMutation = new GraphQLObjectType({
    name: 'RootMutation',
    description: 'This is the rootMutation',
    fields: {
        AddProductCart: {
            type: ProductType,
            args:{ 
                id: { type: GraphQLInt }, 
            },
            resolve: (_, {id}) => {
                ProductsData.find( item => item.id === id ).selected = true;
                return ProductsData.find( item => item.id === id );
            }
        },
        IncreProductAmount: {
            type: ProductType,
            args:{ 
                id: { type: GraphQLInt }, 
            },
            resolve: (_, {id}) => {
                ProductsData.find( item => item.id === id ).amount += 1;
                return ProductsData.find( item => item.id === id );
            }
        },
        DecreProductAmount: {
            type: ProductType,
            args:{ 
                id: { type: GraphQLInt }, 
            },
            resolve: (_, {id}) => {
                ProductsData.find( item => item.id === id ).amount -= 1;
                return ProductsData.find( item => item.id === id );
            }
        },
        DeleteCartItem: {
            type: ProductType,
            args:{ 
                id: { type: GraphQLInt }, 
            },
            resolve: (_, {id}) => {
                ProductsData.find( item => item.id === id ).selected = false;
                return ProductsData.find( item => item.id === id );
            }
        }
    }
});


module.exports = new GraphQLSchema({query: rootQuery, mutation: rootMutation});
// module.exports = new GraphQLSchema({query: rootQuery});