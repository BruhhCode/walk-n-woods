import { MenuItem } from './types';

export const HERO_IMAGE = 'https://lh3.googleusercontent.com/aida-public/AB6AXuDEYQPWxf8kuypVitCWZ5fbYYrtK-xnGnKU1tNnVWnN3w5vepiIWez8nis_oP8clRtKrHqm9UXKu-WbmPfru04_aRAp-M1rec9MgSKzMFyIVaYgcBjdZl8bZwniJb5jiUaNztLE4K3rLqNetBkqojxN_dQ_CKSOTpDmf9LEKp4TtsqpbAgyG_N-28429dSJB7C1O-mWhE_yThB1Q-vBwpUsGZuFgmTN6ldDV-2YjUPtvLAlKtzUChoqnMFN7MIp1WBdLrn7KrvThI2e';
export const ABOUT_IMAGE = 'https://lh3.googleusercontent.com/aida-public/AB6AXuDGpGuMNVejUYvLsesLZskU1Vp6PS205kToATBc9iq9Bp3HTAqxIte904T1i6kXGgyo3eVb7NXK-o0C2OyHACBQN33jQH0hbNou24TcmJWloGUtK3vWHTZzGgW4cAOU7auXXCwk1o00CBHU586GsgaWl6SD91-qBczSAcMLkSgQYT8SJ7_6mV1-GvyQ_eUiGVdn6MxOi2ZP_gA6jkU5CNPg63Fe7eHdyKW3OIh3_gVa_H09c31UPZUtiVTFFbqrm_Bq_W6T4iTgg1oL';

// Paste your own image URL for each menu item here.
// Use the named constants below instead of editing each object inline.
export const GRILLED_CHICKEN_IMAGE = 'https://res.cloudinary.com/dlimc6j71/image/upload/v1780679323/drankss_xhxzlc.png';
export const WOOD_FIRED_PIZZA_IMAGE = 'https://res.cloudinary.com/dlimc6j71/image/upload/v1780679318/ChatGPT_Image_Apr_30_2026_02_52_03_PM_wmjbve.png';
export const TRUFFLE_CREAM_PASTA_IMAGE = 'https://res.cloudinary.com/dlimc6j71/image/upload/v1780679315/tandoori_platter_mppd1n.png';
export const WAGYU_FOREST_BURGER_IMAGE = 'https://res.cloudinary.com/dlimc6j71/image/upload/v1780679314/mango_gi5t8z.png';
export const FORAGERS_SALAD_IMAGE = 'https://res.cloudinary.com/dlimc6j71/image/upload/v1780679316/mocktails_takpqx.png';
export const MIDNIGHT_LAVA_CAKE_IMAGE = 'https://res.cloudinary.com/dlimc6j71/image/upload/v1780679318/ChatGPT_Image_Apr_30_2026_02_52_03_PM_wmjbve.png';

