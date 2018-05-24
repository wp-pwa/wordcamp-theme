import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { inject } from 'mobx-react';
import { Slot } from 'react-slot-fill';

const SlotInjector = ({ slots, children, ...fillChildProps }) => {
  // If children is a function
  if (typeof children === 'function') {
    return children(
      slots.map(({ position, names, className }) => ({
        position,
        element: (
          <Fragment key={`${position}_${names.join('_')}`}>
            {names.map(name => (
              <Slot
                key={`${position}_${name}`}
                name={name}
                className={className}
                fillChildProps={fillChildProps}
              />
            ))}
          </Fragment>
        ),
      })),
    );
  }
  // If children is an array of elements or a single element
  const withInjects = children instanceof Array ? [...children] : [children];

  slots.forEach(({ position, names, className }) => {
    if (position <= withInjects.length) {
      // creates a Slot component for each name in the slot
      const slotsToFill = names.map(name => (
        <Slot
          key={`${position}_${name}`}
          name={name}
          className={className}
          fillChildProps={fillChildProps}
        />
      ));
      // places the Slot components created in their positions
      withInjects.splice(position, 0, ...slotsToFill);
    }
  });
  return <Fragment>{withInjects}</Fragment>;
};

SlotInjector.propTypes = {
  slots: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  children: PropTypes.oneOfType([
    PropTypes.shape({}),
    PropTypes.arrayOf(PropTypes.shape({})),
    PropTypes.func,
  ]),
  item: PropTypes.shape({
    type: PropTypes.string,
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    page: PropTypes.number,
  }),
  column: PropTypes.shape({
    index: PropTypes.number,
  }),
  active: PropTypes.bool,
};

SlotInjector.defaultProps = {
  children: [],
  item: {},
  column: {},
  active: undefined,
};

const emptyArray = [];

export default inject(({ theme }, { item, column }) => {
  if (item) {
    return { slots: theme.getSlotsForItem(item) };
  }
  if (column) {
    return { slots: theme.getSlotsForColumn(column) };
  }
  return { slots: emptyArray };
})(SlotInjector);
