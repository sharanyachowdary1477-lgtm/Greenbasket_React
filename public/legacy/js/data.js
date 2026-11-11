/* GreenBasket India catalogue */ const CATEGORIES=[ {
    id:"produce",name:"Fresh Produce",icon:"🥬",tint:"#E7F1DE"
}
, {
    id:"dairy",name:"Dairy & Eggs",icon:"🥛",tint:"#EAF2F8"
}
, {
    id:"staples",name:"Rice & Staples",icon:"🌾",tint:"#F7ECDD"
}
, {
    id:"bakery",name:"Bakery",icon:"🍞",tint:"#F2EEDD"
}
, {
    id:"meat",name:"Meat & Seafood",icon:"🍗",tint:"#F7E3DE"
}
, {
    id:"spices",name:"Spices & Masala",icon:"🌶️",tint:"#F7E3DE"
}
];
const BASE_PRODUCTS=[ {
    id:"tomato",name:"Fresh Tomatoes",cat:"produce",price:42,unit:"1 kg",qtyLabel:"1 kg",tag:"Fresh today",image:"https://images.unsplash.com/photo-1546094096-0df4bcaaa337?auto=format&fit=crop&w=900&q=85"
}
, {
    id:"onion",name:"Red Onions",cat:"produce",price:38,unit:"1 kg",qtyLabel:"1 kg",image:"https://images.unsplash.com/photo-1580201092675-a0a6a6cafbb1?auto=format&fit=crop&w=900&q=85"
}
, {
    id:"potato",name:"Fresh Potatoes",cat:"produce",price:36,unit:"1 kg",qtyLabel:"1 kg",image:"https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=900&q=85"
}
, {
    id:"brinjal",name:"Purple Brinjal",cat:"produce",price:55,unit:"500 g",qtyLabel:"500 g",image:"https://images.unsplash.com/photo-1526049332082-27f8e41d5e8a?auto=format&fit=crop&w=900&q=85"
}
, {
    id:"greenchilli",name:"Green Chillies",cat:"produce",price:30,unit:"250 g",qtyLabel:"250 g",image:"https://images.unsplash.com/photo-1591073113125-e46713c829ed?auto=format&fit=crop&w=900&q=85"
}
, {
    id:"ginger",name:"Fresh Ginger",cat:"produce",price:28,unit:"200 g",qtyLabel:"200 g",image:"https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=900&q=85"
}
, {
    id:"coriander",name:"Coriander Leaves",cat:"produce",price:15,unit:"1 bunch",qtyLabel:"1 bunch",tag:"Fresh today",image:"https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=900&q=85"
}
, {
    id:"lemon",name:"Fresh Lemons",cat:"produce",price:12,unit:"4 pcs",qtyLabel:"4 pcs",image:"https://images.unsplash.com/photo-1590502593747-42a996133562?auto=format&fit=crop&w=900&q=85"
}
, {
    id:"rice",name:"Sona Masoori Rice",cat:"staples",price:72,unit:"1 kg",qtyLabel:"1 kg",tag:"Popular in AP & Telangana",image:"https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=900&q=85"
}
, {
    id:"toor-dal",name:"Toor Dal / Kandipappu",cat:"staples",price:145,unit:"1 kg",qtyLabel:"1 kg",image:"https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=900&q=85"
}
, {
    id:"poha",name:"Poha / Atukulu",cat:"staples",price:58,unit:"500 g",qtyLabel:"500 g",image:"https://images.unsplash.com/photo-1601050690117-94f5f6fa8bd7?auto=format&fit=crop&w=900&q=85"
}
, {
    id:"rava",name:"Bombay Rava / Sooji",cat:"staples",price:55,unit:"500 g",qtyLabel:"500 g",image:"https://images.unsplash.com/photo-1596797038530-2c107229654b?auto=format&fit=crop&w=900&q=85"
}
, {
    id:"urad",name:"Urad Dal / Minapappu",cat:"staples",price:155,unit:"1 kg",qtyLabel:"1 kg",image:"https://images.unsplash.com/photo-1515543904379-3d757afe72e4?auto=format&fit=crop&w=900&q=85"
}
, {
    id:"idli-batter",name:"Fresh Idli-Dosa Batter",cat:"staples",price:65,unit:"1 kg",qtyLabel:"1 kg",tag:"Fresh today",image:"https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=900&q=85"
}
, {
    id:"milk",name:"Toned Milk",cat:"dairy",price:34,unit:"500 ml",qtyLabel:"500 ml",image:"https://images.unsplash.com/photo-1563636619-e9143da7973b?auto=format&fit=crop&w=900&q=85"
}
, {
    id:"curd",name:"Fresh Curd",cat:"dairy",price:45,unit:"500 g",qtyLabel:"500 g",tag:"Fresh today",image:"https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=900&q=85"
}
, {
    id:"paneer",name:"Fresh Paneer",cat:"dairy",price:110,unit:"200 g",qtyLabel:"200 g",image:"https://images.unsplash.com/photo-1628088062854-d1870b4553da?auto=format&fit=crop&w=900&q=85"
}
, {
    id:"egg",name:"Farm Eggs",cat:"dairy",price:78,unit:"12 pcs",qtyLabel:"12 pcs",image:"https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?auto=format&fit=crop&w=900&q=85"
}
, {
    id:"chicken",name:"Fresh Chicken Curry Cut",cat:"meat",price:240,unit:"1 kg",qtyLabel:"1 kg",tag:"Fresh today",image:"https://images.unsplash.com/photo-1604503468506-a8da13d82791?auto=format&fit=crop&w=900&q=85"
}
, {
    id:"mutton",name:"Tender Mutton Curry Cut",cat:"meat",price:720,unit:"1 kg",qtyLabel:"1 kg",image:"https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=900&q=85"
}
, {
    id:"fish",name:"Fresh Rohu Fish",cat:"meat",price:260,unit:"1 kg",qtyLabel:"1 kg",tag:"Fresh today",image:"https://images.unsplash.com/photo-1544943910-4c1dc44aab44?auto=format&fit=crop&w=900&q=85"
}
, {
    id:"oil",name:"Sunflower Cooking Oil",cat:"staples",price:145,unit:"1 L",qtyLabel:"1 L",image:"https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=900&q=85"
}
, {
    id:"turmeric",name:"Turmeric Powder",cat:"spices",price:48,unit:"200 g",qtyLabel:"200 g",image:"https://images.unsplash.com/photo-1615485500704-8e990f9900f7?auto=format&fit=crop&w=900&q=85"
}
, {
    id:"chilli",name:"Red Chilli Powder",cat:"spices",price:65,unit:"200 g",qtyLabel:"200 g",image:"https://images.unsplash.com/photo-1768729340132-a8c72080bb23?auto=format&fit=crop&w=900&q=85"
}
, {
    id:"garam",name:"Garam Masala",cat:"spices",price:72,unit:"100 g",qtyLabel:"100 g",image:"https://images.unsplash.com/photo-1591465001581-2c57a07a7a30?auto=format&fit=crop&w=900&q=85"
}
, {
    id:"atta",name:"Whole Wheat Atta",cat:"staples",price:62,unit:"1 kg",qtyLabel:"1 kg",image:"https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=900&q=85"
}
, {
    id:"bread",name:"Milk Bread",cat:"bakery",price:45,unit:"400 g",qtyLabel:"400 g",tag:"Baked today",image:"https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=900&q=85"
}
, {
    id:"biscuits",name:"South Indian Butter Biscuits",cat:"bakery",price:55,unit:"200 g",qtyLabel:"200 g",image:"https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&w=900&q=85"
}
];

