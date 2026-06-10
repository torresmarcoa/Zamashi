import { useState } from 'react';
import { Star, ChevronDown, ChevronUp, ExternalLink } from 'lucide-react';

interface MenuSectionProps {
  language: 'es' | 'en';
}

interface PriceOption {
  label: string;
  price: string;
}

interface MenuItem {
  name: string;
  description: string;
  price?: string;
  options?: PriceOption[];
  featured?: boolean;
  tag?: string;
}

interface MenuSubSection {
  title: string;
  note?: string;
  items: MenuItem[];
}

interface MenuCategory {
  id: string;
  label: string;
  note?: string;
  subsections?: MenuSubSection[];
  items?: MenuItem[];
}

// ─── ZAMASHI MENU DATA ────────────────────────────────────────────────────────

const zamashiCategories: Record<'es' | 'en', MenuCategory[]> = {
  en: [
    {
      id: 'appetizers',
      label: 'Appetizers',
      items: [
        {
          name: 'Chiles Crunch',
          description: '8 jalapeño peppers stuffed with seasoned surimi, tempura-fried. Topped with sriracha sauce and spicy dressing.',
          price: '$180',
        },
        {
          name: 'Rock Shrimp (200 g)',
          description: 'Tempura shrimp sautéed with spicy dressing and eel sauce, served on a crispy fried rice paper.',
          price: '$240',
          featured: true,
        },
        {
          name: 'Tostada Z "The Chef\'s Favorite" (60 g)',
          description: 'Wonton tostada with a spicy dressing base, your choice of spicy fish, avocado, masago, fried leek, green onion, sesame seeds, and cilantro dressing.',
          options: [
            { label: 'Amberjack 1 pc', price: '$120' },
            { label: 'Amberjack 3 pcs', price: '$320' },
            { label: 'Yellowfin Tuna 1 pc', price: '$150' },
            { label: 'Yellowfin Tuna 3 pcs', price: '$410' },
            { label: 'Canadian Salmon 1 pc', price: '$180' },
            { label: 'Canadian Salmon 2 pcs', price: '$320' },
          ],
        },
        {
          name: 'Vegetable Tempura (150 g)',
          description: 'A mix of broccoli, cauliflower, carrot, zucchini, and onion in tempura batter, served with the house special sauce.',
          price: '$155',
        },
        {
          name: 'Edamames (150 g)',
          description: 'Soybean pods prepared your way.',
          options: [
            { label: 'Natural', price: '$115' },
            { label: 'Seasoned', price: '$130' },
            { label: 'Garlic', price: '$140' },
            { label: 'Spicy (Serrano Chili)', price: '$140' },
          ],
        },
        {
          name: 'Octopus Chicharrón (150 g)',
          description: 'Thin slices of octopus coated in katakuriko, lightly fried and sautéed, served on a bed of crispy rice noodles. Available plain or with sweet and sour sauce.',
          price: '$290',
        },
        {
          name: 'Traditional Gyozas',
          description: '5 pcs. filled with pork, napa cabbage, shiitake mushrooms, garlic, ginger, and green onion. Served with spicy ponzu or Thai sauce.',
          price: '$175',
        },
        {
          name: 'Burritos Especiales (4 pcs)',
          description: 'Soy wraps filled with tempura shrimp, cream cheese, cucumber, avocado, seasoned surimi, fresh mint, basil, and mango. Served over a cilantro and ginger dressing, finished with eel sauce, curry oil, and furikake.',
          price: '$235',
        },
        {
          name: 'Kushiages (3 pcs)',
          description: 'Breaded cheese skewers served with the house special sauce.',
          price: '$165',
        },
        {
          name: 'Thai Ribs (250 g)',
          description: 'Oven-roasted and lightly fried baby back ribs, glazed with Thai sauce and finished with green onion.',
          price: '$210',
        },
        {
          name: 'Sashimi Serranito (120 g)',
          description: '12 slices of fish topped with serrano chili, sesame seeds, and fresh cilantro. Finished with our signature Serranito sauce.',
          options: [
            { label: 'Amberjack', price: '$185' },
            { label: 'Yellowfin Tuna', price: '$220' },
            { label: 'Canadian Salmon (8 slices)', price: '$300' },
          ],
        },
        {
          name: 'Sashimi Cilantro (120 g)',
          description: '12 slices of fish lightly torched with curry oil, served over a cilantro and sesame dressing. Garnished with fresh cilantro and crispy leek, then finished with Serranito sauce.',
          options: [
            { label: 'Amberjack', price: '$195' },
            { label: 'Yellowfin Tuna', price: '$230' },
            { label: 'Canadian Salmon (8 slices)', price: '$310' },
          ],
        },
        {
          name: 'Curricanes (120 g)',
          description: '10 slices of fish filled with spicy kanikama, avocado, fresh cilantro, and sesame seeds. Served over a yuzu dressing and finished with Serranito sauce and fresh lime juice.',
          options: [
            { label: 'Amberjack', price: '$265' },
            { label: 'Yellowfin Tuna', price: '$280' },
            { label: 'Canadian Salmon (6 pcs)', price: '$320' },
          ],
          featured: true,
        },
        {
          name: 'Brujitas (120 g)',
          description: '10 slices of fish filled with seasoned surimi. Finished with avocado, furikake, and green onion. Served over a ginger-cilantro dressing and topped with eel sauce, caramel oil, Serranito sauce, fresh lime juice, and sriracha.',
          options: [
            { label: 'Amberjack', price: '$275' },
            { label: 'Yellowfin Tuna', price: '$290' },
            { label: 'Canadian Salmon (6 pcs)', price: '$335' },
          ],
          featured: true,
        },
      ],
    },
    {
      id: 'traditional-rolls',
      label: 'Traditional Rolls',
      note: '8-piece rolls.',
      items: [
        {
          name: 'California',
          description: 'Inside: nori seaweed, cucumber, avocado, cream cheese, and cooked shrimp. Outside: rice and sesame seeds.',
          price: '$150',
        },
        {
          name: 'Ebi',
          description: 'Inside: nori seaweed, cucumber, avocado, cream cheese, and breaded kanikama. Outside: rice, topped with cooked shrimp, avocado, and green onion. Finished with spicy dressing and eel sauce.',
          price: '$180',
        },
        {
          name: 'Mango',
          description: 'Inside: rice, cucumber, avocado, cream cheese, tempura shrimp, and spicy kanikama. Outside: soy wrap, topped with mango, serrano chili, and fresh cilantro. Finished with eel sauce.',
          price: '$225',
          tag: 'Seasonal',
        },
        {
          name: 'Avocado Tradicional',
          description: 'Inside: rice, cucumber, cream cheese, tempura shrimp, avocado, and kanikama. Outside: soy wrap, topped with avocado, masago, and sesame seeds. Finished with yuzu and eel sauce.',
          price: '$230',
        },
        {
          name: 'Salmoncito',
          description: 'Inside: nori seaweed, cucumber, avocado, cream cheese, and delicate surimi. Outside: rice, topped with Canadian salmon, togarashi, green onion, and ponzu.',
          price: '$260',
        },
        {
          name: 'Spicy del Día',
          description: 'Inside: nori seaweed, cucumber, avocado, and kanikama. Outside: rice, topped with the catch of the day prepared spicy, green onion, a lime wheel, and sriracha.',
          price: '$225',
        },
      ],
    },
    {
      id: 'breaded-rolls',
      label: 'Breaded Rolls',
      items: [
        {
          name: 'Mar y Tierra',
          description: 'Rice, nori seaweed, cucumber, avocado, cream cheese, cooked shrimp, and sirloin steak.',
          price: '$160',
        },
        {
          name: 'California',
          description: 'Rice, nori seaweed, cucumber, avocado, cream cheese, and cooked shrimp.',
          price: '$160',
        },
        {
          name: 'Kani Ebi',
          description: 'Inside: nori seaweed, cucumber, avocado, cream cheese, and tempura shrimp. Outside: rice, topped with kanikama, eel-spicy dressing, and green onion. Finished with eel sauce over a spicy dressing base.',
          price: '$220',
        },
        {
          name: 'Tempus',
          description: 'Inside: nori seaweed, cucumber, avocado, cream cheese, and tempura shrimp. Outside: rice, topped with spicy kanikama, green onion, and togarashi. Served over a spicy dressing base and finished with eel sauce.',
          price: '$210',
        },
        {
          name: 'Ebi Cheese',
          description: 'Inside: nori seaweed, cucumber, avocado, and cream cheese. Outside: rice, topped with shrimp, eel-spicy dressing, melted Mennonite cheese, and green onion. Finished with eel sauce over a spicy dressing base.',
          price: '$235',
          featured: true,
        },
        {
          name: 'Cheese Oita',
          description: 'Inside: rice, cucumber, avocado, tempura shrimp, and cream cheese. Outside: nori seaweed, topped with melted Mennonite cheese, spicy kanikama, and green onion. Served over a spicy dressing base and finished with eel sauce.',
          price: '$245',
          featured: true,
        },
      ],
    },
    {
      id: 'specialty-rolls',
      label: 'Specialty Rolls',
      note: 'Our rolls are served in 8 pieces. The fish of the day may vary between amberjack and yellowfin tuna, depending on availability and the chef\'s selection.',
      items: [
        {
          name: 'Zamashi',
          description: 'Inside: nori seaweed, cucumber, avocado, cream cheese, and spicy kanikama. Outside: rice, wrapped with the catch of the day and avocado slices, topped with kanikama and tempura shrimp dressed with spicy sauce and fresh cilantro. Served over a spicy dressing base and finished with eel sauce and sesame seeds.',
          price: '$290',
          featured: true,
        },
        {
          name: 'Bahía',
          description: 'Inside: rice, nori seaweed, avocado, cucumber, and the catch of the day. Outside: topped with seasoned surimi, crispy leek, lime slices, and furikake. Served over ginger and cilantro dressings, finished with caramel oil, eel sauce, Serranito sauce, and fresh lime juice.',
          price: '$275',
          featured: true,
        },
        {
          name: 'Sandoval',
          description: 'Inside: rice, avocado, tempura shrimp, cream cheese, cucumber, and kanikama. Outside: soy wrap, wrapped with the catch of the day and topped with tempura shrimp in spicy dressing, seasonal fruit, garlic chips, lemon slices, and fresh cilantro. Finished with sweet ponzu, curry oil, plum sauce, and fresh cilantro.',
          price: '$270',
        },
        {
          name: 'Médano',
          description: 'Inside: rice, avocado, tempura shrimp, cucumber, and kanikama. Outside: soy wrap, wrapped with the catch of the day and topped with tempura shrimp in spicy dressing, crispy octopus, and fresh cilantro. Finished with sweet ponzu, Serranito sauce, curry oil, and plum sauce.',
          price: '$285',
          featured: true,
        },
        {
          name: 'Pulpo Amai',
          description: 'Inside: rice, avocado, tempura shrimp, cucumber, and kanikama. Outside: soy wrap, wrapped with the catch of the day and avocado slices, topped with crispy octopus and mango in a sweet Serranito sauce, sweet ponzu, fresh lime juice, and cilantro. Served over a cilantro dressing.',
          price: '$295',
        },
        {
          name: 'Tropical',
          description: 'Inside: rice, avocado, tempura shrimp, cucumber, and kanikama. Outside: soy wrap, wrapped with the catch of the day and topped with mango slices, spicy fish, shaved red onion, serrano chili slices, and fresh cilantro. Served over a cilantro dressing and finished with plum sauce and sweet Serranito sauce.',
          price: '$280',
        },
        {
          name: 'Onion Crunch',
          description: 'Inside: nori seaweed, catch of the day, kanikama, avocado, and cream cheese. Outside: rice, wrapped with avocado and topped with crispy onion and green onion. Served over a cilantro dressing and finished with eel sauce and Serranito sauce.',
          price: '$255',
        },
        {
          name: 'Avocado Especial',
          description: 'Inside: nori seaweed, cucumber, avocado, cream cheese, and breaded kanikama. Outside: rice, wrapped with avocado and topped with seasoned surimi, lightly torched cooked shrimp, and furikake. Served over a cilantro dressing and finished with sriracha sauce.',
          price: '$265',
        },
        {
          name: 'Dracarys',
          description: 'Inside: nori seaweed, cucumber, avocado, cream cheese, and tempura shrimp. Outside: rice, wrapped with eel and avocado slices, topped with tempura flakes and green onion. Finished with eel sauce.',
          price: '$270',
        },
        {
          name: 'Úrsula',
          description: 'Inside: cucumber, avocado, and kanikama. Outside: wrapped with the catch of the day and topped with mango slices, tempura shrimp in spicy dressing, crispy octopus, and fresh cilantro. Finished with curry oil, fresh lime juice, and sweet Serranito sauce.',
          price: '$295',
          featured: true,
          tag: 'Rice-Free',
        },
        {
          name: 'Jetsam',
          description: 'Inside: nori seaweed, cucumber, cream cheese, avocado, and tempura shrimp. Outside: rice, wrapped with lightly torched kanikama dressed with spicy sauce and sweet eel sauce, topped with lemon slices and furikake. Served over a cilantro dressing and finished with eel sauce.',
          price: '$255',
        },
        {
          name: 'Mango Supreme',
          description: 'Inside: rice, cucumber, cream cheese, avocado, tempura shrimp, and spicy kanikama. Outside: soy wrap, wrapped with mango and topped with spicy fish, green onion, serrano chili slices, and fresh cilantro. Finished with yuzu dressing.',
          price: '$270',
          featured: true,
          tag: 'Seasonal',
        },
        {
          name: 'Hitaschi',
          description: 'Inside: nori seaweed, cucumber, avocado, kanikama, and cooked shrimp. Outside: rice, wrapped with the catch of the day and topped with lemon slices, serrano chili, sesame seeds, and fresh cilantro. Finished with Serranito sauce and fresh lime juice.',
          price: '$240',
          featured: true,
        },
        {
          name: 'Lemon',
          description: 'Inside: rice, cucumber, avocado, kanikama, mango, and basil. Outside: soy wrap, wrapped with the catch of the day and a lemon slice. Served over a ginger dressing and finished with caramel oil, Serranito sauce, and furikake.',
          price: '$255',
        },
        {
          name: 'Nala Crunch',
          description: 'Inside: rice, cucumber, avocado, kanikama, mango, and basil. Outside: soy wrap, wrapped with the catch of the day and a lemon slice. Served over a ginger dressing and finished with caramel oil, Serranito sauce, and furikake.',
          price: '$280',
          featured: true,
        },
        {
          name: 'Vivian',
          description: 'Inside: lettuce, cucumber, avocado, catch of the day, kanikama, and cooked shrimp. Outside: rice paper, topped with tempura shrimp in spicy dressing, crispy leek, and furikake. Served over a ginger dressing and finished with Serranito sauce, caramel oil, and a touch of fresh lime.',
          price: '$270',
          tag: 'Rice-Free',
        },
        {
          name: 'Tuna Lover',
          description: 'Inside: nori seaweed, yellowfin tuna, fresh cilantro, mango, cucumber, avocado, and cream cheese. Outside: rice, wrapped with yellowfin tuna and topped with spicy tuna, masago, serrano chili, and fresh cilantro. Served over a cilantro dressing.',
          price: '$285',
          featured: true,
        },
        {
          name: 'Sinaloense',
          description: 'Inside: catch of the day, crispy onion, and cucumber. Outside: rice paper, topped with cooked octopus, shrimp marinated in tropical sauce, avocado, serrano chili, masago, and fresh cilantro. Served over a cilantro dressing and finished with yuzu dressing.',
          price: '$285',
          tag: 'Rice-Free',
        },
        {
          name: 'Trufa Maki',
          description: 'Inside: rice, avocado, and kanikama. Outside: nori seaweed, topped with the catch of the day, truffle dressing, green onion, and tempura flakes. Finished with ponzu.',
          price: '$285',
        },
        {
          name: 'Fish Nori',
          description: 'Inside: rice, cucumber, avocado, cooked shrimp, and kanikama. Outside: nori seaweed, topped with the catch of the day, pickled ginger, red onion, ginger dressing, curry oil-seared jalapeños, lemon zest, and furikake. Served over a ginger dressing and finished with Serranito sauce and fresh lime juice.',
          price: '$270',
        },
        {
          name: 'Tanuki Flameado',
          description: 'Inside: nori seaweed, cucumber, avocado, salmon topped with cilantro dressing, and tempura flakes. Outside: rice, wrapped with salmon lightly torched with curry oil, lemon slices, and green onion. Finished with ponzu and cilantro dressing.',
          price: '$270',
        },
        {
          name: 'Rockefeller',
          description: 'Inside: nori seaweed, cucumber, cream cheese, avocado, and a blend of fish, spicy kanikama, and green onion. Outside: rice, coated with tempura flakes, furikake, and green onion. Finished with spicy dressing and eel sauce.',
          price: '$245',
          featured: true,
        },
        {
          name: 'Glen',
          description: 'Inside: rice, cream cheese, cucumber, avocado, breaded shrimp, and spicy kanikama. Outside: wrapped with fish and topped with the catch of the day, mango in sweet and sour sauce, sesame seeds, and fresh cilantro. Finished with eel sauce.',
          price: '$275',
        },
        {
          name: 'Tu Especialidad',
          description: 'Create your own roll with your favorite ingredients, or show us a photo for inspiration. Name your creation and have it added to our portfolio for future visits.',
          price: '$320',
        },
      ],
    },
    {
      id: 'temakis-nigiris',
      label: 'Temakis & Nigiris',
      subsections: [
        {
          title: 'Temakis (1 pc.) – Cone Style (70 g)',
          items: [
            { name: 'Eel', description: '', price: '$180' },
            { name: 'Spicy Amberjack', description: '', price: '$130' },
            { name: 'Spicy Cooked Shrimp', description: '', price: '$140' },
            { name: 'Yellowfin Tuna', description: '', price: '$160' },
            { name: 'Spicy Canadian Salmon', description: '', price: '$190', tag: 'Premium' },
          ],
        },
        {
          title: 'Nigiris (1 pc.) (25 g)',
          items: [
            { name: 'Amberjack', description: '', price: '$45' },
            { name: 'Yellowfin Tuna', description: '', price: '$60' },
            { name: 'Cooked Shrimp', description: '', price: '$50' },
            { name: 'Canadian Salmon', description: '', price: '$110', tag: 'Premium' },
          ],
        },
      ],
    },
    {
      id: 'rice-bowls',
      label: 'Rice & Poke Bowls',
      items: [
        {
          name: 'Gohan (200 g)',
          description: 'Steamed rice served with your choice of protein. Make it Special for +$40: includes cream cheese, avocado, seasoned surimi, and sesame seeds.',
          options: [
            { label: 'Chicken', price: '$130' },
            { label: 'Shrimp', price: '$180' },
            { label: 'Sirloin', price: '$145' },
            { label: 'Mixed', price: '$165' },
          ],
        },
        {
          name: 'Yakimeshi (200 g)',
          description: 'Japanese-style fried rice with zucchini, carrots, and your choice of protein. Make it Special for +$40: includes cream cheese, avocado, seasoned surimi, and sesame seeds.',
          options: [
            { label: 'Vegetables', price: '$125' },
            { label: 'Chicken', price: '$150' },
            { label: 'Sirloin', price: '$165' },
            { label: 'Shrimp', price: '$200' },
            { label: 'Mixed', price: '$185' },
          ],
        },
        {
          name: 'Poke Bowl (100 g)',
          description: 'Rice bowl with your choice of protein, cucumber noodles, seasoned surimi, avocado, seasonal fruit, shredded carrots, edamame, ginger blossom, and furikake. Finished with ponzu and house oil. Served with sweet Serranito sauce and cilantro dressing.',
          options: [
            { label: 'Amberjack', price: '$260' },
            { label: 'Yellowfin Tuna', price: '$285' },
            { label: 'Tofu', price: '$255' },
            { label: 'Canadian Salmon', price: '$380' },
          ],
        },
      ],
    },
    {
      id: 'stews-soups',
      label: 'Stews & Soups',
      items: [
        {
          name: 'Crispy Chicken (200 g)',
          description: 'Your choice of rice (vegetable fried rice or steamed white rice), served with crispy fried chicken, tempura onion, and sesame seeds. Finished with teriyaki sauce. Make it Special for +$40: add cream cheese, avocado, and seasoned surimi.',
          price: '$215',
        },
        {
          name: 'Teriyaki (200 g)',
          description: 'Steamed rice topped with vegetables and your choice of protein, finished with teriyaki sauce.',
          options: [
            { label: 'Vegetables', price: '$210' },
            { label: 'Chicken', price: '$250' },
            { label: 'Sirloin', price: '$270' },
            { label: 'Shrimp', price: '$310' },
            { label: 'Mixed', price: '$290' },
          ],
        },
        {
          name: 'Kung Pao Frito (200 g)',
          description: 'Crispy fried chicken stir-fried with carrots, bell peppers, red onion, broccoli, cauliflower, zucchini, dried chili peppers, and peanuts. Served over steamed rice and finished with sweet and sour sauce.',
          price: '$275',
        },
        {
          name: 'Noodles (200 g)',
          description: 'House-made egg noodles with carrots, bell peppers, red onion, broccoli, cauliflower, and zucchini. Finished with spicy teriyaki sauce.',
          options: [
            { label: 'Shrimp', price: '$330' },
            { label: 'Sirloin', price: '$280' },
            { label: 'Chicken', price: '$260' },
            { label: 'Mixed', price: '$310' },
          ],
        },
        {
          name: 'Ramen Tonkotsu (120 g)',
          description: 'Traditional pork broth (300 ml) with house-made egg noodles, pork belly, soft-boiled egg, shiitake mushrooms, green onion, corn, spicy sesame oil, and togarashi.',
          price: '$345',
          featured: true,
        },
        {
          name: 'Udon Soup (100 g)',
          description: 'Chicken-based broth (300 ml) with udon noodles, miso, soy sauce, broccoli, cauliflower, zucchini, and carrots.',
          price: '$185',
        },
        {
          name: 'Miso Soup (75 g)',
          description: 'Traditional miso broth (200 ml) with tofu, hondashi, soy sauce, shiitake mushrooms, and wakame seaweed.',
          price: '$120',
        },
      ],
    },
    {
      id: 'beverages',
      label: 'Beverages',
      subsections: [
        {
          title: 'Mocktails – $120',
          note: 'Refreshing, alcohol-free, and full of flavor.',
          items: [
            { name: 'Arnold Palmer (300 ml)', description: 'House signature tea, lemon, and simple syrup.', price: '$120' },
            { name: 'Piñada (600 ml)', description: 'A refreshing blend of coconut and pineapple juice.', price: '$120' },
            { name: 'Brasilia (300 ml)', description: 'Passion fruit, pineapple, basil, lemon, sparkling water, and syrup.', price: '$120' },
            { name: 'Mar Rosso (300 ml)', description: 'Hibiscus, lemon, strawberry, pineapple, mint, and syrup.', price: '$120' },
          ],
        },
        {
          title: 'Non-Alcoholic Beverages',
          items: [
            { name: 'Coca-Cola (355 ml)', description: 'Regular, light or zero.', price: '$60' },
            { name: 'Fresh Lemonade (300 ml)', description: 'Still or Sparkling.', price: '$70' },
            { name: 'Fresh Orangeade (600 ml)', description: 'Still or Sparkling.', price: '$70' },
            { name: 'Topo Chico Sparkling Water (600 ml)', description: '', price: '$75' },
            { name: 'Rusa (600 ml)', description: '', price: '$90' },
            { name: 'Bottled Water (600 ml)', description: '', price: '$40' },
            { name: 'House Tea (600 ml)', description: '', price: '$65' },
            { name: 'Red Berry Lemonade (600 ml)', description: '', price: '$85' },
            { name: 'Calpico (600 ml)', description: '', price: '$70' },
          ],
        },
        {
          title: 'Hot Beverages',
          items: [
            { name: 'Espresso Americano', description: '', price: '$45' },
            { name: 'Espresso', description: '', price: '$40' },
            { name: 'Jasmine or Oolong Tea', description: '', price: '$55' },
            { name: 'Cappuccino (130 ml)', description: '', price: '$90' },
            { name: 'Latte', description: '', price: '$99' },
          ],
        },
        {
          title: 'House Cocktails',
          items: [
            { name: 'Osaka (220 ml)', description: 'Mezcal, ancho chili liqueur, pineapple, tamarind, lemon, and simple syrup.', price: '$200' },
            { name: 'Vinoscalita (220 ml)', description: 'Mezcal, lemon, passion fruit, agave nectar, and red wine.', price: '$220' },
            { name: 'Toronja Sunset (300 ml)', description: 'Juanita MX gin, grapefruit, passion fruit, lemon juice, simple syrup, basil, and Angostura bitters.', price: '$230' },
            { name: 'Berry Tonic (300 ml)', description: 'Juanita MX gin, mixed berries, lemon, basil syrup, St-Germain, and tonic water.', price: '$230' },
            { name: 'Sake Bomb (380 ml)', description: 'Mexican lager served with a shot of house sake.', price: '$250' },
          ],
        },
        {
          title: 'Classic Cocktails',
          items: [
            { name: 'Margarita (330 ml)', description: '', price: '$190' },
            { name: 'Mezcalita (330 ml)', description: '', price: '$200' },
            { name: 'Mojito (360 ml)', description: '', price: '$190' },
            { name: 'Gin & Tonic (330 ml)', description: '', price: '$180' },
            { name: 'Piña Colada (330 ml)', description: '', price: '$190' },
            { name: 'Clericot (330 ml)', description: '', price: '$200' },
            { name: 'Sangría (330 ml)', description: '', price: '$190' },
            { name: 'Carajillo (330 ml)', description: '', price: '$180' },
            { name: 'Aperol Spritz (330 ml)', description: '', price: '$220' },
            { name: 'Negroni (100 ml)', description: '', price: '$190' },
            { name: 'Old Fashioned (100 ml)', description: '', price: '$190' },
            { name: 'Moscow Mule (330 ml)', description: '', price: '$200' },
            { name: 'Cantarito (500 ml)', description: '', price: '$250' },
            { name: 'Clamato with Beer (330 ml)', description: '', price: '$150' },
            { name: 'Michelada Mug (90 ml)', description: '', price: '$120' },
          ],
        },
        {
          title: 'Wines & Sake',
          items: [
            { name: 'Pinot Grigio, Le Palme', description: 'White Wine', options: [{ label: '750 ml Bottle', price: '$900' }, { label: '180 ml Glass', price: '$200' }] },
            { name: 'Chardonnay, Casta Blanca', description: 'White Wine', options: [{ label: '750 ml Bottle', price: '$1,100' }, { label: '180 ml Glass', price: '$230' }] },
            { name: 'De Cote Bulla Blanco', description: 'White Wine', options: [{ label: '750 ml Bottle', price: '$650' }, { label: '180 ml Glass', price: '$180' }] },
            { name: 'Piccolo Roganto', description: 'Red Wine – Cabernet, Merlot & Tempranillo blend', options: [{ label: '750 ml Bottle', price: '$1,100' }, { label: '180 ml Glass', price: '$220' }] },
            { name: 'Tempranillo, Santo Tomás', description: 'Red Wine', options: [{ label: '750 ml Bottle', price: '$1,100' }, { label: '180 ml Glass', price: '$220' }] },
            { name: 'Round Hill Merlot 2021', description: 'Red Wine', options: [{ label: '750 ml Bottle', price: '$750' }, { label: '180 ml Glass', price: '$190' }] },
            { name: 'Raza Vinho Verde 2024', description: 'Rosé Wine', options: [{ label: '750 ml Bottle', price: '$700' }, { label: '180 ml Glass', price: '$185' }] },
            { name: 'Sake Premium – Hakutsuru', description: 'Served Hot or Cold', options: [{ label: 'Tokkuri 150 ml', price: '$200' }, { label: 'Ochoko 60 ml', price: '$120' }] },
            { name: 'House Sake – Sho Chiku Bai', description: 'Served Hot or Cold', options: [{ label: 'Tokkuri 150 ml', price: '$150' }, { label: 'Ochoko 60 ml', price: '$100' }] },
            { name: 'Hakutsuru Excellent Junmai', description: 'Premium Sake', price: '$1,000' },
            { name: 'Nami Junmai', description: 'Premium Sake', options: [{ label: '750 ml', price: '$1,200' }, { label: 'Ochoko', price: '$180' }] },
            { name: 'Takazhimizu', description: 'Premium Sake', options: [{ label: '300 ml', price: '$650' }, { label: 'Ochoko', price: '$180' }] },
          ],
        },
        {
          title: 'Beers (355 ml)',
          items: [
            { name: 'Pacífico Clara', description: '', price: '$70' },
            { name: 'Pacífico Light', description: '', price: '$70' },
            { name: 'Pacífico Suave', description: '', price: '$70' },
            { name: 'Corona', description: '', price: '$70' },
            { name: 'Michelob Ultra', description: '', price: '$70' },
            { name: 'Modelo Especial', description: '', price: '$80' },
            { name: 'Modelo Negra', description: '', price: '$80' },
            { name: 'Non-Alcoholic Beer', description: '', price: '$50' },
            { name: 'Sapporo (Imported)', description: '', price: '$200' },
            { name: 'Asahi (Imported)', description: '', price: '$200' },
            { name: 'Kirin Ichiban (Imported)', description: '', price: '$250' },
            { name: 'Local Craft Beer', description: 'Seasonal Selection', price: '$150' },
          ],
        },
      ],
    },
    {
      id: 'desserts',
      label: 'Desserts',
      items: [
        { name: 'Slice of Flan (1 pc.)', description: 'Classic homemade flan.', price: '$135' },
        { name: 'Tempura Ice Cream (1 pc.) (120 g)', description: 'Ice cream in a crispy tempura shell.', price: '$150' },
        { name: 'Slice of Chocolate Cake (1 pc.)', description: 'Rich chocolate layer cake.', price: '$165' },
      ],
    },
  ],
  es: [
    {
      id: 'appetizers',
      label: 'Entradas',
      items: [
        {
          name: 'Chiles Crunch',
          description: '8 chiles jalapeños rellenos de surimi sazonado, fritos en tempura. Cubiertos con salsa sriracha y aderezo picante.',
          price: '$180',
        },
        {
          name: 'Rock Shrimp (200 g)',
          description: 'Camarón tempura salteado con aderezo picante y salsa de anguila, servido sobre papel arroz frito crujiente.',
          price: '$240',
          featured: true,
        },
        {
          name: 'Tostada Z "El Favorito del Chef" (60 g)',
          description: 'Tostada de wonton con base de aderezo picante, tu elección de pescado picante, aguacate, masago, poro frito, cebolla cambray, ajonjolí y aderezo de cilantro.',
          options: [
            { label: 'Jurel 1 pz', price: '$120' },
            { label: 'Jurel 3 pzs', price: '$320' },
            { label: 'Atún Aleta Amarilla 1 pz', price: '$150' },
            { label: 'Atún Aleta Amarilla 3 pzs', price: '$410' },
            { label: 'Salmón Canadiense 1 pz', price: '$180' },
            { label: 'Salmón Canadiense 2 pzs', price: '$320' },
          ],
        },
        {
          name: 'Tempura de Vegetales (150 g)',
          description: 'Mix de brócoli, coliflor, zanahoria, calabacita y cebolla en tempura, servidos con la salsa especial de la casa.',
          price: '$155',
        },
        {
          name: 'Edamames (150 g)',
          description: 'Vainas de soya preparadas a tu gusto.',
          options: [
            { label: 'Natural', price: '$115' },
            { label: 'Sazonados', price: '$130' },
            { label: 'Ajo', price: '$140' },
            { label: 'Picante (Chile Serrano)', price: '$140' },
          ],
        },
        {
          name: 'Chicharrón de Pulpo (150 g)',
          description: 'Finas rebanadas de pulpo cubiertas en katakuriko, ligeramente fritas y salteadas, servidas sobre una cama de fideos de arroz crujientes. Disponibles solos o con salsa agridulce.',
          price: '$290',
        },
        {
          name: 'Gyozas Tradicionales',
          description: '5 pzs. rellenas de cerdo, col de napa, hongos shiitake, ajo, jengibre y cebolla cambray. Servidas con ponzu picante o salsa Thai.',
          price: '$175',
        },
        {
          name: 'Burritos Especiales (4 pzs)',
          description: 'Rollos de soya rellenos de camarón tempura, queso crema, pepino, aguacate, surimi sazonado, menta fresca, albahaca y mango. Servidos sobre aderezo de cilantro y jengibre, terminados con salsa de anguila, aceite de curry y furikake.',
          price: '$235',
        },
        {
          name: 'Kushiages (3 pzs)',
          description: 'Brochetas de queso empanizadas servidas con la salsa especial de la casa.',
          price: '$165',
        },
        {
          name: 'Thai Ribs (250 g)',
          description: 'Costillas de cerdo rostizadas y ligeramente fritas, glaseadas con salsa Thai y terminadas con cebolla cambray.',
          price: '$210',
        },
        {
          name: 'Sashimi Serranito (120 g)',
          description: '12 rebanadas de pescado cubiertas con chile serrano, ajonjolí y cilantro fresco. Terminadas con nuestra salsa Serranito.',
          options: [
            { label: 'Jurel', price: '$185' },
            { label: 'Atún Aleta Amarilla', price: '$220' },
            { label: 'Salmón Canadiense (8 rebanadas)', price: '$300' },
          ],
        },
        {
          name: 'Sashimi Cilantro (120 g)',
          description: '12 rebanadas de pescado ligeramente flameadas con aceite de curry, servidas sobre aderezo de cilantro y ajonjolí. Adornadas con cilantro fresco y poro crujiente, terminadas con salsa Serranito.',
          options: [
            { label: 'Jurel', price: '$195' },
            { label: 'Atún Aleta Amarilla', price: '$230' },
            { label: 'Salmón Canadiense (8 rebanadas)', price: '$310' },
          ],
        },
        {
          name: 'Curricanes (120 g)',
          description: '10 rebanadas de pescado rellenas de kanikama picante, aguacate, cilantro fresco y ajonjolí. Servidas sobre aderezo de yuzu y terminadas con salsa Serranito y jugo de limón fresco.',
          options: [
            { label: 'Jurel', price: '$265' },
            { label: 'Atún Aleta Amarilla', price: '$280' },
            { label: 'Salmón Canadiense (6 pzs)', price: '$320' },
          ],
          featured: true,
        },
        {
          name: 'Brujitas (120 g)',
          description: '10 rebanadas de pescado rellenas de surimi sazonado. Terminadas con aguacate, furikake y cebolla cambray. Servidas sobre aderezo de jengibre-cilantro y cubiertas con salsa de anguila, aceite de caramelo, salsa Serranito, jugo de limón fresco y sriracha.',
          options: [
            { label: 'Jurel', price: '$275' },
            { label: 'Atún Aleta Amarilla', price: '$290' },
            { label: 'Salmón Canadiense (6 pzs)', price: '$335' },
          ],
          featured: true,
        },
      ],
    },
    {
      id: 'traditional-rolls',
      label: 'Rolls Tradicionales',
      note: 'Rolls de 8 piezas.',
      items: [
        { name: 'California', description: 'Interior: alga nori, pepino, aguacate, queso crema y camarón cocido. Exterior: arroz y ajonjolí.', price: '$150' },
        { name: 'Ebi', description: 'Interior: alga nori, pepino, aguacate, queso crema y kanikama empanizada. Exterior: arroz cubierto con camarón cocido, aguacate y cebolla cambray. Terminado con aderezo picante y salsa de anguila.', price: '$180' },
        { name: 'Mango', description: 'Interior: arroz, pepino, aguacate, queso crema, camarón tempura y kanikama picante. Exterior: soya, cubierto con mango, chile serrano y cilantro fresco. Terminado con salsa de anguila.', price: '$225', tag: 'Temporada' },
        { name: 'Avocado Tradicional', description: 'Interior: arroz, pepino, queso crema, camarón tempura, aguacate y kanikama. Exterior: soya, cubierto con aguacate, masago y ajonjolí. Terminado con yuzu y salsa de anguila.', price: '$230' },
        { name: 'Salmoncito', description: 'Interior: alga nori, pepino, aguacate, queso crema y surimi delicado. Exterior: arroz cubierto con salmón canadiense, togarashi, cebolla cambray y ponzu.', price: '$260' },
        { name: 'Spicy del Día', description: 'Interior: alga nori, pepino, aguacate y kanikama. Exterior: arroz cubierto con la captura del día preparada picante, cebolla cambray, una rueda de limón y sriracha.', price: '$225' },
      ],
    },
    {
      id: 'breaded-rolls',
      label: 'Rolls Empanizados',
      items: [
        { name: 'Mar y Tierra', description: 'Arroz, alga nori, pepino, aguacate, queso crema, camarón cocido y filete de res.', price: '$160' },
        { name: 'California', description: 'Arroz, alga nori, pepino, aguacate, queso crema y camarón cocido.', price: '$160' },
        { name: 'Kani Ebi', description: 'Interior: alga nori, pepino, aguacate, queso crema y camarón tempura. Exterior: arroz cubierto con kanikama, aderezo anguila-picante y cebolla cambray. Terminado con salsa de anguila sobre base de aderezo picante.', price: '$220' },
        { name: 'Tempus', description: 'Interior: alga nori, pepino, aguacate, queso crema y camarón tempura. Exterior: arroz cubierto con kanikama picante, cebolla cambray y togarashi. Servido sobre base de aderezo picante terminado con salsa de anguila.', price: '$210' },
        { name: 'Ebi Cheese', description: 'Interior: alga nori, pepino, aguacate y queso crema. Exterior: arroz cubierto con camarón, aderezo anguila-picante, queso menonita derretido y cebolla cambray. Terminado con salsa de anguila sobre base de aderezo picante.', price: '$235', featured: true },
        { name: 'Cheese Oita', description: 'Interior: arroz, pepino, aguacate, camarón tempura y queso crema. Exterior: alga nori cubierta con queso menonita derretido, kanikama picante y cebolla cambray. Servido sobre base de aderezo picante terminado con salsa de anguila.', price: '$245', featured: true },
      ],
    },
    {
      id: 'specialty-rolls',
      label: 'Rolls Especiales',
      note: 'Nuestros rolls se sirven en 8 piezas. El pescado del día puede variar entre jurel y atún aleta amarilla según disponibilidad y selección del chef.',
      items: [
        { name: 'Zamashi', description: 'Interior: alga nori, pepino, aguacate, queso crema y kanikama picante. Exterior: arroz envuelto con la captura del día y rebanadas de aguacate, cubierto con kanikama y camarón tempura con salsa picante y cilantro fresco. Servido sobre base picante y terminado con salsa de anguila y ajonjolí.', price: '$290', featured: true },
        { name: 'Bahía', description: 'Interior: arroz, alga nori, aguacate, pepino y la captura del día. Exterior: cubierto con surimi sazonado, poro crujiente, rebanadas de limón y furikake. Servido sobre aderezos de jengibre y cilantro, terminado con aceite de caramelo, salsa de anguila, salsa Serranito y jugo de limón fresco.', price: '$275', featured: true },
        { name: 'Sandoval', description: 'Interior: arroz, aguacate, camarón tempura, queso crema, pepino y kanikama. Exterior: soya envuelta con la captura del día y camarón tempura en aderezo picante, fruta de temporada, chips de ajo, rodajas de limón y cilantro fresco. Terminado con ponzu dulce, aceite de curry, salsa de ciruela y cilantro fresco.', price: '$270' },
        { name: 'Médano', description: 'Interior: arroz, aguacate, camarón tempura, pepino y kanikama. Exterior: soya envuelta con la captura del día y camarón tempura en aderezo picante, pulpo crujiente y cilantro fresco. Terminado con ponzu dulce, salsa Serranito, aceite de curry y salsa de ciruela.', price: '$285', featured: true },
        { name: 'Pulpo Amai', description: 'Interior: arroz, aguacate, camarón tempura, pepino y kanikama. Exterior: soya envuelta con la captura del día y rebanadas de aguacate, cubierta con pulpo crujiente y mango en salsa Serranito dulce, ponzu dulce, jugo de limón fresco y cilantro. Servido sobre aderezo de cilantro.', price: '$295' },
        { name: 'Tropical', description: 'Interior: arroz, aguacate, camarón tempura, pepino y kanikama. Exterior: soya envuelta con la captura del día y rebanadas de mango, pescado picante, cebolla morada rallada, rebanadas de chile serrano y cilantro fresco. Servido sobre aderezo de cilantro y terminado con salsa de ciruela y salsa Serranito dulce.', price: '$280' },
        { name: 'Onion Crunch', description: 'Interior: alga nori, captura del día, kanikama, aguacate y queso crema. Exterior: arroz envuelto con aguacate y cubierto con cebolla crujiente y cebolla cambray. Servido sobre aderezo de cilantro y terminado con salsa de anguila y salsa Serranito.', price: '$255' },
        { name: 'Avocado Especial', description: 'Interior: alga nori, pepino, aguacate, queso crema y kanikama empanizada. Exterior: arroz envuelto con aguacate y cubierto con surimi sazonado, camarón cocido ligeramente flameado y furikake. Servido sobre aderezo de cilantro y terminado con salsa sriracha.', price: '$265' },
        { name: 'Dracarys', description: 'Interior: alga nori, pepino, aguacate, queso crema y camarón tempura. Exterior: arroz envuelto con anguila y rebanadas de aguacate, cubierto con hojuelas de tempura y cebolla cambray. Terminado con salsa de anguila.', price: '$270' },
        { name: 'Úrsula', description: 'Interior: pepino, aguacate y kanikama. Exterior: envuelto con la captura del día y cubierto con rebanadas de mango, camarón tempura en aderezo picante, pulpo crujiente y cilantro fresco. Terminado con aceite de curry, jugo de limón fresco y salsa Serranito dulce.', price: '$295', featured: true, tag: 'Sin Arroz' },
        { name: 'Jetsam', description: 'Interior: alga nori, pepino, queso crema, aguacate y camarón tempura. Exterior: arroz envuelto con kanikama ligeramente flameada en salsa picante y salsa de anguila dulce, cubierto con rebanadas de limón y furikake. Servido sobre aderezo de cilantro y terminado con salsa de anguila.', price: '$255' },
        { name: 'Mango Supreme', description: 'Interior: arroz, pepino, queso crema, aguacate, camarón tempura y kanikama picante. Exterior: soya envuelta con mango y cubierta con pescado picante, cebolla cambray, rebanadas de chile serrano y cilantro fresco. Terminado con aderezo de yuzu.', price: '$270', featured: true, tag: 'Temporada' },
        { name: 'Hitaschi', description: 'Interior: alga nori, pepino, aguacate, kanikama y camarón cocido. Exterior: arroz envuelto con la captura del día y cubierto con rebanadas de limón, chile serrano, semillas de ajonjolí y cilantro fresco. Terminado con salsa Serranito y jugo de limón fresco.', price: '$240', featured: true },
        { name: 'Lemon', description: 'Interior: arroz, pepino, aguacate, kanikama, mango y albahaca. Exterior: soya envuelta con la captura del día y una rebanada de limón. Servido sobre aderezo de jengibre y terminado con aceite de caramelo, salsa Serranito y furikake.', price: '$255' },
        { name: 'Nala Crunch', description: 'Interior: arroz, pepino, aguacate, kanikama, mango y albahaca. Exterior: soya envuelta con la captura del día y una rebanada de limón. Servido sobre aderezo de jengibre y terminado con aceite de caramelo, salsa Serranito y furikake.', price: '$280', featured: true },
        { name: 'Vivian', description: 'Interior: lechuga, pepino, aguacate, captura del día, kanikama y camarón cocido. Exterior: papel arroz cubierto con camarón tempura en aderezo picante, poro crujiente y furikake. Servido sobre aderezo de jengibre y terminado con salsa Serranito, aceite de caramelo y un toque de limón fresco.', price: '$270', tag: 'Sin Arroz' },
        { name: 'Tuna Lover', description: 'Interior: alga nori, atún aleta amarilla, cilantro fresco, mango, pepino, aguacate y queso crema. Exterior: arroz envuelto con atún aleta amarilla y cubierto con atún picante, masago, chile serrano y cilantro fresco. Servido sobre aderezo de cilantro.', price: '$285', featured: true },
        { name: 'Sinaloense', description: 'Interior: captura del día, cebolla crujiente y pepino. Exterior: papel arroz cubierto con pulpo cocido, camarón marinado en salsa tropical, aguacate, chile serrano, masago y cilantro fresco. Servido sobre aderezo de cilantro y terminado con aderezo de yuzu.', price: '$285', tag: 'Sin Arroz' },
        { name: 'Trufa Maki', description: 'Interior: arroz, aguacate y kanikama. Exterior: alga nori cubierta con la captura del día, aderezo de trufa, cebolla cambray y hojuelas de tempura. Terminado con ponzu.', price: '$285' },
        { name: 'Fish Nori', description: 'Interior: arroz, pepino, aguacate, camarón cocido y kanikama. Exterior: alga nori cubierta con la captura del día, jengibre encurtido, cebolla morada, aderezo de jengibre, jalapeños sellados en aceite de curry, ralladura de limón y furikake. Servido sobre aderezo de jengibre y terminado con salsa Serranito y jugo de limón fresco.', price: '$270' },
        { name: 'Tanuki Flameado', description: 'Interior: alga nori, pepino, aguacate, salmón con aderezo de cilantro y hojuelas de tempura. Exterior: arroz envuelto con salmón ligeramente flameado con aceite de curry, rebanadas de limón y cebolla cambray. Terminado con ponzu y aderezo de cilantro.', price: '$270' },
        { name: 'Rockefeller', description: 'Interior: alga nori, pepino, queso crema, aguacate y una mezcla de pescado, kanikama picante y cebolla cambray. Exterior: arroz cubierto con hojuelas de tempura, furikake y cebolla cambray. Terminado con aderezo picante y salsa de anguila.', price: '$245', featured: true },
        { name: 'Glen', description: 'Interior: arroz, queso crema, pepino, aguacate, camarón empanizado y kanikama picante. Exterior: envuelto con pescado y cubierto con la captura del día, mango en salsa agridulce, ajonjolí y cilantro fresco. Terminado con salsa de anguila.', price: '$275' },
        { name: 'Tu Especialidad', description: 'Crea tu propio roll con tus ingredientes favoritos o muéstranos una foto de inspiración. Ponle nombre a tu creación y agrégala a nuestro portafolio para futuras visitas.', price: '$320' },
      ],
    },
    {
      id: 'temakis-nigiris',
      label: 'Temakis & Nigiris',
      subsections: [
        {
          title: 'Temakis (1 pz.) – Estilo Cono (70 g)',
          items: [
            { name: 'Anguila', description: '', price: '$180' },
            { name: 'Jurel Picante', description: '', price: '$130' },
            { name: 'Camarón Cocido Picante', description: '', price: '$140' },
            { name: 'Atún Aleta Amarilla', description: '', price: '$160' },
            { name: 'Salmón Canadiense Picante', description: '', price: '$190', tag: 'Premium' },
          ],
        },
        {
          title: 'Nigiris (1 pz.) (25 g)',
          items: [
            { name: 'Jurel', description: '', price: '$45' },
            { name: 'Atún Aleta Amarilla', description: '', price: '$60' },
            { name: 'Camarón Cocido', description: '', price: '$50' },
            { name: 'Salmón Canadiense', description: '', price: '$110', tag: 'Premium' },
          ],
        },
      ],
    },
    {
      id: 'rice-bowls',
      label: 'Arroz y Poke Bowls',
      items: [
        { name: 'Gohan (200 g)', description: 'Arroz al vapor servido con tu elección de proteína. Hazlo Especial por +$40: incluye queso crema, aguacate, surimi sazonado y ajonjolí.', options: [{ label: 'Pollo', price: '$130' }, { label: 'Camarón', price: '$180' }, { label: 'Sirloin', price: '$145' }, { label: 'Mixto', price: '$165' }] },
        { name: 'Yakimeshi (200 g)', description: 'Arroz frito estilo japonés con calabacita, zanahorias y tu elección de proteína. Hazlo Especial por +$40: incluye queso crema, aguacate, surimi sazonado y ajonjolí.', options: [{ label: 'Vegetales', price: '$125' }, { label: 'Pollo', price: '$150' }, { label: 'Sirloin', price: '$165' }, { label: 'Camarón', price: '$200' }, { label: 'Mixto', price: '$185' }] },
        { name: 'Poke Bowl (100 g)', description: 'Bowl de arroz con tu elección de proteína, fideos de pepino, surimi sazonado, aguacate, fruta de temporada, zanahoria rallada, edamame, flor de jengibre y furikake. Terminado con ponzu y aceite de la casa. Servido con salsa Serranito dulce y aderezo de cilantro.', options: [{ label: 'Jurel', price: '$260' }, { label: 'Atún Aleta Amarilla', price: '$285' }, { label: 'Tofu', price: '$255' }, { label: 'Salmón Canadiense', price: '$380' }] },
      ],
    },
    {
      id: 'stews-soups',
      label: 'Guisados y Sopas',
      items: [
        { name: 'Pollo Crujiente (200 g)', description: 'Tu elección de arroz (frito con vegetales o blanco al vapor), servido con pollo frito crujiente, cebolla tempura y ajonjolí. Terminado con salsa teriyaki. Hazlo Especial por +$40: agrega queso crema, aguacate y surimi sazonado.', price: '$215' },
        { name: 'Teriyaki (200 g)', description: 'Arroz al vapor cubierto con vegetales y tu elección de proteína, terminado con salsa teriyaki.', options: [{ label: 'Vegetales', price: '$210' }, { label: 'Pollo', price: '$250' }, { label: 'Sirloin', price: '$270' }, { label: 'Camarón', price: '$310' }, { label: 'Mixto', price: '$290' }] },
        { name: 'Kung Pao Frito (200 g)', description: 'Pollo frito crujiente salteado con zanahorias, pimientos, cebolla morada, brócoli, coliflor, calabacita, chiles secos y cacahuates. Servido sobre arroz blanco y terminado con salsa agridulce.', price: '$275' },
        { name: 'Fideos (200 g)', description: 'Fideos de huevo caseros con zanahorias, pimientos, cebolla morada, brócoli, coliflor y calabacita. Terminados con salsa teriyaki picante.', options: [{ label: 'Camarón', price: '$330' }, { label: 'Sirloin', price: '$280' }, { label: 'Pollo', price: '$260' }, { label: 'Mixto', price: '$310' }] },
        { name: 'Ramen Tonkotsu (120 g)', description: 'Caldo de cerdo tradicional (300 ml) con fideos de huevo caseros, panza de cerdo, huevo suave, hongos shiitake, cebolla cambray, elote, aceite de ajonjolí picante y togarashi.', price: '$345', featured: true },
        { name: 'Sopa Udon (100 g)', description: 'Caldo de pollo (300 ml) con fideos udon, miso, salsa de soya, brócoli, coliflor, calabacita y zanahorias.', price: '$185' },
        { name: 'Sopa Miso (75 g)', description: 'Caldo de miso tradicional (200 ml) con tofu, hondashi, salsa de soya, hongos shiitake y alga wakame.', price: '$120' },
      ],
    },
    {
      id: 'beverages',
      label: 'Bebidas',
      subsections: [
        {
          title: 'Mocktails – $120',
          note: 'Refrescantes, sin alcohol y llenos de sabor.',
          items: [
            { name: 'Arnold Palmer (300 ml)', description: 'Té de la casa, limón y jarabe simple.', price: '$120' },
            { name: 'Piñada (600 ml)', description: 'Refrescante mezcla de coco y jugo de piña.', price: '$120' },
            { name: 'Brasilia (300 ml)', description: 'Maracuyá, piña, albahaca, limón, agua mineral y jarabe.', price: '$120' },
            { name: 'Mar Rosso (300 ml)', description: 'Jamaica, limón, fresa, piña, menta y jarabe.', price: '$120' },
          ],
        },
        {
          title: 'Bebidas Sin Alcohol',
          items: [
            { name: 'Coca-Cola (355 ml)', description: 'Regular, light o zero.', price: '$60' },
            { name: 'Limonada Fresca (300 ml)', description: 'Natural o mineral.', price: '$70' },
            { name: 'Naranjada Fresca (600 ml)', description: 'Natural o mineral.', price: '$70' },
            { name: 'Agua Mineral Topo Chico (600 ml)', description: '', price: '$75' },
            { name: 'Rusa (600 ml)', description: '', price: '$90' },
            { name: 'Agua Embotellada (600 ml)', description: '', price: '$40' },
            { name: 'Té de la Casa (600 ml)', description: '', price: '$65' },
            { name: 'Limonada de Frutos Rojos (600 ml)', description: '', price: '$85' },
            { name: 'Calpico (600 ml)', description: '', price: '$70' },
          ],
        },
        {
          title: 'Bebidas Calientes',
          items: [
            { name: 'Americano', description: '', price: '$45' },
            { name: 'Espresso', description: '', price: '$40' },
            { name: 'Té de Jazmín o Oolong', description: '', price: '$55' },
            { name: 'Capuchino (130 ml)', description: '', price: '$90' },
            { name: 'Latte', description: '', price: '$99' },
          ],
        },
        {
          title: 'Cócteles de la Casa',
          items: [
            { name: 'Osaka (220 ml)', description: 'Mezcal, licor de chile ancho, piña, tamarindo, limón y jarabe simple.', price: '$200' },
            { name: 'Vinoscalita (220 ml)', description: 'Mezcal, limón, maracuyá, néctar de agave y vino tinto.', price: '$220' },
            { name: 'Toronja Sunset (300 ml)', description: 'Gin Juanita MX, toronja, maracuyá, jugo de limón, jarabe simple, albahaca y bitters de Angostura.', price: '$230' },
            { name: 'Berry Tonic (300 ml)', description: 'Gin Juanita MX, frutos rojos mixtos, limón, jarabe de albahaca, St-Germain y agua tónica.', price: '$230' },
            { name: 'Sake Bomb (380 ml)', description: 'Cerveza lager mexicana servida con un shot de sake de la casa.', price: '$250' },
          ],
        },
        {
          title: 'Cócteles Clásicos',
          items: [
            { name: 'Margarita (330 ml)', description: '', price: '$190' },
            { name: 'Mezcalita (330 ml)', description: '', price: '$200' },
            { name: 'Mojito (360 ml)', description: '', price: '$190' },
            { name: 'Gin & Tonic (330 ml)', description: '', price: '$180' },
            { name: 'Piña Colada (330 ml)', description: '', price: '$190' },
            { name: 'Clericot (330 ml)', description: '', price: '$200' },
            { name: 'Sangría (330 ml)', description: '', price: '$190' },
            { name: 'Carajillo (330 ml)', description: '', price: '$180' },
            { name: 'Aperol Spritz (330 ml)', description: '', price: '$220' },
            { name: 'Negroni (100 ml)', description: '', price: '$190' },
            { name: 'Old Fashioned (100 ml)', description: '', price: '$190' },
            { name: 'Moscow Mule (330 ml)', description: '', price: '$200' },
            { name: 'Cantarito (500 ml)', description: '', price: '$250' },
            { name: 'Clamato con Cerveza (330 ml)', description: '', price: '$150' },
            { name: 'Tarro de Michelada (90 ml)', description: '', price: '$120' },
          ],
        },
        {
          title: 'Vinos y Sake',
          items: [
            { name: 'Pinot Grigio, Le Palme', description: 'Vino Blanco', options: [{ label: 'Botella 750 ml', price: '$900' }, { label: 'Copa 180 ml', price: '$200' }] },
            { name: 'Chardonnay, Casta Blanca', description: 'Vino Blanco', options: [{ label: 'Botella 750 ml', price: '$1,100' }, { label: 'Copa 180 ml', price: '$230' }] },
            { name: 'De Cote Bulla Blanco', description: 'Vino Blanco', options: [{ label: 'Botella 750 ml', price: '$650' }, { label: 'Copa 180 ml', price: '$180' }] },
            { name: 'Piccolo Roganto', description: 'Vino Tinto – mezcla Cabernet, Merlot y Tempranillo', options: [{ label: 'Botella 750 ml', price: '$1,100' }, { label: 'Copa 180 ml', price: '$220' }] },
            { name: 'Tempranillo, Santo Tomás', description: 'Vino Tinto', options: [{ label: 'Botella 750 ml', price: '$1,100' }, { label: 'Copa 180 ml', price: '$220' }] },
            { name: 'Round Hill Merlot 2021', description: 'Vino Tinto', options: [{ label: 'Botella 750 ml', price: '$750' }, { label: 'Copa 180 ml', price: '$190' }] },
            { name: 'Raza Vinho Verde 2024', description: 'Vino Rosado', options: [{ label: 'Botella 750 ml', price: '$700' }, { label: 'Copa 180 ml', price: '$185' }] },
            { name: 'Sake Premium – Hakutsuru', description: 'Frío o caliente', options: [{ label: 'Tokkuri 150 ml', price: '$200' }, { label: 'Ochoko 60 ml', price: '$120' }] },
            { name: 'Sake de la Casa – Sho Chiku Bai', description: 'Frío o caliente', options: [{ label: 'Tokkuri 150 ml', price: '$150' }, { label: 'Ochoko 60 ml', price: '$100' }] },
            { name: 'Hakutsuru Excellent Junmai', description: 'Sake Premium', price: '$1,000' },
            { name: 'Nami Junmai', description: 'Sake Premium', options: [{ label: '750 ml', price: '$1,200' }, { label: 'Ochoko', price: '$180' }] },
            { name: 'Takazhimizu', description: 'Sake Premium', options: [{ label: '300 ml', price: '$650' }, { label: 'Ochoko', price: '$180' }] },
          ],
        },
        {
          title: 'Cervezas (355 ml)',
          items: [
            { name: 'Pacífico Clara', description: '', price: '$70' },
            { name: 'Pacífico Light', description: '', price: '$70' },
            { name: 'Pacífico Suave', description: '', price: '$70' },
            { name: 'Corona', description: '', price: '$70' },
            { name: 'Michelob Ultra', description: '', price: '$70' },
            { name: 'Modelo Especial', description: '', price: '$80' },
            { name: 'Modelo Negra', description: '', price: '$80' },
            { name: 'Cerveza Sin Alcohol', description: '', price: '$50' },
            { name: 'Sapporo (Importada)', description: '', price: '$200' },
            { name: 'Asahi (Importada)', description: '', price: '$200' },
            { name: 'Kirin Ichiban (Importada)', description: '', price: '$250' },
            { name: 'Cerveza Artesanal Local', description: 'Selección de temporada', price: '$150' },
          ],
        },
      ],
    },
    {
      id: 'desserts',
      label: 'Postres',
      items: [
        { name: 'Rebanada de Flan (1 pz.)', description: 'Flan casero clásico.', price: '$135' },
        { name: 'Helado Tempura (1 pz.) (120 g)', description: 'Helado en capa crujiente de tempura.', price: '$150' },
        { name: 'Rebanada de Pastel de Chocolate (1 pz.)', description: 'Rico pastel de chocolate en capas.', price: '$165' },
      ],
    },
  ],
};

