class ToggleApp extends React.Component {
  constructor(props) {
    super(props)
    this.toggleVisibility = this.toggleVisibility.bind(this)
    this.state = {
      visible: false,
      message: 'This is your message now showing'
    }
  }
  toggleVisibility() {
    this.setState((prevState) => {
      return {
        visible: !prevState.visible
      }
    })
  }
  render() {
    return (
      <div>
        <h1>Visibilty Toggle</h1>
        <button onClick={this.toggleVisibility}>{this.state.visible ? 'Hide Message' : 'Show Message'}</button>
        {this.state.visible && <p>{this.state.message}</p>}
      </div>
    )
  }
}

ReactDOM.render(<ToggleApp />, document.querySelector('#app'))