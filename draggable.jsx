import React, { PureComponent } from 'react';
import ReactDOM from 'react-dom';
import getPosition from '@/utils/getPosition';
import getSize from '@/utils/getSize';
import getComputedStyle from '@/utils/getComputedStyle';
import PropTypes from 'prop-types';
import manager from './manager';

class Draggable extends PureComponent {
    $el = null;

    static propTypes = {
        proxy: PropTypes.string,
        proxyClass: PropTypes.string,
        disabled: PropTypes.bool,
        onDragStart: PropTypes.func,
        onDrag: PropTypes.func,
        onDragEnd: PropTypes.func,
        // 目前先暂时定义这几个类型
        value: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.object,
            PropTypes.number,
        ]).isRequired,
        children: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.node,
            PropTypes.element
        ]).isRequired
    };

    static defaultProps = {
        proxy: 'clone',
        proxyClass: 'z-dragproxy',
        disabled: false,
        onDragStart: () => {},
        onDrag: () => {},
        onDragEnd: () => {},
    };

    componentDidMount() {
        // eslint-disable-next-line react/no-find-dom-node
        this.$el = ReactDOM.findDOMNode(this);
    }

    onMousedown = (event) => {
        event.preventDefault();
        if (this.props.disabled) return;

        Object.assign(manager, {
            screenX: event.screenX,
            screenY: event.screenY,
            clientX: event.clientX,
            clientY: event.clientY,
            pageX: event.pageX,
            pageY: event.pageY,
            startX: event.clientX,
            startY: event.clientY,
            dragX: 0,
            dragY: 0
        });

        window.addEventListener('mousemove', this.onMouseMove);
        window.addEventListener('mouseup', this.onMouseUp);
    };

    onMouseMove = (event) => {
        event.preventDefault();
        Object.assign(manager, {
            screenX: event.screenX,
            screenY: event.screenY,
            clientX: event.clientX,
            clientY: event.clientY,
            pageX: event.pageX,
            pageY: event.pageY,
            dragX: event.clientX - manager.startX,
            dragY: event.clientY - manager.startY
        });

        if (manager.dragging) {
            this.onMouseMoving(event);
        } else {
            this.onMouseMoveStart(event);
        }
    };

    onMouseMoveStart = () => {
        // 开始移动, 获取代理元素，先clone本身吧
        const proxy = this.getproxy();
        const computedStyle = proxy ? window.getComputedStyle(proxy) : { left: null, top: null };
        if (!computedStyle.left || computedStyle.left === 'auto') computedStyle.left = '0px';
        if (!computedStyle.top || computedStyle.top === 'auto') computedStyle.top = '0px';

        Object.assign(manager, {
            dragging: true,
            proxy,
            value: this.props.value,
            startLeft: +computedStyle.left.slice(0, -2),
            startTop: +computedStyle.top.slice(0, -2),
            droppable: undefined
        });

        manager.left = manager.startLeft;
        manager.top = manager.startTop;

        // 拖拽开始
        this.dragStart();
    };

    onMouseMoving = (event) => {
        // 拖拽约束
        const next = Draggable.defaultConstraint(manager);

        // 设置位置
        if (manager.proxy) {
            manager.proxy.style.left = `${next.left}px`;
            manager.proxy.style.top = `${next.top}px`;
        }

        // 更新当前位置
        manager.left = next.left;
        manager.top = next.top;

        this.drag();
        if (!manager.dragging) return;

        let pointEl;
        if (manager.proxy) {
            manager.proxy.style.display = 'none';
            pointEl = document.elementFromPoint(event.clientX, event.clientY);
            manager.proxy.style.display = '';
        } else pointEl = document.elementFromPoint(event.clientX, event.clientY);
        
        let pointDroppable = null;
        // 查找是否进入到drop的元素中去

        pointDroppable = manager.droppables.find((droppable) => {
            if (droppable.$el) {
                return droppable.$el.contains(pointEl);
            }
            return false;
        });
        
        if (manager.droppable !== pointDroppable) {
            if (manager.droppable) {
                manager.droppable.dragLeave(this);
            }
            if (!manager.dragging) return;
            if (pointDroppable) {
                pointDroppable.dragEnter(this);
            }
            manager.droppable = pointDroppable;
        }
        // dragEnter之后也要dragOver
        if (pointDroppable) {
            pointDroppable.dragOver(this);
        }
    };

    onMouseUp = () => {
        window.removeEventListener('mousemove', this.onMouseMove);
        window.removeEventListener('mouseup', this.onMouseUp);

        if (manager.dragging) {
            
            this.dragEnd();
            if (typeof manager.droppable !== 'undefined') {
                manager.droppable.drop(this);
            }

            this.cancel();
        }
    };

    dragStart = () => {
        if (!(this.$el instanceof Element)) {
            return;
        }
        this.$el.classList.add('draggable-source');
        if (manager.proxy) {
            manager.proxy.classList.add(this.props.proxyClass);
        }
        let cancel = false;
        const { onDragStart } = this.props;
        onDragStart(
            Object.assign(
                {
                    origin: this,
                    preventDefault: () => { cancel = true; }
                },
                manager
            )
        );

        if (cancel) {
            this.dragEnd();
            this.cancel();
        }
    };

    drag = () => {
        const { onDrag } = this.props;
        onDrag(
            Object.assign(
                {
                    origin: this
                },
                manager
            )
        );
    };

    dragEnd = () => {
        if (!(this.$el instanceof Element)) {
            return;
        }
        this.$el.classList.remove('draggable-source');

        const { onDragEnd } = this.props;
        onDragEnd(
            Object.assign(
                {
                    origin: this
                },
                manager
            )
        );

        if (manager.proxy) {
            // 清除proxy节点
            // manager.proxy.parentElement.removeChild(manager.proxy);
            document.body.removeChild(manager.proxy);
        }
    };

    cancel = () => {
        Object.assign(manager, {
            dragging: false,
            value: undefined,
            proxy: undefined,
            screenX: 0,
            screenY: 0,
            clientX: 0,
            clientY: 0,
            pageX: 0,
            pageY: 0,
            startX: 0,
            startY: 0,
            dragX: 0,
            dragY: 0,
            startLeft: 0,
            startTop: 0,
            left: 0,
            top: 0,
            droppable: undefined
        });
    };

    getproxy = () => {
        if (!(this.$el instanceof Element)) {
            return '';
        }
        // 默认是clone
        if (this.props.proxy === 'clone') {
            const proxy = this.$el.cloneNode(true);
            Draggable.setProxyFixed(proxy, getPosition(this.$el));
            const size = getSize(this.$el);
            proxy.style.width = `${size.width}px`;
            proxy.style.height = `${size.height}px`;

            // this.$el.appendChild(proxy);
            document.body.appendChild(proxy);
            return proxy;
        }
        return '';
    };

    static initProxy(proxy) {
        const obj = proxy;
        // 如果position为static，则设置为relative，保证可以移动
        if (getComputedStyle(proxy, 'position') === 'static') {
            obj.style.position = 'relative';
        }
    }

    static setProxyFixed(proxy, position = { left: 0, top: 0 }) {
        const obj = proxy;
        obj.style.left = `${position.left}px`;
        obj.style.top = `${position.top}px`;
        obj.style.zIndex = '99';
        obj.style.position = 'fixed';
        obj.style.display = '';
    }

    static defaultConstraint(params) {
        return {
            left: params.startLeft + params.dragX,
            top: params.startTop + params.dragY
        };
    }

    render() {
        const { children } = this.props;
        return React.cloneElement(children, {
            onMouseDown: this.onMousedown
        });
    }
}

export default Draggable;
