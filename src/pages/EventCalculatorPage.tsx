import { CalendarDays, Check, ClipboardList, Printer, Sparkles, UsersRound } from 'lucide-react'
import { useState, type FormEvent } from 'react'
import { buildShoppingList, calculateIngredient } from '../lib/quantity'
import type { AppData, EventRecord, FoodItem } from '../types'

type Props = { data: AppData; onEventsChange: (events: EventRecord[]) => void }
type EventForm = { customerName: string; eventType: string; people: string; service: 'Lunch' | 'Dinner'; menu: 'Vegetarian' | 'Non-vegetarian' | 'Both'; foodItemIds: string[] }
const blankForm: EventForm = { customerName: '', eventType: 'Wedding', people: '', service: 'Lunch', menu: 'Vegetarian', foodItemIds: [] }

export default function EventCalculatorPage({ data, onEventsChange }: Props) {
  const [form, setForm] = useState<EventForm>(blankForm)
  const [generated, setGenerated] = useState<EventRecord | null>(null)
  const dishes = data.foodItems.filter((item) => form.foodItemIds.includes(item.id))
  const shoppingList = generated ? buildShoppingList(data.foodItems.filter((item) => generated.foodItemIds.includes(item.id)), generated.people) : []
  const generatedDishes = generated ? data.foodItems.filter((item) => generated.foodItemIds.includes(item.id)) : []

  function toggleDish(id: string) {
    setForm((current) => ({ ...current, foodItemIds: current.foodItemIds.includes(id) ? current.foodItemIds.filter((dishId) => dishId !== id) : [...current.foodItemIds, id] }))
    setGenerated(null)
  }

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const record: EventRecord = { id: crypto.randomUUID(), customerName: form.customerName.trim(), eventType: form.eventType, people: Number(form.people), service: form.service, menu: form.menu, foodItemIds: form.foodItemIds, createdAt: new Date().toISOString() }
    onEventsChange([record, ...data.events])
    setGenerated(record)
  }

  return <div className="page-wrap">
    <div className="page-title-row"><div><div className="eyebrow"><span className="eyebrow-line" /> EVENT PLANNING</div><h1>Event calculator</h1><p>Plan a menu and generate the ingredient requirements.</p></div><span className="count-pill"><CalendarDays size={14} /> {data.events.length} saved {data.events.length === 1 ? 'plan' : 'plans'}</span></div>
    <div className="calculator-layout"><form className="panel event-form" onSubmit={submit}>
      <div className="form-section-head"><div className="quick-link-icon"><CalendarDays size={18} /></div><div><h2>Event details</h2><p>Set the guest count and choose dishes for this gathering.</p></div></div>
      <div className="form-grid"><label>Customer name<input value={form.customerName} onChange={(event) => setForm({ ...form, customerName: event.target.value })} placeholder="Name for this event" required /></label><label>Event type<select value={form.eventType} onChange={(event) => setForm({ ...form, eventType: event.target.value })}><option>Wedding</option><option>Party</option><option>Family function</option><option>Corporate gathering</option><option>Other</option></select></label><label>Number of people<div className="input-with-icon"><UsersRound size={16} /><input type="number" min="1" step="1" value={form.people} onChange={(event) => setForm({ ...form, people: event.target.value })} placeholder="e.g. 100" required /></div></label><label>Meal service<select value={form.service} onChange={(event) => setForm({ ...form, service: event.target.value as EventForm['service'] })}><option>Lunch</option><option>Dinner</option></select></label></div>
      <fieldset className="choice-fieldset"><legend>Menu preference</legend><div className="segmented-control">{(['Vegetarian', 'Non-vegetarian', 'Both'] as const).map((choice) => <button type="button" key={choice} className={form.menu === choice ? 'selected' : ''} onClick={() => setForm({ ...form, menu: choice })}>{choice}</button>)}</div></fieldset>
      <div className="dish-picker-heading"><div><h3>Select food items</h3><p>Select every dish to include in this requirement.</p></div><span>{form.foodItemIds.length} selected</span></div>
      <div className="dish-picker">{data.foodItems.map((item) => <DishChoice key={item.id} item={item} checked={form.foodItemIds.includes(item.id)} onToggle={() => toggleDish(item.id)} />)}
        {!data.foodItems.length && <div className="dish-picker-empty"><span>Nothing in the menu library yet.</span><small>Add food items and ingredient amounts before planning.</small></div>}
        {!!data.foodItems.length && !dishes.length && <div className="dish-picker-empty"><span>Choose dishes for your menu.</span><small>Your ingredient list is combined across every selected dish.</small></div>}
      </div>
      <button className="button-primary generate-button" type="submit" disabled={!data.foodItems.length || !form.foodItemIds.length}><Sparkles size={16} /> Generate requirement</button>
    </form>
    <section className="requirements-column">{generated ? <>
      <div className="requirements-title"><div><div className="eyebrow"><span className="eyebrow-line" /> SHOPPING LIST</div><h2>For {generated.people} people</h2><p>{generated.customerName} · {generated.eventType} · {generated.service}</p></div><button className="icon-button print-button" aria-label="Print shopping list" title="Print shopping list" onClick={() => window.print()}><Printer size={18} /></button></div>
      {shoppingList.length ? <div className="panel shopping-panel"><div className="shopping-list-head"><span>INGREDIENT</span><span>TOTAL REQUIRED</span></div>{shoppingList.map((item) => <div className="shopping-row" key={item.name}><span>{item.name}</span><strong>{item.total}</strong></div>)}<div className="shopping-footer"><Check size={15} /> Identical ingredients combined across {generatedDishes.length} {generatedDishes.length === 1 ? 'dish' : 'dishes'}</div></div> : <div className="panel incomplete-recipe"><ClipboardList size={20} /><strong>Recipes need quantities</strong><span>Add ingredient names and per-person amounts to these dishes before generating a complete shopping list.</span></div>}
      <div className="panel dish-breakdown"><div className="eyebrow"><span className="eyebrow-line" /> DISH BREAKDOWN</div>{generatedDishes.map((dish) => <div className="breakdown-dish" key={dish.id}><div className="breakdown-dish-head"><strong>{dish.name}</strong><span>{dish.category}</span></div>{dish.ingredients.filter((ingredient) => ingredient.name.trim() && ingredient.quantityPerPerson.trim()).map((ingredient) => <div className="breakdown-row" key={ingredient.id}><span>{ingredient.name}</span><span>{calculateIngredient(ingredient, generated.people)}</span></div>)}{!dish.ingredients.filter((ingredient) => ingredient.name.trim() && ingredient.quantityPerPerson.trim()).length && <small className="no-amounts">No ingredient amounts have been entered yet.</small>}</div>)}</div>
    </> : <div className="requirements-empty"><span className="requirements-illustration"><ClipboardList size={26} /></span><div className="eyebrow"><span className="eyebrow-line" /> YOUR REQUIREMENTS</div><h2>Good plans start<br />with a headcount.</h2><p>Enter the event details, choose dishes and we'll work out the ingredient list from your saved recipes.</p><div className="empty-step"><span>01</span><span>Choose your guest count</span></div><div className="empty-step"><span>02</span><span>Select dishes from your menu</span></div><div className="empty-step"><span>03</span><span>Get one combined shopping list</span></div></div>}</section></div>
  </div>
}

function DishChoice({ item, checked, onToggle }: { item: FoodItem; checked: boolean; onToggle: () => void }) {
  return <label className={`dish-choice ${checked ? 'checked' : ''}`}><input type="checkbox" checked={checked} onChange={onToggle} /><span className="custom-checkbox">{checked && <Check size={13} />}</span><span className="dish-choice-name"><strong>{item.name}</strong><small>{item.ingredients.length} ingredients</small></span><span className={`category-tag ${item.category === 'Vegetarian' ? 'veg' : item.category === 'Non-vegetarian' ? 'nonveg' : 'both'}`}>{item.category}</span></label>
}