# BLUE BUG BOUTIQUE

This project is a POC of an e-commerce store.  

It was created with Create React App and hosted here: [https://prismatic-bonbon-51d1ae.netlify.app/](https://prismatic-bonbon-51d1ae.netlify.app/).  

**Testing of Stripe payment**
Stripe integration is in developer test mode - no charges will be made to actual cards.  Test cards by country found here: [https://stripe.com/docs/testing?testing-method=card-numbers#international-cards] (https://stripe.com/docs/testing?testing-method=card-numbers#international-cards)

## Tech Stack

React 18, React Router DOM and Material UI component library for front-end client app.

Authentication and Backend database: Firebase Authentication, Cloud Firestore

Third-party API integration: Stripe API

## Architecture Overview

Firebase SDK installed.  All firebase-related config and functions are centralised in utilities/firebase.utils.js

Deployed on Netlify with Netlify serverless functions to handle creation of PaymentIntent from Stripe server and to send client secret to front end app.

## Workflows/Page functionalities

### User Authentication Workflows

User can sign in or sign up with email and password or through a third party authentication provider (only Google available) through Firebase Authentication with a signin popup.  

A UserCredential object with a unique user uid is returned on successful signup, which is then used to create a new user document in Firestore if the user does not already exist in the database.

Context API used to broadcast current user to all components by listening in on  onAuthChanged event from Firebase.  Authenticated users gain access to protected routes - Wishlist, Checkout, and Profile. Attempts to access protected routes while unauthenticated will navigate user to the SignIn page.  

### Profile

User is navigated to the Profile page to fill in user details on successful first signin through third-party auth provider or signup with email and password.

User details can be submitted, or user can reset form details.  A ref stores the initial user details on Profile page load.  The ref's current value is set to the new user details on successful submission.

Successful submission or form reset is 'toasted' at the bottom left secreen corner.

User has options to Continue Shopping or Sign Out from the Profile page as well.

### Home 

Home page displays subcategories as cards, organised by main categories - Women or Men.  

Clicking on each subcategory navigates the user to the subcategory 

### Products

Products displayed as a summary of cards with an image and product description, and favourites and add-to-cart icons.  

Items can be added to cart by clicking on add-to-cart icon above each item from product summary.  

Items can be added to or removed from the wishlist by clicking on the favourite icon to toggle the favourite status of each item. 

### Product Detail

Product Detail card features option to favourite the item and a dropdown to select quantity to add to cart (limited to quantity in stock).  Items can be added to cart by selecting quantity of product details. 

User alerted to stock levels - In Stock or Low Stock.

### Navbar

Navbar allows user to navigate to Home, Wishlist and Cart.  User avatar is grayed out when user is not signed in; a dropdown menu presents options to sign in or sign up.  On successful sign in, user avatar background is coloured, with initials of displayName displayed if available; dropdown menu presents options to access Profile page or to sign out.

Cart and Favourite count updated in real time as badges located on top right of Wishlist and Cart icons.  Cart count derived from cart items via Array.prototype.reduce function.

### Favourites 

User can add/remove products to their wishlist.  From the Wishlist, favourited items will be removed on adding to cart or clicking on the favourite icon for each product.

Favourites not currently saved to local storage or user document in Firestore - project time constraint meant prioritising other features.

### Cart

Cart items displayed as a list.  Each item description is a link that navigates the user back to the associated product detail.  

Quantity of items can be adjusted by selecting a quantity from the dropdown or incremented or decremented by ckicking on the right or left chevrons.  

Right chevron disabled when selected quantity matches the quantity in stock.  

Item cleared from cart when user clicks on the bin icon or clicks on left chevron to decrement item quantity below 1.

Cart summary displays number of items in cart.  Subtotals dynamically derived by applying Array.prototype.reduce on cart items.  Placeholder for coupon codes (e.g. for first-time customers only) to apply discounts left for future version/release.

### Checkout

Checkout can be accessed by authenticated users from the Cart page by clicking on the Checkout button.  

If there are no items in the cart, an error message will be toasted to inform the user that the cart is empty.

User is taken through a multi-stage checkout flow: Shipping Address -> Billing Address -> Payment.

1. Shipping Address: User enters shipping details.  User can opt to use the shipping address as the billing address - Implementation detail: this is kept as a boolean state, which will be added or subtracted while adding or subtracting the activeSteps state.  If user selects this option, user will fast forward to the Payment stage on selecting Next; likewise if the user clicks the back button from the Payment stage, the user will be taken back to the first stage.

2. Billing Address: Same as Shipping Address form.

3. Payment/Review: All cart item information as well as shipping and address details are collated and displayed in the final page for user inspection and payment via Card.

**Stripe payment**
Upon clicking Pay, the handlePayment function will send a request with the amount to the serverless function to create the Stripe PaymentIntent.  The Stripe server will return a client secret in the paymentIntent, which will be sent to the front-end client app to confirm the card payment.

While Stripe payment is being processed, the Pay button is disabled and displays a spinner.  

If the Stripe transaction ends in error, an alert is displayed with the error returned.  

If the Stripe transaction is successful, the transaction is then written to the user's recently purchased history in Firestore, and the transaction history of the user is also updated. 

Implementation detail: A batch write to Cloud Firestore is triggered on successful stripe transaction.  The first write is to the user document's recently_purchased array through arrayUnion (updating only items not previously found in the array).  The second write is to the transactions subcollection under the user document.  Upon obtaining the user transactions document reference to the transactions subcollection, the document is set (updated) with the transaction details.  

The Recently Purchased section at the footer should be updated on user's next login or on page refresh.  There is no state change that currently triggers a re-render of Recently Purchased items - moved to TODOs (may use Recoil - better option - or introduce another state at a high level ie using Context API - not a good option)

### Footer

Copyright and contact information displayed at the bottom of the footer.  

If user is not signed in, a randomly generated list of products will be displayed in the section above the copyright as products that may interest the user.  The same is displayed for when the user is signed in but has made no purchases.  

On successful transaction (purchase), the recently purchased items are displayed in its stead.

## Utilities

### Utilities

The bulk of utility functions are for accessing product, cart and favourite items; and some helper functions i.e. for formatting cost amount for items.  Price amounts are kept in cents, taking the cue from Stripe's requirement to send the total amount in cents, rather than dollar amounts.  

**Notes about Firestore**
1. Unlike conventional NoSQL databases, Firestore keeps a reference to every collection, document and document field, and allows subcollections to exist by keeping a reference to the subcollection in the document.  All references must follow the collection/document/collection/document/... convention.

2. The writes are asynchronous, and any UI changes that are time-sensitive should not depend on write operation to complete in time.  Documents can only be updated once every second.  Each transaction or batch of writes are limited to a write of 500 documents, which is within limits for this project's use case, as each customer transaction will only result in one user document field 'recently purchased' to be updated, and one transaction document created in the transactions subcollection.

### Firebase Testing

Initial attempts at testing were using jest-fetch-mock.  More research led to finding  mock-firebase:  [https://github.com/soumak77/firebase-mock] (https://github.com/soumak77/firebase-mock)  Future testing efforts to incorporate mock-firebase.

### Deployment

Deployed on Netlify.  CI/CD set up so that pushes to main branch on Git would trigger a production deployment on Netlify.  


## TODOs
(not necessarily in order of priority)

1. Deploying serverless functions to Cloud Functions.

2. Moving shop data to Firestore.  It is currently being served out as a JSON via a serverless function, thereby limiting functionality i.e. unable to reduce quantityInStock for each item upon successful transaction.

3. Adding tests: React Testing Library, Jest, jest-fetch-mock or msw (Mock Service Worker), mock-firebase.

4. Adding Favourites functionality by caching to local storage, and then saving to user document in Firestore on logout or session timeout (depending on onAuthChanged event?) - 

5. Caching cart items in local storage, and then saving to user document in Firestore on logout or session timeout - saved cart items to be displayed again for user to purchase on future signin.  

6. Send email if there are still items in the cart on user logout?

7. Add a field for coupons to be used at checkout - need to store coupons as a separate Collection in Firestore.

8. Integrate with MailChimp for promotional material to be sent over email ie wishlist items on sale.

9. SendGrid integration to send email verifications.

10. Look into user password reset for users signed up with email and password - Firebase Authentication.  Password reset currently only available to users authenticated with third-party auth providers.

11. Refactor all Cart and Favourites functionality to move them into their own context in a top down data flow.  This use case suggests that Recoil may be a better fit ie cartCount is a derived state of the cart atom - no need to keep cartCount as a separate state or pass the entire cart to the NavBar component to derive the cartCount.  Transacted items can also be kept as a recoil state in order to update footer's Recently Purchased section on successful transaction.  

12. Toast info message on unauthorised access to Wishlist, Checkout and Profile page by unauthenticated users.

13. For more secure transactions, final amount should be calculated on the server end to prevent tampering and wrongful charges to the customer.  If products data are moved to Cloud Firestore / other cloud DB, this can be calculated by the server(less) function.  Stripe also allows the merchant to enter product information through the dashboard and thus allow calculation of the chargeable amount on the server-side.  (More research needed)

14. Incorporate Strip's Payment Element instead of Card Element, which will require the client secret to be passed to the Elements component before payment can be confirmed.  Payment ELement offers more payment methods.  

15. Validate user input data with either HTML 5 or with react hook form.

16. Make available more third-party authentication providers e.g. Facebook, Git, LinkedIn, etc.  Each additional provider will require signing up for a developer account with the provider and obtaining the clicnt ID and secret for Firebase Authentication config, as well as configuring the redirect url on the provider's side.  