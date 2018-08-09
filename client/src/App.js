import React, { Component } from 'react';
import './App.css';

class App extends Component {
	state={
		food:[]
	}

	componentDidMount(){
		const tab=[]
		fetch('http://localhost:3333/data')
		.then(res => res.json())
		.then(data => data.forEach(e => {
			tab.push(e)
			this.setState({food:tab})
		}))
	}

  render() {
    return (
			<div>
				<Form/>
				<List truc={this.state.food}/>
			</div>
    );
  }
}

const Form = () => (
	<form action="http://localhost:3333/save" method="post">
		<input type="text" placeholder="title" name="title"/>
		<br/>
		<input type="submit" value="submit"/>
	</form>
)

const List = (props) => {
	console.log(props.truc)
	const deletUrl = "http://localhost:3333/delet/"
	return(
		<div>
			{props.truc.map((e, i) => (
				<p>
				<a href={`${deletUrl}${e._id}`}>(delet)</a>
				{e.title ? e.title : "empty"}
				</p>
			))}
		</div>
	)
}

export default App;
