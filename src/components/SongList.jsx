import React from "react";
import Song from "./Song";

const SongList = ({
	songs,
	handleUpdateClick,
	handleAddPlay,
	handleDelete,
}) => {
	const songDisplay = songs.map((song, i) => {
		return (
			<Song
				key={i}
				handleDelete={handleDelete}
				handleUpdateClick={handleUpdateClick}
				handleAddPlay={handleAddPlay}
				context={"songlist"}
				song={song}
			/>
		);
	});
	return (
		<section className="allsong-display">{songDisplay}</section>
	);
};
export default SongList;
