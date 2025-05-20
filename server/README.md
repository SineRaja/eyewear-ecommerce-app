# Eyewear E-commerce API Testing Guide

This document provides a comprehensive guide for testing all endpoints in the Eyewear E-commerce API using Postman or any similar API testing tool.

## Base URL
All requests should be made to: `https://eyewear-e-commerce-backend.onrender.com`

## Authentication
Many endpoints require authentication. After logging in, you will receive a token that should be included in the Authorization header of subsequent requests:
```
Authorization: Bearer YOUR_TOKEN_HERE
```

## User Management

### 1. Register User
- **URL**: `{{base_url}}/user/register`
- **Method**: POST
- **Body (JSON)**:
```json
{
  "first_name": "John",
  "last_name": "Doe",
  "email": "john.doe@example.com",
  "password": "password123",
  "ph_no": 1234567890
}
```
- **Expected Response**: 201 Created

### 2. Login User
- **URL**: `{{base_url}}/user/login`
- **Method**: POST
- **Body (JSON)**:
```json
{
  "email": "john.doe@example.com",
  "password": "password123"
}
```
- **Expected Response**: 200 OK with token
- **Response Example**:
```json
{
  "success": true,
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "60d21b4667d0d8992e610c85",
    "first_name": "John",
    "last_name": "Doe",
    "email": "john.doe@example.com"
  }
}
```

### 3. Get User Profile
- **URL**: `{{base_url}}/user/profile`
- **Method**: GET
- **Headers**:
  - Authorization: Bearer `{{token}}`
- **Expected Response**: 200 OK

### 4. Update User Profile
- **URL**: `{{base_url}}/user/profile`
- **Method**: PATCH
- **Headers**:
  - Authorization: Bearer `{{token}}`
- **Body (JSON)**:
```json
{
  "first_name": "John Updated",
  "last_name": "Doe Updated",
  "ph_no": 9876543210
}
```
- **Expected Response**: 200 OK

### 5. Change Password
- **URL**: `{{base_url}}/user/change-password`
- **Method**: POST
- **Headers**:
  - Authorization: Bearer `{{token}}`
- **Body (JSON)**:
```json
{
  "currentPassword": "password123",
  "newPassword": "newpassword123"
}
```
- **Expected Response**: 200 OK

## Product Management

### 1. Add a Product
- **URL**: `{{base_url}}/product`
- **Method**: POST
- **Body (JSON)**:
```json
{
  "name": "Classic Wayfarer Eyeglasses",
  "imageTsrc": "https://example.com/images/wayfarer.jpg",
  "productRefLink": "wayfarer-classic",
  "rating": 4.5,
  "colors": "Black",
  "price": 1299,
  "mPrice": 1999,
  "shape": "Rectangle",
  "gender": "Unisex",
  "style": "Classic",
  "dimension": "Medium",
  "productType": "Eyeglasses",
  "userRated": 124,
  "quantity": 50
}
```
- **Expected Response**: 201 Created

### 2. Add Multiple Products
- **URL**: `{{base_url}}/product/many`
- **Method**: POST
- **Body (JSON array)**:
```json
[
  {
    "name": "Aviator Sunglasses",
    "imageTsrc": "https://example.com/images/aviator.jpg",
    "productRefLink": "aviator-classic",
    "rating": 4.7,
    "colors": "Gold",
    "price": 1499,
    "mPrice": 2499,
    "shape": "Aviator",
    "gender": "Men",
    "style": "Fashion",
    "dimension": "Large",
    "productType": "Sunglasses",
    "userRated": 89,
    "quantity": 35
  },
  {
    "name": "Cat Eye Frames",
    "imageTsrc": "https://example.com/images/cateye.jpg",
    "productRefLink": "cateye-modern",
    "rating": 4.3,
    "colors": "Tortoise",
    "price": 999,
    "mPrice": 1599,
    "shape": "Cat Eye",
    "gender": "Women",
    "style": "Trendy",
    "dimension": "Small",
    "productType": "Eyeglasses",
    "userRated": 56,
    "quantity": 42
  }
]
```
- **Expected Response**: 201 Created

### 3. Get All Products
- **URL**: `{{base_url}}/product`
- **Method**: GET
- **Expected Response**: 200 OK with array of products