// ─── UI TRANSLATIONS ──────────────────────────────────────────────────────────

const ui = {
  es: {
    title: 'Nuestro Menú',
    restaurantTabs: { zamashi: 'Sushi · Zamashi', kazamashi: 'Italiana · Kazamashi', breakfast: 'Desayunos · Kazamashi' },
    comingSoon: 'Próximamente',
    breakfastNote: 'Nuestro menú de desayunos estará disponible próximamente. ¡Estate atento!',
    featured: 'Favorito',
    note: 'Nota',
    pricesNote: 'Todos los precios están en Pesos Mexicanos (MXN) e incluyen IVA. Los pesos indicados se refieren exclusivamente a la porción de proteína de cada platillo.',
    serranitaNote: 'Todos los platillos con nuestra salsa Serranito tienen un nivel suave de picor y pueden disfrutarse cómodamente, incluso por quienes prefieren sabores menos picantes.',
  },
  en: {
    title: 'Our Menu',
    restaurantTabs: { zamashi: 'Sushi · Zamashi', kazamashi: 'Italian · Kazamashi', breakfast: 'Breakfast · Kazamashi' },
    comingSoon: 'Coming Soon',
    breakfastNote: 'Our breakfast menu will be available soon. Stay tuned!',
    featured: 'Favorite',
    note: 'Note',
    pricesNote: 'All prices are listed in Mexican Pesos (MXN) and include VAT. The weights listed refer exclusively to the protein portion used in each dish.',
    serranitaNote: 'All dishes featuring our Serranito sauce have a mild level of heat and can be enjoyed comfortably, even by those who prefer less spicy flavors.',
  },
};

