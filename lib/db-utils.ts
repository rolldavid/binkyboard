// CREATE
export async function createNewBoard(boardName: string, access: boolean, registry: string, accessList: string) {
    const res = await fetch("/api/create-board", {
        method: "POST",
        body: JSON.stringify({
            boardName,
            access,
            registry,
            accessList
        }),
        headers: {
            "Content-Type": "application/json"
        }
    })
    const data = await res.json()
    return data;
}

// READ
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

export async function getBoardName(boardId: string) {
    const res = await fetch("/api/get-board-name", {
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


// UPDATE

export async function updateBoard(boardId: string, headerUrl: string, boardName: string, registryLink: string, accessStatus: boolean, accessList: string) {
    const res = await fetch("/api/update-board", {
        method: "POST",
        body: JSON.stringify({
            boardId,
            headerUrl,
            boardName,
            registryLink,
            accessStatus,
            accessList
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


// DELETE

export async function deleteUser(){
    const res = await fetch("/api/delete-user");
    return res;
}

export async function deleteBoard(boardId: string) {
    const res = await fetch("/api/delete-board", {
        method: "POST",
        body: JSON.stringify({
            boardId
        }),
        headers: {
            "Content-Type": "application/json"
        }
    })
    const data = await res.json();
    return data;
}