### 4. Get Products with Filtering
- **URL**: `{{base_url}}/product?gender=Men&shape=Rectangle&minPrice=500&maxPrice=2000&sort=lowtohigh&page=0&limit=12`
- **Method**: GET
- **Expected Response**: 200 OK with filtered products and pagination info

### 5. Get Product by ID
- **URL**: `{{base_url}}/product/{{product_id}}`
- **Method**: GET
- **Expected Response**: 200 OK with product details

### 6. Update Product
- **URL**: `{{base_url}}/product/{{product_id}}`
- **Method**: PATCH
- **Body (JSON)**:
```json
{
  "price": 1199,
  "quantity": 45,
  "colors": "Black, Blue"
}
```
- **Expected Response**: 200 OK

### 7. Delete Product
- **URL**: `{{base_url}}/product/{{product_id}}`
- **Method**: DELETE
- **Expected Response**: 200 OK

## Cart Management

### 1. Add to Cart
- **URL**: `{{base_url}}/cart`
- **Method**: POST
- **Headers**:
  - Authorization: Bearer `{{token}}`
- **Body (JSON)**:
```json
{
  "productId": "{{product_id}}",
  "name": "Classic Wayfarer Eyeglasses",
  "imageTsrc": "https://example.com/images/wayfarer.jpg",
  "price": "1299",
  "mPrice": "1999",
  "quantity": 1,
  "colors": "Black",
  "shape": "Rectangle",
  "gender": "Unisex",
  "style": "Classic",
  "dimension": "Medium",
  "productType": "Eyeglasses"
}
```
- **Expected Response**: 201 Created

### 2. Get Cart Items
- **URL**: `{{base_url}}/cart`
- **Method**: GET
- **Headers**:
  - Authorization: Bearer `{{token}}`
- **Expected Response**: 200 OK with array of cart items

### 3. Update Cart Item Quantity
- **URL**: `{{base_url}}/cart/{{cart_item_id}}`
- **Method**: PATCH
- **Headers**:
  - Authorization: Bearer `{{token}}`
- **Body (JSON)**:
```json
{
  "quantity": 2
}
```
- **Expected Response**: 200 OK

### 4. Remove Item from Cart
- **URL**: `{{base_url}}/cart/{{cart_item_id}}`
- **Method**: DELETE
- **Headers**:
  - Authorization: Bearer `{{token}}`
- **Expected Response**: 200 OK

### 5. Clear Entire Cart
- **URL**: `{{base_url}}/cart`
- **Method**: DELETE
- **Headers**:
  - Authorization: Bearer `{{token}}`
- **Expected Response**: 200 OK

## Wishlist Management

### 1. Add to Wishlist
- **URL**: `{{base_url}}/wishlist`
- **Method**: POST
- **Headers**:
  - Authorization: Bearer `{{token}}`
- **Body (JSON)**:
```json
{
  "productId": "{{product_id}}",
  "name": "Classic Wayfarer Eyeglasses",
  "imageTsrc": "https://example.com/images/wayfarer.jpg",
  "price": 1299,
  "mPrice": 1999
}
```
- **Expected Response**: 201 Created

### 2. Get Wishlist Items
- **URL**: `{{base_url}}/wishlist`
- **Method**: GET
- **Headers**:
  - Authorization: Bearer `{{token}}`
- **Expected Response**: 200 OK with array of wishlist items

### 3. Move from Wishlist to Cart
- **URL**: `{{base_url}}/wishlist/move-to-cart`
- **Method**: POST
- **Headers**:
  - Authorization: Bearer `{{token}}`
- **Body (JSON)**:
```json
{
  "wishlistItemId": "{{wishlist_item_id}}"
}
```
- **Expected Response**: 200 OK

### 4. Remove from Wishlist
- **URL**: `{{base_url}}/wishlist/{{wishlist_item_id}}`
- **Method**: DELETE
- **Headers**:
  - Authorization: Bearer `{{token}}`
- **Expected Response**: 200 OK

## Order Management

### 1. Create Order
- **URL**: `{{base_url}}/order`
- **Method**: POST
- **Headers**:
  - Authorization: Bearer `{{token}}`
