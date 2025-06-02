/**
 * Represents a generic paginated API response structure.
 */
export interface PaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

/**
 * Represents a generic error response from the API.
 */
export interface ApiError {
  statusCode: number;
  message: string | string[];
  error?: string; // e.g., 'Bad Request', 'Unauthorized'
}

// --- Example Placeholder Types for a specific domain (e.g., 'Items') ---

/**
 * Example type for a single item.
 */
export interface Item {
  id: string | number;
  name: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
  // ... other item-specific fields
}

/**
 * Example request body for creating an item.
 */
export type CreateItemPayload = Omit<Item, 'id' | 'createdAt' | 'updatedAt'>;

/**
 * Example request body for updating an item.
 * All fields are optional for partial updates.
 */
export type UpdateItemPayload = Partial<CreateItemPayload>;

// You can add more specific API types as your application grows. 