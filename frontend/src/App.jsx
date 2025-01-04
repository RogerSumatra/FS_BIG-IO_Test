import { useEffect, useState } from 'react';
import axios from 'axios';

const App = () => {
    const [stories, setStories] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/api/test')
            .then(response => setStories(response.data))
            .catch(error => console.error(error));
    }, []);

    return (
        <div>
            <h1>Coba Koneksi BE dan FE</h1>
            <ul>
                {stories.map(story => (
                    <li key={story.id}>{story.title}</li>
                ))}
            </ul>
        </div>
    );
};

export default App;