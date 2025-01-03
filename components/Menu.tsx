"use client";

import React, { useState } from 'react';
import { poiret, tangerine, mrsSaintDelafield, quicksand } from '@/app/fonts';

interface MenuItem {
    name: string;
    price: string;
    imageUrl: string;
}

const menuData = {
    Main: [
        {
            name: "Pasta Bolognese",
            price: "$12",
            imageUrl: "https://www.productcrafter.com/images/blog/carbonara.webp",
        },
        {
            name: "Lasagna With Veal and Mushrooms",
            price: "$15",
            imageUrl: "https://food.fnr.sndimg.com/content/dam/images/food/fullset/2013/11/25/1/RX-KOHLS_MRB-Beef-Mushroom-Lasagna-H_s4x3.jpg.rend.hgtvcom.1280.960.suffix/1387411236364.webp",
        },
        {
            name: "Bacon Carbonara",
            price: "$14",
            imageUrl: "https://www.allrecipes.com/thmb/Vg2cRidr2zcYhWGvPD8M18xM_WY=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/11973-spaghetti-carbonara-ii-DDMFS-4x3-6edea51e421e4457ac0c3269f3be5157.jpg",
        },
        {
            name: "Frittata With Beans and Tomatoes",
            price: "$10",
            imageUrl: "https://realfood.tesco.com/media/images/1400x919-FullEnglishFrittata-6faf81c9-6b7c-4472-b1f6-6f74e8142fbd-0-1400x919.jpg",
        },
        {
            name: "Chicken and Mushroom Fettuccini Pasta",
            price: "$16",
            imageUrl: "https://www.foodandwine.com/thmb/fLiz2qPNFbJrE0cS7tIYvOVmjKg=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/2014-r-xl-creamy-chicken-fettuccini-with-mushrooms-and-kale-2000-d5389e6b954b468d9dae4b5b5e61c8fa.jpg",
        },
        {
            name: "Vitello Tonato",
            price: "$18",
            imageUrl: "https://www.lacucinaimperfetta.com/wp-content/uploads/2013/05/Vitello-tonnato-730x484.jpg",
        },
        {
            name: "Tortellini With Spinach and Cheese",
            price: "$13",
            imageUrl: "https://www.saltandlavender.com/wp-content/uploads/2020/03/creamy-tortellini-spinach-mushrooms-2.jpg",
        },
        {
            name: "Spicy Penne Pasta Arrabbiata",
            price: "$11",
            imageUrl: "https://ik.imagekit.io/munchery/blog/tr:w-768/simple-big-flavors-iconic-make-penne-arrabiata-at-home.jpeg",
        }
    ],
    Pizza: [
        { name: "Margherita Pizza", price: "$10", imageUrl: "https://images.unsplash.com/photo-1671106681075-5a7233268cbd?q=80&w=1934&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
        { name: "Pepperoni Pizza", price: "$12", imageUrl: "https://images.unsplash.com/photo-1506354666786-959d6d497f1a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
        { name: "Quattro Stagioni", price: "$14", imageUrl: "https://i.pinimg.com/originals/c0/08/db/c008dbe5cdbe24e5fb75054d38aa7a17.jpg" },
        { name: "Capricciosa", price: "$13", imageUrl: "https://www.recipetineats.com/tachyon/2024/05/Pizza-Capricciosa_8.jpg?resize=500%2C500" },
        { name: "Funghi Pizza", price: "$11", imageUrl: "https://www.lacasa.com.au/content/uploads/LCDF_Mozzarella-Slices9669_Funghi.jpg" },
        { name: "Diavola", price: "$15", imageUrl: "https://bellaciaoamsterdam.com/wp-content/uploads/2024/03/Untitled-1-16.jpg" },
        { name: "Prosciutto e Rucola", price: "$16", imageUrl: "https://www.unileverfoodsolutions.ch/dam/global-ufs/mcos/dach/calcmenu-recipes/ch-recipes/2019/italien-promo/pizza-con-rucola-e-prosciutto-di-parma/main-header.jpg" },
        { name: "Seafood Pizza", price: "$18", imageUrl: "https://foodess.com/wp-content/uploads/2023/02/seafood-pizza.jpg" }
    ],
    Lunch: [
        { name: "Panini with Prosciutto and Mozzarella", price: "$9", imageUrl: "https://images.immediate.co.uk/production/volatile/sites/30/2020/08/recipe-image-legacy-id-1627_12-ab29047.jpg?quality=90&resize=440,400" },
        { name: "Caprese Salad Sandwich", price: "$8", imageUrl: "https://cdn.loveandlemons.com/wp-content/uploads/2020/06/caprese-sandwich.jpg" },
        { name: "Risotto alla Milanese", price: "$14", imageUrl: "https://www.kettycucinooggi.com/wp-content/uploads/2024/01/RISOTTO-ALLA-MILANESE-CON-OSSOBUCO-5-scaled.jpeg" },
        { name: "Gnocchi al Pesto", price: "$12", imageUrl: "https://www.deliciousmagazine.co.uk/wp-content/uploads/2018/07/861060-1-eng-GB_gnocchi-al-pesto.jpg" },
        { name: "Frittata with Spinach and Cheese", price: "$10", imageUrl: "https://cdn.apartmenttherapy.info/image/upload/f_jpg,q_auto:eco,c_fill,g_auto,w_1500,ar_1:1/k%2Farchive%2Fdb86e38bdf8cfdd3cddcfa2d4884282e079d7fd6" },
        { name: "Chicken Piccata", price: "$15", imageUrl: "https://images.themodernproper.com/billowy-turkey/production/posts/2019/Chicken-Picatta-8.jpg?w=1200&q=82&auto=format&fit=crop&dm=1689343305&s=01c0bc149ba533330dc9c5d73b597698" },
        { name: "Eggplant Parmesan", price: "$13", imageUrl: "https://www.tablefortwoblog.com/wp-content/uploads/2022/06/eggplant-parmesan-recipe-photo-tablefortwoblog-2-scaled.jpg" },
        { name: "Italian Meatballs with Marinara", price: "$11", imageUrl: "https://static01.nyt.com/images/2015/12/10/dining/10COOKING-MEATBALLS2/10COOKING-MEATBALLS2-superJumbo.jpg" }
    ],
    Salads: [
        { name: "Insalata Caprese", price: "$9", imageUrl: "https://assets.epicurious.com/photos/628ba560cf19fbfe9137ffa4/1:1/w_2560%2Cc_limit/Caprese_RECIPE_051922_34205.jpg" },
        { name: "Panzanella Salad", price: "$8", imageUrl: "https://joyfoodsunshine.com/wp-content/uploads/2022/06/panzanella-salad-recipe-4.jpg" },
        { name: "Caesar Salad with Grilled Chicken", price: "$12", imageUrl: "https://reciperunner.com/wp-content/uploads/2017/07/Grilled-Chicken-Caesar-Salad-Photograph.jpg" },
        { name: "Arugula Salad with Parmesan and Lemon", price: "$10", imageUrl: "https://rebeccataig.com/wp-content/uploads/2023/06/Rocket-Salad-Final-Picture-7.jpg" },
        { name: "Spinach Salad with Balsamic Dressing", price: "$9", imageUrl: "https://realhousemoms.com/wp-content/uploads/Spinach-Salad-with-Balsamic-Vinaigrette-RECIPE-CARD.jpg" },
        { name: "Italian Pasta Salad", price: "$11", imageUrl: "https://www.wellplated.com/wp-content/uploads/2016/05/Healthy-Italian-Pasta-Salad-with-Pepperoni.jpg" },
        { name: "Beetroot Salad with Goat Cheese", price: "$12", imageUrl: "https://cdn.loveandlemons.com/wp-content/uploads/opengraph/2021/11/beet-salad-1.jpg" },
        { name: "Antipasto Salad", price: "$13", imageUrl: "https://www.wholesomeyum.com/wp-content/uploads/2023/05/wholesomeyum-Antipasto-Salad-7.jpg" }
    ],
    Coffee: [
        { name: "Macchiato", price: "$3.50", imageUrl: "https://i.pinimg.com/736x/d2/95/08/d29508ceb1590e202486bef4f245d90f.jpg" },
        { name: "Affogato", price: "$5", imageUrl: "https://i.pinimg.com/736x/bd/c0/67/bdc06723b7920dcbb14810e3d2b07523.jpg" },
        { name: "Mocha", price: "$4.50", imageUrl: "https://i.pinimg.com/736x/22/8b/72/228b72a03cb98c19063193cf0188a6a3.jpg" },
        { name: "Flat White", price: "$4.50", imageUrl: "https://i.pinimg.com/736x/46/33/c0/4633c0742fefe5f4ae17428770053158.jpg" },
        { name: "Ristretto", price: "$3.50", imageUrl: "https://i.pinimg.com/736x/4d/04/60/4d0460cfee74fc96d85488e7e3513103.jpg" },
        { name: "Latte", price: "$5", "imageUrl": "https://i.pinimg.com/736x/35/9f/c1/359fc15a59e47967f1e95305c7ae194e.jpg" },
        { name: "Espresso ", price: "$3", "imageUrl": "https://www.thespruceeats.com/thmb/HJrjMfXdLGHbgMhnM0fMkDx9XPQ=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/what-is-espresso-765702-hero-03_cropped-ffbc0c7cf45a46ff846843040c8f370c.jpg" },
        { name: "Cappuccino ", price: "$4", "imageUrl": "https://angelinos.com/cdn/shop/articles/How_Much_Milk_Coffee_in_a_Cappuccino.jpg?v=1701189122&width=320" }
    ],
    Desserts: [
        { name: "Tiramisu", price: "$6", imageUrl: "https://insanelygoodrecipes.com/wp-content/uploads/2021/04/Tiramisu-with-Chocolate-and-Mint.png" },
        { name: "Cannoli", price: "$5", imageUrl: "https://www.cookingclassy.com/wp-content/uploads/2020/02/cannoli-20.jpg" },
        { name: "Panna Cotta", price: "$7", imageUrl: "https://assets.epicurious.com/photos/62d6c513077a952f4a8c338c/1:1/w_2848,h_2848,c_limit/PannaCotta_RECIPE_04142022_9822_final.jpg" },
        { name: "Gelato (Various Flavors)", price: "$4", imageUrl: "https://i.pinimg.com/736x/0d/2f/dd/0d2fdd398d471f947782c8123bf08562.jpg" },
        { name: "Zabaione", price: "$6", imageUrl: "https://i.pinimg.com/736x/fb/ea/d6/fbead69cd260ae80d9e8980c9794e1de.jpg" },
        { name: "Sfogliatella", price: "$5", imageUrl: "https://www.nonnabox.com/wp-content/uploads/sfogliatelle-01.jpg" },
        { name: "Ricotta Cheesecake", price: "$8", imageUrl: "https://www.mybakingaddiction.com/wp-content/uploads/2011/07/plated-ricotta-cheesecake-hero.jpg" },
        { name: "Italian Biscotti", price: "$3", imageUrl: "https://i.pinimg.com/736x/43/ca/75/43ca75155dc7d52fd6a9403e58cd1d5f.jpg" }
    ],
    Appetizers: [
        { name: "Bruschetta al Pomodoro", price: "$7", "imageUrl": "https://i.pinimg.com/736x/4a/64/33/4a64332731b333edd7284e5184ffd9be.jpg" },
        { name: "Arancini (Rice Balls)", price: "$8", "imageUrl": "https://www.marcellinaincucina.com/wp-content/uploads/2024/04/italian-rice-balls-featured.jpg" },
        { name: "Carpaccio di Manzo (Beef Carpaccio)", price: "$10", "imageUrl": "https://coleycooks.com/wp-content/uploads/2024/11/beef-carpaccio-11.jpg" },
        { name: "Frittura di Pesce (Fried Seafood)", price: "$12", "imageUrl": "https://www.seriouseats.com/thmb/kH6Xqnlr1gOF2gQLuoHSHsL4Xu0=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/20211201-fritto-misto-vicky-wasik-22-19140dca6eff4de7ad0637641a013627.jpg" },
        { name: "Stuffed Mushrooms with Ricotta", price: "$9", "imageUrl": "https://italianfoodforever.com/wp-content/uploads/2009/09/stuffedmush1.jpg" },
        { name: "Prosciutto e Melone (Ham and Melon)", price: "$11", "imageUrl": "https://www.themediterraneandish.com/wp-content/uploads/2021/06/Prosciutto-and-melon-recipe-4.jpg" },
        { name: "Fried Calamari with Marinara Sauce", price: "$10", "imageUrl": "https://thecozyapron.com/wp-content/uploads/2019/12/fried-calamari_thecozyapron_1.jpg" },
        { name: "Caprese Skewers (Tomato, Mozzarella, Basil)", price: "$8", "imageUrl": "https://cdn.loveandlemons.com/wp-content/uploads/2021/08/caprese-skewers.jpg" }
    ],
    Bar: [
        { name: "Bellini Cocktail", price: "$10", "imageUrl": "https://i.pinimg.com/736x/78/24/5a/78245a17306f29553624ac9d3734ee61.jpg" },
        { name: "Campari Soda", price: "$7", "imageUrl": "https://tendercrate.com/wp-content/uploads/2019/09/camparisoda.jpg" },
        { name: "Negroni Sbagliato", price: "$11", "imageUrl": "https://i.ytimg.com/vi/6NjWvnBMQAI/maxresdefault.jpg" },
        { name: "Americano Cocktail (Campari and Vermouth)", price: "$9", "imageUrl": "https://assets.epicurious.com/photos/622e9e12da41c8e5b2c92d8f/master/pass/Americano%20%E2%80%94%20RECIPE.jpg" },
        { name: "Limoncello Spritz ", price: "$8", "imageUrl": "https://chilledmagazine.com/wp-content/uploads/2023/12/limoncell-spritz.png" },
        { name: "Grappa (Italian Grape Spirit)", price: "$6", "imageUrl": "https://i.pinimg.com/736x/73/2f/fe/732ffef1c34d61e4106234ef3febf645.jpg" },
        { name: "Vin Santo (Dessert Wine)", price: "$12", "imageUrl": "https://i.pinimg.com/736x/d5/e7/73/d5e773ec06a1bc7cae451b0232b802dc.jpg" },
        { name: "Italian Craft Beer", price: "$5", "imageUrl": "https://i.pinimg.com/736x/cd/38/e7/cd38e7a9c9d338f53a4885a6024b7407.jpg" }
    ]
};

export default function Menu() {
    const [selectedCategory, setSelectedCategory] = useState<keyof typeof menuData>('Main');
    const [hoveredItem, setHoveredItem] = useState<MenuItem | null>(menuData[selectedCategory][0]);

    const handleCategoryChange = (category: keyof typeof menuData) => {
        setSelectedCategory(category);
    };

    return (
        <div className='h-screen text-white py-5'
            style={{ backgroundImage: "url('https://www.vistagroup.ch/fileadmin/_processed_/7/5/csm_Vista_Group_13_f9007dc8d6.jpg')" }}
        >
            <h1 className='text-6xl md:text-9xl'>Menu</h1>
            <div className='md:ml-80 p-5 bg-clip-padding backdrop-filter backdrop-blur-xl bg-opacity-10 border-gray-100'>
                <div className={`${quicksand.className} text-lg md:text-4xl w-full md:w-2/3`}>
                    <button
                        onClick={() => handleCategoryChange('Main')}
                        className={selectedCategory === 'Main' ? 'underline' : ''}
                    >
                        Main
                    </button> /
                    <button
                        onClick={() => handleCategoryChange('Pizza')}
                        className={selectedCategory === 'Pizza' ? 'underline' : ''}
                    >
                        Pizza
                    </button> /
                    <button
                        onClick={() => handleCategoryChange('Lunch')}
                        className={selectedCategory === 'Lunch' ? 'underline' : ''}
                    >
                        Lunch
                    </button> /
                    <button
                        onClick={() => handleCategoryChange('Salads')}
                        className={selectedCategory === 'Salads' ? 'underline' : ''}
                    >
                        Salads
                    </button> /
                    <button
                        onClick={() => handleCategoryChange('Appetizers')}
                        className={selectedCategory === 'Appetizers' ? 'underline' : ''}
                    >
                        Appetizers
                    </button> /
                    <button
                        onClick={() => handleCategoryChange('Coffee')}
                        className={selectedCategory === 'Coffee' ? 'underline' : ''}
                    >
                        Coffee
                    </button> /
                    <button
                        onClick={() => handleCategoryChange('Desserts')}
                        className={selectedCategory === 'Desserts' ? 'underline' : ''}
                    >
                        Desserts
                    </button> /
                    <button
                        onClick={() => handleCategoryChange('Bar')}
                        className={selectedCategory === 'Bar' ? 'underline' : ''}
                    >
                        Bar
                    </button>
                </div>
                <div className='h-[400px] flex mt-5'>
                    <div className='w-5/12 overflow-hidden'>
                        <img
                            src={hoveredItem?.imageUrl}
                            alt={hoveredItem?.name}
                            className="h-full w-full object-cover transition duration-300 ease-in-out transform hover:-translate-y-2"
                        />
                    </div>
                    <div className='w-7/12 md:space-y-4'>
                        <ul className={`${quicksand.className} text-sm md:text-xl px-5 mb-4 space-y-1`}>
                            {menuData[selectedCategory].map((item) => (
                                <li key={item.name} className="flex justify-between mb-2 border-b pb-2 md:pb-3 hover:text-[#CAB07C]">
                                    <span
                                        onMouseEnter={() => setHoveredItem(item)}
                                    >
                                        {item.name}
                                    </span>
                                    <span>{item.price}</span>
                                </li>
                            ))}
                        </ul>
                        <a href='#' className={`${quicksand.className} text-[#CAB07C] text-sm md:text-lg px-5 hover:underline`}>SEE WHOLE MENU</a>
                    </div>
                </div>
            </div>
        </div>
    );
}
