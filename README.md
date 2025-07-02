
This project is a URL shortener service that converts long URLs into short, easy-to-share links. It's built with a unique architecture that focuses on **scalability, efficiency, and stateless design** using a custom base-62 encoding strategy.

## Features

- 🔗 **Shorten Long URLs**: Convert any long URL into a compact, 7-character short link.
- ⚙️ **Stateless Backend**: No need to store both short and long URLs — backend just processes requests.
- 📦 **Scalable Architecture**: Designed for horizontal scaling with no server-to-server dependencies.
- 🚀 **High Capacity**: Supports up to 3.5 trillion unique short URLs.
- 🧠 **Custom Encoding**: Uses a shuffled base-62 character set and directional encoding for added obscurity.

---

## How It Works

This URL shortener uses a unique approach to generate short links. Instead of storing both the short and long URLs, it only stores the long URL with a unique numerical ID.

Here's a breakdown of the process:

1.  **User Submits a Long URL:** The frontend sends the long URL to the backend.
2.  **Generate a Unique ID:** The backend receives the long URL. To generate a unique ID, it atomically fetches and increments a counter stored in a separate database collection. This counter ensures every URL receives a unique, sequential `shortId`. The `longUrl` and its new `shortId` are then saved in the main URL collection. This database-centric approach keeps the backend stateless.
3.  **Convert ID to a Short String:** The unique `shortId` is then converted into a 7-character string using a custom base-62 encoding algorithm.
4.  **Return Short URL:** The backend returns the generated short string to the user.
5.  **Redirecting:** When a user accesses a short URL, the backend decodes the 7-character string back to its numerical `shortId`, retrieves the original long URL from the database, and redirects the user.

This architecture makes the backend stateless, allowing for easy horizontal scaling. Since no server is responsible for a specific range of IDs, new servers can be added to the cluster without any complex coordination.

## Getting Started

To run this project locally, follow these steps:

1.  **Install Dependencies:**
    ```bash
    npm install
    ```

2.  **Set Up Environment Variables:**
    Create a `.env` file in the root directory and add the necessary environment variables. You can use `.env.example` as a template.

3.  **Build the Project:**
    ```bash
    npx turbo run build
    ```

4.  **Run the Development Servers:**
    ```bash
    npx turbo run dev
    ```

This will start the frontend, backend, and database services.

## Technical Details

### Database Schema

The MongoDB database uses two main collections:

1.  **`urls`**: Stores the mapping between the `shortId` and the original URL.
    ```json
    {
      "longUrl": "https://example.com/a-very-long-url",
      "shortId": 12345
    }
    ```
2.  **`counters`**: A dedicated collection that holds a single document used for generating unique, sequential IDs. The `count` field is atomically incremented for each new URL.
    ```json
    {
      "_id": "url_count",
      "count": 12345
    }
    ```

### URL Generation and Encoding

*   **Unique IDs:** The `counters` collection ensures that every `shortId` is unique across the entire system, which is critical for a distributed setup.
*   **Custom Base-62 Encoding:** The short URL strings are 7 characters long and are generated from the `shortId` using a custom base-62 encoding scheme (`[a-z]`, `[A-Z]`, `[0-9]`). To make the generated strings less predictable, the encoding algorithm works from both ends of the character set:
    *   **Odd `shortId`s** are encoded using characters from the beginning of the set (e.g., `a, b, c...`).
    *   **Even `shortId`s** are encoded using characters from the end of the set (e.g., `...8, 9`).
    *   The character set itself is also shuffled to further increase the randomness of the output strings.
*   **Scalability:** This encoding scheme allows for `62^7` (approximately 3.5 trillion) unique combinations. At a hypothetical rate of 1,000 new URLs per second, the system has enough capacity to operate for over 11 years.

### Project Structure

The project is a monorepo with the following structure:

*   `apps/frontEnd`: The frontend application, built with React.
*   `apps/backend`: The backend server, built with Node.js and Express.
*   `packages/db`: The database package, which manages the MongoDB connection and schemas.