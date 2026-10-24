import { describe, expect, it } from 'vitest'
import { buildShoppingList, calculateIngredient } from './quantity'
import type { Ingredient, Unit } from '../types'

function ingredient(name: string, quantityPerPerson: string, unit: Unit): Ingredient {
  return { id: `${name}-${unit}-${quantityPerPerson}`, name, quantityPerPerson, unit }
}

describe('calculateIngredient', () => {
  it.each([
    [1, '200 g'],
    [10, '2 kg'],
    [100, '20 kg'],
    [1_000, '200 kg'],
  ])('scales 200 g per person to %s people as %s', (people, expected) => {
    expect(calculateIngredient(ingredient('Rice', '200', 'g'), people)).toBe(expected)
  })

  it('converts decimal litres to millilitres without floating-point arithmetic', () => {
    expect(calculateIngredient(ingredient('Oil', '.1', 'litre'), 3)).toBe('300 ml')
  })

  it('rounds entered precision beyond six decimal places using integers', () => {
    expect(calculateIngredient(ingredient('Spice', '1.2345678', 'g'), 1)).toBe('1.23 g')
  })
})

describe('buildShoppingList', () => {
  it('combines equal ingredients across grams and kilograms', () => {
    const list = buildShoppingList([
      { ingredients: [ingredient('Rice', '200', 'g')] },
      { ingredients: [ingredient(' rice ', '.3', 'kg')] },
    ], 10)
    expect(list).toEqual([{ name: 'Rice', total: '5 kg' }])
  })

  it('combines litres with millilitres but keeps different dimensions separate', () => {
    const list = buildShoppingList([{
      ingredients: [
        ingredient('Oil', '100', 'ml'),
        ingredient('oil', '.2', 'litre'),
        ingredient('Oil', '50', 'g'),
      ],
    }], 1)
    expect(list).toHaveLength(2)
    expect(list.map((item) => item.total)).toEqual(['300 ml', '50 g'])
  })

  it('omits blank or zero quantity rows', () => {
    const list = buildShoppingList([{
      ingredients: [ingredient('Rice', '', 'g'), ingredient('Salt', '0', 'g')],
    }], 100)
    expect(list).toEqual([])
  })
})