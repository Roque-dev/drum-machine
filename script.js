const audioData = [
  { key: 'Q', id: 'Heater-1', name: 'Heater 1', src: 'https://cdn.freecodecamp.org/testable-projects-fcc/audio/Heater-1.mp3' },
  { key: 'W', id: 'Heater-2', name: 'Heater 2', src: 'https://cdn.freecodecamp.org/testable-projects-fcc/audio/Heater-2.mp3' },
  { key: 'E', id: 'Heater-3', name: 'Heater 3', src: 'https://cdn.freecodecamp.org/testable-projects-fcc/audio/Heater-3.mp3' },
  { key: 'A', id: 'Heater-4', name: 'Heater 4', src: 'https://cdn.freecodecamp.org/testable-projects-fcc/audio/Heater-4_1.mp3' }, // <- Corregido aquí (_1.mp3)
  { key: 'S', id: 'Clap', name: 'Clap', src: 'https://cdn.freecodecamp.org/testable-projects-fcc/audio/Heater-6.mp3' },
  { key: 'D', id: 'Open-HH', name: 'Open-HH', src: 'https://cdn.freecodecamp.org/testable-projects-fcc/audio/Dsc_Oh.mp3' },
  { key: 'Z', id: "Kick-n'-Hat", name: "Kick-n'-Hat", src: 'https://cdn.freecodecamp.org/testable-projects-fcc/audio/Kick_n_Hat.mp3' },
  { key: 'X', id: 'Kick', name: 'Kick', src: 'https://cdn.freecodecamp.org/testable-projects-fcc/audio/RP4_KICK_1.mp3' },
  { key: 'C', id: 'Closed-HH', name: 'Closed-HH', src: 'https://cdn.freecodecamp.org/testable-projects-fcc/audio/Cev_H2.mp3' }
];

class DrumPad extends React.Component {
  constructor(props) {
    super(props);
    this.audioRef = React.createRef();
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.playSound = this.playSound.bind(this);
  }

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown(e) {
    if (e.key.toUpperCase() === this.props.keyTrigger) {
      this.playSound();
    }
  }

  playSound() {
    const sound = this.audioRef.current;
    if (sound) {
      sound.currentTime = 0;
      sound.play().catch(err => console.log("Error de reproducción:", err));
      this.props.updateDisplay(this.props.name);
    }
  }

  render() {
    return (
      <div
        id={this.props.id}
        className="drum-pad"
        onClick={this.playSound}
      >
        {this.props.keyTrigger}
        <audio
          ref={this.audioRef}
          className="clip"
          id={this.props.keyTrigger}
          src={this.props.src}
        />
      </div>
    );
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      display: '¡Toca un pad o presiona una tecla!'
    };
    this.updateDisplay = this.updateDisplay.bind(this);
  }

  updateDisplay(text) {
    this.setState({ display: text });
  }

  render() {
    return (
      <div id="drum-machine">
        <h1 className="title"><i className="fa-solid fa-drum"></i> React Drum Machine</h1>
        
        <div className="pads-container">
          {audioData.map((pad) => (
            <DrumPad
              key={pad.key}
              keyTrigger={pad.key}
              id={pad.id}
              name={pad.name}
              src={pad.src}
              updateDisplay={this.updateDisplay}
            />
          ))}
        </div>

        <div id="display">
          {this.state.display}
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));