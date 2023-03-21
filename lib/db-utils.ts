

// CREATE
export async function createNewBoard(boardName: string, access: "ONE" | "TWO" | "THREE", registry: string | null, accessList: string) {
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

export async function createNewPost(boardId: string, note: string, slugs: string[]) {
    const res = await fetch("/api/create-post", {
        method: "POST",
        body: JSON.stringify({
            boardId,
            note,
            slugs
        }),
        headers: {
            "Content-Type": "application/json"
        }
    })
    const data = await res.json()
    return data;
}

// READ

export async function getPostUser(userId: string) {
    const res = await fetch("/api/get-post-user", {
        method: "POST",
        body: JSON.stringify({
            userId
        }),
        headers: {
            "Content-Type": "application/json"
        }
    })
    const data = await res.json()
    return data;
}

export async function getBoardOptions(boardId: string) {
    const res = await fetch("/api/get-board-options", {
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

export async function getBoardHeader(boardId: string) {
    const res = await fetch("/api/get-board-header", {
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

export async function getPosts(boardId: string) {
    const res = await fetch("/api/get-posts", {
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


export async function getUserSession() {
    const res = await fetch("/api/get-user-session")
    const data = await res.json()
    return data;
}

export async function getUserBoards() {
    const res = await fetch("/api/get-user-boards")
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

export async function updateBoard(boardId: string, headerUrl: string, boardName: string, registryLink: string | null, accessStatus: string, accessList: string | null) {
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

export async function deletePost({boardId, postId}: {boardId: string, postId: number} ) {
    const res = await fetch("/api/delete-post", {
        method: "POST",
        body: JSON.stringify({
            boardId,
            postId
        }),
        headers: {
            "Content-Type": "application/json"
        }
    })
    const data = await res.json();
    return data;
}