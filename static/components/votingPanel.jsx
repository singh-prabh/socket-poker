import React from 'react';

class VotingPanel extends React.Component {
	render() {
		var votes = this.props.values.map((value, index) => {
			return <a key={index} className="waves-effect waves-light btn">{value}</a>
		});
		return (
			<div className="votingPanel">
				{votes}
			</div>
		);
	}
}
export default VotingPanel;