# Application Data Flow Diagram

This diagram illustrates the data flow in the Copilot Enterprise Demo application.

```mermaid
flowchart TD
    User[User/Client] --> |HTTP Requests| API[Express API Server]
    
    subgraph Backend
        API --> |Query/Insert| DB[(MongoDB Database)]
        API --> |Authenticates| Auth[Authentication Service]
        API --> |Processes| Logic[Business Logic]
        Logic --> |CRUD Operations| DB
        Auth --> |Validates| Token[JWT Token]
    end
    
    subgraph Data Storage
        DB --> |Stores| Products[Product Data]
        DB --> |Stores| Users[User Data]
        DB --> |Stores| Orders[Order Data]
    end
    
    subgraph External Services
        API --> |Sends notifications| Notification[Notification Service]
        API --> |Payment processing| Payment[Payment Gateway]
    end
    
    Notification --> |Email/SMS| User
    Payment --> |Transaction status| API
    DB --> |Retrieves data| API
    API --> |HTTP Response| User
```

## Key Components

1. **User/Client**: The frontend application or external service that interacts with our API
2. **Express API Server**: Handles HTTP requests and routes them to appropriate handlers
3. **MongoDB Database**: Stores all application data including products, users, and orders
4. **Authentication Service**: Manages user authentication and authorization
5. **Business Logic**: Implements the core application functionality
6. **External Services**: Third-party integrations for notifications and payments

## Data Flow Steps

1. User sends HTTP requests to the API server
2. API authenticates the request using the Authentication Service
3. Once authenticated, the API processes the request through Business Logic
4. Business Logic performs CRUD operations on the MongoDB Database
5. External services are called as needed (notifications, payments)
6. Data is retrieved from the database and returned to the API
7. API sends HTTP response back to the User/Client