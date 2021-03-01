export function first(string: string): string {
    return string.split(',')[0]
}

export function second(string: string): string {
    return string.split(',')[1]
}

export function capitalize(str: string) {
    return str.split(" ").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ")
}

export function formatClock(str: string) {
    if(str[0] === '0') return str.substring(1)
    return str
}

export function formatCity(str: string) {
    return str.charAt(0).toUpperCase() + str.substring(1, str.length - 2) + str.charAt(str.length - 2).toUpperCase() + str.charAt(str.length - 1).toUpperCase()
}
