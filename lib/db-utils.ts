export async function getUserSession() {
    const res = await fetch("/api/get-user-session")
    const data = await res.json()
    return data;
}

export async function getSession() {
    const res = await fetch("/api/get-session")
    return res.json()
}

export async function getProfile(userId: string) {
    const res = await fetch("/api/get-profile", {
        method: "POST",
        body: JSON.stringify({
            userId: userId
        }),
        headers: {
            "Content-Type": "application/json"
        }
    })
    const data = await res.json()
    return data;
}