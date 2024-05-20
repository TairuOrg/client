export default function extract(cookies: string[]) {
    return cookies[0].split(';')[0].split('=')[1]
}