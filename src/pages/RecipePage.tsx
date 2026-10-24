import { BookOpenCheck, Check, Plus, Save, Trash2 } from 'lucide-react'
import { useState } from 'react'
import type { FoodItem, Ingredient, Unit } from '../types'

type Props = { foodItems: FoodItem[]; onChange: (foodItems: FoodItem[]) => void }
const units: Unit[] = ['g', 'kg', 'ml', 'litre', 'pieces']

export default function RecipePage({ foodItems, onChange }: Props) {
  const [selectedId, setSelectedId] = useState(foodItems[0]?.id ?? '')
  const [saved, setSaved] = useState(false)
  const selected = foodItems.find((item) => item.id === selectedId) ?? foodItems[0]

  function updateSelected(transform: (item: FoodItem) => FoodItem) {
    if (!selected) return
    onChange(foodItems.map((item) => item.id === selected.id ? transform(item) : item))
    setSaved(false)
  }

  function addIngredient() {
    const ingredient: Ingredient = { id: crypto.randomUUID(), name: '', quantityPerPerson: '', unit: 'g' }
    updateSelected((item) => ({ ...item, ingredients: [...item.ingredients, ingredient] }))
  }

  function editIngredient(id: string, patch: Partial<Ingredient>) {
    updateSelected((item) => ({ ...item, ingredients: item.ingredients.map((ingredient) => ingredient.id === id ? { ...ingredient, ...patch } : ingredient) }))
  }

  function removeIngredient(id: string) {
    updateSelected((item) => ({ ...item, ingredients: item.ingredients.filter((ingredient) => ingredient.id !== id) }))
  }

  if (!foodItems.length) return <div className="page-wrap"><div className="page-title-row"><div><div className="eyebrow"><span className="eyebrow-line" /> RECIPE BOOK</div><h1>Recipe quantities</h1><p>Set the ingredient amount needed for one person.</p></div></div><div className="panel empty-state recipe-empty"><div className="empty-state-mark"><BookOpenCheck size={22} /></div><strong>Add a food item first.</strong><span>Your recipe quantities will live here, set by you.</span></div></div>

  return <div className="page-wrap">
    <div className="page-title-row"><div><div className="eyebrow"><span className="eyebrow-line" /> RECIPE BOOK</div><h1>Recipe quantities</h1><p>Set the ingredient amount needed for one person.</p></div><button className={`button-secondary ${saved ? 'saved-button' : ''}`} onClick={() => setSaved(true)}><Check size={16} /> {saved ? 'Saved' : 'All changes saved'}</button></div>
    <div className="recipe-layout"><aside className="recipe-dish-list"><div className="eyebrow"><span className="eyebrow-line" /> YOUR FOOD ITEMS</div>{foodItems.map((item) => <button key={item.id} className={`recipe-dish-button ${selected?.id === item.id ? 'selected' : ''}`} onClick={() => { setSelectedId(item.id); setSaved(false) }}><span className="dish-initial">{item.name.charAt(0).toUpperCase()}</span><span><strong>{item.name}</strong><small>{item.ingredients.length} ingredients</small></span></button>)}</aside>
      <section className="panel recipe-editor"><div className="recipe-editor-head"><div><span className={`category-tag ${selected.category === 'Vegetarian' ? 'veg' : selected.category === 'Non-vegetarian' ? 'nonveg' : 'both'}`}>{selected.category}</span><h2>{selected.name}</h2><p>Ingredients required to prepare one serving.</p></div><div className="servings-marker"><strong>1</strong><span>PERSON</span></div></div>
        <div className="ingredient-head"><span>INGREDIENT</span><span>QUANTITY PER PERSON</span><span>UNIT</span><span /></div>
        <div className="ingredient-rows">{selected.ingredients.map((ingredient, index) => <div className="ingredient-row" key={ingredient.id}><span className="ingredient-index">{String(index + 1).padStart(2, '0')}</span><input aria-label="Ingredient name" value={ingredient.name} onChange={(event) => editIngredient(ingredient.id, { name: event.target.value })} placeholder="e.g. Rice" /><div className="quantity-input-wrap"><input aria-label="Quantity per person" type="number" min="0" step="any" value={ingredient.quantityPerPerson} onChange={(event) => editIngredient(ingredient.id, { quantityPerPerson: event.target.value })} placeholder="Enter amount" /><span>per person</span></div><select aria-label="Unit" value={ingredient.unit} onChange={(event) => editIngredient(ingredient.id, { unit: event.target.value as Unit })}>{units.map((unit) => <option key={unit} value={unit}>{unit}</option>)}</select><button className="icon-button danger-icon" aria-label={`Remove ingredient ${ingredient.name || index + 1}`} onClick={() => removeIngredient(ingredient.id)}><Trash2 size={16} /></button></div>)}
          {!selected.ingredients.length && <div className="ingredients-empty"><span className="empty-state-mark"><BookOpenCheck size={20} /></span><strong>No ingredients yet</strong><span>Add each ingredient and enter your own quantity for one person.</span></div>}
        </div>
        <div className="recipe-editor-footer"><button className="text-action" onClick={addIngredient}><Plus size={16} /> Add ingredient</button><span><Save size={14} /> Changes save automatically</span></div>
        <div className="quantity-tip"><span className="quantity-tip-mark">i</span><span>Totals convert to practical units automatically. For example, 1,000 g is shown as 1 kg.</span></div>
      </section>
    </div>
  </div>
}