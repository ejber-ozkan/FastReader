export function getORPIndex(word: string): number {
    const len = word.length;
    if (len <= 1) return 0;
    if (len >= 2 && len <= 5) return 1;
    if (len >= 6 && len <= 9) return 2;
    if (len >= 10 && len <= 13) return 3;
    return 4;
}

export function splitWordAtORP(word: string) {
    const index = getORPIndex(word);
    return {
        left: word.slice(0, index),
        center: word[index],
        right: word.slice(index + 1)
    };
}
