var React = require('react');

function PlayerPreview(props) {
    return (
        <div>
            <img
                className="avatar"
                src={props.avatar}
                alt={'Avatar for' + props.username} />
            <h2>@{props.username}</h2>
            {props.children}
        </div>
    )
}

module.exports = PlayerPreview;