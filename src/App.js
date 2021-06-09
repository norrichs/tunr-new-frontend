import "./App.css";
import React from "react";
import { useEffect, useState } from "react";

import PlayList from "./components/PlayList";
import SongList from "./components/SongList";
import Form from "./components/Form";

function App() {
	// STATE
	const [songs, setSongs] = useState([]);
	const [playList, setPlayList] = useState([]);
	const [showForm, setShowForm] = useState(false);

	// Form component can have 1 of 2 modes - update or create
	//  default mode is 'create'.  All values are empty and submit button says 'Create'
	//  clicking a Song in SongList will trigger an update to formMode="update"
	//  in 'update' mode, the form submit button will read 'Update' and also there will be a 'Delete' button
	//
	//  formMode is passed as a prop to Form
	const [formMode, setFormMode] = useState(["Create"]);
	const [formDataForUpdate, setFormDataForUpdate] = useState({});
	// OTHER VARIABLES
	// const url = "https://songs-backend-app.herokuapp.com"; // Swith to this when deployed
	const url = "https://mnxg69suy1.execute-api.us-east-2.amazonaws.com/dev";
	//  handler Functions

	// triggered by clicking a Song component
	// updates formMode and formDataForUpdate to re-render Form


	const handleUpdateClick = (song) => {
		console.log("handle update song data: ", song);
		setFormMode("Update");
		setShowForm(true)
		setFormDataForUpdate({
			...song
		});
	};
	const handleCreate = (newSong) => {
		console.log("handleCreate new song", newSong);
		fetch(url + "/songs/", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(newSong),
		}).then(() => {
			getSongs();
		});
	};

	// triggered by submitting a form in 'update' mode
	// retrieves a song from the DB and updates it w/ new data
	const handleUpdate = (song) => {
		console.log(song);
		fetch(url + "/songs/" + song.id, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(song),
		}).then(getSongs());
	};

	const handleRemove = (song) => {
		console.log("remove song", song);
	};

	const handleDelete = (song) => {
		console.log("handleDelete triggered on song", song);
		const delId = song.id
		fetch(url + "/songs/" + delId, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
			},
		}).then((res) => {
			console.log('fetch delete response', res)
			setSongs(songs.filter((song)=>{
				return song.id !== delId
			}))
		});
	};

	const handleAddPlay = (song) => {
		console.log("addPlay", song);
		setPlayList([...playList, song]);
	};
	//  other Functions
	const getSongs = () => {
		console.log("getSongs");
		fetch(url + "/songs/")
			.then((res) => {
				console.log("getSongs response", res);
				return res.json();
			})
			.then((data) => {
				console.log("getSongs body", data.body);
				setSongs(data.body);
			});
	};

	const visibleForm = () => {
		return (
			<Form
				handleUpdate={handleUpdate}
				handleCreate={handleCreate}
				mode={formMode}
				song={formDataForUpdate}
			/>
		);
	};

	useEffect(() => {
		getSongs();
	}, []);

	return (
		<div className="App">
			<header className="app-header">
				<h1>Tunr</h1>
			</header>
			<h2>Playlist</h2>
			<section className="playlist">
				<PlayList
					handleDelete={handleDelete}
					handleAddPlay={handleAddPlay}
					handleUpdateClick={handleUpdateClick}
					songs={playList}
				/>
			</section>
			<h2>Song List</h2>
			<section className="songlist">
				<SongList
					handleDelete={handleDelete}
					handleAddPlay={handleAddPlay}
					handleUpdateClick={handleUpdateClick}
					songs={songs}
				/>
			</section>
			<section className="form-box">
				<h3
					onClick={() => {
						setShowForm(showForm ? false : true);
					}}
				>
					{formMode} a Song
				</h3>
				{showForm ? visibleForm() : <></>}
			</section>
		</div>
	);
}

export default App;
