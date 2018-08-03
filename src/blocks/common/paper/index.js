import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import styles from './styles.css';

function Paper(props) {
    const {
        className,
        children,
        raised,
        bordered,
        component: Component,
    } = props;

    return (
        <Fragment>
            <Component className={classNames(styles.container, className, {
                [styles.raised]: raised,
                [styles.bordered]: bordered,
            })}>
                {children}
            </Component>
        </Fragment>
    );
}

Paper.propTypes = {
    /**
     * The content of the component.
     */
    children: PropTypes.node,
    /**
     * @ignore
     */
    className: PropTypes.string,
    /**
     * The component used for the root node.
     * Either a string to use a DOM element or a component.
     */
    component: PropTypes.oneOfType([PropTypes.string, PropTypes.func, PropTypes.object]),
    /**
     * If `true`, the Paper will use raised styling.
     */
    raised: PropTypes.bool,
    /**
     * If `true`, the Paper will use bordered styling.
     */
    bordered: PropTypes.bool,
};

Paper.defaultProps = {
    raised: false,
    bordered: false,
    component: 'div',
};

export default Paper;