/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: 'main' | 'pizza-pasta' | 'salad' | 'dessert';
  isChefsChoice?: boolean;
  isVegan?: boolean;
  isVegetarian?: boolean;
  isGlutenFree?: boolean;
  ingredients: string[];
  allergens: string[];
  sourcing: string;
}

export interface Reservation {
  id: string;
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  guests: number;
  seatingPreference: 'window' | 'forest' | 'fireplace' | 'glass-roof' | 'no-preference';
  specialRequests?: string;
  dietaryRestrictions: string[];
  createdAt: string;
  status: 'confirmed' | 'cancelled';
}

export interface CartItem {
  menuItem: MenuItem;
  quantity: number;
}
