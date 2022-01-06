class IndecisionApp extends React.Component {
  constructor(props) {
    super(props)
    this.handleDeleteOptions = this.handleDeleteOptions.bind(this)
    this.handlePick = this.handlePick.bind(this)
    this.addOption = this.addOption.bind(this)
    this.handleDeleteOption = this.handleDeleteOption.bind(this)
    this.state = {
      options: []
    }
  }
  handleDeleteOptions() {
    this.setState(() => ({options: []}))
  }
  handleDeleteOption(optionToRemove) {
    this.setState((prevState) => ({
      options: prevState.options.filter((option) => optionToRemove !== option)
    }))
  } 
  handlePick() {
    const randomPick = Math.floor(Math.random() * this.state.options.length)
    const option = this.state.options[randomPick]
    alert(option)
  } 
  addOption(option) {
    if (!option) {
      return "Enter Valid Value to Item"
    } else if (this.state.options.indexOf(option) > -1) {
      return 'Option already Exist!'
    }
    this.setState((prevState) => ({options: prevState.options.concat(option)}))
  }
  componentDidMount() {
    try {
      const json = localStorage.getItem('options')
      const options = JSON.parse(json)
      if (options) {
        this.setState(() => ({options}))
      }
    } catch (e) {
      // do nothing at all
    }
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevState.options.length !== this.state.options.length) {
      const json = JSON.stringify(this.state.options)
      localStorage.setItem('options', json)
    }
  }
  render() {
    const title = this.props.title
    const subtitle = this.props.subtitle
    return (
      <div>
        <Header title={title} subtitle={subtitle}/>
        <Action
          hasOptions={this.state.options.length > 0} 
          handlePick={this.handlePick}
        />
        <Options 
          options={this.state.options}
          handleDeleteOptions={this.handleDeleteOptions}
          handleDeleteOption={this.handleDeleteOption}
        />
        <AddOption addOption={this.addOption}/>
      </div>
    )
  }
}



const Header = (props) => {
    return (
      <div>
        <h1>{props.title}</h1>
        <h2>{props.subtitle}</h2>
      </div>
    )
}
const Action = (props) => {
    return (
      <div>
        <button
          disabled={!props.hasOptions} 
          onClick={props.handlePick}
        > 
          What Should I do?
        </button>
      </div>
    )
}
const Options = (props) => {
    return (
      <div>
        <button onClick={props.handleDeleteOptions}>Remove All</button>
        {
          props.options.map((option) => 
          <Option 
            key={option}
            optionText={option}
            handleDeleteOption={props.handleDeleteOption}
          />)
        }   
      </div>
    )
}

const Option = (props) => {
    return (
      <div>
        {props.optionText}
        <button
          onClick={(e) => props.handleDeleteOption(props.optionText)}
        >
          remove
        </button>
      </div>
    )
}

Header.defaultProps = {
  title: 'Indecision',
  subtitle: 'Put your life in the hands of a computer'
}

ReactDOM.render(<IndecisionApp />, document.querySelector('#app'))