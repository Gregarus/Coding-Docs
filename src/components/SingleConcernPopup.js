/* @flow */
import * as React from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import cx from 'classnames'
import hoverable from '../hocs/hoverable'
import withElement from '../hocs/withElement'
import { popupPosition } from '../selectors'

type Props = {
  hovered: boolean,
  popupPosition: { vertical: 'up' | 'down', horizontal: 'left' | 'right' },

  anchor: React.Element<*>,
  content: React.Element<*>
}

export function SingleConcernPopup({
  hovered,
  anchor,
  content,
  popupPosition
}: Props) {
  return (
    <div>
      {anchor}
      {hovered && (
        <div
          className={cx(
            'popover',
            popupPosition.vertical,
            popupPosition.horizontal
          )}
        >
          <div className="popover-arrow" />
          {content}
        </div>
      )}
    </div>
  )
}

export default withElement(
  connect(
    createStructuredSelector({
      popupPosition
    }),
    {}
  )(hoverable(SingleConcernPopup))
)
