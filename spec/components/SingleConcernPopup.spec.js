/* @flow */
import { expect, shallow, React } from '../specHelper'
import { SingleConcernPopup } from '../../src/components/SingleConcernPopup'

function Anchor() {
  return <div className="anchor" />
}

function Content() {
  return <div className="content" />
}

function renderPopup(props) {
  return shallow(
    <SingleConcernPopup
      anchor={<Anchor />}
      content={<Content />}
      hovered
      popupPosition={{ vertical: 'down', horizontal: 'left' }}
      {...props}
    />
  )
}

describe('<SingleConcernPopup />', () => {
  it('shows anchor content which will show the popup when hovered over', () => {
    const popup = renderPopup({ anchor: <Anchor /> })
    expect(popup.find('Anchor')).to.exist
  })

  it('shows the popup content when hovered', () => {
    const popup = renderPopup({ content: <Content />, hovered: true })
    expect(popup.find('Content')).to.exist
  })

  it('hides the popup content when not hovered', () => {
    const popup = renderPopup({ hovered: false })
    expect(popup.find('Content')).not.to.exist
  })

  it('positions the content correctly', () => {
    const popup = renderPopup({
      content: <Content />,
      hovered: true,
      popupPosition: { vertical: 'up', horizontal: 'right' }
    })
    const popover = popup.find('.popover')
    expect(popover.hasClass('up')).to.equal(true)
    expect(popover.hasClass('down')).to.equal(false)
    expect(popover.hasClass('left')).to.equal(false)
    expect(popover.hasClass('right')).to.equal(true)
  })
})
