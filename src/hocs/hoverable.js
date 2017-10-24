/* @flow */
import * as React from 'react'

type AddedProps = {
  hovered: boolean
}

type State = {
  hovered: boolean
}

export default function<Props: {}>(
  Component: React.ComponentType<Props & AddedProps>
): React.ComponentType<Props> {
  return class extends React.Component<Props, State> {
    // $FlowFixMe
    static displayName = `Hoverable(${Component.displayName || Component.name})`

    state = {
      hovered: false
    }

    mouseEnter = () => {
      this.setState({ hovered: true })
    }

    mouseLeave = () => {
      this.setState({ hovered: false })
    }

    render() {
      const { hovered } = this.state

      return (
        <div onMouseEnter={this.mouseEnter} onMouseLeave={this.mouseLeave}>
          <Component {...this.props} hovered={hovered} />
        </div>
      )
    }
  }
}
