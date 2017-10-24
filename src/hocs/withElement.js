/* @flow */
import * as React from 'react'

type AddedProps = {
  element: HTMLElement
}

type State = {
  element: ?HTMLElement
}

export default function<Props: {}>(
  Component: React.ComponentType<Props & AddedProps>
): React.ComponentType<Props> {
  return class extends React.Component<Props, State> {
    // $FlowFixMe
    static displayName = `WithElement(${Component.displayName ||
      Component.name})`

    state = {
      element: null
    }

    setElement = element => {
      this.setState({ element })
    }

    render() {
      const { element } = this.state

      return (
        <div ref={this.setElement}>
          {element && <Component {...this.props} element={element} />}
        </div>
      )
    }
  }
}
