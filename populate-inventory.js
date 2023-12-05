#! /usr/bin/env node

// Get arguments passed on command line
const userArgs = process.argv.slice(2);

const Product = require("./models/product");
const Category = require("./models/category");
const Brand = require("./models/brand");

const products = [];
const categories = [];
const brands = [];

const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const mongoDB = userArgs[0];

main().catch((err) => console.log(err));

async function main() {
  console.log("Debug: About to connect");
  await mongoose.connect(mongoDB);
  console.log("Debug: Should be connected?");
  await generateCategories();
  await generateBrands();
  await generateProducts();
  console.log("Debug: Closing mongoose");
  mongoose.connection.close();
}

// Functions for each individual item
// Indexes is to save in array to be referenced in related items
async function createCategory(index, name, description) {
  const category = new Category({ name, description });
  await category.save();
  categories[index] = category;
  console.log(`Added category: ${name}`);
}

async function createBrand(index, name, description, address) {
  const brand = new Brand({ name, description, address });
  await brand.save();
  brands[index] = brand;
  console.log(`Added brand: ${name}`);
}

async function createProduct(index, name, description, category, brand, number_in_stock, price, weight) {
  const product = new Product({ name, description, category, brand, number_in_stock, price, weight });
  await product.save();
  products[index] = product;
  console.log(`Added product: ${name}`);
}

async function generateCategories() {
  console.log('Adding categories...');
  await Promise.all([
    createCategory(
      0,
      'Black Tea',
      'A robust elixir that captivates with its strength and depth, offering a rich infusion that is a testament to the bold essence of tea. A sip of this dark ambrosia transports one to the smoky libraries of yore, where intellectual conversations and genteel discourse were the hallmarks of society.',
    ),
    createCategory(
      1,
      'Green Tea',
      'A verdant elixir that embodies the delicate essence of a spring morning, its light infusion awakening the senses with a refreshing allure. In the midst of sipping this tea, one is transported to the idyllic gardens of Victorian estates, where languid afternoons are spent in contemplation and genteel socialization.',
    ),
    createCategory(
      2,
      'Oolong Tea',
      'A dance upon the palate, Oolong tea strikes a harmonious balance between the robustness of black tea and the subtlety of green, revealing a nuanced sophistication. This tea, like a refined waltz in a grand ballroom, evokes the elegance and poise of a bygone era.',
    ),
    createCategory(
      3,
      'White Tea',
      'The epitome of refinement, White Tea whispers on the palate with a subtle grace, akin to the gentle unfurling of petals, inviting a taste of pure elegance. Savoring this delicate brew is akin to partaking in the refined rituals of afternoon tea in Victorian parlors, where manners and decorum reign supreme.',
    ),
  ]);
}

