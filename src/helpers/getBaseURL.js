export default function getBaseURL(path) {
    if (!path.startsWith("/")) {
        path = `/${path}`;
    }
    return `${process.env.NEXT_PUBLIC_BASE_DOMAIN}${path}`;
}
