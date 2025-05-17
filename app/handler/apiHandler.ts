
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
        throw error;
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
    const requestData = {
        username: username,
        email: email,
        password: id,
    }; 
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
    console.log(data)
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
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER}/api/newContent`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
    });
    const data = await response.json();
    return data;
}
