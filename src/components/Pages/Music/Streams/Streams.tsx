import React from "react";
import FadeIn from "../../../../utils/FadeIn/FadeIn";
import { Track } from "use-last-fm";

import "../Music.scss";

class Streams extends React.Component<
	Record<string, unknown>,
	{
		fetched: boolean;
		songs: Track[];
		error: null;
	}
> {
	constructor(props) {
		super(props);
		Object.assign(this, props);
		this.state = {
			fetched: false,
			songs: [],
			error: null
		};
	}

	componentDidMount() {
		const cachedSongs = JSON.parse(localStorage.getItem("songs") || "[]");
		if (cachedSongs.length > 0) {
			this.setState({
				fetched: true,
				songs: cachedSongs
			});
		}

		fetch(
			`http://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${process.env.REACT_APP_LASTFM_USERNAME}&api_key=${process.env.REACT_APP_LASTFM_API_KEY}&format=json&limit=10`
		)
			.then(res => res.json())
			.then(
				result => {
					this.setState({
						fetched: true,
						songs: result.recenttracks.track
					});
					localStorage.setItem(
						"songs",
						JSON.stringify(result.recenttracks.track)
					);
				},
				error => {
					this.setState({
						fetched: true,
						error
					});
				}
			);
	}

	render() {
		const { fetched, error, songs } = this.state;
		if (fetched && !error) {
			return (
				<FadeIn>
					<div className="streams__container">
						<p>Recently played</p>
						<div className="songs__container">
							{songs.map((song, index) => {
								if (song["@attr"]?.nowplaying === "true") {
									return (
										<div className="song__wrapper" key={index}>
											<img
												alt={song.name}
												src={
													song.image[song.image.length - 1]["#text"] ||
													"https://lastfm.freetls.fastly.net/i/u/300x300/2a96cbd8b46e442fc41c2b86b821562f.png"
												}
											></img>
											<div className="song" id={index.toString()}>
												<a href={song.url}>
													<p className="title">{song.name}</p>
													<p className="artist">{song.artist["#text"]}</p>
												</a>
											</div>
											<img
												alt="Now Playing"
												src={require("../../../../assets/now_playing.gif")}
												id="now-playing"
											/>
										</div>
									);
								} else {
									return (
										<div className="song__wrapper" key={index}>
											<img
												alt={song.name}
												src={
													song.image[song.image.length - 1]["#text"] ||
													"https://lastfm.freetls.fastly.net/i/u/300x300/2a96cbd8b46e442fc41c2b86b821562f.png"
												}
											></img>
											<div className="song" id={index.toString()}>
												<a href={song.url}>
													<p className="title">{song.name}</p>
													<p className="artist">{song.artist["#text"]}</p>
												</a>
											</div>
										</div>
									);
								}
							})}
						</div>
					</div>
				</FadeIn>
			);
		} else if (!fetched) {
			return (
				<FadeIn>
					<div className="streams__container">
						<p>Recently played</p>
						<div className="songs__container">
							<p>Fetching songs from Last.fm API...</p>
						</div>
					</div>
				</FadeIn>
			);
		} else if (fetched && error) {
			return (
				<FadeIn>
					<div className="streams__container">
						<p>Recently played</p>
						<div className="songs__container">
							<p>Failed to connect to Last.fm.</p>
						</div>
					</div>
				</FadeIn>
			);
		} else {
			return (
				<FadeIn>
					<div className="streams__container">
						<p>Recently played</p>
						<div className="songs__container">
							<p>
								Unexpected error occurred, double-check your API key/Username
								provided
							</p>
							<p>
								API fetch URL:
								`http://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=$
								{process.env.REACT_APP_LASTFM_USERNAME}&api_key=$
								{process.env.REACT_APP_LASTFM_API_KEY}&format=json&limit=10`
							</p>
						</div>
					</div>
				</FadeIn>
			);
		}
	}
}
export default Streams;
