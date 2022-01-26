export const capitalize = (string: string) => {
    const [firstLetter, ...trailing] = string.split('');
    return firstLetter.toUpperCase() + trailing.join('')
}