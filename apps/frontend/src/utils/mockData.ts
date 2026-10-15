export const mockRestaurants = [
  { id: '1', name: "Burger King", cuisine: "American, Fast Food", rating: 4.5, time: "25-30 min", price: "₹250 - ₹500", image: "https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=500&q=80" },
  { id: '2', name: "Spicy Bella", cuisine: "Italian, Pizza", rating: 4.8, time: "35-45 min", price: "₹400 - ₹800", image: "https://images.unsplash.com/photo-1604381536136-57f5569426f3?w=500&q=80" },
  { id: '3', name: "Sushi Master", cuisine: "Japanese, Sushi, Asian", rating: 4.9, time: "40-50 min", price: "₹800 - ₹1500", image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=500&q=80" },
  { id: '4', name: "Taco Fiesta", cuisine: "Mexican, Tacos", rating: 4.3, time: "15-25 min", price: "₹150 - ₹300", image: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=500&q=80" },
  { id: '5', name: "Green Bowl", cuisine: "Healthy, Salads", rating: 4.7, time: "20-30 min", price: "₹300 - ₹600", image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500&q=80" },
  { id: '6', name: "Curry House", cuisine: "Indian, Curry", rating: 4.6, time: "30-40 min", price: "₹200 - ₹450", image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=500&q=80" },
];

export const mockMenus: Record<string, any[]> = {
  '1': [
    { id: 'm1', name: "Classic Cheeseburger", description: "Beef patty, cheddar, lettuce, tomato, special sauce.", price: 299, image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&q=80" },
    { id: 'm2', name: "Double Whopper", description: "Two beef patties, cheese, bacon.", price: 449, image: "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=500&q=80" },
    { id: 'm3', name: "Large Fries", description: "Golden crispy french fries.", price: 129, image: "https://images.unsplash.com/photo-1576107232684-1279f3908594?w=500&q=80" },
    { id: 'm4', name: "Onion Rings", description: "Crispy fried onion rings.", price: 149, image: "https://images.unsplash.com/photo-1639024471283-03518883512d?w=500&q=80" },
  ],
  '2': [
    { id: 'm5', name: "Margherita Pizza", description: "Fresh mozzarella, tomato sauce, basil.", price: 399, image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=500&q=80" },
    { id: 'm6', name: "Pepperoni Pizza", description: "Double pepperoni, extra cheese.", price: 499, image: "https://images.unsplash.com/photo-1628840042765-356cda07504e?w=500&q=80" },
    { id: 'm7', name: "Garlic Bread", description: "Toasted bread with garlic butter and herbs.", price: 199, image: "https://images.unsplash.com/photo-1573140247632-f8fd74997d5c?w=500&q=80" },
  ],
  '3': [
    { id: 'm8', name: "Spicy Tuna Roll", description: "Fresh tuna, spicy mayo, cucumber.", price: 450, image: "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=500&q=80" },
    { id: 'm9', name: "Dragon Roll", description: "Eel, cucumber, topped with avocado.", price: 550, image: "https://images.unsplash.com/photo-1611143669185-af224c5e3252?w=500&q=80" },
    { id: 'm10', name: "Miso Soup", description: "Traditional Japanese soup.", price: 150, image: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=500&q=80" },
  ],
  '4': [
    { id: 'm11', name: "Beef Tacos (3x)", description: "Authentic street tacos with cilantro and onion.", price: 299, image: "https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?w=500&q=80" },
    { id: 'm12', name: "Chicken Quesadilla", description: "Grilled chicken, melted cheese, salsa.", price: 349, image: "https://images.unsplash.com/photo-1615870216519-2f9fa575fa5c?w=500&q=80" },
    { id: 'm13', name: "Chips & Guacamole", description: "Freshly mashed avocado with tortilla chips.", price: 249, image: "https://images.unsplash.com/photo-1604544655455-8a2130325964?w=500&q=80" },
  ],
  '5': [
    { id: 'm14', name: "Quinoa Salad Bowl", description: "Quinoa, roasted veggies, tahini dressing.", price: 349, image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500&q=80" },
    { id: 'm15', name: "Grilled Salmon", description: "Wild caught salmon with asparagus.", price: 599, image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=500&q=80" },
    { id: 'm16', name: "Green Detox Smoothie", description: "Spinach, apple, ginger, lemon.", price: 199, image: "https://images.unsplash.com/photo-1610970881699-44a5587ce572?w=500&q=80" },
  ],
  '6': [
    { id: 'm17', name: "Chicken Tikka Masala", description: "Roasted chicken chunks in spicy sauce.", price: 399, image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=500&q=80" },
    { id: 'm18', name: "Garlic Naan", description: "Indian flatbread baked with garlic.", price: 60, image: "https://images.unsplash.com/photo-1603894584373-5ac82b6ae398?w=500&q=80" },
    { id: 'm19', name: "Vegetable Biryani", description: "Spiced rice dish with mixed vegetables.", price: 299, image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=500&q=80" },
  ],
};
