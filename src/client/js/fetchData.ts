export default function fetchData(data: any, method: string, route: string, success: Function) {
    fetch(route, {
            method: method, // or 'PUT'
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        .then((res) => {
            success(res)
        })
        .catch((error) => {
            console.log(error);
        });
}
