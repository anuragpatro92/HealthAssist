export const getSymptomLabel = (option) => {
    return option.split('_').map(x => x[0].toUpperCase() + x.substring(1)).join(' ')
}