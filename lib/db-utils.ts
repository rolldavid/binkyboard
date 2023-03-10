export async function getUserSession() {
    const res = await fetch("/api/get-user-session")
    const data = await res.json()
    return data;
}

export async function getSession() {
    const res = await fetch("/api/get-session")
    return res.json()
}