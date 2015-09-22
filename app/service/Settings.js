
import ServiceProxy from './ServiceProxy';
import SettingsEnum from './SettingsEnum';

export default (function(){
   var settings= {},

   loadSettings = function(keyArray, callback, errorCallback){
   		ServiceProxy.serviceProxy("Settings", "getSettings", {
			keys: keyArray
			}
			//on success
			, function(results){
				//If the settings exist in the server, set their values
				for(var index in results){
					var oSetting=results[index];
					settings[oSetting.key]=oSetting.value;
				}

				if(keyArray && keyArray.length===1){
					callback(settings[keyArray[0]]);
				}
				else{
					callback();
				}

			}
			//on error
			, function(){
				errorCallback();
			}
		);
   },

    getSettingByKey = function(key, callback){
   		if(settings[key]!=null){
   			return settings[key];
   		}
   		else{
   			return loadSettings([key], callback);
   		}
   },

   setDefaults = function(){
   	settings[SettingsEnum.MAP_TYPE]='roadmap';
		settings[SettingsEnum.AREA_NAME]='';
		settings[SettingsEnum.DETAIL_PANE_WIDTH]=300;
		settings[SettingsEnum.TOOLS_PANE_WIDTH]=300;
		settings[SettingsEnum.OVERVIEW_PANE_WIDTH]=200;
		settings[SettingsEnum.ATTRIBUTE_NAME]="";
		settings[SettingsEnum.ACTIVE_ATTRIBUTES]="";
		settings[SettingsEnum.OVERVIEW_PANE_TOGGLED]='false';
		settings[SettingsEnum.KPI_PANE_TOGGLED]='false';
		settings[SettingsEnum.DETAIL_PANE_TOGGLED]='false';
		settings[SettingsEnum.CALENDAR_FORMAT]=SettingsEnum.DatePickerFormatEnum.DAILY;
		settings[SettingsEnum.DEVICE]='All';
		settings[SettingsEnum.CONNECTION_TYPE]='All';
		settings[SettingsEnum.INDOOR_OUTDOOR]='IndoorOutdoor';
		settings[SettingsEnum.HOME_ROAMER]='All';
		settings[SettingsEnum.VIP_NONVIP]='VipNonVip';
		settings[SettingsEnum.HIDE_EMPTY_KPI_ROWS]='false';
		settings[SettingsEnum.HOME_ZOOM_LEVEL]='12';
		settings[SettingsEnum.MAX_NUM_OF_FEATURES_SHOWN]='1000';
		settings[SettingsEnum.DEV_KEY]='';
		settings[SettingsEnum.CHANNEL]='';
		settings[SettingsEnum.CLIENT_ID]='';
		settings[SettingsEnum.SENSOR]='false';
		settings[SettingsEnum.HOME_LAT_LONG]=0;
   };

   return {
		loadSettings: loadSettings,
		getSettingByKey: getSettingByKey,
		setDefaults: setDefaults
	};
}());
