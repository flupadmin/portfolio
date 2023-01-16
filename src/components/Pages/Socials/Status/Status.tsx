import React from "react";
import LocalClock from "../Clock/Clock";
import FadeIn from "../../../../utils/FadeIn/FadeIn";
import "./Status.scss";

class Status extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<FadeIn>
				<div className="status__container">
					<div className="clock clock__container">
						<LocalClock></LocalClock>
					</div>
					<div className="status">
						<a
							title="Discord"
							href="https://discord.com/users/368399721494216706"
						>
							<img
								alt="Lanyard"
								src="https://lanyard.kyrie25.me/api/368399721494216706?borderRadius=30px"
							/>
						</a>
					</div>
				</div>
			</FadeIn>
		);
	}
}
export default Status;
