import React, { Component } from 'react'

export class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: ""
        };
    }

    handleChangeValue = (e) => {
        this.setState({
            name: e.target.value,
        });
    };

    handleOnSubmit = (e) => {
        e.preventDefault();
        if (this.state.name !== '') {
            this.props.handleAddUsername(this.state.name)
        } else {
            alert('Nhap ten ...')
        }
    }

    render() {
        ;
        const { name } = this.state
        return (

            <div className="container py-5">
                <div className="row justify-content-center">
                    <div className="col-7">
                        <div className="mb-3">
                            <form onSubmit={(e) => { this.handleOnSubmit(e) }}>
                                <h2 >Login</h2>
                                <input
                                    type="text"
                                    className='form-control'
                                    placeholder="Name..."
                                    value={name}
                                    onChange={(e) => { this.handleChangeValue(e) }}
                                    autoFocus />
                                <button className=' mt-3 btn btn-primary' type='submit'>Start</button>
                            </form>

                        </div>

                    </div>
                </div>
            </div>



        )
    }
}

export default Login