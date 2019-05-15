import React, { Component } from 'react';
import AceEditor from 'react-ace';
import Measure from 'react-measure';
import interact from 'interactjs';
import 'brace/mode/javascript';
import 'brace/mode/markdown';
import 'brace/theme/monokai';
import Terminal from './Terminal';
import Sidebar from './Sidebar';
import './Editor.css';
import User from './User';

export default class Editor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      result: '',
      kataId: null,
      desc: '',
      timeoutActive: false,
      user: null,
      kataName: '',
      sidebar: {
        width: 0,
        height: 0,
      },

      editors: {
        width: 0,
        height: 0,
      },

    };
  }

  onChange = (newValue) => {
    this.setState(
      { value: newValue },
    );
  };

  toggleNav = () => {
    const sideNav = document.getElementById('sidebar-list');
    sideNav.style.width = '0%';
  }

  submitCode = () => {
    const { kataId, value } = this.state;
    if (kataId) {
      this.setState({
        timeoutActive: true,
      });
      fetch(`https://localhost:8443/${kataId}?token=${this.props.token}`, {
        method: 'POST',
        mode: 'cors',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'text/plain',
        },
        body: value,
      })
        .then(res => res.json())
        .then(data => this.setState({ result: data }));
    }
    this.getUserStats(this.props.token);
    setTimeout(() => {
      this.setState({
        timeoutActive: false,
      });
    }, 1000);
  }

  getKata = async (e, id) => {
    this.setState({
      kataId: id,
    });
    const result = await fetch(`https://localhost:8443/katas/${id}`);
    const parsed = await result.json();
    if (parsed) {
      this.setState({
        result: '',
        value: parsed.code_boilerplate,
        desc: parsed.description,
        kataName: parsed.jsName,
      });
    }
  }

  componentDidMount() {
    this.getUserStats(this.props.token);
    interact('.sidebar').resizable({
      edges: {left: false, right: true, bottom: false, top: false },

      restrictEdges: {
        outer: 'parent',
        endOnly: true,
      },

      restrictSize: {
        min: { width: 200 },
        max: { width: 10000 },
      },

      inertia: false,

    }).on('resizemove', (event) => {
      event.target.style.width = `${Math.round(event.rect.width)  }px`;
    });


    interact('.terminal-container').resizable({
      edges: { left: false, right: false, bottom: false, top: true },

      restrictEdges: {
        outer: 'parent',
        endOnly: true,
      },

      // minimum size
      restrictSize: {
        min: { height: 0 },
        max: { height: '100%' },
      },

      inertia: false,

    }).on('resizemove', (event) => {
      event.target.style.height = `${Math.round(event.rect.height)  }px`;
    });
  }

  getUserStats = async (token) => {
    try {
      const fetched = await fetch(`https://localhost:8443/users/${token}`);
      const user = await fetched.json();
      this.setState({
        user,
      });
    } catch (err) {
      console.log('Error', err);
    }
  }

  render() {
    const { value, result, desc, kataName } = this.state;
    return (
      <div className="ide-container">
        <div key="aceeditor" className="aceeditor">
          <Measure bounds onResize={(rect) => { this.setState({ sidebar: rect.bounds }); }}>
          {
             ({ measureRef }) => (
            <div className="sidebar-container sidebar" ref={measureRef} id="side-nav">
             <Sidebar getKata={this.getKata} />
            </div>
)}
        </Measure>
          <div className="editor-terminal-container">


            <div className="editors-container editors">
            <div className="editor-tab-container">
            <div className="tab">
              <p><i className="fab fa-js"></i>{kataName}.js</p>
            </div>
              <AceEditor

                mode="javascript"
                theme="monokai"
                name="EDITOR-left"
                width="100%"
                height="100%"
                commands={[{
                  name: 'save',
                  bindKey: { win: 'Ctrl-s', mac: 'Command-s' },
                  exec: this.submitCode,
                }, {

                  name: 'toggle-nav',
                  bindKey: { win: 'Ctrl-b', mac: 'Command-b' },
                  exec: this.toggleNav,
                }]}
                showPrintMargin={false}
                // maxLines={500}
                // minLines={55}
                onChange={this.onChange}
                value={value}
                editorProps={{ $blockScrolling: Infinity }}


              />
              </div>
              <div className="editor-tab-container">
              <div className="tab">
                <p><i className="fab fa-markdown"></i>{kataName}.md</p>
              </div>
                <AceEditor
                  mode="markdown"
                  theme="monokai"
                  name="EDITOR-right"
                  width="100%"
                  height="100%"
                  wrapEnabled
                  showPrintMargin={false}
                  value={desc}
                  editorProps={{ $blockScrolling: Infinity }}
                />

              </div>
            </div>

            <Measure bounds onResize={(rect) => { this.setState({ editors: rect.bounds }); }}>
                 {
            ({ measureRef }) =>
              <Terminal result={result} submit={!this.state.timeoutActive ? this.submitCode : null} ref={measureRef} />
          }
               </Measure>
          </div>
        </div>
        <User token={this.props.token} user={this.state.user} />
      </div>
    );
  }
}
