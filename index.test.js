import test from 'ava'
import * as knowledge from '.'

const verifyOneResult = (engine, query, type, description) => async t => {
  const results = await knowledge.search(query, type)
  const top = results.top

  t.is(top.result.description, description)
  t.true(top.result['@type'].includes(type))
  t.true(top.resultScore > 50)
}

test('List of all entities', t => {
  t.true(knowledge.entities.includes('Book'))
  t.is(knowledge.entities.length, 21)
})

test('Supports Google by default', verifyOneResult(knowledge, 'The Old Man and the Sea', 'Book', 'Novel by Ernest Hemingway'))

test('Supports Google', verifyOneResult(knowledge.google, 'The Catcher in the Rye', 'Book', 'Novel by J. D. Salinger'))