- **Body (JSON)**:
```json
{
  "items": [
    {
      "productId": "{{product_id}}",
      "name": "Classic Wayfarer Eyeglasses",
      "imageTsrc": "https://example.com/images/wayfarer.jpg",
      "price": 1299,
      "mPrice": 1999,
      "quantity": 1
    }
  ],
  "shippingAddress": {
    "fullName": "John Doe",
    "address": "123 Main St",
    "city": "New York",
    "state": "NY",
    "postalCode": "10001",
    "country": "USA",
    "phone": "1234567890"
  },
  "paymentMethod": "cod",
  "itemsPrice": 1299,
  "shippingPrice": 99,
  "taxPrice": 130,
  "totalPrice": 1528,
  "couponCode": "WELCOME10"
}
```
- **Expected Response**: 201 Created

### 2. Get My Orders
- **URL**: `{{base_url}}/order/my-orders`
- **Method**: GET
- **Headers**:
  - Authorization: Bearer `{{token}}`
- **Expected Response**: 200 OK with array of orders

### 3. Get Order Details
- **URL**: `{{base_url}}/order/{{order_id}}`
- **Method**: GET
- **Headers**:
  - Authorization: Bearer `{{token}}`
- **Expected Response**: 200 OK with order details

### 4. Update Order Payment
- **URL**: `{{base_url}}/order/{{order_id}}/pay`
- **Method**: PATCH
- **Headers**:
  - Authorization: Bearer `{{token}}`
- **Body (JSON)**:
```json
{
  "paymentResult": {
    "id": "payment_id_123",
    "status": "completed",
    "updateTime": "2023-07-20T10:30:00Z",
    "email": "john.doe@example.com"
  }
}
```
- **Expected Response**: 200 OK

### 5. Cancel Order
- **URL**: `{{base_url}}/order/{{order_id}}/cancel`
- **Method**: PATCH
- **Headers**:
  - Authorization: Bearer `{{token}}`
- **Expected Response**: 200 OK

## Coupon Management

### 1. Create Coupon (admin)
- **URL**: `{{base_url}}/coupon`
- **Method**: POST
- **Body (JSON)**:
```json
{
  "code": "WELCOME10",
  "description": "10% off for new users",
  "discountType": "percentage",
  "discountValue": 10,
  "minPurchase": 500,
  "maxDiscount": 200,
  "expiryDate": "2023-12-31T23:59:59Z",
  "usageLimit": 1000
}
```
- **Expected Response**: 201 Created

### 2. Get All Active Coupons
- **URL**: `{{base_url}}/coupon`
- **Method**: GET
- **Expected Response**: 200 OK with array of coupons

### 3. Validate Coupon
- **URL**: `{{base_url}}/coupon/validate`
- **Method**: POST
- **Headers**:
  - Authorization: Bearer `{{token}}`
- **Body (JSON)**:
```json
{
  "code": "WELCOME10",
  "cartTotal": 1500
}
```
- **Expected Response**: 200 OK with validation result

## Testing Workflow

For a complete testing experience, follow this sequence:

1. **User Registration and Authentication**
   - Register a new user
   - Login with the registered user credentials
   - Retrieve and update user profile

2. **Product Management**
   - Add products (single and multiple)
   - Browse products with different filters and search terms
   - Test pagination and sorting options
   - View individual product details
   - Update and delete products

3. **Shopping Cart Flow**
   - Add items to cart
   - View cart contents
   - Update item quantities
   - Remove individual items
   - Clear entire cart

4. **Wishlist Management**
   - Add items to wishlist
   - View wishlist contents
   - Move items from wishlist to cart
   - Remove items from wishlist

5. **Coupon System**
   - Create coupon codes
   - Retrieve available coupons
   - Validate coupon codes with different cart values

6. **Order Processing**
   - Create an order with items from cart
   - Apply coupon to order
   - View order details
   - Update payment status
   - Check order history
   - Cancel an order

## Common HTTP Status Codes

- **200 OK**: Request successful
- **201 Created**: Resource created successfully
- **400 Bad Request**: Invalid request format or parameters
- **401 Unauthorized**: Authentication required or failed
- **403 Forbidden**: Authenticated but not authorized for the action
- **404 Not Found**: Resource not found
- **409 Conflict**: Request conflicts with current state (e.g., duplicate entry)
- **500 Internal Server Error**: Server encountered an error

## Troubleshooting

If you encounter issues during testing:

1. Verify that your server is running (`npm start`)
2. Check that you're using the correct URL and port
3. Ensure your authentication token is correctly formatted and included in headers
4. Validate that your request body matches the expected JSON format
5. Check the console logs on the server for specific error messages