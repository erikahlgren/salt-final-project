import React, { Component } from 'react';
import './Sidebar.css';
import KataList from './KataList';


export default class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      katas: '',
      caretClasses: 'fas fa-caret-right',
      isSelected: false,
      selectedKata: '',
      isToggled: true,
      dropdownStyle: { display: 'none' },
    }
  }

  componentDidMount = async () => {
    const result = await fetch('https://localhost:8443/katas');
    const parsed = await result.json();
    this.setState({ katas: parsed });
  }

  toggleDropdown = () => {
    if (this.state.isToggled) {
      this.setState({
        dropdownStyle: {
          display: 'block',
        },
        caretClasses: 'fas fa-caret-right fa-caret-toggled',
      });
    } else {
      this.setState({
        dropdownStyle: {
          display: 'none',
        },
        caretClasses: 'fas fa-caret-right',
      });
    }
    this.setState({
      isToggled: !this.state.isToggled
    });
  }
  
  render () {
    return (
      <div className="sidebar-container">
        <div className="sidebar-icons">
        <i className="far fa-file"></i>
        <i className="fas fa-search"></i>
        <i className="fas fa-users"></i>
        <i className="fas fa-cog"></i>
        </div>
        <div className="sidebar-list">
        <p className="sidebar-header">EXPLORER</p>
          <button className="list-dropdown" onClick={this.toggleDropdown} >
            <p> <i className={this.state.caretClasses}/>KATAS</p>
          </button>
          <div style={this.state.dropdownStyle}>
          {this.state.katas ? this.state.katas.map((el, i) => <KataList handler={(e) => this.props.getKata(e, el.id)} kata={el.name} key={i}/>): null}
          </div>
        </div>
      </div>
    );
  }

}