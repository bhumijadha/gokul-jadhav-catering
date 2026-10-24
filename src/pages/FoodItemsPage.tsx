import { Plus, Search, Trash2, Utensils } from 'lucide-react'
import { useState, type FormEvent } from 'react'
import type { FoodItem } from '../types'

type Props = { foodItems: FoodItem[]; onChange: (foodItems: FoodItem[]) => void }

export default function FoodItemsPage({ foodItems, onChange }: Props) {
  const [name, setName] = useState('')
  const [category, setCategory] = useState<FoodItem['category']>('Vegetarian')
  const [query, setQuery] = useState('')
  const filtered = foodItems.filter((item) => item.name.toLocaleLowerCase().includes(query.toLocaleLowerCase()))

  function addItem(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const trimmed = name.trim()
    if (!trimmed) return
    onChange([...foodItems, { id: crypto.randomUUID(), name: trimmed, category, ingredients: [] }])
    setName('')
  }

  return <div className="page-wrap">
    <div className="page-title-row"><div><div className="eyebrow"><span className="eyebrow-line" /> YOUR MENU LIBRARY</div><h1>Food items</h1><p>Create the dishes you want to plan for.</p></div><span className="count-pill">{foodItems.length} {foodItems.length === 1 ? 'item' : 'items'}</span></div>
    <section className="panel create-panel"><div className="form-section-head"><div className="quick-link-icon"><Plus size={18} /></div><div><h2>Add a food item</h2><p>Start with a dish name. Ingredient amounts are set separately.</p></div></div><form className="inline-create-form" onSubmit={addItem}><label className="field-grow">Food item name<input value={name} onChange={(event) => setName(event.target.value)} placeholder="e.g. Chicken Biryani" required /></label><label>Menu category<select value={category} onChange={(event) => setCategory(event.target.value as FoodItem['category'])}><option>Vegetarian</option><option>Non-vegetarian</option><option>Both</option></select></label><button className="button-primary create-submit" type="submit"><Plus size={16} /> Add item</button></form></section>
    <div className="list-toolbar"><div><h2>Your food items</h2><span>{foodItems.length ? 'Your menu, your numbers.' : 'Your own food items, ready to add.'}</span></div><label className="search-field"><Search size={16} /><input aria-label="Search food items" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Find a dish" /></label></div>
    <div className="food-grid">{filtered.map((item) => <article className="food-card" key={item.id}><div className="food-card-icon"><Utensils size={19} /></div><div className="food-card-content"><div className="food-name-row"><h3>{item.name}</h3><span className={`category-tag ${item.category === 'Vegetarian' ? 'veg' : item.category === 'Non-vegetarian' ? 'nonveg' : 'both'}`}>{item.category}</span></div><p>{item.ingredients.length} {item.ingredients.length === 1 ? 'ingredient' : 'ingredients'} added</p></div><button className="icon-button danger-icon" aria-label={`Delete ${item.name}`} title="Delete food item" onClick={() => onChange(foodItems.filter((food) => food.id !== item.id))}><Trash2 size={17} /></button></article>)}
      {!foodItems.length && <div className="empty-state wide-empty"><div className="empty-state-mark"><Utensils size={22} /></div><strong>Your menu starts with one dish.</strong><span>Add a food item above. No recipes or quantities are preloaded.</span></div>}
      {!!foodItems.length && !filtered.length && <div className="empty-state wide-empty"><strong>No food items match that search.</strong><span>Try another name.</span></div>}
    </div>
  </div>
}