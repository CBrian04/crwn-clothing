import React from 'react';
import StripeCheckout from 'react-stripe-checkout';
 
const StripeCheckoutButton = ({ price }) => {
    const priceForStripe = price * 100;
    const publishableKey = "pk_test_0mPJyaWtSlAtmczmjeHQb6PH0061CLwCsD";

    const onToken = token => {
        console.log(token)
        alert('Payment Successful');
    }
    return (
        <StripeCheckout 
            label='Pay now'
            name='CRWN Clothing Ltd.'
            billingAddress
            shippingAddress
            image='https://svgshare.com/i/CUz.svg'
            description={`Your total in $${price}`}
            amount={priceForStripe}
            panelLabel='Pay Now'
            token={onToken}
            stripeKey={publishableKey}
        />
    );
};
 
export default StripeCheckoutButton;