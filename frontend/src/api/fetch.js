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