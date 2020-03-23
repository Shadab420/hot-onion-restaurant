import React from 'react';
import { Card, Button } from 'react-bootstrap';
import lunch1 from '../../images/lunch/lunch1.png';
import './Food.css';

const Food = (props) => {
    const { name, shortDescription, price, imgUrl } = props.item;

    return (
        <div>
            <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src={lunch1} className="card-image" />
                <Card.Body>
                    <Card.Title>{ name }</Card.Title>
                    <Card.Text>
                        { shortDescription }
                    </Card.Text>
                    <Card.Subtitle className="mb-2 text-muted">${ price }</Card.Subtitle>
                </Card.Body>
            </Card>
        </div>
    );
};

export default Food;