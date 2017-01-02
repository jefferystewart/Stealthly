import React from 'react';

class Form extends React.Component {

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = { key:"", hash:"" };
  }

  handleChange(type, e) {
    this.setState({[type]: e.currentTarget.value});
  }

  handleSubmit(e) {
    if (e) e.preventDefault();
    this.props.postSignature(this.state.key, this.state.hash);
  }

  testClicked(){
    this.setState({key:"tacos", hash:"dacedf41210444fe8547f5b1cf085a6c"});
    // this.handleSubmit();
  }

  render() {
    let headerClass = "greenColor";
    if (this.props.status > 300) {
      headerClass = "redColor";
    }
    const h1 = (
      <h1 id="response">
        Status: <strong className={ headerClass }>{ this.props.status }</strong>
      </h1>
    );

    return (
      <div>
        { h1 }
        <form onSubmit={this.handleSubmit}>
          <label>
            Key:
            <input type="text" id="key" value={this.state.key} onChange={this.handleChange.bind(this, "key")} />
          </label>
          <label>
            Hash:
            <input type="text" id="hash" value={this.state.hash} onChange={this.handleChange.bind(this, "hash")} />
          </label>
          <input type="submit" value="Submit" id="submit" className="button"/>
        </form>
        <button className="button" onClick={ this.testClicked.bind(this)}>
          Taco Test
        </button>
      </div>
    );
  }
}

export default Form;
