import Country from '../models/Country';
import Destination from '../models/Destination';

export const COUNTRIES = [
  new Country('c1', 'Italy', '#f28482', 'https://images.unsplash.com/photo-1525874684015-58379d421a52?auto=format&fit=crop&w=800&q=80'),
  new Country('c2', 'Japan', '#84a59d', 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=800&q=80'),
  new Country('c3', 'France', '#f6bd60', 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=800&q=80'),
  new Country('c4', 'Brazil', '#90be6d', 'https://images.unsplash.com/photo-1483729558449-99ef09a8c325?auto=format&fit=crop&w=800&q=80'),
  new Country('c5', 'Australia', '#577590', 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&w=800&q=80'),
  new Country('c6', 'Greece', '#4d96ff', 'https://images.unsplash.com/photo-1469796466635-455ede028aca?auto=format&fit=crop&w=800&q=80'),
  new Country('c7', 'Egypt', '#e5989b', 'https://images.unsplash.com/photo-1539768942893-daf53e448371?auto=format&fit=crop&w=800&q=80'),
  new Country('c8', 'Canada', '#8ecae6', 'https://images.unsplash.com/photo-1503614472-8c93d56e92ce?auto=format&fit=crop&w=800&q=80'),
  new Country('c9', 'Spain', '#ffafcc', 'https://images.unsplash.com/photo-1543783207-ec64e4d95325?auto=format&fit=crop&w=800&q=80'),
  new Country('c10', 'Thailand', '#cdb4db', 'https://images.unsplash.com/photo-1508009603885-50cf7c579365?auto=format&fit=crop&w=800&q=80')
];

export const DESTINATIONS = [
  new Destination('d1', ['c1'], 'Rome', '$2,200', 753, 4.8, 'Rome is known for ancient ruins, art, and unforgettable food experiences.', 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=800&q=80'),
  new Destination('d2', ['c1'], 'Venice', '$2,500', 421, 4.7, 'Venice offers canals, historic buildings, and romantic gondola rides.', 'https://images.unsplash.com/photo-1514890547357-a9ee288728e0?auto=format&fit=crop&w=800&q=80'),

  new Destination('d3', ['c2'], 'Tokyo', '$2,700', 1603, 4.9, 'Tokyo blends futuristic city life with traditional temples and culture.', 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=800&q=80'),
  new Destination('d4', ['c2'], 'Kyoto', '$2,300', 794, 4.8, 'Kyoto is famous for shrines, gardens, and beautiful seasonal scenery.', 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=800&q=80'),

  new Destination('d5', ['c3'], 'Paris', '$2,600', 300, 4.9, 'Paris is loved for iconic landmarks, fashion, art museums, and cafes.', 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=800&q=80'),
  new Destination('d6', ['c3'], 'Nice', '$2,100', 350, 4.6, 'Nice offers Mediterranean beaches, colorful streets, and coastal charm.', 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&w=800&q=80'),

  new Destination('d7', ['c4'], 'Rio de Janeiro', '$2,400', 1565, 4.8, 'Rio is known for beaches, mountains, nightlife, and Carnival celebrations.', 'https://images.unsplash.com/photo-1483729558449-99ef09a8c325?auto=format&fit=crop&w=800&q=80'),
  new Destination('d8', ['c4'], 'Salvador', '$2,000', 1549, 4.5, 'Salvador features rich Afro-Brazilian culture, music, and colonial history.', 'https://images.unsplash.com/photo-1516306580123-e6e52b1b7b5f?auto=format&fit=crop&w=800&q=80'),

  new Destination('d9', ['c5'], 'Sydney', '$3,000', 1788, 4.8, 'Sydney offers beaches, the Opera House, and a vibrant harbor atmosphere.', 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&w=800&q=80'),
  new Destination('d10', ['c5'], 'Melbourne', '$2,700', 1835, 4.7, 'Melbourne is famous for street art, cafes, sports, and culture.', 'https://images.unsplash.com/photo-1514395462725-fb4566210144?auto=format&fit=crop&w=800&q=80'),

  new Destination('d11', ['c6'], 'Athens', '$2,100', 3000, 4.7, 'Athens is a historic city with ancient landmarks and lively neighborhoods.', 'https://images.unsplash.com/photo-1555993539-1732b0258235?auto=format&fit=crop&w=800&q=80'),
  new Destination('d12', ['c6'], 'Santorini', '$2,800', 1200, 4.9, 'Santorini is known for blue-domed churches, sunsets, and island views.', 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=800&q=80'),

  new Destination('d13', ['c7'], 'Cairo', '$1,900', 969, 4.6, 'Cairo offers access to the pyramids, Egyptian museums, and rich history.', 'https://images.unsplash.com/photo-1539768942893-daf53e448371?auto=format&fit=crop&w=800&q=80'),
  new Destination('d14', ['c7'], 'Luxor', '$1,800', 3200, 4.7, 'Luxor is filled with temples, tombs, and ancient Egyptian wonders.', 'https://images.unsplash.com/photo-1568322445389-f64ac2515020?auto=format&fit=crop&w=800&q=80'),

  new Destination('d15', ['c8'], 'Banff', '$2,400', 1885, 4.9, 'Banff is a mountain paradise known for lakes, hiking, and scenic beauty.', 'https://images.unsplash.com/photo-1503614472-8c93d56e92ce?auto=format&fit=crop&w=800&q=80'),
  new Destination('d16', ['c8'], 'Vancouver', '$2,500', 1886, 4.7, 'Vancouver combines city life with oceans, forests, and mountains.', 'https://images.unsplash.com/photo-1517935706615-2717063c2225?auto=format&fit=crop&w=800&q=80'),

  new Destination('d17', ['c9'], 'Barcelona', '$2,300', 15, 4.8, 'Barcelona offers beaches, architecture, food, and lively city energy.', 'https://images.unsplash.com/photo-1543783207-ec64e4d95325?auto=format&fit=crop&w=800&q=80'),
  new Destination('d18', ['c9'], 'Seville', '$2,000', 206, 4.6, 'Seville is known for flamenco, Moorish architecture, and warm weather.', 'https://images.unsplash.com/photo-1562887284-8ba6ebdc15f6?auto=format&fit=crop&w=800&q=80'),

  new Destination('d19', ['c10'], 'Bangkok', '$1,700', 1782, 4.7, 'Bangkok is popular for street food, temples, markets, and nightlife.', 'https://images.unsplash.com/photo-1508009603885-50cf7c579365?auto=format&fit=crop&w=800&q=80'),
  new Destination('d20', ['c10'], 'Phuket', '$1,900', 1785, 4.6, 'Phuket is a beach destination with resorts, islands, and beautiful water.', 'https://images.unsplash.com/photo-1589394815804-964ed0be2eb5?auto=format&fit=crop&w=800&q=80')
];