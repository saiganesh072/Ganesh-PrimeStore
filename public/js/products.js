/**
 * Product Database
 * Serves as the single source of truth for all products in the store.
 */
const products = [
    {
      id: "p1",
      name: "Esprit Ruffle Shirt",
      price: 16.64,
      image: "public/images/product-01.jpg",
      category: "women",
      description: "Nulla eget sem vitae eros pharetra viverra. Nam vitae luctus ligula. Mauris consequat ornare feugiat.",
      tags: ["Fashion", "Shirt"]
    },
    {
      id: "p2",
      name: "Herschel supply",
      price: 35.31,
      image: "public/images/product-02.jpg",
      category: "women",
      description: "Nulla eget sem vitae eros pharetra viverra. Nam vitae luctus ligula. Mauris consequat ornare feugiat.",
      tags: ["Fashion", "Bag"]
    },
    {
      id: "p3",
      name: "Only Check Trouser",
      price: 25.50,
      image: "public/images/product-03.jpg",
      category: "men",
      description: "Nulla eget sem vitae eros pharetra viverra. Nam vitae luctus ligula. Mauris consequat ornare feugiat.",
      tags: ["Fashion", "Denim"]
    },
    {
        id: "p4",
        name: "Classic Trench Coat",
        price: 75.00,
        image: "public/images/product-04.jpg",
        category: "women",
        description: "Nulla eget sem vitae eros pharetra viverra. Nam vitae luctus ligula. Mauris consequat ornare feugiat.",
        tags: ["Fashion", "Coat"]
    },
    {
        id: "p5",
        name: "Front Pocket Jumper",
        price: 34.75,
        image: "public/images/product-05.jpg",
        category: "women",
        description: "Nulla eget sem vitae eros pharetra viverra. Nam vitae luctus ligula. Mauris consequat ornare feugiat.",
        tags: ["Fashion", "Jumper"]
    },
    {
        id: "p6",
        name: "Vintage Inspired Classic",
        price: 93.20,
        image: "public/images/product-06.jpg",
        category: "watches",
        description: "Nulla eget sem vitae eros pharetra viverra. Nam vitae luctus ligula. Mauris consequat ornare feugiat.",
        tags: ["Fashion", "Watch"]
    },
    {
        id: "p7",
        name: "Shirt in Stretch Cotton",
        price: 52.66,
        image: "public/images/product-07.jpg",
        category: "women",
        description: "Nulla eget sem vitae eros pharetra viverra. Nam vitae luctus ligula. Mauris consequat ornare feugiat.",
        tags: ["Fashion", "Shirt"]
    },
    {
        id: "p8",
        name: "Pieces Metallic Printed",
        price: 18.96,
        image: "public/images/product-08.jpg",
        category: "women",
        description: "Nulla eget sem vitae eros pharetra viverra. Nam vitae luctus ligula. Mauris consequat ornare feugiat.",
        tags: ["Qt", "Fashion"]
    },
    {
        id: "p9",
        name: "Converse All Star Hi Plimsolls",
        price: 75.00,
        image: "public/images/product-09.jpg",
        category: "shoes",
        description: "Nulla eget sem vitae eros pharetra viverra. Nam vitae luctus ligula. Mauris consequat ornare feugiat.",
        tags: ["Fashion", "Shoes"]
    },
    {
        id: "p10",
        name: "Femme T-Shirt In Stripe",
        price: 25.85,
        image: "public/images/product-10.jpg",
        category: "women",
        description: "Nulla eget sem vitae eros pharetra viverra. Nam vitae luctus ligula. Mauris consequat ornare feugiat.",
        tags: ["Fashion", "Shirt"]
    },
    {
        id: "p11",
        name: "Herschel supply",
        price: 63.16,
        image: "public/images/product-11.jpg",
        category: "men",
        description: "Nulla eget sem vitae eros pharetra viverra. Nam vitae luctus ligula. Mauris consequat ornare feugiat.",
        tags: ["Fashion", "Streetstyle"]
    },
    {
        id: "p12",
        name: "Herschel supply",
        price: 63.15,
        image: "public/images/product-12.jpg",
        category: "men",
        description: "Nulla eget sem vitae eros pharetra viverra. Nam vitae luctus ligula. Mauris consequat ornare feugiat.",
        tags: ["Fashion", "Belt"]
    },
    {
        id: "p13",
        name: "T-Shirt with Sleeve",
        price: 18.49,
        image: "public/images/product-13.jpg",
        category: "women",
        description: "Nulla eget sem vitae eros pharetra viverra. Nam vitae luctus ligula. Mauris consequat ornare feugiat.",
        tags: ["Fashion", "Shirt"]
    },
    {
        id: "p14",
        name: "Pretty Little Thing",
        price: 54.79,
        image: "public/images/product-14.jpg",
        category: "women",
        description: "Nulla eget sem vitae eros pharetra viverra. Nam vitae luctus ligula. Mauris consequat ornare feugiat.",
        tags: ["Fashion", "Trendy"]
    },
    {
        id: "p15",
        name: "Mini Silver Mesh Watch",
        price: 86.85,
        image: "public/images/product-15.jpg",
        category: "watches",
        description: "Nulla eget sem vitae eros pharetra viverra. Nam vitae luctus ligula. Mauris consequat ornare feugiat.",
        tags: ["Fashion", "Watch"]
    },
    {
        id: "p16",
        name: "Square Neck Back",
        price: 29.64,
        image: "public/images/product-16.jpg",
        category: "women",
        description: "Nulla eget sem vitae eros pharetra viverra. Nam vitae luctus ligula. Mauris consequat ornare feugiat.",
        tags: ["Fashion", "Top"]
    }
  ];
  
  // Make available globally
  window.products = products;
