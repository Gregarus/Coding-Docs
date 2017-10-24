/* @flow */
import * as React from 'react'
import cx from 'classnames'

type Position = ['up' | 'down', 'left' | 'right']

type Props = {
  preferredPosition: Position,
  anchor: React.Node,
  content: React.Node
}

type State = {
  showingPopupContent: boolean,
  position: Position
}

export default class extends React.Component<Props, State> {
  state = {
    showingPopupContent: false,
    position: ['down', 'right']
  }

  element: ?HTMLElement

  setElement = (element: ?HTMLElement) => {
    this.element = element
  }

  showPopupContent = () => {
    if (!this.element) {
      return
    }

    const { preferredPosition } = this.props

    this.setState({
      showingPopupContent: true,
      position: computePopoverPosition(this.element, preferredPosition)
    })
  }

  hidePopupContent = () => {
    this.setState({ showingPopupContent: false })
  }

  render() {
    const { anchor, content } = this.props
    const { showingPopupContent, position } = this.state

    return (
      <div
        className="popup-container"
        ref={this.setElement}
        onMouseEnter={this.showPopupContent}
        onMouseLeave={this.hidePopupContent}
      >
        {React.Children.only(anchor)}

        {showingPopupContent && (
          <div className={cx('popup', ...position)}>
            {React.Children.only(content)}
          </div>
        )}
      </div>
    )
  }
}

function computePopoverPosition(
  anchorElement: HTMLElement,
  preferredPosition: Position
): Position {
  if (!document.documentElement) {
    return preferredPosition
  }

  const {
    clientWidth: viewportWidth,
    clientHeight: viewportHeight
  } = document.documentElement

  const {
    top: anchorTop,
    bottom: anchorBottom,
    left: anchorLeft,
    right: anchorRight
  } = anchorElement.getBoundingClientRect()

  let verticalPosition
  if (anchorTop < 0.2 * viewportHeight) verticalPosition = 'down'
  else if (anchorBottom > 0.8 * viewportHeight) verticalPosition = 'up'
  else verticalPosition = preferredPosition[0]

  let horizontalPosition
  if (anchorLeft < 0.2 * viewportWidth) horizontalPosition = 'right'
  else if (anchorRight > 0.8 * viewportWidth) horizontalPosition = 'left'
  else horizontalPosition = preferredPosition[1]

  return [verticalPosition, horizontalPosition]
}
