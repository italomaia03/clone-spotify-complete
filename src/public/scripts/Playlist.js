class Playlist {
    static API_URL = "http://localhost:3000/api/v1";
    constructor(id, name, description, userId, songs) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.userId = userId;
        this.songs = songs;
    }

    static async delete(id) {
        const res = await fetch(Playlist.API_URL + `/playlists/${id}`, {
            method: "DELETE",
        });
        if (res.status <= 299) {
            const { msg } = await res.json();
            alert(`${msg}`);
            renderPlaylists();
        } else {
            const { error } = await res.json();
            alert(`${error}`);
        }
    }

    static async update(id, args) {
        const res = await fetch(Playlist.API_URL + `/playlists/${id}`, {
            method: "PUT",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify(args),
        });

        if (res.status <= 299) {
            const { msg } = await res.json();
            alert(`${msg}`);
            renderPlaylists();
        } else {
            const { error } = await res.json();
            alert(`${error}`);
        }
    }

    static render(id, name, songs, desc) {
        return `
        <div class="playlist-img-container">
            <img
                src="https://picsum.photos/48"
                alt="playlist-img"
            />
        </div>
        <div class="playlist-info">
            <p class="playlist-name">
                ${name}
            </p>
            <p class="playlist-number-songs">
                ${songs.length} songs
            </p>
        </div>
        <div class="playlist-edit">
            <button
                class="playlist-edit-button${id}"
                
            >
                Edit
            </button>
            <button
                class="playlist-delete-button${id}"
                
            >
                Delete
            </button>
        </div>
        <dialog>
            <div class="playlist-edit-container">
                <div class="dialog-header">
                    <h3>Edit details</h3>
                    <button class="close-dialog">X</button>
                </div>
                <div class="dialog-form">
                    <form>
                        <label for="playlist-name-edit"
                            >Name</label
                        >
                        <input
                            type="text"
                            id="pl${id}-name"
                            placeholder="Playlist name"
                            value="${name || ""}"
                        />
                        <label>Description</label
                        >
                        <textarea
                            id="pl${id}-desc"
                            cols="30"
                            rows="10"
                            value="${desc || ""}"
                        ></textarea>
                        <button
                            id="pl${id}"
                            type="submit"
                        >
                            Save
                        </button>
                    </form>
                </div>
            </div>
        </dialog>
    `;
    }
}
