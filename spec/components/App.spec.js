/* @flow */
import { expect, shallow, React } from '../specHelper'
import { App } from '../../src/components/App'

describe('<App />', () => {
  it('renders the current count as well as the increment and decrement buttons', () => {
    const app = shallow(<App />)
    expect(app.find('Connect(CurrentCount)').length).to.equal(1)
    expect(app.find('Connect(IncrementCount)').length).to.equal(1)
    expect(app.find('Connect(DecrementCount)').length).to.equal(1)
  })
})