const kazamashiMenuPdf = '/Menu\u0301%20Kazamashi.pdf';
const kazamashiMenuPdfEmbed = `${kazamashiMenuPdf}#toolbar=0&navpanes=0&scrollbar=0&view=FitH`;

// ─── SUB-COMPONENTS ───────────────────────────────────────────────────────────

function ItemCard({ item, featured }: { item: MenuItem; featured: string }) {
  const [expanded, setExpanded] = useState(false);
  const hasOptions = item.options && item.options.length > 0;
  const longDesc = item.description.length > 120;

  return (
    <div className={`bg-white rounded-xl p-5 shadow-sm border transition-shadow hover:shadow-md ${item.featured ? 'border-amber-200' : 'border-neutral-100'}`}>
      <div className="flex items-start justify-between gap-3 mb-2">
        <div className="flex items-center flex-wrap gap-2 min-w-0">
          {item.featured && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-amber-50 text-amber-700 text-xs rounded-full border border-amber-200 shrink-0">
              <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
              {featured}
            </span>
          )}
          {item.tag && (
            <span className="px-2 py-0.5 bg-neutral-100 text-neutral-600 text-xs rounded-full border border-neutral-200 shrink-0">
              {item.tag}
            </span>
          )}
        </div>
        {item.price && !hasOptions && (
          <span className="text-base font-bold text-neutral-900 shrink-0">{item.price}</span>
        )}
      </div>

      <h4 className="font-semibold text-neutral-900 mb-1">{item.name}</h4>

      {item.description && (
        <div className="text-sm text-neutral-600 leading-relaxed">
          {longDesc && !expanded ? (
            <>
              <span>{item.description.slice(0, 120)}… </span>
              <button onClick={() => setExpanded(true)} className="text-neutral-400 hover:text-neutral-600 inline-flex items-center gap-0.5 text-xs">
                <ChevronDown className="w-3 h-3" />
              </button>
            </>
          ) : (
            <>
              {item.description}
              {longDesc && (
                <button onClick={() => setExpanded(false)} className="ml-1 text-neutral-400 hover:text-neutral-600 inline-flex items-center gap-0.5 text-xs">
                  <ChevronUp className="w-3 h-3" />
                </button>
              )}
            </>
          )}
        </div>
      )}

      {hasOptions && (
        <div className="mt-3 flex flex-wrap gap-2">
          {item.options!.map((opt, i) => (
            <div key={i} className="flex items-center gap-1.5 text-sm bg-neutral-50 border border-neutral-200 rounded-lg px-2.5 py-1">
              <span className="text-neutral-700">{opt.label}</span>
              <span className="font-semibold text-neutral-900">{opt.price}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function CategorySection({ category, featured }: { category: MenuCategory; featured: string }) {
  if (category.subsections) {
    return (
      <div className="space-y-10">
        {category.note && (
          <p className="text-sm text-neutral-500 italic text-center max-w-2xl mx-auto">{category.note}</p>
        )}
        {category.subsections.map((sub) => (
          <div key={sub.title}>
            <h4 className="font-semibold text-neutral-800 mb-1 text-base border-b border-neutral-200 pb-2">{sub.title}</h4>
            {sub.note && <p className="text-sm text-neutral-500 italic mb-3">{sub.note}</p>}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
              {sub.items.map((item, i) => (
                <ItemCard key={i} item={item} featured={featured} />
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div>
      {category.note && (
        <p className="text-sm text-neutral-500 italic text-center max-w-2xl mx-auto mb-6">{category.note}</p>
      )}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {(category.items ?? []).map((item, i) => (
          <ItemCard key={i} item={item} featured={featured} />
        ))}
      </div>
    </div>
  );
}

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────

export default function MenuSection({ language }: MenuSectionProps) {
  const t = ui[language];
  const [restaurantTab, setRestaurantTab] = useState<'zamashi' | 'kazamashi' | 'breakfast'>('zamashi');
  const [categoryId, setCategoryId] = useState('appetizers');

  const categories = zamashiCategories[language];
  const activeCategory = categories.find((c) => c.id === categoryId) ?? categories[0];

  return (
    <section className="py-16 bg-neutral-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-center text-neutral-900 mb-10">{t.title}</h2>

        {/* Restaurant Tabs */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex bg-white rounded-xl shadow-sm p-1 gap-1 flex-wrap justify-center">
            {(['zamashi', 'kazamashi', 'breakfast'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => { setRestaurantTab(tab); if (tab === 'zamashi') setCategoryId('appetizers'); }}
                className={`px-5 py-2.5 rounded-lg text-sm transition-colors ${restaurantTab === tab ? 'bg-neutral-900 text-white' : 'text-neutral-700 hover:bg-neutral-100'}`}
              >
                {t.restaurantTabs[tab]}
                {tab === 'breakfast' && (
                  <span className="ml-2 px-1.5 py-0.5 bg-amber-500 text-white text-xs rounded-full">{t.comingSoon}</span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Zamashi Menu */}
        {restaurantTab === 'zamashi' && (
          <>
            {/* Category Nav */}
            <div className="overflow-x-auto pb-2 mb-8">
              <div className="flex gap-2 min-w-max mx-auto justify-start md:justify-center">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setCategoryId(cat.id)}
                    className={`px-4 py-2 rounded-full text-sm whitespace-nowrap transition-colors border ${categoryId === cat.id ? 'bg-neutral-900 text-white border-neutral-900' : 'bg-white text-neutral-700 border-neutral-200 hover:border-neutral-400'}`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Category Items */}
            <CategorySection category={activeCategory} featured={t.featured} />

            {/* Footer Notes */}
            <div className="mt-12 max-w-3xl mx-auto space-y-3">
              <p className="text-xs text-neutral-500 text-center italic">{t.serranitaNote}</p>
              <p className="text-xs text-neutral-500 text-center italic">{t.pricesNote}</p>
            </div>
          </>
        )}

        {/* Kazamashi */}
        {restaurantTab === 'kazamashi' && (
          <div className="max-w-5xl mx-auto">
            <div className="mb-4 flex justify-end">
              <a
                href={kazamashiMenuPdf}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-lg bg-neutral-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-neutral-700"
              >
                <ExternalLink className="h-4 w-4" />
                {language === 'es' ? 'Abrir PDF' : 'Open PDF'}
              </a>
            </div>
            <div className="overflow-hidden rounded-lg">
              <iframe
                src={kazamashiMenuPdfEmbed}
                title={language === 'es' ? 'Menú Kazamashi' : 'Kazamashi Menu'}
                className="h-[78vh] min-h-[640px] w-full bg-white"
              />
            </div>
          </div>
        )}

        {/* Breakfast */}
        {restaurantTab === 'breakfast' && (
          <div className="max-w-2xl mx-auto bg-amber-50 border-2 border-amber-200 rounded-xl p-8 text-center">
            <p className="text-lg text-amber-900 font-medium">{t.breakfastNote}</p>
          </div>
        )}
      </div>
    </section>
  );
}
