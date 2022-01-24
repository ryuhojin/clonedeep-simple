function clone(type, hash = new WeakMap) {
    const referenceTypes = ['Array', 'Object', 'Map', 'Set', 'Date'];
    const isType = Object.prototype.toString.call(type);
    if (
        !new RegExp(referenceTypes.join('|')).test(isType) ||
        type instanceof WeakMap ||
        type instanceof WeakSet
    ) return type;
    
    if (hash.has(type)) {
        return hash.get(type);
    }
    const c = new type.constructor;

    if (type instanceof Map) {
        type.forEach((value, key) => c.set(clone(key), clone(value)));
    }
    if (type instanceof Set) {
        type.forEach((value) => c.add(clone(value)));
    }
    if (type instanceof Date) {
        return new Date(type);
    }
    hash.set(type, c);
    return Object.assign(c, ...Object.keys(type).map((prop) => ({ [prop]: clone(type[prop], hash) })));
}
export default clone;