export async function fetchResult(gameId, characterId, clickX, clickY) {
    const url = import.meta.env.VITE_SERVER_URL + `/game/${gameId}/character/${characterId}/check-mouse`
    try {
        const response = await fetch(url, {
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            method: "POST",
            body: JSON.stringify({ 
                clickX: clickX, 
                clickY: clickY
              })
        })
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json()
    } catch(err) {
        console.log("Error at fetchResult: ", err)
        throw err
    }
}

export async function postLeaderboard(username, gamename, seconds) {
    const url = import.meta.env.VITE_SERVER_URL + `/leaderboard`
    try {
        const response = await fetch(url, {
            headers: {
                "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify({ 
                username: username,
                gamename: gamename,
                seconds: seconds,
            })
        })
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
    } catch(err) {
        console.log("Error at fetchResult: ", err)
        throw err
    }
}

