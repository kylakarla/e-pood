import express from 'express';
import fs from 'fs/promises';
import axios from 'axios';
import path from 'path';
import { log } from 'console';

const app = express();
const PORT = 3000;
const favoritesFile = "./data/favorites.json"

// Middleware staatiliste failide jaoks
app.use(express.static('public'));

// Funktsioon: Laadi andmed FakeStore API-st ja salvesta faili
const fetchAndSaveProducts = async () => {
  const response = await axios.get('https://fakestoreapi.com/products');
  const products = response.data;
  await fs.writeFile('./data/products.json', JSON.stringify(products, null, 2));
};

// Funktsioon: Kontrolli, kas fail on tühi
const isFileEmpty = async (path) => {
  try {
    const rawData = await fs.readFile(path, 'utf-8');
    return !rawData.trim(); // Kontrollime, kas fail on tühi (või ainult tühikud)
  } catch (error) {
    console.error('Viga faili lugemisel', error);
    return true; // Kui tekib viga, eeldame, et fail on tühi või puudub
  }
};

// API: Tagasta lokaalsest JSON-failist andmed
app.get('/products', async (req, res) => {
  try {
    const filePath = './data/products.json';

    // Kontrolli, kas fail on tühi
    const emptyFile = await isFileEmpty(filePath);

    // Kui fail on tühi, lae andmed API-st ja salvesta need
    if (emptyFile) {
      console.log('Fail on tühi. Laadin andmed FakeStore API-st...');
      await fetchAndSaveProducts();
    }

    // Loe andmed failist
    const rawData = await fs.readFile(filePath, 'utf-8');

    // Parssige andmed
    const products = JSON.parse(rawData);

    // Seadista vastuse päised
    res.setHeader('Content-Type', 'data/json');
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    
    // Tagasta andmed kasutajale
    res.status(200).json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Andmete lugemine ebaõnnestus' });
  }
});

// API: Tagasta tooted kategooria alusel
app.get('/products/category/:category', async (req, res) => {
  try {
    const category = req.params.category;
    const filePath = './data/products.json';
    const rawData = await fs.readFile(filePath, 'utf-8');
    const products = JSON.parse(rawData);
    const filteredProducts = products.filter(product => product.category === category);

    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(filteredProducts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Andmete lugemine ebaõnnestus' });
  }
});

// API: Tagasta kategooriate loend
app.get('/categories', async (req, res) => {
  try {
    const filePath = './data/products.json';
    const rawData = await fs.readFile(filePath, 'utf-8');
    const products = JSON.parse(rawData);
    const categories = [...new Set(products.map(product => product.category))];

    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(categories);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Andmete lugemine ebaõnnestus' });
  }
});

// API: Tagasta toote andmed ID alusel
app.get('/products/:id', async (req, res) => {
  try {
    const productId = req.params.id;
    const filePath = './data/products.json';
    const rawData = await fs.readFile(filePath, 'utf-8');
    const products = JSON.parse(rawData);
    const product = products.find(product => product.id == productId);

    if (product) {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(product);
    } else {
      res.status(404).json({ error: 'Toode ei leitud' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Andmete lugemine ebaõnnestus' });
  }
});



app.get('/favorites/', async (req, res) => {
  try {
    // Kontrolli, kas fail eksisteerib ja pole tühi
    const fileExists = await fs.access(favoritesFile).then(() => true).catch(() => false);
    if (!fileExists) {
      return res.status(200).json([]); // Kui faili pole, tagasta tühi massiiv
    }

    const raw = await fs.readFile(favoritesFile, 'utf-8');
    const favorites = raw.trim() ? JSON.parse(raw) : [];

    res.status(200).json(favorites);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to load favorites' });
  }
});

// POST (DONEE)
app.post('/favorites/', async (req, res) => {
  try {
   const productid = parseInt(req.query.id)
   const raw = await fs.readFile(favoritesFile, "utf-8")
   const favorites = JSON.parse(raw)
   favorites.push(productid)
   fs.writeFile(favoritesFile, JSON.stringify(favorites))
   res.status(200).json(favorites)
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Failed to add to favorites' });
  }
});

// DELETE
app.delete('/favorites/', async (req, res) => {
  try {
    const productid = parseInt(req.query.id);
    if (isNaN(productid)) {
      return res.status(400).json({ error: 'Invalid product ID' });
    }

    const raw = await fs.readFile(favoritesFile, 'utf-8');
    let favorites = JSON.parse(raw) || [];

    // Kontrolli, kas toode on nimekirjas
    if (!favorites.includes(productid)) {
      return res.status(404).json({ error: 'Product not found in favorites' });
    }

    // Eemalda toode lemmikutest
    favorites = favorites.filter(id => id !== productid);
    await fs.writeFile(favoritesFile, JSON.stringify(favorites, null, 2));

    res.status(200).json(favorites);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to remove from favorites' });
  }
});


// Käivita server
app.listen(PORT, () => {
  console.log(`Server töötab aadressil http://localhost:${PORT}`);
});