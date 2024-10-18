import StarIcon from '@mui/icons-material/Star';

const CategoryListData = [
  {
    id: 1,
    name: 'Indian',
    value: 'Indian restaurant',
    icon: '/masala-dosa.png',
  },
  {
    id: 2,
    name: 'Mexican',
    value: 'Mexican restaurant',
    icon: '/taco.png',
  },
  {
    id: 3,
    name: 'Italian',
    value: 'Italian restaurant',
    icon: '/pizza.png',
  },
  {
    id: 4,
    name: 'Chinese',
    value: 'Chinese restaurant',
    icon: '/ramen.png',
  },
  {
    id: 5,
    name: 'Japanese',
    value: 'Japanese restaurant',
    icon: '/bento.png',
  },
];

const ratingList = [
  {
    id: 1,
    name: 1,
    icon: Array(1)
      .fill()
      .map((_, i) => <StarIcon key={i} sx={{ color: 'gold' }} />), // Setting star color to gold
  },
  {
    id: 2,
    name: 2,
    icon: Array(2)
      .fill()
      .map((_, i) => <StarIcon key={i} sx={{ color: 'gold' }} />), // Setting star color to gold
  },
  {
    id: 3,
    name: 3,
    icon: Array(3)
      .fill()
      .map((_, i) => <StarIcon key={i} sx={{ color: 'gold' }} />), // Setting star color to gold
  },
  {
    id: 4,
    name: 4,
    icon: Array(4)
      .fill()
      .map((_, i) => <StarIcon key={i} sx={{ color: 'gold' }} />), // Setting star color to gold
  },
  {
    id: 5,
    name: 5,
    icon: Array(5)
      .fill()
      .map((_, i) => <StarIcon key={i} sx={{ color: 'gold' }} />), // Setting star color to gold
  },
];

export default {
  CategoryListData,
  ratingList,
};
