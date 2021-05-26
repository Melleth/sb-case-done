// Very simple abstraction that returns a JSON promise.
//  - Takes endpoint string that should include any parameters one might need.
//  - A more fleshed out version could accept some key/value pairs if we'd were
//    dealing with an API that takes optional parameters, 
//    e.g. REST filter stuff.
//  - For this project, it's just here for a single source of truth for api addr
//    and token details.
export async function apiRequest(endpoint, args = { method: 'GET', headers: new Headers()}) {
    const apiURL = 'http://178.62.198.162/api';
    const url = apiURL.concat(endpoint);
    args.headers.append('token', 'pj11daaQRz7zUIH56B9Z');
    return fetch(url, args)
        .then(response => response.json())
        .then(json => json)
}

export async function apiGet(endpoint) {
    return apiRequest(endpoint)
}

export async function apiPost(endpoint, body) {
    const args = {
        method: 'POST',
        headers: new Headers({'Content-Type': 'application/json'}),
        body: JSON.stringify(body),
    }
    return apiRequest(endpoint, args)
}