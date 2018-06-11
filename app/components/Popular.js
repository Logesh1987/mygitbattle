var React = require('react');
var api = require('../utils/api');

function SelectLanguage(props) {
    var languages = ['All', 'JavaScript', 'Ruby', 'Java', 'CSS', 'Python'];
    
    return (
        <ul className="languages">
            {languages.map(function (lang) {
                return (
                    <li
                        style={lang === props.selectedLanguage ? { color: '#d0021b' } : null}
                        onClick={props.onSelect.bind(null, lang)}
                        key={lang}>
                        {lang}
                    </li>
                )
            })}
        </ul>
    )
}

function RepoGrid(props) {
    return (
        <ul className="popular-list">
            {props.repos.map(function(repo, index){
                return (                    
                    <li key={repo.name} className="popular-item">
                        <h3>#{index + 1}</h3>
                        <img className="avatar" src={repo.owner.avatar_url} alt={'avatar for' + repo.owner.login} />
                        <a target="_blank" className="item-hit" href={repo.owner.html_url}>
                            {repo.owner.login}
                        </a>
                        <h4>{repo.name}</h4>
                        <small>{repo.stargazers_count} stars</small>
                    </li>
                )
            })}
        </ul>
    )    
}

class Popular extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedLanguage: 'All',
            repos: null
        }
        this.updateLanguage = this.updateLanguage.bind(this);
    }
    componentDidMount() {
        this.updateLanguage(this.state.selectedLanguage)
    }
    updateLanguage(lang) {
        this.setState(function(){
            return {
                selectedLanguage: lang,
                repos: null
            }
        })

        api.fetchPopularRepos(lang)
            .then(function(repos) {
                console.log(repos[0])
                this.setState(function(){
                    return {
                        repos: repos
                    }
                })
            }.bind(this))
    }
    render() {
        return (
            <div>
                <SelectLanguage selectedLanguage={this.state.selectedLanguage} onSelect={this.updateLanguage} />
                {!this.state.repos 
                    ? <p className="loader">LOADING</p>
                    : <RepoGrid repos={this.state.repos} />
                }
            </div>
        )
    }
}

module.exports = Popular;