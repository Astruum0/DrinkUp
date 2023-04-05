interface logOutput {
    success: boolean,
    access_token?: string,
    error?: string
}

export const login = async (username: string, password: string): Promise<logOutput> => {
    try {
        let res = await fetch(`${process.env.REACT_APP_API_URL}/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
              },
            body: JSON.stringify({
                username, password
            })
        })
        let resJson = await res.json()
        if (resJson['access_token']) {
            return {
                success: true,
                access_token: resJson['access_token']
            }
        } else {
            return {
                success: false,
                error: "Invalid credentials"
            }
        }
    } catch (err) {
        console.log(err);
        return {
            success: false,
            error: "An error occured"
        }
    }
}