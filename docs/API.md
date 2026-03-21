# 📚 TANLERIDA API Documentation

Complete reference for all API endpoints in the Tangred e-commerce platform.

## 📋 Table of Contents

- [Base URL](#base-url)
- [Authentication](#authentication)
- [Response Format](#response-format)
- [Authentication Endpoints](#authentication-endpoints)
- [Product Endpoints](#product-endpoints)
- [Cart Endpoints](#cart-endpoints)
- [Order Endpoints](#order-endpoints)
- [Payment Endpoints](#payment-endpoints)
- [Tan Leida Endpoints](#tan-leida-endpoints)
- [Error Codes](#error-codes)

---

## 🌐 Base URL

```
Production:  https://tangred.vercel.app/api
Development: http://localhost:3000/api
```

---

## 🔐 Authentication

Most endpoints require authentication using JWT tokens via NextAuth.js.

### Getting a Token

Authenticate via `/api/auth/signin` or use OAuth providers.

### Using the Token

The token is automatically managed by cookies. For API requests:

```http
GET /api/user/orders
Cookie: next-auth.session-token=your-session-token
```

---

## 📦 Response Format

All API responses follow a consistent format:

### Success Response

```json
{
  "success": true,
  "data": {
    // Response data
  },
  "meta": {
    "page": 1,
    "limit": 20,
    "total": 100
  }
}
```

### Error Response

```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid input data",
    "details": {
      "email": "Email is required"
    }
  }
}
```

---

## 🔑 Authentication Endpoints

### POST /api/auth/register

Register a new user account.

**Request:**
```json
{
  "email": "user@example.com",
  "password": "SecurePass123!",
  "name": "John Doe",
  "phone": "+919876543210"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "user_cuid",
      "email": "user@example.com",
      "name": "John Doe",
      "isVerified": false
    },
    "message": "Verification email sent"
  }
}
```

**Errors:**
- `400` - Validation error (invalid email, weak password)
- `409` - Email already exists

---

### POST /api/auth/verify-email

Verify email with OTP.

**Request:**
```json
{
  "email": "user@example.com",
  "otp": "123456"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "message": "Email verified successfully"
  }
}
```

---

### POST /api/auth/forgot-password

Request password reset.

**Request:**
```json
{
  "email": "user@example.com"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "message": "Password reset email sent"
  }
}
```

---

### POST /api/auth/reset-password

Reset password with token.

**Request:**
```json
{
  "token": "reset-token-from-email",
  "password": "NewSecurePass123!"
}
```

---

## 🛍️ Product Endpoints

### GET /api/products

Get all products with pagination and filtering.

**Query Parameters:**

| Parameter | Type   | Description                          |
|-----------|--------|--------------------------------------|
| page      | number | Page number (default: 1)             |
| limit     | number | Items per page (default: 20)         |
| category  | string | Filter by category slug              |
| minPrice  | number | Minimum price in paise               |
| maxPrice  | number | Maximum price in paise               |
| sort      | string | Sort: `price_asc`, `price_desc`, `newest` |
| search    | string | Search term                          |

**Response:**
```json
{
  "success": true,
  "data": {
    "products": [
      {
        "id": "prod_cuid",
        "slug": "classic-leather-belt",
        "name": "Classic Leather Belt",
        "description": "Premium full-grain leather belt",
        "price": 499900,
        "salePrice": null,
        "images": ["https://cdn.tangred.com/..."],
        "category": {
          "id": "cat_cuid",
          "name": "Belts",
          "slug": "belts"
        },
        "inventory": 25,
        "rating": 4.8,
        "reviewCount": 124,
        "isNew": true,
        "isBestseller": false
      }
    ]
  },
  "meta": {
    "page": 1,
    "limit": 20,
    "total": 156,
    "totalPages": 8
  }
}
```

---

### GET /api/products/[slug]

Get single product details.

**Response:**
```json
{
  "success": true,
  "data": {
    "product": {
      "id": "prod_cuid",
      "slug": "classic-leather-belt",
      "name": "Classic Leather Belt",
      "description": "...",
      "price": 499900,
      "images": [...],
      "category": {...},
      "variants": [
        {
          "id": "var_cuid",
          "name": "Size",
          "options": ["32", "34", "36", "38"]
        },
        {
          "id": "var_cuid",
          "name": "Color",
          "options": ["Black", "Brown", "Tan"]
        }
      ],
      "specifications": {
        "material": "Full-grain leather",
        "width": "35mm",
        "origin": "India"
      },
      "relatedProducts": [...]
    }
  }
}
```

---

## 🛒 Cart Endpoints

### GET /api/cart

Get current user's cart.

**Auth Required:** Yes

**Response:**
```json
{
  "success": true,
  "data": {
    "cart": {
      "id": "cart_cuid",
      "items": [
        {
          "id": "item_cuid",
          "productId": "prod_cuid",
          "name": "Classic Leather Belt",
          "price": 499900,
          "quantity": 2,
          "variant": {
            "size": "34",
            "color": "Black"
          },
          "image": "https://cdn.tangred.com/..."
        }
      ],
      "subtotal": 999800,
      "gst": 179964,
      "shipping": 0,
      "total": 1179764,
      "itemCount": 2
    }
  }
}
```

---

### POST /api/cart

Add item to cart.

**Auth Required:** Yes

**Request:**
```json
{
  "productId": "prod_cuid",
  "quantity": 1,
  "variant": {
    "size": "34",
    "color": "Black"
  }
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "message": "Item added to cart",
    "cart": { /* updated cart */ }
  }
}
```

**Errors:**
- `400` - Insufficient inventory
- `404` - Product not found

---

### PATCH /api/cart

Update cart item quantity.

**Request:**
```json
{
  "itemId": "item_cuid",
  "quantity": 3
}
```

---

### DELETE /api/cart

Remove item from cart.

**Request:**
```json
{
  "itemId": "item_cuid"
}
```

---

## 📦 Order Endpoints

### GET /api/orders

Get user's orders.

**Auth Required:** Yes

**Query Parameters:**

| Parameter | Type   | Description                          |
|-----------|--------|--------------------------------------|
| page      | number | Page number                          |
| status    | string | Filter: `pending`, `processing`, `shipped`, `delivered`, `cancelled` |

**Response:**
```json
{
  "success": true,
  "data": {
    "orders": [
      {
        "id": "ord_cuid",
        "orderNumber": "TRD-2026-0001",
        "status": "processing",
        "items": [...],
        "total": 1179764,
        "createdAt": "2026-03-21T05:30:00Z",
        "shippingAddress": {...},
        "trackingNumber": null
      }
    ]
  }
}
```

---

### GET /api/orders/[id]

Get order details.

**Auth Required:** Yes

**Response:**
```json
{
  "success": true,
  "data": {
    "order": {
      "id": "ord_cuid",
      "orderNumber": "TRD-2026-0001",
      "status": "delivered",
      "items": [
        {
          "productId": "prod_cuid",
          "name": "Classic Leather Belt",
          "price": 499900,
          "quantity": 2,
          "variant": {...}
        }
      ],
      "pricing": {
        "subtotal": 999800,
        "gst": 179964,
        "shipping": 0,
        "discount": 0,
        "total": 1179764
      },
      "shippingAddress": {
        "name": "John Doe",
        "street": "123 Main St",
        "city": "Mumbai",
        "state": "Maharashtra",
        "pincode": "400001",
        "phone": "+919876543210"
      },
      "payment": {
        "method": "razorpay",
        "status": "captured",
        "transactionId": "pay_xxxxxxxx"
      },
      "timestamps": {
        "orderedAt": "2026-03-21T05:30:00Z",
        "shippedAt": "2026-03-22T10:00:00Z",
        "deliveredAt": "2026-03-24T14:30:00Z"
      },
      "trackingNumber": "IND123456789"
    }
  }
}
```

---

### POST /api/orders

Create a new order.

**Auth Required:** Yes

**Request:**
```json
{
  "shippingAddressId": "addr_cuid",
  "billingAddressId": "addr_cuid",
  "paymentMethod": "razorpay"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "order": {
      "id": "ord_cuid",
      "orderNumber": "TRD-2026-0002",
      "status": "pending_payment",
      "total": 1179764,
      "razorpayOrderId": "order_xxxxxxxx"
    }
  }
}
```

---

## 💳 Payment Endpoints

### POST /api/payment/create-order

Create Razorpay order.

**Auth Required:** Yes

**Request:**
```json
{
  "orderId": "ord_cuid"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "razorpayOrderId": "order_xxxxxxxx",
    "amount": 1179764,
    "currency": "INR",
    "key": "rzp_test_xxxxxxxx"
  }
}
```

---

### POST /api/payment/verify

Verify payment signature.

**Request:**
```json
{
  "orderId": "order_xxxxxxxx",
  "paymentId": "pay_xxxxxxxx",
  "signature": "razorpay_signature"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "message": "Payment verified successfully",
    "order": {
      "id": "ord_cuid",
      "status": "processing"
    }
  }
}
```

---

## 🤖 Tan Leida Endpoints

### POST /api/tan-leida/session

Create a new Tan Leida styling session.

**Auth Required:** Yes

**Request:**
```json
{
  "paymentMethod": "razorpay"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "session": {
      "id": "tls_cuid",
      "tanLeidaId": "TL-2026-A1B2C3",
      "status": "pending_payment",
      "price": 9900,
      "razorpayOrderId": "order_xxxxxxxx"
    }
  }
}
```

---

### POST /api/tan-leida/upload-photos

Upload user photos for analysis.

**Auth Required:** Yes

**Content-Type:** `multipart/form-data`

**Request:**
```
photos[]: File (JPEG/PNG, max 5MB each)
sessionId: tls_cuid
```

**Response:**
```json
{
  "success": true,
  "data": {
    "uploadedPhotos": [
      {
        "id": "img_cuid",
        "url": "https://res.cloudinary.com/...",
        "thumbnail": "https://res.cloudinary.com/..."
      }
    ]
  }
}
```

---

### POST /api/tan-leida/profile

Submit body profile information.

**Auth Required:** Yes

**Request:**
```json
{
  "sessionId": "tls_cuid",
  "profile": {
    "height": 175,
    "weight": 70,
    "bodyType": "athletic",
    "shoulderWidth": "medium",
    "waistSize": 32
  }
}
```

---

### POST /api/tan-leida/preferences

Submit style preferences.

**Auth Required:** Yes

**Request:**
```json
{
  "sessionId": "tls_cuid",
  "preferences": {
    "occasion": "formal",
    "budget": "premium",
    "style": "classic",
    "preferredColors": ["black", "brown"],
    "fitPreference": "slim",
    "specificNeeds": "Looking for a professional office bag"
  }
}
```

---

### POST /api/tan-leida/analyse

Trigger AI analysis pipeline.

**Auth Required:** Yes

**Request:**
```json
{
  "sessionId": "tls_cuid"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "analysis": {
      "bodyType": "athletic",
      "skinTone": "medium",
      "recommendedColors": ["black", "navy", "burgundy"],
      "styleRecommendations": "Professional looks with structured silhouettes..."
    }
  }
}
```

---

### GET /api/tan-leida/session/[id]

Get session results.

**Auth Required:** Yes

**Response:**
```json
{
  "success": true,
  "data": {
    "session": {
      "id": "tls_cuid",
      "tanLeidaId": "TL-2026-A1B2C3",
      "status": "completed",
      "photos": [...],
      "analysis": {...},
      "recommendations": [
        {
          "productId": "prod_cuid",
          "name": "Executive Leather Briefcase",
          "reason": "Matches your professional style and body type",
          "confidence": 0.92
        }
      ],
      "generatedImage": "https://replicate.com/...",
      "createdAt": "2026-03-21T05:30:00Z",
      "completedAt": "2026-03-21T05:35:00Z"
    }
  }
}
```

---

## ❌ Error Codes

| Code | HTTP Status | Description |
|------|-------------|-------------|
| `BAD_REQUEST` | 400 | Invalid request format |
| `VALIDATION_ERROR` | 400 | Input validation failed |
| `UNAUTHORIZED` | 401 | Authentication required |
| `FORBIDDEN` | 403 | Insufficient permissions |
| `NOT_FOUND` | 404 | Resource not found |
| `CONFLICT` | 409 | Resource already exists |
| `RATE_LIMITED` | 429 | Too many requests |
| `INTERNAL_ERROR` | 500 | Server error |
| `PAYMENT_FAILED` | 400 | Payment processing failed |
| `INSUFFICIENT_INVENTORY` | 400 | Product out of stock |

---

## 📊 Rate Limiting

| Endpoint Type | Limit |
|--------------|-------|
| Authentication | 5 requests/minute |
| API General | 100 requests/minute |
| AI Analysis | 10 requests/hour |
| Payment | 20 requests/minute |

---

## 🔗 Webhooks

### Razorpay Webhook

**Endpoint:** `POST /api/webhooks/razorpay`

**Events:**
- `payment.captured`
- `payment.failed`
- `order.paid`

### Email Webhook

**Endpoint:** `POST /api/webhooks/resend`

**Events:**
- `email.delivered`
- `email.bounced`

---

Last Updated: March 2026
