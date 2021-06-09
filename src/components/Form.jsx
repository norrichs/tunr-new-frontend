import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusSquare, faPlay, faCut, faEdit } from "@fortawesome/free-solid-svg-icons";


const Form = (props) => {
	//STATE FOR THE FORM
	const [formData, setFormData] = React.useState({
		title: "",
		artist: "",
		length: "",
	});
	console.log("form props song", props.song);
  console.log('current form data', formData)
	
  //FUNCTIONS
	const handleSubmit = (event) => {
		event.preventDefault(); // Prevent Form from Refreshing
		props.handleSubmit(formData); // Submit to Parents desired function
		props.history.push("/"); //Push back to display page
	};
  
  const formatDisplayTime = (seconds) => {
    const s = parseInt(seconds)
    return `${Math.floor(s/60)}":"${s%60}`
  }


	const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
	};
	function sayUpdate() {
    alert("Song has been updated!");
	}
  
  React.useEffect(()=>{
    props.song === {} ? console.log("no song") : setFormData({ ...props.song });

  },[])
	return (
		<form
			className="song-form"
			onSubmit={(e) => {
				props.handleCreate(formData);
				e.preventDefault();
			}}
		>
			<input
				type="text"
				name="title"
				value={formData.title}
				onChange={handleChange}
				placeholder="Song Title"
			/>

			<input
				type="text"
				name="artist"
				value={formData.artist}
				onChange={handleChange}
				placeholder="Artist"
			/>
			<input
				type="text"
				name="length"
				value={formData.length}
				onChange={handleChange}
				placeholder="Song Length"
			/>
			<div className="button-group">
				<button type="submit" value={props.label}>
					<FontAwesomeIcon icon={faPlusSquare}/>
				</button>
				<button onClick={sayUpdate}>
					<FontAwesomeIcon icon={faEdit}/></button>
			</div>
		</form>
	);
};

export default Form;
