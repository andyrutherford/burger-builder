import React, { Component } from 'react';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';


import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';

class ContactData extends Component {
    state = {
        name: '',
        email: '',
        address: {
            street: '',
            state: ''
        },
        loading: false
    }

    orderHandler = (event) => {
        event.preventDefault();
        this.setState({ loading: true });
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            customer: {
                name: 'Shaq',
                address: {
                    street: 'Stapes Center',
                    zipCode: '482739',
                    country: 'USA'
                },
                email: 'shaq@lalakers.com'
            },
            deliveryMethod: 'fastest'
        }

        //POST request
        axios.post('/orders.json', order)
            .then(response => {
                this.setState({ loading: false });
                this.props.history.push('/');
            })
            .catch(error => {
                this.setState({ loading: false })
            });
    }

    render () {
        let form = (
            <form>
                <input className={classes.Input}type="text" name="name" placeholder="Your name" />
                <input className={classes.Input}type="text" name="email" placeholder="Your email" />
                <input className={classes.Input}type="text" name="street" placeholder="Your street address" />
                <input className={classes.Input}type="text" name="state" placeholder="Your state" />
                <Button btnType="Success" clicked={this.orderHandler}>ORDER</Button>
            </form>
        );
        if (this.state.loading) {
            form = <Spinner />
        }
        return (
            <div className={classes.ContactData}>
                <h4>Enter your contact data:</h4> 
                {form}  
            </div>
        );
    }

}

export default ContactData;