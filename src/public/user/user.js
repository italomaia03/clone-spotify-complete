const logout = document.querySelector(".login-btn");
const apiUrl = User.API_URL;
const playlistsContainer = document.querySelector("#playlists");
const playlistCreateButton = document.querySelector("#playlist-creator");

playlistCreateButton.addEventListener("click", async () => {
    const res = await fetch(apiUrl + "/playlists", {
        method: "POST",
        credentials: "same-origin",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({}),
    });
    if (res.status <= 299) {
        const { msg } = await res.json();
        alert(`${msg}`);
        renderPlaylists();
    } else {
        const { error } = await res.json();
        alert(`${error}`);
    }
});

logout.addEventListener("click", async () => {
    const res = await User.logout(User.API_URL + "/logout");
    const { msg } = await res.json();
    alert(`${msg}`);
    window.location.href = "../index.html";
});

const renderPlaylists = async () => {
    playlistsContainer.innerHTML = "";
    const res = await fetch(apiUrl + "/playlists");
    const { playlists } = await res.json();
    playlists.map(async (playlist) => {
        let li = document.createElement("li");
        li.className = "playlist-element";
        li.id = `playlist${playlist.id}`;
        li.innerHTML = Playlist.render(
            playlist.id,
            playlist.name,
            playlist.songs,
            playlist.desc || ""
        );
        playlistsContainer.appendChild(li);
        const submitEdit = document.querySelector(`#pl${playlist.id}`);
        const editPlName = document.querySelector(`#pl${playlist.id}-name`);
        const editPlDesc = document.querySelector(`#pl${playlist.id}-desc`);
        const editButton = document.querySelector(
            `.playlist-edit-button${playlist.id}`
        );
        const deleteButton = document.querySelector(
            `.playlist-delete-button${playlist.id}`
        );
        const editDialogScreen = document.querySelector("dialog");
        const closeDialog = document.querySelector(".close-dialog");
        editButton.addEventListener("click", () => {
            editDialogScreen.showModal();
        });

        closeDialog.addEventListener("click", () => {
            editDialogScreen.close();
        });

        submitEdit.addEventListener("click", async (e) => {
            e.preventDefault();
            const updatedPlaylist = {
                name: editPlName.value,
                description: editPlDesc.value || "",
            };
            await Playlist.update(playlist.id, updatedPlaylist);
        });

        deleteButton.addEventListener("click", async () => {
            await Playlist.delete(playlist.id);
        });
    });
};

renderPlaylists();
