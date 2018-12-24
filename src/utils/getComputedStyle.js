export default function (el, property) {
    const computedStyle = window.getComputedStyle(el, null);
    return property ? computedStyle.getPropertyValue(property) : computedStyle;
}
