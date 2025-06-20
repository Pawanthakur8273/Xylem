// src/data/glacierData.ts

export interface GlacierData {
  name: string;
  location: string;
  before: string;
  after: string;
  years: [number, number];
  description: string;
  iceLoss: string;
  areaChange: string;
}

export const glaciers: GlacierData[] = [
  {
    name: "Grinnell Glacier",
    location: "Montana, USA",
    before: "imgs/before.webp",
    after: "imgs/after.webp",
    years: [1920, 2020],
    description: "Grinnell Glacier has lost over 90% of its volume since the early 1900s due to climate change.",
    iceLoss: "90%",
    areaChange: "From 1.6 km² to 0.2 km²"
  },
  {
    name: "Rhône Glacier",
    location: "Swiss Alps",
    before: "imgs/okjökull_glacier_after.jpeg",
    after: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
    years: [1900, 2022],
    description: "The Rhône Glacier has retreated by about 1.4 km since 1870 and loses 5-10 meters of length annually.",
    iceLoss: "70%",
    areaChange: "From 14.7 km² to 5.2 km²"
  },
  {
    name: "Okjökull Glacier",
    location: "Iceland",
    before: "imgs/okjökull_glacier_before.jpeg",
    after: "imgs/okjökull_glacier_after.jpeg",
    years: [1986, 2019],
    description: "Okjökull was declared dead in 2014, becoming Iceland's first glacier lost to climate change.",
    iceLoss: "100%",
    areaChange: "From 1.5 km² to 0 km²"
  },
  {
    name: "Muir Glacier",
    location: "Alaska, USA",
    before: "imgs/muir_glacier_before.jpg",
    after: "imgs/muir_glacier_after.jpg",
    years: [1941, 2021],
    description: "Muir Glacier has retreated more than 50 kilometers since the late 1800s.",
    iceLoss: "85%",
    areaChange: "From 12 km² to 4.5 km²"
  },
  {
    name: "Pasterze Glacier",
    location: "Austria",
    before: "https://images.unsplash.com/photo-1543857772-46d4e1a5d6f1?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
    after: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
    years: [1960, 2020],
    description: "Austria's largest glacier has lost more than half its volume in the past 60 years.",
    iceLoss: "60%",
    areaChange: "From 26.5 km² to 16.2 km²"
  },
  {
    name: "Gangotri Glacier",
    location: "Himalayas, India",
    before: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
    after: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
    years: [1980, 2020],
    description: "One of the largest glaciers in the Himalayas, retreating at 22 meters per year.",
    iceLoss: "10%",
    areaChange: "From 258 km² to 240 km²"
  },
  {
    name: "Mer de Glace",
    location: "French Alps",
    before: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
    after: "https://images.unsplash.com/photo-1551524164-6cf64ac241c6?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
    years: [1950, 2023],
    description: "France's largest glacier has thinned by over 120 meters since 1870.",
    iceLoss: "50%",
    areaChange: "From 35 km² to 30 km²"
  },
  {
    name: "Athabasca Glacier",
    location: "Alberta, Canada",
    before: "https://images.unsplash.com/photo-1543857772-46d4e1a5d6f1?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
    after: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
    years: [1917, 2020],
    description: "Has retreated more than 1.5 kilometers and lost over half its volume in 125 years.",
    iceLoss: "50%",
    areaChange: "From 5.2 km² to 2.5 km²"
  },
  {
    name: "Solheimajökull",
    location: "Iceland",
    before: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
    after: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
    years: [1990, 2020],
    description: "This outlet glacier has retreated by over 1 km and thinned by 60 meters.",
    iceLoss: "50%",
    areaChange: "From 8.1 km² to 6.5 km²"
  },
  {
    name: "Franz Josef Glacier",
    location: "New Zealand",
    before: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
    after: "https://images.unsplash.com/photo-1551524164-6cf64ac241c6?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
    years: [1980, 2023],
    description: "Has retreated 3 kilometers since 1980, losing significant ice mass annually.",
    iceLoss: "30%",
    areaChange: "From 28 km² to 24 km²"
  }
];