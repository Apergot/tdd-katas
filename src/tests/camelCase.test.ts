import { toCamelCase } from '../core/camelCase'

describe('Camel case converter', () => {
  it('Allows empty text', () => {
    expect(toCamelCase('')).toBe('')
  });

  it('Allows capitalized word', () => {
    expect(toCamelCase('Bear')).toBe('Bear')
  });

  it('Joins the capitalized word separated by spaces', () => {
    expect(toCamelCase('Teddy Bear')).toBe('TeddyBear')
  })

  it('Joins the capitalized word separated by hyphens', () => {
    expect(toCamelCase('Gummy_Teddy-Bear')).toBe('GummyTeddyBear')
  })

  it('Every first letter of each words should be a capital letter', () => {
    expect(toCamelCase('gummy teddy')).toBe('GummyTeddy')
  })

  it('Every word should only have first letter capitalized', () => {
    expect(toCamelCase('GuMMy-TeDdy Bear')).toBe('GummyTeddyBear')
  })
})