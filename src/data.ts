import { MenuItem } from './types';

export const HERO_IMAGE = 'https://lh3.googleusercontent.com/aida-public/AB6AXuDEYQPWxf8kuypVitCWZ5fbYYrtK-xnGnKU1tNnVWnN3w5vepiIWez8nis_oP8clRtKrHqm9UXKu-WbmPfru04_aRAp-M1rec9MgSKzMFyIVaYgcBjdZl8bZwniJb5jiUaNztLE4K3rLqNetBkqojxN_dQ_CKSOTpDmf9LEKp4TtsqpbAgyG_N-28429dSJB7C1O-mWhE_yThB1Q-vBwpUsGZuFgmTN6ldDV-2YjUPtvLAlKtzUChoqnMFN7MIp1WBdLrn7KrvThI2e';
export const ABOUT_IMAGE = 'https://lh3.googleusercontent.com/aida-public/AB6AXuDGpGuMNVejUYvLsesLZskU1Vp6PS205kToATBc9iq9Bp3HTAqxIte904T1i6kXGgyo3eVb7NXK-o0C2OyHACBQN33jQH0hbNou24TcmJWloGUtK3vWHTZzGgW4cAOU7auXXCwk1o00CBHU586GsgaWl6SD91-qBczSAcMLkSgQYT8SJ7_6mV1-GvyQ_eUiGVdn6MxOi2ZP_gA6jkU5CNPg63Fe7eHdyKW3OIh3_gVa_H09c31UPZUtiVTFFbqrm_Bq_W6T4iTgg1oL';

// To add or update dish images, paste your image URL into the `image` field below.
// Example: image: 'https://your-image-host.com/your-dish.jpg'
export const MENU_ITEMS: MenuItem[] = [
  {
    id: 'm1',
    name: 'Grilled Chicken Steak',
    description: 'Tender organic chicken breast, wild mushroom glaze, served with a side of root vegetable puree.',
    price: 34,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDpJtauMkWI0PLAOdPbcXT2IwCc2bZb99toIn80mxpFGaMHkFch9NRDvwI0S1vhE8twgUp4sB_hXydJH8WYNDlUjGchTXubQluGzKoRJIBGv3lwZGPgF_V1MnP4sbpQMuaJ2UlGomLtob8WO_PaMbZOLAShr81_SnuwQKc0iTbpmR-B449DLT4kuFbIbwGoBqbgNFwQmlDsvAPWGEb2PkmgTQkDWd6KCUya6oPgXHHzNHofdYH2-4aUAF0h5oW8vDdew9UgLZ7Gj0f6',
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
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAYgmbpeJ4xF6wno48vhrqpxKseeNld1ZlqF8ZyQtyOQ1iVB_Dl7Xok7f7S0ho3sJHcS76ekkIWmMaIgrvU_qSBdUR1OQJVdovM87uE7piyhGXYO6h4E1C6oN_AYR-g1-ddn-nxp5DuKsoWhgzsFzQfEDBlm3Y-Z3YadNBnf6qpUdO-tOs9pj13DQLLA3xTGP82H5mnFHbzdFe9zQcpyMmKD3BowRLMuG-4NaOqys2vKGTu3M3BFw_RkLZfPmR1qD6Snsxb_xWhBTnK',
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
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAc3s5BcWQM9rbXNXojCt8AhmSyWEDAypI4edZG1rNmxMIr-W7E2tDVfgkitfrO5qa5Gd_2DNrqbqIIs5DngpOgKv6Ugd-Xg3xWvSqwBnrsBQ_azoi9q2pOOaBJ1scB8jLaB4_z9nBhLlZrxldi9xr5FZQF5aYjZcjeGYd9_x3AMt7x2NmAfWydqvDiT4QlGQJXEI6wpuL1DZtOU5XE0aDDnnOIej8Pj6r_w_Qb8-Z0SE7aTa0pDSsT9PSWAtORMcD4KhOxjLCkMlys',
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
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD50kk8tEeH3kdP9e29HL8S3Xx8O-8RnX0DM-zSUX7QgaXD_Z0ipxV9MqCbiAeNFyXeqqi6otJm8J37vPMgaNzc3tLYSAtjaLUtIwJ2wPnE6Tv2yGEAmFh4ky9gNSSN7kvQHCeYnRiSmXb0oG4ipxItwxCyKBBjbz6I83mwnLpDfIC2JiVXFoAzz7RpoNrdsuYIRbSitOq_zyt4Rb3AOkeeba-lvfEhxV_SAzFCoo7gd2Q9d7YrO6uLjYnElLOlLbDupCQKXqFaxivF',
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
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDIZ1YL3xErJfiDKewJ9jqoI2f2gykVx3WNtYlDXsuZ5OeJF_grtv5zcaDHeqZI-dlQipt2hsC5c-FkTIGhLonPtTFmOiD9WXSI3AG0W5cys6kDWmYbcDcFQein-y3vVFMvyTKaszWDZ4cvZKNUA_tV2Xy0Pe20j5VSvNx1Quh7jpFUNU0rT_XNdwtNI_fheyhAQI8CKeQqxMAiRHITw7W8wGrCegkd5hysZP39XZGwe7CFFN7LYWIvnPAkbIsF3-fFLBeaFYBQlyni',
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
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD46jp-w8gDDiZgKlQ-QSrZxmCY4SFm0oiO1CHkG8FEy9m8Mi1Z469MTKHUUIb8b58xggMW3vFEaUr0NFAT8iPzBXBXYI5ETSt3OXV1ZY_D9VTT2KlAlZ6-XVccHdGjIADur3eJzpP_8xW7z2F2E5M5AtM-Y31P1Bz4dCljXEf9cdpMhr2GpWXY57f0CD-iWGNnGbG_rVtnjh0CuZK1lIlY6qeeCvXKqWkY7tf0C_tXIKrRRrwYwLZyj2BtwHDKpaoVWA57swWWQZwq',
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
