
export interface Room {
  id: string;
  name: string;
  description: string;
  price: number;
  images: string[];
  nightImages?: string[]; // New property for night mode images
  size: string;
  amenities: string[];
}

export interface Offer {
  id: string;
  name: string;
  title: string;
  subtitle: string;
  discount: string;
  image: string;
  nightImage?: string; // New property for night mode image
}

export interface Event {
  id: string;
  title: string;
  date: string;
  description: string;
  image: string;
  nightImage?: string; // New property
  tag: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}

export enum WeatherType {
  Sunny = 'Sunny',
  Cloudy = 'Cloudy',
  Rainy = 'Rainy',
  Night = 'Night'
}

export interface WeatherData {
  temp: number;
  condition: WeatherType;
  city: string;
}