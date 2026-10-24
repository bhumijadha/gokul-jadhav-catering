import type { Ingredient, Unit } from '../types'

// Keep quantities in micro-units so serving multipliers never use binary floating point.
const SCALE = 1_000_000n
const UNIT_TO_BASE: Record<Unit, bigint> = {
  g: 1n,
  kg: 1_000n,
  ml: 1n,
  litre: 1_000n,
  pieces: 1n,
}

function parseScaled(value: string): bigint {
  let normalized = value.trim().replace(',', '.')
  if (normalized.startsWith('.')) normalized = `0${normalized}`
  if (normalized.endsWith('.')) normalized = normalized.slice(0, -1)
  const match = normalized.match(/^(\d+)(?:\.(\d+))?$/)
  if (!match) return 0n
  const whole = match[1]
  const fraction = match[2] ?? ''
  const scaledFraction = BigInt(fraction.slice(0, 6).padEnd(6, '0'))
  const rounded = fraction.length > 6 && fraction[6] >= '5' ? 1n : 0n
  return BigInt(whole) * SCALE + scaledFraction + rounded
}

function formatScaled(value: bigint, decimals = 2): string {
  const factor = 10n ** BigInt(6 - decimals)
  const rounded = (value + factor / 2n) / factor
  const whole = rounded / (10n ** BigInt(decimals))
  const fraction = (rounded % (10n ** BigInt(decimals))).toString().padStart(decimals, '0')
  return fraction.replace(/0+$/, '') ? `${whole}.${fraction.replace(/0+$/, '')}` : whole.toString()
}

function bestUnit(baseAmount: bigint, kind: Unit): { amount: bigint; unit: string } {
  if (kind === 'g' || kind === 'kg') {
    return baseAmount >= 1_000n * SCALE
      ? { amount: baseAmount / 1_000n, unit: 'kg' }
      : { amount: baseAmount, unit: 'g' }
  }
  if (kind === 'ml' || kind === 'litre') {
    return baseAmount >= 1_000n * SCALE
      ? { amount: baseAmount / 1_000n, unit: 'L' }
      : { amount: baseAmount, unit: 'ml' }
  }
  return { amount: baseAmount, unit: 'pcs' }
}

function unitFamily(unit: Unit): 'mass' | 'volume' | 'count' {
  if (unit === 'g' || unit === 'kg') return 'mass'
  if (unit === 'ml' || unit === 'litre') return 'volume'
  return 'count'
}

export function calculateIngredient(ingredient: Ingredient, people: number): string {
  const onePerson = parseScaled(ingredient.quantityPerPerson) * UNIT_TO_BASE[ingredient.unit]
  const totalInBaseUnits = onePerson * BigInt(Math.max(0, Math.trunc(people)))
  const practical = bestUnit(totalInBaseUnits, ingredient.unit)
  return `${formatScaled(practical.amount)} ${practical.unit}`
}

export type ShoppingRequirement = {
  name: string
  total: string
}

export function buildShoppingList(
  dishes: { ingredients: Ingredient[] }[],
  people: number,
): ShoppingRequirement[] {
  const totals = new Map<string, { name: string; kind: Unit; amount: bigint }>()
  for (const dish of dishes) {
    for (const ingredient of dish.ingredients) {
      const name = ingredient.name.trim()
      if (!name) continue
      const baseAmount = parseScaled(ingredient.quantityPerPerson)
        * UNIT_TO_BASE[ingredient.unit]
        * BigInt(Math.max(0, Math.trunc(people)))
      if (baseAmount <= 0n) continue
      // Mass and volume are normalized before merging; unlike dimensions stay separate.
      const key = `${name.toLocaleLowerCase()}\u0000${unitFamily(ingredient.unit)}`
      const current = totals.get(key)
      if (current) {
        current.amount += baseAmount
      } else {
        totals.set(key, { name, kind: ingredient.unit, amount: baseAmount })
      }
    }
  }
  return [...totals.values()].map(({ name, kind, amount }) => {
    const practical = bestUnit(amount, kind)
    return { name, total: `${formatScaled(practical.amount)} ${practical.unit}` }
  }).sort((a, b) => a.name.localeCompare(b.name))
}