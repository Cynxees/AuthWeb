export const fetchData = async () => {

    
    const response = await fetch('/api/data');
    console.log(response);

    const data = await response.json();

    return data;


};