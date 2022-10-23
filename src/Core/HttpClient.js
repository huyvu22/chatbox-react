export default class HttpClient {
    callApi = async (url, method = 'GET', body=null) => {

        const options = {
            method: method,
            headers: {
                "Content-Type": "application/json"
            }
        }

        if (body!==null){
            options.body = JSON.stringify(body);
        }

        const response = await fetch(url, options);
        const data = await response.json();
        return {
            response: response,
            data: data
        };
    }

    get = (url, params={}) => {

        const queryString = new URLSearchParams(params).toString();

        return this.callApi(url+'?'+queryString);
    }

    post = (url, body) => {
        return this.callApi(url, 'POST', body);
    }

    put = (url, id, body) => {
        return this.callApi(url+'/'+id, 'PUT', body);
    }

    patch = (url, id, body) => {
        return this.callApi(url+'/'+id, 'PATCH', body);
    }

    delete = (url, id) => {
        return this.callApi(url+'/'+id, 'DELETE');
    }
}