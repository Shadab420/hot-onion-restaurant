import React, { useState, useEffect } from 'react';
import { Nav, Row, Col, Container, Button } from 'react-bootstrap';
import fakeData from '../../fakeData/fakeData';
import Food from '../Food/Food';
import './FoodMenu.css';
import FoodDetail from '../FoodDetail/FoodDetail';
import Delivery from '../Delivery/Delivery';
import CartItem from '../CartItem/CartItem';


const FoodMenu = () => {
    const [allItems, setAllItems] = useState([]);
    const [currentItems, setCurrentItems] = useState([]);
    const [currentSelectedItem, setCurrentSelectedItem] = useState(null);
    const [cart, setCart] = useState([]);
    const [checkedOut, setCheckedOut] = useState(false);
    const [deliveryInfoSubmit, setDeliveryInfoSubmit] = useState(false);
    const [deliveryInformation, setDeliveryInformation] = useState(null);

    
// load data
    useEffect(()=>{
        setAllItems(fakeData);
        handleSelection("Breakfast");
    }, [])

    const handleSelection = category => {
        const currentItems = fakeData.filter(food => food.category === category);
        setCurrentItems(currentItems);
        setCurrentSelectedItem(null);
    }

    const handleCurrentSelectedItem = item => {
        setCurrentSelectedItem(item);
    }

    const addToCart = item => {
        const selectedItem = cart.find(it=>it.id === item.id);

        if(selectedItem){
            const index = cart.indexOf(selectedItem);
            const newCart = [...cart];
            newCart[index] = item;
            setCart(newCart);
        }
        else{
            setCart([...cart, item]);
        }
    }

    const removeFromCart = item => {
        console.log(item);
    }

    const handleCheckout = () =>{
        if(checkedOut) setCheckedOut(false);
        else setCheckedOut(true);
    }

    const handleDeliveryInfoSubmit = (deliveryInfo) =>{
        if(deliveryInfoSubmit) setDeliveryInfoSubmit(false);
        else {
            setDeliveryInfoSubmit(true);
            setDeliveryInformation(deliveryInfo);
        }
    }

    const checkoutBtnMarkup = cart.length > 0 ? (
                                    <Button onClick={()=>handleCheckout()}> Checkout Your Food </Button>
                                ): <Button disabled> Checkout Your Food </Button>
    
    return (
        <div className="food-menu">
            
            <Nav activeKey="Breakfast" onSelect={(selectedKey) => {handleSelection(selectedKey)}} >
                <Nav.Item>
                    <Nav.Link eventKey="Breakfast">Breakfast</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="Lunch">Lunch</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="Dinner">Dinner</Nav.Link>
                </Nav.Item>
            </Nav>
            
            {
                !checkedOut &&
            
                <Container fluid="md">
                    <Row >
                        {
                            
                            !currentSelectedItem && currentItems.map(item => {
                                return  <Col md={4} xs={12} sm={12} className="food-item-col" onClick={()=>{handleCurrentSelectedItem(item)}}><Food item={item}/></Col>
                            })
                        }

                        {
                            currentSelectedItem && <FoodDetail food={currentSelectedItem} addToCart={addToCart} removeFromCart={removeFromCart} />

                        }
                    </Row>
                    
                    { checkoutBtnMarkup }
                    
                </Container>
            }

            {
                checkedOut &&
            
                <Container fluid="md">
                    <Row >
                        <Col md={6}>
                            <Delivery deliveryInfoSubmit={handleDeliveryInfoSubmit}/>
                        </Col>
                        <Col md={6}>
                            <h3>Cart</h3>
                            <hr/>
                            { deliveryInfoSubmit &&
                                <div>
                                    <h4>From: KFC</h4>
                                    <h5>Arriving in: 20-30 min</h5>
                                    <h6>Customer Name: {deliveryInformation.name} </h6>
                                    <h6>Customer Address: {deliveryInformation.address}</h6>
                                    <h6>Mobile No.: {deliveryInformation.mobile}</h6>
                                    <hr/>
                                    <br/>
                                </div>
                                
                            }
                            {
                                cart.map(item => {

                                    const singleItemPrice = allItems.find(i => i.id === item.id).price;                                    
                                    return <CartItem item={item} singlePrice={singleItemPrice}  addToCart={addToCart} removeFromCart={removeFromCart}/>
                                })

                                
                            }

                            {
                                deliveryInfoSubmit && <a href="/orderplaced" className="btn btn-outline-danger">Place Order</a>
                            }
                            {
                                !deliveryInfoSubmit && <Button disabled> Place Order </Button>
                            }

                        
                        </Col>
                    </Row>
                    
                    
                    
                </Container>
            }
            
        </div>
    );
};

export default FoodMenu;