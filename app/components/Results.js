var React = require('react');
var queryString = require('query-string');
var api = require('../utils/api');
var Link = require('react-router-dom').Link;
var PlayerPreview = require('./PlayerPreview.js');
var Loading = require('./Loading');

function Profile(props) {
    var info = props.info;

    console.log(info)
    return (
        <PlayerPreview
            avatar={info.avatar_url}
            username={info.login}
        >
            <ul className="profileInfo">
                <li>Name: {info.login}</li>
                {info.location && <li>Location: {info.location}</li>}
                {info.company && <li>Company: {info.company}</li>}
                <li>Followers: {info.followers}</li>
                <li>Following: {info.following}</li>
                <li>Public Repos: {info.public_repos}</li>
                {info.blog && <li>{info.blog}</li>}                
            </ul>
        </PlayerPreview>
    )
}
function Player(props) {
    return (
        <div className="column">
            <h1>{props.label}</h1>
            <h3>Score: {props.score}</h3>
            <Profile info={props.profile}/>
        </div>
    )
}

class Results extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            winner: null,
            loser: null,
            error: null,
            loading: true
        }
    }
    componentDidMount() {
        var players = queryString.parse(this.props.location.search);

        api.battle([
            players.playerOneName,
            players.playerTwoName
        ]).then(function (players) {
            if (players === null) {
                return this.setState(function () {
                    return {
                        error: "Looks like as error",
                        loading: false
                    }
                })
            }

            this.setState(function () {
                return {
                    error: null,
                    winner: players[0],
                    loser: players[1],
                    loading: false
                }
            })
        }.bind(this))


    }
    render() {
        console.log(this.state)
        if (this.state.loading) {
            return (
                <Loading />
            )
        }
        if (this.state.error) {
            return (
                <div>
                    <p>{this.state.error}</p>
                    <Link className="button" to="/battle">Reset</Link>
                </div>
            )
        }
        return (
            <div className="row">
                <Player
                    label="Winner"
                    score={this.state.winner.score}
                    profile={this.state.winner.profile}
                />
                <Player
                    label="Loser"
                    score={this.state.loser.score}
                    profile={this.state.loser.profile}
                />
            </div>
        )
    }
}

module.exports = Results;