async function generateBrands() {
  console.log('Adding brands...');
  await Promise.all([
    createBrand(
      0,
      "Whispering Willow Tea Co.",
      "Nestled in a serene locale, Whispering Willow Tea Co. is known for blends that evoke the tranquility of a Victorian countryside. Sip on teas that carry the gentle whispers of a bygone era.",
      "10 Serenity Street, Countryside Court, Sheffield",
    ),
    createBrand(
      1,
      "Timeless Tea Emporium",
      "Curators of timeless classics, this emporium offers blends that transcend eras. Timeless Tea Emporium invites patrons to experience the enduring allure of Victorian tea traditions.",
      "3 Eternity Lane, Classic Corner, Leicester",
    ),
    createBrand(
      2,
      "Duchess Delights Fine Tea",
      "An establishment favored by discerning duchesses, Duchess Delights Fine Tea specializes in blends that embody grace and sophistication. Indulge in teas that echo the refined tastes of Victorian nobility.",
      "9 Aristocracy Avenue, Duchess Haven, Southampton",
    ),
    createBrand(
      3,
      "Tea & Topiary Emporium",
      "A unique blend of tea and horticulture, Tea & Topiary Emporium provides teas inspired by aromatic gardens. Patrons can explore blends crafted with botanical finesse in a setting reminiscent of a Victorian garden.",
      "6 Topiary Terrace, FloraVille, Coventry",
    ),
    createBrand(
      4,
      "Cobbled Confections & Tea",
      "A delightful fusion of teas and confections, this establishment offers unique pairings to satiate the sweet tooth of Victorian tea enthusiasts. Cobble Confections & Tea is a haven for those seeking both indulgence and refinement.",
      "25 Sweet Street, Confectville, York",
    ),
    createBrand(
      5,
      "Regency Revelry Tea House",
      "Inspired by the regency era, this tea house invites patrons to partake in the revelry of exquisite blends. Regency Revelry Tea House celebrates the elegance and charm of a bygone age.",
      "12 Regency Road, Elegantaire Gardens, Cambridge",
    ),
    createBrand(
      6,
      "Velvet Veil Teas",
      "Unveiling a collection of velvety, smooth teas, Velvet Veil Teas captures the essence of Victorian luxury. Sip on blends that transport patrons to a world of opulence and refinement.",
      "19 Velvet Avenue, AristocraTea Square, Oxford",
    ),
    createBrand(
      7,
      "Primrose Parlor Tea Co.",
      "A charming tea parlor offering delightful blends perfect for afternoon tea gatherings. Primrose Parlor Tea Co. brings the ambiance of a Victorian parlor to modern tea enthusiasts.",
      "7 Primrose Lane, Elegance Enclave, Bristol",
    ),
    createBrand(
      8,
      "Gentleman's Cup Tea Emporium",
      "Catering to the refined tastes of Victorian gentlemen, this emporium specializes in robust and hearty blends. Gentleman's Cup Tea Emporium ensures that every cup is a testament to strength and sophistication.",
      "33 Stalwart Street, Dapper District, Glasgow",
    ),
    createBrand(
      9,
      "Lace & Lavender Teahouse",
      "A haven for those who appreciate the finer things in life, Lace & Lavender Teahouse offers blends infused with fragrant lavender notes. The teas evoke the elegance of Victorian lace and the soothing scent of lavender fields.",
      "14 Lace Lane, Lavenderbury, Newcastle",
    ),
    createBrand(
      10,
      "Sovereign Sip Tea Co.",
      "As the epitome of tea aristocracy, Sovereign Sip Tea Co. specializes in rare and exquisite teas favored by Victorian royalty. Indulge in the regal experience of tea fit for a queen or king.",
      "55 Monarchy Lane, Royaltown, Edinburgh",
    ),
    createBrand(
      11,
      "Victorian Teapot Treasures",
      "A quaint tea boutique offering an array of vintage teapots and exclusive tea blends. Victorian Teapot Treasures caters to tea enthusiasts who cherish the art of brewing as much as the beverage itself.",
      "23 Cobblestone Court, Teapotshire, Birmingham",
    ),
    createBrand(
      12,
      "Tea & Tasseled Tales",
      "A tea emporium with a literary twist, where each blend is inspired by classic Victorian novels. Tea & Tasseled Tales invites patrons to embark on a sensory journey through the pages of timeless literature.",
      "8 Parnassus Place, Dickensburg, Liverpool",
    ),
    createBrand(
      13,
      "Crimson Rose Teas",
      "Specializing in floral-infused teas, Crimson Rose Teas offers a curated collection reminiscent of a Victorian garden. Each blend is a delicate symphony of flavors, transporting tea enthusiasts to a bygone era.",
      "17 Lavender Lane, Bloomsbury, Manchester",
    ),
    createBrand(
      14,
      "The Emporium of Earl Grey",
      "Purveyors of the finest Earl Grey blends, The Emporium prides itself on sourcing the most exquisite bergamot-infused teas. A haven for aficionados seeking a touch of Victorian sophistication in every cup.",
      "42 Saffron Lane, Victorian Heights, London",
    ),
  ]);
} 

