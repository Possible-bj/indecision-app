console.log('app is running')

// JSX JavaScript XML
const app = {
  title: 'Indecision App',
  subtitle: 'This is some info',
  options: []
}
const onFormSubmit = (e) => {
  e.preventDefault()
  
  const option = e.target.elements.option.value
  if (option) {
    app.options.push(option)
    e.target.elements.option.value = ''
    renderApp()
  }
} 
const removeOptions = () => {
  app.options = []
  renderApp()
}
const makeDecision = () => {
  const randomNum = Math.floor(Math.random() * app.options.length)
  const option = app.options[randomNum]
  console.log(option)
}
// const numbers = [10, 20, 30]

const appRoot = document.querySelector('#app')

const renderApp = () => {
  const template = (
    <div>
      <h1>{app.title}</h1>
      {app.subtitle && <p>{app.subtitle}</p>}
      <p>{app.options.length > 0 ? 'Here are your options' : 'No options'}</p>
      <button disabled={app.options.length == 0} onClick={makeDecision}>What should I do?</button>
      {/* {
        numbers.map((number) => <p key={number}>Number: {number}</p>)
      } */}
      <button onClick={removeOptions}>Remove all options</button>
      <ol>  
        {
          app.options.map((option, i) => <li key={i}>{option}</li>)
        }
      </ol>
      <form onSubmit={onFormSubmit}>
        <input type='text' name='option' />
        <button>Add Option</button>
      </form>
    </div>
  );
  ReactDOM.render(template, appRoot)
}

renderApp()