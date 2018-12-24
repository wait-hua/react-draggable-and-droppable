export default function (el, mode = 'outside') {
    if (mode === 'inside') {
        return { width: el.clientWidth, height: el.clientHeight };
    }

    if (mode === 'center') {
        return {
            width: (el.clientWidth + el.offsetWidth) / 2,
            height: (el.offsetHeight + el.clientHeight) / 2
        };
    }

    if (mode === 'outside') {
        return { width: el.offsetWidth, height: el.offsetHeight };
    }

    return {
        width: 0,
        height: 0
    };
}
