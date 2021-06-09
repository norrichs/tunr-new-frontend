import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faCut, faEdit } from "@fortawesome/free-solid-svg-icons";

const Song = (props) => {
	const formatLength = (l) => {
		const s = parseInt(l);
		return `${Math.floor(s / 60)}:${("00" + (s % 60)).slice(-2)}`;
	};
	return (
		<article
			// onClick={() => {
			// 	props.handleUpdateClick(props.song);
			// }}
			className="song-component"
		>
			<div className="song-title">{props.song.title}</div>
			<div className="song-artist">{props.song.artist}</div>
			<div className="song-length">{formatLength(props.song.length)}</div>

			<div className="button-group">
				<button
					className="update-button"
					onClick={() => {
						props.handleUpdateClick(props.song);
					}}
				>
					<FontAwesomeIcon icon={faEdit} />
				</button>

				<button
					className="delete-button"
					onClick={() => {
						props.handleDelete(props.song);
					}}
				>
					<FontAwesomeIcon icon={faCut} />
				</button>
				<button
					className="play-button"
					onClick={() => {
						props.handleAddPlay(props.song);
					}}
				>
					<FontAwesomeIcon icon={faPlay} />
				</button>
			</div>
		</article>
	);
};
export default Song;
