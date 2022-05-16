const client = require('../client')

const createShoppingCart = async({ productId, shopperId, total }) => {
    try{
        const {rows: [ cart ] } = await client.query(`
        INSERT INTO cart("productId", "shopperId", total)
        VALUES ($1, $2, $3)
        RETURNING *;
        `, [productId, shopperId, total] )

        return cart;
    } catch(error){
        throw error;
    }
}

const getShoppingCartItemsByUser = async (id) => {
    try{
        const { rows: [shopperId] } = await client.query(
            `
            SELECT * FROM cart 
            WHERE id=$1;
        `, [id])

        return shopperId;
    } catch(error) {
        throw error
    }
}



const attachProductsToCart = async (product) => {
    // check if there is a product, if not, return an empty array
   if(!product.length){
       return [];
   }

   // create an empty array to store the product id's
   const newArray = [];
   // loop through the array
   for(let i = 0; i < product.length; i++){
       // push the products id into the newArray
       newArray.push(product[i].id);
   }
    try{
        const {rows: products} = await client.query(`
        SELECT product.* FROM products 
        JOIN cart ON cart."productId" = product.id
        WHERE product."productId" IN (${newArray.join(',')})
        `, [products])

        return product;
    } catch(error){
        throw error
    }
}


const destroyShoppingCartItem = async (id) => {
    try{ 
        const {rows: [product] } = await client.query(
            `
            DELETE FROM cart
            WHERE "productId"=$1
            RETURNING *
            `,[id]) 

        return product
    } catch(error){
        throw error
    }
}

module.exports = {
    getShoppingCartItemsByUser,
    createShoppingCart,
    attachProductsToCart,
    destroyShoppingCartItem
}