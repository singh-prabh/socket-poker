import { h, Component } from 'preact';
import style from './style';
import Chat from './chat';
import VotingUsers from '../../containers/votingUsers';
import IssueList from './issueList';
import VotingPanel from './votingPanel';

let state = {
	currentUser: 'guy',
	messages: [
		{ id: 1, author: 'guy', content: 'hello' },
		{ id: 0, author: 'someoneelse', content: 'whattaup' }
	],
	users: [
		{ id: 1, name: 'guy', vote: '' },
		{ id: 0, name: 'someoneelse', vote: 10 }
	],
	issues: [
		{ id: 1, title: 'Add Socket Support', description: 'Update the UI via socket responses', score: '' },
		{ id: 0, title: 'Custom Votes', description: 'Allow custom voting numbers', score: '' }
	],
	voteValues: [
		'0',
		'1/2',
		'1',
		'2',
		'3',
		'5',
		'8',
		'13',
		'20',
		'40',
		'100',
		'?',
		'💯'
	]
};

export default class Home extends Component {
	render() {
		return (
			<div className="cyan darken-1">
				<div className="row">
					<div className="col s6">
						<IssueList issues={state.issues} />
					</div>
					<div className="col s6">
						<Chat messages={state.messages} />
						<VotingUsers />
						<VotingPanel values={state.voteValues} />
					</div>
				</div>
			</div>
		);
	}
}
