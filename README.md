# Drag and Drop 

[![npm](https://img.shields.io/npm/v/react-draggable-and-droppable.svg)](https://www.npmjs.com/package/react-draggable-and-droppable)

## Install
```bash
npm install --save react-draggable-and-droppable
```

## Drag拖拽对象
目前采用组件组合模式。此模式拖拽的源元素并不会移动。

### example
```tsx
import { Draggable } from 'react-draggable-and-droppable';

<Draggable 
    value={'jch'}
    onDrag={this.onDrag}>
    <div>
        <p>jch</p>
    </div>
</Draggable>
```

### props
| Prop/Attr | Type | Default | isNeed |  Description |
| --------- | ---- | ------- | ------ |  ----------- |
| value | any | '' | yes | 拖拽过程触发的事件都会将该值返回，标记拖拽的元素。|
| proxy | string | 'clone' | no | 拖拽时显示跟随鼠标的代理元素，默认为克隆自身元素DOM,可设为'', 不显示代理元素。 |
| proxyClass | string | 'z-dragproxy' | no | 上面clone的代理元素，外层会默认加个'z-dragproxy' class，可自定义拖拽时代理元素样式，同时拖拽元素也有个'draggable-source'，可自定义拖拽时元素的样式 |
| disabled | boolean | false | no | 是否可拖拽 |
### Event

- onDragStart
- onDrag
- onDragEnd

目前提供这几个事件，param都会返回几个关键信息
- origin: 拖拽源，React Componet。
- value: 拖拽元素设置的props value的值。
- pageX: 鼠标位置
- pageY: 鼠标位置


## Drop放置对象

### example
```tsx
import { Droppable } from 'react-draggable-and-droppable';

<Droppable onDrop={this.onDrop}>
    <div style={{width: '200px', height: '200px', background: 'red'}}>
        <p>放置拖拽元素区域</p>
    </div>
</Droppable>
```

### Event

- onDragEnter
- onDragOver
- onDragLeave
- onDrop

目前提供这几个事件，param都会返回几个关键信息
- origin: 拖拽源对象，React Component
- target: 拖拽放置对象。React Component
- value: 拖拽源的value值。
- pageX: 放置时鼠标位置。
- pageY: 放置时鼠标位置。