import React from 'react';
import HeaderBar from './components/HeaderBar';
import Screen from './components/Screen';
import DockBar from './components/DockBar';
import ServiceProxy from './service/ServiceProxy';
import SettingsEnum from './service/SettingsEnum';
import Settings from './service/Settings';
import '../css/app.scss';
var StyleSheet = { create: function(e) { return e; } };

class App extends React.Component{

	constructor(props) {
	    super(props);
	    this.state = {};
	}

  componentWillMount() {
  		Settings.setDefaults();
			this.loadGoogleMapApi();
	}

	loadedSuccess(){
		if(Settings.getSettingByKey(SettingsEnum.CLIENT_ID)===''
			&& Settings.getSettingByKey(SettingsEnum.DEV_KEY)===''){
			this.loadingError();
		}
	}

	loadingError(){
		alert("Failed to load settings");
	}

	dockBarChanged(){

 }

	loadGoogleMapApi(){
		Settings.loadSettings([
					SettingsEnum.DEV_KEY,
					SettingsEnum.CLIENT_ID,
					SettingsEnum.CHANNEL,
					SettingsEnum.SENSOR,
					SettingsEnum.MAP_TYPE,
					SettingsEnum.DETAIL_PANE_WIDTH,
					SettingsEnum.AREA_ID,
					SettingsEnum.OVERVIEW_PANE_WIDTH,
					SettingsEnum.TOOLS_PANE_WIDTH,
					SettingsEnum.ATTRIBUTE_NAME,
					SettingsEnum.ACTIVE_ATTRIBUTES,
					SettingsEnum.KPI_PANE_TOGGLED,
					SettingsEnum.OVERVIEW_PANE_TOGGLED,
					SettingsEnum.DETAIL_PANE_TOGGLED,
					SettingsEnum.CALENDAR_FORMAT,
					SettingsEnum.CONNECTION_TYPE,
					SettingsEnum.DEVICE,
					SettingsEnum.INDOOR_OUTDOOR,
					SettingsEnum.HOME_ROAMER,
					SettingsEnum.VIP_NONVIP,
					SettingsEnum.HIDE_EMPTY_KPI_ROWS,
					SettingsEnum.HOME_ZOOM_LEVEL,
					SettingsEnum.MAX_NUM_OF_FEATURES_SHOWN],
					this.loadedSuccess,
					this.loadingError);
	}

	render() {
		return (
			<div style={styles.main}>
				<HeaderBar></HeaderBar>
				<Screen></Screen>
				<DockBar barValuesArray = {this.props.barValuesArray} onChange={this.dockBarChanged.bind(this)}/>
			</div>
		);
	}
}

App.defaultProps = {
        barValuesArray: [{id:1, text:'BTN1'},{id:2, text:'BTN2'},{id:3, text:'BTN3'}]
};

var styles = StyleSheet.create({
  main: {
    width: '100%',
    height: '100%'
  }
});
export default App;