export const MENU_ITEMS: MenuItem[] = [
  {
    id: 'm1',
    name: 'Grilled Chicken Steak',
    description: 'Tender organic chicken breast, wild mushroom glaze, served with a side of root vegetable puree.',
    price: 34,
    image: GRILLED_CHICKEN_IMAGE,
    category: 'main',
    isChefsChoice: true,
    ingredients: ['Organic Chicken Breast', 'Morel & Porcini Glaze', 'Parsnip Purée', 'Baby Heirloom Carrots', 'Microgreens'],
    allergens: ['Dairy', 'Sulfites'],
    sourcing: 'Sourced from Green Pastures Family Farm in Northern California. Raised 100% pasture-free and certified organic.'
  },
  {
    id: 'm2',
    name: 'Wood Fired Pizza',
    description: 'Artisanal sourdough crust baked to perfection in our custom stone oven. Topped with hand-crushed San Marzano tomatoes, fresh buffalo mozzarella, and basil harvested from our indoor garden.',
    price: 28,
    image: WOOD_FIRED_PIZZA_IMAGE,
    category: 'pizza-pasta',
    isVegetarian: true,
    ingredients: ['Sourdough Starter Crust', 'San Marzano Tomatoes', 'DOP Buffalo Mozzarella', 'Cold-Pressed Olive Oil', 'Hydrosol-grown Basil'],
    allergens: ['Gluten', 'Dairy'],
    sourcing: 'Sourdough flour is stone-milled in CA. Mozzarella is prepared fresh daily by local artisanal cheesemakers. Basil is clipped straight from our dining room indoor garden wall.'
  },
  {
    id: 'm3',
    name: 'Truffle Cream Pasta',
    description: 'Handmade pappardelle tossed in a rich, earthy black truffle cream sauce with aged parmesan.',
    price: 32,
    image: TRUFFLE_CREAM_PASTA_IMAGE,
    category: 'pizza-pasta',
    isVegetarian: true,
    ingredients: ['Hand-rolled Semolina Pappardelle', 'Piedmont Black Truffle Paste', 'Double Cream', '36-Month Aged Parmigiano-Reggiano', 'White Truffle Oil'],
    allergens: ['Gluten', 'Dairy', 'Eggs'],
    sourcing: 'Truffles are imported seasonally from Piedmont, Italy. Pasta is hand-rolled and cut at 4:00 PM in our kitchen daily.'
  },
  {
    id: 'm4',
    name: 'Wagyu Forest Burger',
    description: 'Premium Wagyu beef patty, caramelized onions, smoked gouda, and our signature herb aioli.',
    price: 29,
    image: WAGYU_FOREST_BURGER_IMAGE,
    category: 'main',
    ingredients: ['A5 Wagyu Beef Blend', 'Forest Honey Caramelized Onions', 'Applewood Smoked Gouda', 'Wild Ramp Aioli', 'Toasted Brioche Bun'],
    allergens: ['Gluten', 'Dairy', 'Eggs'],
    sourcing: 'Wagyu beef is certified A5 grade from Kumamoto Prefecture, combined with prime cuts of Grass-Fed Beef from Northern Valley ranches.'
  },
  {
    id: 'm5',
    name: "Forager's Salad",
    description: 'A vibrant mix of seasonal greens, roasted nuts, edible flowers, and a light citrus vinaigrette.',
    price: 22,
    image: FORAGERS_SALAD_IMAGE,
    category: 'salad',
    isVegan: true,
    ingredients: ['Wild Foraged Watercress', 'Dandelion Greens', 'Shaved Heirloom Radishes', 'Candied Pine Nuts', 'Edible Marigolds & Pansies', 'Meyer Lemon Vinaigrette'],
    allergens: ['Nuts (Pine Nuts)'],
    sourcing: 'Farmed sustainably via regenerative biodynamic farming in Napa County and partially hand-foraged in local pine glades.'
  },
  {
    id: 'm6',
    name: 'Midnight Lava Cake',
    description: 'Decadent dark chocolate cake with a molten center, served with house-made vanilla bean ice cream.',
    price: 18,
    image: MIDNIGHT_LAVA_CAKE_IMAGE,
    category: 'dessert',
    ingredients: ['72% Single-Origin Valrhona Chocolate', 'Organic Butter', 'Free-Range Eggs', 'Madagascar Bourbon Vanilla Bean'],
    allergens: ['Dairy', 'Eggs', 'Gluten'],
    sourcing: 'Crafted with ethically-traded Ecuadorian cacao. Ice cream made with premium organic raw milk from Sonoma dairies.'
  }
];

export const STORIES = [
  {
    id: 's1',
    title: 'The Organic Garden',
    description: 'Our herbs, blossoms, and specific greens are cultivated inside or surrounding the restaurant bounds, utilizing zero-waste water recycling systems.'
  },
  {
    id: 's2',
    title: 'Modern Hearth & Stone',
    description: 'We roast and bake over custom lava stones and local hand-cut almond wood, giving a precise aromatic woody warmth to all pizzas, steaks, and bread crusts.'
  },
  {
    id: 's3',
    title: 'The Clean Philosophy',
    description: 'Quiet Luxury is about purity. No synthetic flavor enhancers, no processed sugars—only pure Himalayan minerals, raw California honeys, wild oils, and pristine natural salts.'
  }
];
