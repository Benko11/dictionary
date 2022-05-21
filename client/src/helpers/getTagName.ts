export default async function getTagName(id: any) {
    const res = await fetch(`http://localhost:3000/tags/${id}`);

    if (!res.ok) {
        console.error('Something bad happened');
        return;
    }
    const data = await res.json();
    return data.title;
}
