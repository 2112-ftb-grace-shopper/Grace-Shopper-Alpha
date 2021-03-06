import React, { useEffect, useState} from "react";
import { Link } from 'react-router-dom';
import { getAllProducts, postProducts } from "../api/index";
import '../style/Productpage.css';
import { getMyShoppingCart } from "../api/index";
// import Card from '@material-ui/core/Card'
// import { CardContent } from '@material-ui/core'

import firstCar from '../assets/images/1.png';
import secondCar from '../assets/images/2.png';
import thirdCar from '../assets/images/3.jpeg';
import fourthCar from '../assets/images/4.jpeg';
import fifthCar from '../assets/images/5.jpeg';
import sixthCar from '../assets/images/6.jpeg';
import seventhCar from '../assets/images/7.png';
import eighthCar from '../assets/images/8.jpeg';
import ninethCar from '../assets/images/9.png';
import tenthCar from '../assets/images/10.png';

const Productpage = (props) => {
    const { allProducts, setProducts, shoppingCart, setShoppingCart, isLoggedIn } = props;


    useEffect(() => {
        (async () => {
            let products = await getAllProducts();
            products[0].car = firstCar;
            products[1].car = secondCar;
            products[2].car = thirdCar;
            products[3].car = fourthCar;
            products[4].car = fifthCar;
            products[5].car = sixthCar;
            products[6].car = seventhCar;
            products[7].car = eighthCar;
            products[8].car = ninethCar;
            products[9].car = tenthCar;
            setProducts(products)
        })();
    }, []);



    const handleAddToCartButton = async (event, products) => {
        event.preventDefault();
        let userId = localStorage.getItem('userId')
        console.log('user', userId);
        const myShoppingCart = await getMyShoppingCart()
        console.log('PRODUCTSHOPPINGCART', myShoppingCart);
        

        // is returning alert, even when having userToken and credentials in localStorage
        if(!isLoggedIn) {
            alert('Woo! A car has been added to your cart!');
        } else {
            handleAddToCartButton();
        }



        // either store logged in user

        const newShoppingCart = [...shoppingCart, ...myShoppingCart, products]
        setShoppingCart(newShoppingCart);

        localStorage.setItem('cart', JSON.stringify(newShoppingCart));

        // add logic to 
    }

    // const addProductToLoggedInCart = async () => {
    //     const product = await getAllProducts();

    //     // new cart state with products inside
    //     const newCart = [ ...shoppingCart, product ];

    //     setShoppingCart(newCart)
    // }

    return(
        <div>
            <h1>Welcome to our selection of quality vehicles</h1>
        <div className = "productsBox">
        <h2>Take a look at our selection of cars!</h2>

        {
            allProducts.map(products => {
               return <div className = "content" key = {products.id}>
                    <div className="column">
                      <div>

                    <h2>Make: {products.make} </h2> 
                    <h2>Year: {products.year}</h2>
                    <h2>Model: {products.model} </h2>
                    <h2>City Mpg: {products.min_city_mpg}</h2>
                    <h2>Hwy Mpg: {products.min_hwy_mpg}</h2>
                    <h3>Cost: ${products.cost}</h3>
                    </div>

                    
                    <div className="car-image">
                      <img src={products.car} width="200" height="200"/>

                    </div>
 
                    </div>
                    <button onClick={(event) => {handleAddToCartButton(event, products)}}>Add to cart</button>

                </div>
            })
        }
        </div>
        <Link to= '/Navbar'>Back</Link>
        </div>
    )

} 

export default Productpage