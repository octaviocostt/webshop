import React from 'react'
import { Authenticator } from '@aws-amplify/ui-react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from "../components/CheckoutForm";
import '@aws-amplify/ui-react/styles.css';


const Checkout = () => {
    const stripePromise = loadStripe('pk_test_51Q66tqHQr8p2iTv1s8bmd4lsuO92NDBFUBw4EWUJxUT8C9eJT0sAWUyJFbBO3yBcu8SDoYXWUQHZz9LLf0DKpJhi00lqNAqE3o');

    return (
        <section className="checkout-form-container">
            <Authenticator >
            {({ signOut, user }) => (
                <Elements stripe={stripePromise}>
                    <section>
                    <button className="signout-btn" onClick={signOut}>SignOut</button>
                    <h1 className="welcome-message">Hello {user?.username}</h1>
                        <h2 class="checkout-header">Time to Checkout?</h2>
                        <CheckoutForm />
                    </section>
                </Elements>
            )}
           
            </Authenticator>
        </section>
    )
}

export default Checkout
