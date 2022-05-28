import React, { useEffect, useState} from "react";
import { Link } from 'react-router-dom';
import { getAllProducts } from "../api/index";
import '../style/Productpage.css';

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

const Productpage = () => {
    const [ products, setProducts ] = useState([]);

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


    return(
        <div>

            <h1>In the products Page</h1>
        <div className = "productsBox">
        <h1>Take a look at our selection of cars!</h1>
 

        {
            products.map(products => {
               return <div className = "content" key = {products.id}>
                    <div className="column">
                      <div>
                    <h2> Product: {products.make} </h2> 
                    <h2>Model: {products.model} </h2>
                    <h2>Make: {products.make}</h2>
                    <h3>Year: {products.year}</h3>
                    <h3>Cost: ${products.cost}</h3>
                    </div>
                    <div className="car-image">
                      <img src={products.car} width="200" height="200"/>
                    </div>
                    </div>
                </div>
            })
        }
        </div>
        <Link to= '/Navbar'>Back</Link>
        </div>
    )

} 

export default Productpage