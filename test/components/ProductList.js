import assert from 'assert';
import React from 'react'
import { mount } from 'enzyme'
import ProductList from '../../lib/components/ProductList.jsx';
import { createRandomItem } from '../../lib/http-handle-api'
import times from 'lodash/times'
import groupBy from 'lodash/groupBy'

describe('<ProductList/>', () => {
  const defaultProps = {
    products: [],
    visibleSize: 50
  }

  it(`should render the given products`, () => {
    const props = Object.assign({}, defaultProps, {
      products: times(19, createRandomItem)
    })
    const children = mount(<ProductList {...props}/>).children()
    assert.equal(children.length, 19)
  })

  it(`should not render more products than visibleSize`, () => {
    const props = {
      products: times(19, createRandomItem),
      visibleSize: 18
    }
    const children = mount(<ProductList {...props}/>).children()
    assert.equal(children.length, 18)
  })

  describe('render ad every 20 products', () => {
    function testCounts({productCount, expectedAddCount}) {
      const props = Object.assign({}, defaultProps, {
        products: times(productCount, createRandomItem)
      })
      const children = mount(<ProductList {...props}/>).children()
      const componentNames = children.map(c => c.name())
      const groupedNames = groupBy(componentNames)
      assert.equal(children.length, productCount + expectedAddCount)
      assert.equal(groupedNames.Product.length, productCount)
      assert.equal(groupedNames.Ad.length, expectedAddCount)
    }
    it(`should insert an ad at 20 products`, () => {
      testCounts({productCount:20, expectedAddCount: 1})
    })
    it(`should insert 2 ads at 40 products`, () => {
      testCounts({productCount:40, expectedAddCount: 2})
    })
  })
})
