export default function (el) {
    const doc = el && el.ownerDocument;
    const docElem = doc && doc.documentElement;
    const body = doc && doc.body;

    const box = el.getBoundingClientRect ? el.getBoundingClientRect() : { left: 0, top: 0 };

    const clientLeft = docElem.clientLeft || body.clientLeft || 0;
    const clientTop = docElem.clientTop || body.clientTop || 0;

    return { left: box.left - clientLeft, top: box.top - clientTop };
}
