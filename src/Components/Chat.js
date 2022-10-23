import React, { Component } from 'react'
import config from "../Config.json";
import HttpClient from "../Core/HttpClient";

const { SERVER_API } = config;

export class Chat extends Component {
    constructor() {
        super()
        this.state = {
            messValueIpt: '',
            listMess: []
        }
        this.chatboxApi = `${SERVER_API}/chatbox`
        this.client = new HttpClient();
    }

    getData = async () => {
        const response = await this.client.get(this.chatboxApi);
        if (typeof response.data === 'object') {
            return response.data;
        }
    };

    handleChangeValue = (e) => {
        this.setState({
            messValueIpt: e.target.value,
        })
    }

    handleAddNewMess = async (messObj) => {
        const response = await this.client.post(this.chatboxApi, messObj);
        const data = await response.data
        this.getData()
        this.setState({
            listMess: [...this.state.listMess, data]
        })
    }

    componentDidMount = async () => {
        this.getData();
        setInterval(async () => {
            const data = await this.getData();
            this.setState({
                listMess: data
            })
        }, 100);
    };

    componentDidUpdate = async (prevProps, prevState) => {
        this.getData()

        if (this.state.listMess.length !== prevState.listMess.length) {
            const data = await this.getData();
            this.setState({
                listMess: data
            })
        }
    };

    handleOnSubmit = (e) => {
        e.preventDefault()
        const { name } = this.props

        if (this.state.messValueIpt !== '') {
            this.handleAddNewMess(({
                id: Math.floor(Math.random() * 100) + 1 + '_random',
                messValue: this.state.messValueIpt,
                name: name
            }))

            this.setState({
                messValueIpt: '',
            })
        }
    }

    render() {
        const { name } = this.props
        const { listMess, messValueIpt } = this.state
        return (
            <>
                <div className="container py-5">
                    <div className="row justify-content-center">
                        <div className="col-7">
                            <div className="mb-3">
                                <div className="chatbox-content">
                                    <h1>Hello {name}</h1>
                                    {listMess.map((msg) => {
                                        return (
                                            <div className="chatbox-wrap" key={msg.id}>
                                                <div className="name"><strong>{msg.name}</strong></div>
                                                <div className="message"><p>{msg.messValue}</p></div>
                                            </div>
                                        )
                                    })}

                                </div>
                                <form onSubmit={(e) => { this.handleOnSubmit(e) }}>
                                    <input
                                        type="text"
                                        autoFocus
                                        className='form-control'
                                        placeholder="..."
                                        value={messValueIpt}
                                        onChange={(e) => { this.handleChangeValue(e) }} />
                                    <button className=' mt-3 btn btn-primary' type='submit'>Send</button>
                                </form>
                            </div>

                        </div>
                    </div>
                </div>

            </>
        )
    }
}

export default Chat