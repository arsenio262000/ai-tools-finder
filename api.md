# API Documentation

This document provides detailed information about the AI Tools Finder API endpoints.

## Base URL

```
Development: http://localhost:3000/api
Production: https://your-domain.com/api
```

## Authentication

All API endpoints require authentication using Clerk. Include the session token in the Authorization header:

```http
Authorization: Bearer <session_token>
```

## Endpoints

### Tools

#### Get All Tools

```http
GET /api/tools
```

Query Parameters:
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 10)
- `category` (optional): Filter by category
- `search` (optional): Search query
- `sort` (optional): Sort field (name, rating, price)
- `order` (optional): Sort order (asc, desc)

Response:
```json
{
  "tools": [
    {
      "id": "string",
      "name": "string",
      "description": "string",
      "category": "string",
      "rating": number,
      "price": "string",
      "features": ["string"],
      "url": "string",
      "createdAt": "string",
      "updatedAt": "string"
    }
  ],
  "pagination": {
    "total": number,
    "page": number,
    "limit": number,
    "totalPages": number
  }
}
```

#### Get Tool by ID

```http
GET /api/tools/:id
```

Response:
```json
{
  "id": "string",
  "name": "string",
  "description": "string",
  "category": "string",
  "rating": number,
  "price": "string",
  "features": ["string"],
  "url": "string",
  "reviews": [
    {
      "id": "string",
      "userId": "string",
      "rating": number,
      "comment": "string",
      "createdAt": "string"
    }
  ],
  "createdAt": "string",
  "updatedAt": "string"
}
```

#### Create Tool

```http
POST /api/tools
```

Request Body:
```json
{
  "name": "string",
  "description": "string",
  "category": "string",
  "price": "string",
  "features": ["string"],
  "url": "string"
}
```

Response:
```json
{
  "id": "string",
  "name": "string",
  "description": "string",
  "category": "string",
  "rating": number,
  "price": "string",
  "features": ["string"],
  "url": "string",
  "createdAt": "string",
  "updatedAt": "string"
}
```

#### Update Tool

```http
PUT /api/tools/:id
```

Request Body:
```json
{
  "name": "string",
  "description": "string",
  "category": "string",
  "price": "string",
  "features": ["string"],
  "url": "string"
}
```

Response:
```json
{
  "id": "string",
  "name": "string",
  "description": "string",
  "category": "string",
  "rating": number,
  "price": "string",
  "features": ["string"],
  "url": "string",
  "createdAt": "string",
  "updatedAt": "string"
}
```

#### Delete Tool

```http
DELETE /api/tools/:id
```

Response:
```json
{
  "success": true,
  "message": "Tool deleted successfully"
}
```

### Reviews

#### Get Tool Reviews

```http
GET /api/tools/:id/reviews
```

Query Parameters:
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 10)

Response:
```json
{
  "reviews": [
    {
      "id": "string",
      "userId": "string",
      "rating": number,
      "comment": "string",
      "createdAt": "string"
    }
  ],
  "pagination": {
    "total": number,
    "page": number,
    "limit": number,
    "totalPages": number
  }
}
```

#### Create Review

```http
POST /api/tools/:id/reviews
```

Request Body:
```json
{
  "rating": number,
  "comment": "string"
}
```

Response:
```json
{
  "id": "string",
  "userId": "string",
  "rating": number,
  "comment": "string",
  "createdAt": "string"
}
```

### Collections

#### Get User Collections

```http
GET /api/collections
```

Response:
```json
{
  "collections": [
    {
      "id": "string",
      "name": "string",
      "description": "string",
      "tools": [
        {
          "id": "string",
          "name": "string",
          "description": "string",
          "category": "string",
          "rating": number,
          "price": "string"
        }
      ],
      "createdAt": "string",
      "updatedAt": "string"
    }
  ]
}
```

#### Create Collection

```http
POST /api/collections
```

Request Body:
```json
{
  "name": "string",
  "description": "string",
  "tools": ["string"] // Array of tool IDs
}
```

Response:
```json
{
  "id": "string",
  "name": "string",
  "description": "string",
  "tools": [
    {
      "id": "string",
      "name": "string",
      "description": "string",
      "category": "string",
      "rating": number,
      "price": "string"
    }
  ],
  "createdAt": "string",
  "updatedAt": "string"
}
```

#### Update Collection

```http
PUT /api/collections/:id
```

Request Body:
```json
{
  "name": "string",
  "description": "string",
  "tools": ["string"] // Array of tool IDs
}
```

Response:
```json
{
  "id": "string",
  "name": "string",
  "description": "string",
  "tools": [
    {
      "id": "string",
      "name": "string",
      "description": "string",
      "category": "string",
      "rating": number,
      "price": "string"
    }
  ],
  "createdAt": "string",
  "updatedAt": "string"
}
```

#### Delete Collection

```http
DELETE /api/collections/:id
```

Response:
```json
{
  "success": true,
  "message": "Collection deleted successfully"
}
```

## Error Responses

All endpoints may return the following error responses:

### 400 Bad Request

```json
{
  "error": "Bad Request",
  "message": "Invalid request parameters",
  "details": {
    "field": "error message"
  }
}
```

### 401 Unauthorized

```json
{
  "error": "Unauthorized",
  "message": "Authentication required"
}
```

### 403 Forbidden

```json
{
  "error": "Forbidden",
  "message": "Insufficient permissions"
}
```

### 404 Not Found

```json
{
  "error": "Not Found",
  "message": "Resource not found"
}
```

### 429 Too Many Requests

```json
{
  "error": "Too Many Requests",
  "message": "Rate limit exceeded"
}
```

### 500 Internal Server Error

```json
{
  "error": "Internal Server Error",
  "message": "An unexpected error occurred"
}
```

## Rate Limiting

API requests are limited to:
- 100 requests per minute per IP
- 1000 requests per hour per user

Rate limit headers are included in all responses:

```http
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1623456789
```

## Best Practices

1. **Authentication**
   - Always include the Authorization header
   - Keep your session token secure
   - Don't share your session token

2. **Rate Limiting**
   - Monitor rate limit headers
   - Implement exponential backoff
   - Cache responses when possible

3. **Error Handling**
   - Check status codes
   - Parse error messages
   - Implement retry logic

4. **Data Validation**
   - Validate request data
   - Handle missing fields
   - Sanitize user input

5. **Performance**
   - Use pagination
   - Implement caching
   - Minimize request size

## SDK Examples

### JavaScript/TypeScript

```typescript
import { AIToolsFinder } from '@ai-tools-finder/sdk';

const client = new AIToolsFinder({
  apiKey: 'your_api_key',
  baseUrl: 'https://api.aitoolsfinder.com'
});

// Get all tools
const tools = await client.getTools({
  page: 1,
  limit: 10,
  category: 'AI Writing'
});

// Create a review
const review = await client.createReview('tool_id', {
  rating: 5,
  comment: 'Great tool!'
});
```

### Python

```python
from ai_tools_finder import AIToolsFinder

client = AIToolsFinder(
    api_key='your_api_key',
    base_url='https://api.aitoolsfinder.com'
)

# Get all tools
tools = client.get_tools(
    page=1,
    limit=10,
    category='AI Writing'
)

# Create a review
review = client.create_review('tool_id', {
    'rating': 5,
    'comment': 'Great tool!'
})
```

## Support

For API support:
- Check our [Installation Guide](./installation.md)
- Review the [Configuration Guide](./configuration.md)
- Join our community Discord
- Create an issue on GitHub 