import React from 'react';
import { withRouter } from 'react-router-dom';

class PlayerForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tag: "",
            score: 0
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.createPlayer(this.state)
        .then(this.props.history.push('/game'))
    };

    updateType(type) {
        return (e) => {
            this.setState({ [type]: e.currentTarget.value })
        }
    }

    render() {
        return(
            <div className='player-form-parent'>
                <form className='player-form'>
                    <label className='name-label'>Name
                        <input className='player-input' type="text" value={this.state.tag} onChange={this.updateType("tag")} />
                    </label>
                    <button className='player-btn' onClick={this.handleSubmit}>Play</button>
                </form>
            </div>
        );
    }

}

export default withRouter(PlayerForm);
