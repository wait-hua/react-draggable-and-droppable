import React, { PureComponent } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import manager from './manager';

class Droppable extends PureComponent {
    $el = null;

    static propTypes = {
        onDragEnter: PropTypes.func,
        onDragOver: PropTypes.func,
        onDragLeave: PropTypes.func,
        onDrop: PropTypes.func,
        children: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.node,
            PropTypes.element
        ]).isRequired
    };

    static defaultProps = {
        onDragEnter: () => {},
        onDragOver: () => {},
        onDragLeave: () => {},
        onDrop: () => {}
    };

    componentDidMount() {
        // eslint-disable-next-line react/no-find-dom-node
        this.$el = ReactDOM.findDOMNode(this);
        manager.droppables.push(this);
    }

    componentWillUnmount() {
        manager.droppables.splice(manager.droppables.indexOf(this), 1);
    }

    dragEnter = (origin) => {
        if (this.$el && this.$el instanceof Element) {
            this.$el.classList.add('droppable-target', 'droppable-target');
        }

        const { onDragEnter } = this.props;
        onDragEnter(
            Object.assign(
                {
                    origin,
                    target: this
                },
                manager
            )
        );
    };

    dragOver = (origin) => {
        const { onDragOver } = this.props;
        onDragOver(
            Object.assign(
                {
                    origin,
                    target: this
                },
                manager
            )
        );
    };

    dragLeave = (origin) => {
        if (this.$el && this.$el instanceof Element) {
            this.$el.classList.remove('droppable-target');
        }
        const { onDragLeave } = this.props;
        onDragLeave(
            Object.assign(
                {
                    origin,
                    target: this
                },
                manager
            )
        );
    };

    drop = (origin) => {
        const { onDrop } = this.props;
        onDrop(
            Object.assign(
                {
                    origin,
                    target: this
                },
                manager
            )
        );
    };

    render() {
        const { children } = this.props;
        return <React.Fragment>{children}</React.Fragment>;
    }
}

export default Droppable;
