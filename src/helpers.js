export const getRandomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

export const log = (message, level = 'info') => {
    const color = 'blue';
    console.log(Math.floor(Date.now() / 1000) + ' %c' + message, `color:${color};`);
}