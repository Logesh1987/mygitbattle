var React = require('react');
var Link = require('react-router-dom').Link;

function PlayerPreview (props) {
    return (
        <div>
            <img 
                className="avatar" 
                src={props.avatar}
                alt = {'Avatar for' + props.username} />
            <h2>@{props.username}</h2>
            <button className="reset" onClick={props.onReset.bind(null, props.id)}>
                Reset
            </button>
        </div>
    )
}

class PlayerInput extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            username: ''
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange(e) {
        var value = e.target.value;

        this.setState(function() {
            return {
                username: value
            } 
        }) 
    }
    handleSubmit(e) {
        e.preventDefault();

        this.props.onSubmit(
            this.props.id,
            this.state.username
        )
    }
    render() {
        return (
            <form className="column" onSubmit={this.handleSubmit}>
                <label className="header" htmlFor="username">{this.props.label}</label>
                <input 
                    type="text" 
                    id="username" 
                    placeholder="github username" 
                    autoComplete = "off"
                    value = {this.props.username}
                    onChange = {this.handleChange}
                />
                <button
                    type = "submit"
                    className = "button"
                    disabled = {!this.state.username}>
                    Submit
                </button>
            </form>
        )
    }
}

class Battle extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            playerOneName: '',
            playertwoName: '',
            playerOneImage: null,
            playerTwoImage: null
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleReset = this.handleReset.bind(this);
    }
    handleSubmit(id, username) {
        this.setState(function() {
            var newState = {}

            newState[id + 'Name'] = username;
            newState[id + 'Image'] = 'https://github.com/' + username + '.png?size=200';

            return newState;
        })
    }
    handleReset(id) {
        this.setState(function() {
            var resetState = {}

            resetState[id + 'Name'] = '';
            resetState[id + 'Image'] = null;

            return resetState;
        })
    }
    render() {
        var match = this.props.match;
        var playerOneName = this.state.playerOneName;
        var playerTwoName = this.state.playerTwoName;
        var playerOneImage = this.state.playerOneImage;
        var playerTwoImage = this.state.playerTwoImage;

        return (
            <div className="battle">
                <div className="row">
                    {!playerOneName && 
                    <PlayerInput 
                        id = "playerOne"
                        label = "player One"
                        onSubmit = {this.handleSubmit} />}

                    {playerOneImage !== null && 
                    <PlayerPreview
                        avatar = {playerOneImage}
                        username = {playerOneName}
                        onReset = {this.handleReset}
                        id = "playerOne"
                    />}

                    {!playerTwoName && 
                    <PlayerInput 
                        id = "playerTwo"
                        label = "player Two"
                        onSubmit = {this.handleSubmit} />}
                    
                    {playerTwoImage !== null &&
                        <PlayerPreview
                            avatar={playerTwoImage}
                            username={playerTwoName}
                            onReset={this.handleReset}
                            id="playerTwo"
                        />}
                </div>
                {playerOneImage && playerTwoImage &&
                <Link
                    className="button"
                    to={{
                        pathname: match.url + '/results',
                        search: '?playerOneName=' + playerOneName + '&playerTwoName=' + playerTwoName
                    }}>
                        Battle
                </Link>}
            </div>
        )
    }
}

module.exports = PlayerPreview;
module.exports = PlayerInput;
module.exports = Battle;