export type Unit = 'g' | 'kg' | 'ml' | 'litre' | 'pieces'

export type Ingredient = {
  id: string
  name: string
  quantityPerPerson: string
  unit: Unit
}

export type FoodItem = {
  id: string
  name: string
  category: 'Vegetarian' | 'Non-vegetarian' | 'Both'
  ingredients: Ingredient[]
}

export type EventRecord = {
  id: string
  customerName: string
  eventType: string
  people: number
  service: 'Lunch' | 'Dinner'
  menu: 'Vegetarian' | 'Non-vegetarian' | 'Both'
  foodItemIds: string[]
  createdAt: string
}

export type BusinessSettings = {
  businessName: string
  phone: string
  instagram: string
  location: string
  costPerGuest: string
}

export type AppData = {
  foodItems: FoodItem[]
  events: EventRecord[]
  settings: BusinessSettings
}