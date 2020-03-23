import React, { useState, useEffect } from 'react';
import { Nav, Row, Col, Container } from 'react-bootstrap';
import fakeData from '../../fakeData/fakeData';
import Food from '../Food/Food';
import './FoodMenu.css';
import FoodDetail from '../FoodDetail/FoodDetail';


const FoodMenu = () => {
    const [allItems, setAllItems] = useState([]);
    const [currentItems, setCurrentItems] = useState([]);
    const [currentSelectedItem, setCurrentSelectedItem] = useState(null);
    const [cart, setCart] = useState([]);

    
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
    
    return (
        <div>
            
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

            </Container>
            
        </div>
    );
};

export default FoodMenu;