async function generateProducts() {
  console.log('Adding products...');
  await Promise.all([
    createProduct(
      1,
      'English Breakfast',
      'A robust blend of Assam, Ceylon, and Kenyan black teas, English Breakfast is the epitome of a traditional morning tea. With a malty richness and invigorating aroma, this blend pays homage to the Victorian penchant for strong teas. Enjoy the fortifying essence of a true classic.',
      categories[0],
      brands[0],
      50,
      15.99,
      0.2
    ),
    createProduct(
      2,
      'Victorian Earl Grey',
      'Inspired by the elegance of the Victorian era, this Earl Grey blend combines premium black tea with bergamot oil and a hint of lavender. The result is a fragrant and sophisticated infusion that transports tea enthusiasts to a time of refined indulgence.',
      categories[0],
      brands[1],
      75,
      18.99,
      0.18
    ),
    createProduct(
      3,
      'Regal Oolong',
      'Harmonizing the robustness of black tea with the floral notes of green, Regal Oolong captivates the senses. This blend, a nod to regency sophistication, unfolds with every sip, revealing a nuanced complexity that befits the aristocratic palate.',
      categories[0],
      brands[5],
      40,
      22.99,
      0.22
    ),
    createProduct(
      4,
      'Serenity Chamomile',
      'Crafted to evoke the tranquility of Victorian gardens, Serenity Chamomile is a soothing herbal blend. Chamomile blossoms, lavender, and rose petals combine to create a calming infusion, perfect for winding down after a day of societal engagements.',
      categories[1],
      brands[14],
      60,
      14.99,
      0.18
    ),
    createProduct(
      5,
      'Crimson Rose Black Tea',
      'A bold black tea infused with the essence of crimson roses, this blend pays homage to the romantic allure of Victorian gardens. The rich, velvety flavor and floral undertones create a tea worthy of an aristocrat’s afternoon indulgence.',
      categories[0],
      brands[2],
      35,
      24.99,
      0.25
    ),
    createProduct(
      6,
      'Lavender Lace Green Tea',
      'Embark on a sensory journey with Lavender Lace Green Tea, where delicate green tea leaves meet the fragrant notes of lavender. This blend captures the essence of Victorian lace, offering a refined and uplifting infusion.',
      categories[0],
      brands[9],
      45,
      19.99,
      0.2
    ),
    createProduct(
      7,
      'Opulent Oolong Collection',
      'Indulge in opulence with our Opulent Oolong Collection, featuring three exquisite Oolong blends. Each tea, a masterpiece of balance and complexity, mirrors the sophistication of Victorian soirées and the elegance of fine dining.',
      categories[0],
      brands[3],
      30,
      32.99,
      0.3
    ),
    createProduct(
      8,
      'White Elegance Tea',
      'Delicate and refined, White Elegance Tea is a blend of white tea leaves and silver needle buds. Sip on this graceful infusion that whispers of Victorian sophistication, as if enjoying tea in the parlors of aristocratic estates.',
      categories[0],
      brands[8],
      25,
      28.99,
      0.18
    ),
    createProduct(
      9,
      'Sovereign Sip Royal Blend',
      'An exclusive blend fit for royalty, Sovereign Sip Royal Blend combines the finest black teas from estates favored by Victorian monarchs. Immerse yourself in the regal charm of a tea that echoes the refined tastes of the aristocracy.',
      categories[0],
      brands[5],
      20,
      39.99,
      0.22
    ),
    createProduct(
      10,
      "Earl's Reserve Assam",
      "Earl's Reserve Assam is a robust black tea sourced from the finest Assam estates. This blend, worthy of aristocratic admiration, boasts a malty richness and a full-bodied character, embodying the strength favored by Victorian connoisseurs.",
      categories[0],
      brands[1],
      55,
      17.99,
      0.2
    ),
    createProduct(
      11,
      'Enchanted Chamomile Mint',
      'Experience enchantment with Enchanted Chamomile Mint, a herbal blend featuring chamomile, peppermint, and spearmint. This tea, reminiscent of Victorian gardens, offers a refreshing and calming infusion for moments of serenity.',
      categories[1],
      brands[13],
      40,
      16.99,
      0.18
    ),
    createProduct(
      12,
      "Royal Breakfast Reserve",
      "Crafted for the discerning palate, Royal Breakfast Reserve is a blend of premium Assam and Kenyan black teas. The infusion exudes a regal strength and malty richness, reminiscent of the opulent morning teas enjoyed by Victorian aristocracy.",
      categories[0],
      brands[0],
      45,
      28.99,
      0.22
    ),
    createProduct(
      13,
      "Victorian Afternoon Blend",
      "Indulge in the refined tradition of afternoon tea with our Victorian Afternoon Blend. This harmonious infusion of Darjeeling and Ceylon black teas offers a sophisticated and aromatic experience, evoking the leisurely elegance of Victorian society.",
      categories[0],
      brands[8],
      50,
      26.99,
      0.2
    ),
    createProduct(
      14,
      "Grand Earl's Grey",
      "Grand Earl's Grey elevates the classic Earl Grey with a grandeur befitting Victorian nobility. Premium black tea leaves are delicately scented with bergamot and adorned with blue cornflowers, creating a tea of unparalleled elegance.",
      categories[0],
      brands[1],
      35,
      32.99,
      0.25
    ),
    createProduct(
      15,
      "Opulence Jasmine Green Tea",
      "Embark on a journey of opulence with our Opulence Jasmine Green Tea. Fragrant jasmine blossoms adorn delicate green tea leaves, creating an infusion that captures the essence of Victorian luxury and botanical splendor.",
      categories[0],
      brands[3],
      40,
      29.99,
      0.2
    ),
    createProduct(
      16,
      "Regency Rose Rooibos",
      "Regency Rose Rooibos offers a caffeine-free delight with a Victorian twist. Rooibos leaves, rose petals, and vanilla combine to create a soothing infusion, reminiscent of the floral gardens gracing the estates of regency-era England.",
      categories[1],
      brands[10],
      60,
      21.99,
      0.18
    ),
    createProduct(
      17,
      "Charming Chai Elegance",
      "Charming Chai Elegance entices with a blend of black tea, spices, and floral notes. This chai blend, reminiscent of Victorian spice bazaars, offers a charming and invigorating experience for tea enthusiasts seeking sophistication and warmth.",
      categories[0],
      brands[12],
      55,
      19.99,
      0.22
    ),
    createProduct(
      18,
      "Pemberley Peppermint Infusion",
      "Transport yourself to the idyllic gardens of Pemberley with our Peppermint Infusion. Pure peppermint leaves create a refreshing and invigorating herbal tea, perfect for moments of repose reminiscent of Jane Austen's regency novels.",
      categories[1],
      brands[6],
      65,
      17.99,
      0.18
    ),
    createProduct(
      19,
      "Duke's Delight Darjeeling",
      "Duke's Delight Darjeeling is a connoisseur's choice, capturing the essence of the Himalayan foothills. This single-origin Darjeeling tea offers a nuanced and delicate flavor profile, befitting the refined tastes of Victorian tea enthusiasts.",
      categories[0],
      brands[7],
      30,
      34.99,
      0.18
    ),
    createProduct(
      20,
      "Graceful Green Lily",
      "Graceful Green Lily is a green tea adorned with delicate lily blossoms, creating an infusion that embodies grace and refinement. Sip on this tea reminiscent of Victorian gardens and immerse yourself in the elegance of a bygone era.",
      categories[0],
      brands[4],
      40,
      25.99,
      0.2
    ),
    createProduct(
      21,
      "Highland Heather Herbal Blend",
      "Highland Heather Herbal Blend captures the rugged charm of the Scottish highlands. A blend of heather blossoms, honeybush, and lemongrass creates a herbal infusion that transports tea enthusiasts to the untamed beauty of Victorian landscapes.",
      categories[1],
      brands[11],
      50,
      23.99,
      0.18
    ),
    createProduct(
      22,
      "Elegant Elderflower White Tea",
      "Elegant Elderflower White Tea is a harmonious blend of white tea leaves and elderflower blossoms. This delicate infusion offers a fragrant and floral experience, reminiscent of the elegant gardens gracing Victorian estates.",
      categories[0],
      brands[14],
      55,
      30.99,
      0.2
    ),
    createProduct(
      23,
      "Regal Raspberry Black Tea",
      "Regal Raspberry Black Tea combines the robustness of black tea with the sweet tartness of ripe raspberries. This infusion, reminiscent of Victorian berry gardens, creates a regal and flavorful experience for tea enthusiasts seeking a touch of opulence.",
      categories[0],
      brands[2],
      45,
      27.99,
      0.22
    ),
    createProduct(
      24,
      "Nectar of Nanking Oolong",
      "Nectar of Nanking Oolong is a tribute to the historic Nanking tea trade routes. This Oolong blend, infused with osmanthus flowers, offers a sweet and aromatic experience that transports tea enthusiasts to the bustling streets of Victorian tea markets.",
      categories[0],
      brands[3],
      40,
      32.99,
      0.25
    ),
    createProduct(
      25,
      "Sapphire Earl Grey Reserve",
      "Sapphire Earl Grey Reserve elevates the classic Earl Grey with a touch of blue cornflowers. This blend, reminiscent of Victorian regality, creates a visually stunning and aromatic experience that pays homage to the elegance of a bygone era.",
      categories[0],
      brands[1],
      35,
      34.99,
      0.25
    ),
    createProduct(
      26,
      "Chamomile Symphony Herbal Blend",
      "Chamomile Symphony Herbal Blend is a symphony of chamomile, lavender, and lemon balm. This herbal infusion, reminiscent of Victorian music salons, creates a soothing and harmonious experience for moments of repose.",
      categories[1],
      brands[13],
      60,
      20.99,
      0.18
    ),
    createProduct(
      27,
      "Dapper Darjeeling Green Tea",
      "Dapper Darjeeling Green Tea captures the sophistication of Darjeeling with a twist of Victorian dapperness. This green tea blend offers a crisp and refined flavor profile, perfect for those seeking an infusion of elegance with each sip.",
      categories[0],
      brands[7],
      50,
      26.99,
      0.2
    ),
    createProduct(
      28,
      "Midsummer Night's Dream Blend",
      "Midsummer Night's Dream Blend is a magical infusion of chamomile, rose petals, and lavender. This herbal tea, inspired by Victorian literary classics, creates an enchanting and dreamy experience for those seeking a touch of literary romance.",
      categories[1],
      brands[6],
      65,
      22.99,
      0.18
    ),
    createProduct(
      29,
      "Rose Petal Elegance Oolong",
      "Rose Petal Elegance Oolong is a sophisticated blend of oolong tea and fragrant rose petals. This infusion, reminiscent of Victorian rose gardens, offers a delicate and aromatic experience for tea enthusiasts seeking refinement in every cup.",
      categories[0],
      brands[4],
      40,
      29.99,
      0.22
    ),
    createProduct(
      30,
      "Victorian Mint Julep Black Tea",
      "Victorian Mint Julep Black Tea is a refreshing blend of black tea and peppermint leaves. This infusion, reminiscent of Victorian garden parties, creates a minty and invigorating experience perfect for a sophisticated afternoon indulgence.",
      categories[0],
      brands[12],
      55,
      24.99,
      0.25
    ),
    createProduct(
      31,
      "Highland Heather Honeybush",
      "Highland Heather Honeybush is a honeybush herbal blend infused with heather blossoms. This herbal tea captures the rugged charm of the Scottish highlands, creating a warming and soothing experience for tea enthusiasts seeking untamed beauty.",
      categories[1],
      brands[11],
      50,
      23.99,
      0.18
    ),
  ]);
}