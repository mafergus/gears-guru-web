
export const flatten = object => object ? Object.entries(object).map(entry => ({ uid: entry[0], ...entry[1] })) : [];