const ADMIN_PRODUCTS_KEY = "gb_products";
const ADMIN_RECIPES_KEY = "gb_recipes";
function readJSON(key, fallback) { try { return JSON.parse(localStorage.getItem(key) || "null") ?? fallback; } catch { return fallback; } }
const ADMIN_PRODUCTS = readJSON(ADMIN_PRODUCTS_KEY, []);
const PRODUCTS = [...BASE_PRODUCTS];
ADMIN_PRODUCTS.forEach(item => { const i = PRODUCTS.findIndex(p => p.id === item.id); if (i >= 0) PRODUCTS[i] = { ...PRODUCTS[i], ...item }; else PRODUCTS.push(item); });
const PRODUCT_MAP = Object.fromEntries(PRODUCTS.map(p => [p.id, p]));
const BASE_RECIPES=[ {
    id:"pulihora",name:"Andhra Pulihora",image:"https://thumbs.dreamstime.com/b/step-step-recipe-guide-making-pulihora-popular-rice-dish-andhra-cuisine-featuring-tamarind-rice-spices-curry-362241055.jpg",region:"Andhra Pradesh",icon:"🍋",time:"30 min",serves:4,keywords:["pulihora","andhra","telugu","rice","lemon","south indian"],steps:["Cook rice and cool it completely.","Temper mustard, dal, chillies and curry leaves in oil.","Add turmeric and lemon juice, then mix gently with rice.","Rest for 15 minutes before serving."],items:[ {
        id:"rice",qty:1
    }
, {
    id:"lemon",qty:1
}
, {
    id:"turmeric",qty:1
}
, {
    id:"oil",qty:1
}
]
}
, {
    id:"gutti-vankaya",name:"Gutti Vankaya Curry",image:"https://tse4.mm.bing.net/th/id/OIP.JjDFkKrSUG6pO2_EDEfK4AHaFo?r=0&rs=1&pid=ImgDetMain&o=7&rm=3",region:"Andhra Pradesh / Telangana",icon:"🍆",time:"45 min",serves:4,keywords:["gutti vankaya","brinjal","andhra","telangana","telugu","curry"],steps:["Slit the brinjals without separating them.","Prepare a spicy masala with chilli, turmeric and oil.","Stuff the brinjals and cook covered until tender.","Finish with coriander and serve with rice."],items:[ {
        id:"brinjal",qty:2
    }
, {
    id:"onion",qty:1
}
, {
    id:"chilli",qty:1
}
, {
    id:"turmeric",qty:1
}
, {
    id:"oil",qty:1
}
, {
    id:"coriander",qty:1
}
]
}
, {
    id:"chicken-curry",name:"Andhra Chicken Curry",image:"https://images.unsplash.com/photo-1768179669433-bd9d52949c20?auto=format&fit=crop&w=1000&q=85",region:"Andhra Pradesh",icon:"🍗",time:"50 min",serves:4,keywords:["chicken","andhra","telugu","curry","spicy","dinner"],steps:["Marinate chicken with turmeric and chilli powder.","Brown onions, ginger and spices in oil.","Add chicken and cook until the masala coats each piece.","Cover and simmer until tender; finish with coriander."],items:[ {
        id:"chicken",qty:1
    }
, {
    id:"onion",qty:1
}
, {
    id:"ginger",qty:1
}
, {
    id:"chilli",qty:1
}
, {
    id:"turmeric",qty:1
}
, {
    id:"oil",qty:1
}
, {
    id:"coriander",qty:1
}
]
}
, {
    id:"idli-sambar",name:"Idli with Sambar",image:"https://images.unsplash.com/photo-1741376509253-221ac18fac0f?auto=format&fit=crop&w=1000&q=85",region:"South India",icon:"🥣",time:"25 min",serves:4,keywords:["idli","sambar","south indian","breakfast","telugu","tiffin"],steps:["Steam idlis until soft and fluffy.","Cook dal with turmeric and vegetables.","Temper spices in oil and add to the sambar.","Serve hot idlis with sambar and chutney."],items:[ {
        id:"idli-batter",qty:1
    }
, {
    id:"toor-dal",qty:1
}
, {
    id:"tomato",qty:1
}
, {
    id:"onion",qty:1
}
, {
    id:"turmeric",qty:1
}
, {
    id:"oil",qty:1
}
]
}
, {
    id:"pesarattu",name:"Andhra Pesarattu",image:"https://images.unsplash.com/photo-1665660710687-b44c50751054?auto=format&fit=crop&w=1000&q=85",region:"Andhra Pradesh",icon:"🥞",time:"25 min",serves:3,keywords:["pesarattu","moong","andhra","telugu","breakfast","tiffin"],steps:["Soak green gram and blend into a smooth batter.","Season with ginger, chilli and salt.","Spread thinly on a hot tawa and cook both sides.","Serve with chutney or upma."],items:[ {
        id:"urad",qty:1
    }
, {
    id:"ginger",qty:1
}
, {
    id:"greenchilli",qty:1
}
, {
    id:"oil",qty:1
}
]
}
, {
    id:"paneer-butter",name:"Paneer Butter Masala",image:"https://images.unsplash.com/photo-1628088062854-d1870b4553da?auto=format&fit=crop&w=1000&q=85",region:"North Indian",icon:"🧀",time:"35 min",serves:4,keywords:["paneer","north indian","punjabi","butter","dinner"],steps:["Sauté onion and tomato until soft.","Blend into a smooth gravy with spices.","Add paneer and simmer gently.","Finish with a little milk and serve with roti."],items:[ {
        id:"paneer",qty:1
    }
, {
    id:"tomato",qty:1
}
, {
    id:"onion",qty:1
}
, {
    id:"turmeric",qty:1
}
, {
    id:"garam",qty:1
}
, {
    id:"milk",qty:1
}
]
}
, {
    id:"biryani",name:"South Indian Chicken Biryani",image:"https://images.unsplash.com/photo-1631515242808-497c3fbd3972?auto=format&fit=crop&w=1000&q=85",region:"South India",icon:"🍚",time:"60 min",serves:5,keywords:["biryani","chicken","south indian","hyderabadi","telugu","rice"],steps:["Marinate chicken with yoghurt and spices.","Cook onions until golden and add chicken.","Layer partially cooked rice over the chicken.","Cover tightly and cook on low heat until aromatic."],items:[ {
        id:"chicken",qty:1
    }
, {
    id:"rice",qty:1
}
, {
    id:"curd",qty:1
}
, {
    id:"onion",qty:1
}
, {
    id:"garam",qty:1
}
, {
    id:"chilli",qty:1
}
, {
    id:"oil",qty:1
}
]
}
, {
    id:"upma",name:"Vegetable Upma",image:"https://images.unsplash.com/photo-1665660710687-b44c50751054?auto=format&fit=crop&w=1000&q=85",region:"South India",icon:"🍲",time:"20 min",serves:3,keywords:["upma","rava","south indian","breakfast","telugu","tiffin","budget"],steps:["Dry roast rava until aromatic.","Sauté onion and green chilli in oil.","Add water and seasoning, then slowly stir in rava.","Cook until fluffy and finish with coriander."],items:[ {
        id:"rava",qty:1
    }
, {
    id:"onion",qty:1
}
, {
    id:"greenchilli",qty:1
}
, {
    id:"oil",qty:1
}
, {
    id:"coriander",qty:1
}
]
}
, {
    id:"curd-rice",name:"South Indian Curd Rice",image:"https://th.bing.com/th/id/OIP.iySbpqIRPyaNmI9cMC-88AHaHa?w=183&h=184&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3",region:"South India",icon:"🥛",time:"15 min",serves:3,keywords:["curd rice","daddojanam","perugu annam","telugu","south indian","budget"],steps:["Mix cooked rice with fresh curd.","Temper spices in oil and pour over the rice.","Add coriander and a little salt.","Chill briefly or serve at room temperature."],items:[ {
        id:"rice",qty:1
    }
, {
    id:"curd",qty:1
}
, {
    id:"oil",qty:1
}
, {
    id:"coriander",qty:1
}
]
}
];

const ADMIN_RECIPES = readJSON(ADMIN_RECIPES_KEY, []);
const RECIPES = [...BASE_RECIPES];
ADMIN_RECIPES.forEach(recipe => { const i = RECIPES.findIndex(r => r.id === recipe.id); if (i >= 0) RECIPES[i] = { ...RECIPES[i], ...recipe }; else RECIPES.push(recipe); });
