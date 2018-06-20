var React = require('react');

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
    }
    handleSubmit(id, username) {
        this.setState(function() {
            var newState = {}

            newState[id + 'Name'] = username;
            newState[id + 'Image'] = 'https://github.com/' + username + '.png?size=200';

            return newState;
        })
    }
    render() {
        var playerOneName = this.state.playerOneName;
        var playerTwoName = this.state.playerTwoName;

        return (
            <div>
                <div className="row">
                    {!playerOneName && 
                    <PlayerInput 
                        id = "playerOne"
                        label = "player One"
                        onSubmit = {this.handleSubmit} />}

                    {!playerTwoName && 
                    <PlayerInput 
                        id = "playerTwo"
                        label = "player Two"
                        onSubmit = {this.handleSubmit} />}
                </div>
            </div>
        )
    }
}

module.exports = PlayerInput;
module.exports = Battle;