# Eyewear E-commerce Frontend Integration Guide

This guide explains how to integrate the frontend with the backend API for the Eyewear E-commerce platform.

## Setup Requirements

1. Install axios for API requests:
   ```bash
   npm install axios
   ```

2. Ensure your backend server is running at `https://eyewear-e-commerce-backend.onrender.com`

## File Structure

All API integration files should be placed in a `services` directory:

```
src/
├── services/
│   ├── api-utils.js        # Common API utilities
│   ├── auth-service.js     # Authentication related APIs
│   ├── product-service.js  # Product related APIs
│   ├── checkout-service.js # Checkout and payment APIs
```

## Redux Integration

The Redux integration has been updated in the following files:

- **CartPage/action.js**: Updated to use backend API for cart operations
- **CartPage/actionType.js**: Added new action types for async operations
- **CartPage/reducer.js**: Updated to handle async actions and API responses

- **wishlist/wishlist.actions.js**: Updated for API integration
- **wishlist/wishlist.types.js**: Added new action types for async operations
- **wishlist/wishlist.reducer.js**: Updated to handle API responses

- **order/order.actions.js**: Updated for order API integration
- **order/order.types.js**: Added new action types for order operations
- **order/order.reducer.js**: Updated to handle order API responses

## Authentication Flow

The AuthContext has been enhanced to work with the backend:

1. On app initialization, it checks if a token exists in localStorage
2. If a token exists, it validates the token by fetching the user profile
3. Login/registration functions now communicate with the backend API
4. The logout function clears tokens from localStorage

## API Services Overview

### Auth Service

- `registerUser(userData)`: Register a new user
- `loginUser(credentials)`: Login and store token
- `logoutUser()`: Clear token and user data
- `getUserProfile()`: Get current user profile
- `updateUserProfile(userData)`: Update user details
- `changePassword(passwordData)`: Change user password
- `isAuthenticated()`: Check if user is logged in
- `getCurrentUser()`: Get current user from localStorage

### Product Service

- `getProducts(filters)`: Get products with optional filtering
- `getProductById(id)`: Get single product details
- `searchProducts(term, filters)`: Search products
- `filterProductsByCategory(category, filters)`: Filter by category
- `filterProductsByGender(gender, filters)`: Filter by gender
- `sortProductsByPrice(sortOrder, filters)`: Sort products
- `filterProductsByPriceRange(min, max, filters)`: Filter by price range
- `getProductsWithPagination(page, limit, filters)`: Paginated results

### Checkout Service

- `processCheckout(orderData)`: Create a new order
- `validateCoupon(code, cartTotal)`: Validate coupon code
- `getActiveCoupons()`: Get all active coupons
- `updatePayment(orderId, paymentResult)`: Update payment status
- `calculateOrderSummary(cartItems, couponDiscount)`: Calculate order totals

## Redux Integration Example

Here's an example of how to use the Redux actions in your components:

```jsx
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCart, addToCart, removeFromCart } from '../redux/CartPage/action';

const CartPage = () => {
  const dispatch = useDispatch();
  const { cart, loading, error } = useSelector((state) => state.CartReducer);

  useEffect(() => {
    // Fetch cart items when component mounts
    dispatch(fetchCart());
  }, [dispatch]);

  const handleRemoveItem = (itemId) => {
    dispatch(removeFromCart(itemId));
  };

  if (loading) return <p>Loading cart...</p>;
  if (error) return <p>Error loading cart: {error}</p>;

  return (
    <div>
      <h1>Your Cart</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <div>
          {cart.map((item) => (
            <div key={item._id}>
              <h3>{item.name}</h3>
              <p>Price: £{item.price}</p>
              <p>Quantity: {item.quantity}</p>
              <button onClick={() => handleRemoveItem(item._id)}>
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CartPage;
```

## Authentication Integration Example

Here's how to use the authentication context in your login component:

```jsx
import React, { useState, useContext } from 'react';
import { AuthContext } from '../ContextApi/AuthContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, loading, error } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const result = await login({ email, password });
    
    if (result.success) {
      navigate('/'); // Redirect to home on success
    }
  };

  return (
    <div>
      <h1>Login</h1>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
          />
        </div>
        <div>
          <label>Password:</label>
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  );
};

export default Login;
```

## Making API Changes

If you need to modify how the API calls work:

1. **Base URL Change**: Update the API_URL in `api-utils.js`
2. **Endpoint Changes**: Update the specific service file 
3. **Data Structure Changes**: Adjust the Redux actions and reducers

## Advanced Topics

### Error Handling

API errors are handled at multiple levels:

1. **Global Interceptor**: The axios interceptor in `api-utils.js` handles common errors like token expiration
2. **Service Layer**: Each service function includes try/catch blocks
3. **Redux Actions**: Actions catch and dispatch errors
4. **Components**: Use loading/error states from Redux for conditional rendering

### Authentication Token

The JWT token is:
- Stored in localStorage upon login
- Attached to requests via axios interceptor
- Cleared on logout or token expiration

### Request Caching

For performance, consider implementing request caching for product data:

```jsx
// In your component
const [products, setProducts] = useState([]);
const [loading, setLoading] = useState(false);

useEffect(() => {
  // Create cache key based on filters
  const cacheKey = `products_${JSON.stringify(filters)}`;
  
  // Check if data exists in sessionStorage
  const cachedData = sessionStorage.getItem(cacheKey);
  
  if (cachedData) {
    setProducts(JSON.parse(cachedData));
  } else {
    setLoading(true);
    getProducts(filters)
      .then(data => {
        setProducts(data.products);
        // Cache the result
        sessionStorage.setItem(cacheKey, JSON.stringify(data.products));
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }
}, [filters]);
```