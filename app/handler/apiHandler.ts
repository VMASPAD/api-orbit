
export const User = async (username: string, email: string, id: string, nameUser: string) => {
    const requestData = {
        username: username,
        email: email,
        password: id,
        apis: [{ name: nameUser, content: [] }]
    }; 

    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER}/api/user`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestData),
        });
         
        
        const data = await response.json(); 
        return data;
    } catch (error) {
        console.error("Error creating user:", error);
        return error;
    }
}

export const createApi = async (apiName: string, username: string, email: string, id: string, nameUser: string) => {
    const requestData = {
        username: username,
        email: email,
        password: id,
        nameApi: apiName
    }; 
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER}/api/new`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
    });

}

export const getApi = async (username: string, email: string, id: string) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER}/api/content`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            "username": username,
            "email": email,
            "password": id
        },
    });
    const data = await response.json();
    return data;
}

export const postNewContent = async (apiName: string, content: any, username: string, email: string, id: string) => {
    const requestData = {
        username: username,
        email: email,
        password: id,
        nameApi: apiName,
        content: content
    }; 
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER}/api/newContent`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestData),
        });
        
        if (!response.ok) {
            // For HTTP errors (non-200 responses)
            return { 
                success: false, 
                message: `Error: ${response.status} ${response.statusText}` 
            };
        }
        
        const data = await response.json();
        return { ...data, success: true };
    } catch (error) {
        // For network errors (like connection refused)
        console.error('API call failed:', error);
        return { 
            success: false, 
            message: 'Connection error: Cannot connect to server' 
        };
    }
}

export const deleteApi = async (apiName: string, username: string, email: string, id: string) => {
    console.log(apiName, username, email, id)
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER}/api/deleteApi`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            "nameApi": apiName,
            "username": username,
            "email": email,
            "password": id
        },
    });
    const data = await response.json();
    return data;
}
export const deleteContent =  async (apiName: string, username: string, email: string, id: string, indexContent: string) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER}/api/deleteContent`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            "nameApi": apiName,
            "username": username,
            "email": email,
            "password": id,
            "contentid": indexContent
        }
    });
    const data = await response.json();
    return data;
}