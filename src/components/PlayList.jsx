import React from "react";
import Song from "./Song";

const PlayList = ({
	songs,
	handleUpdateClick,
	handleAddPlay,
	handleDelete
}) => {
	const displaySongs = songs.map((song, i) => {
		return (
			<Song
				key={i}
				handleDelete={handleDelete}
				handleUpdateClick={handleUpdateClick}
				handleAddPlay={handleAddPlay}
				context={'playlist'}
				song={song}
			/>
		);
	});
	return (
		<section>
			{displaySongs}
		</section>
	);
};
export default PlayList;
