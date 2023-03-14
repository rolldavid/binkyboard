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

export async function createNewBoard(boardName: string, access: boolean, registry: string) {
    const res = await fetch("/api/create-board", {
        method: "POST",
        body: JSON.stringify({
            boardName,
            access,
            registry
        }),
        headers: {
            "Content-Type": "application/json"
        }
    })
    const data = await res.json()
    return data;
}

export async function getBoard(boardId: string) {
    const res = await fetch("/api/get-board", {
        method: "POST",
        body: JSON.stringify({
            boardId
        }),
        headers: {
            "Content-Type": "application/json"
        }
    })
    const data = await res.json()
    return data;
}


// update

export async function updateStar({star, boardId}: {star: boolean, boardId: string}) {
    const res = await fetch("/api/update-star", {
        method: "POST",
        body: JSON.stringify({
            star,
            boardId
        }),
        headers: {
            "Content-Type": "application/json"
        }
    })
    const data = await res.json();
    return data;
}

export async function updateDisplayName(displayName: string) {
    const res = await fetch("/api/update-display-name", {
        method: "POST",
        body: JSON.stringify({
            displayName
        }),
        headers: {
            "Content-Type": "application/json"
        }
    })
    const data = await res.json();
    return data;
}

export async function updateHeader(url: string, boardId: string) {
    console.log("received in db utils....now call server")
    const res = await fetch("/api/update-header", {
        method: "POST",
        body: JSON.stringify({
            url,
            boardId
        }),
        headers: {
            "Content-Type": "application/json"
        }
    })
    const data = await res.json();
    console.log("added, now go back.....")
    return data;
}




