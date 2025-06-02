# Brazilian City Time API

A simple Node.js API to get the current time for various Brazilian cities.

## Setup

1.  Clone the repository (if applicable).
2.  Install dependencies:
    ```bash
    npm install
    ```

## Running the Server

```bash
node index.js
```
The server will start on `http://localhost:3000`.

## API Endpoint

### `GET /time/:city`

Returns the current time for the specified Brazilian city.

**Parameters:**

*   `:city` (string, required): The name of the Brazilian city. City names are case-insensitive and spaces can be used (e.g., "Sao Paulo", "rio de janeiro").

**Success Response (200 OK):**

```json
{
  "city": "Sao Paulo",
  "time": "14:35:10"
}
```

**Error Response (404 Not Found):**

```json
{
  "error": "City not found or not supported."
}
```

**Supported Cities:**

*   Sao Paulo
*   Rio de Janeiro
*   Salvador
*   Brasilia
*   Fortaleza
*   Belo Horizonte
*   Manaus
*   Curitiba
*   Recife
*   Porto Alegre

*(This list should match the cities implemented in `index.js`)*
