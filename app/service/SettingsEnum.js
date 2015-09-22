export default (function(){

   var DatePickerFormatEnum = {
		DAILY: 'DAILY',
		WEEKLY: 'WEEKLY',
		MONTHLY: 'MONTHLY'
	};
   return {
		DEV_KEY: 'client.html.google-map-api.devKey',
		CLIENT_ID: 'client.common.map.layers.google-map.client-ID',
		CHANNEL: 'client.common.map.layers.google-map.channel',
		SENSOR: 'client.common.map.layers.google-map.sensor',
		MAP_TYPE: 'client.common.map.layers.google-map.type',
		AREA_ID: 'client.customerExperience.defaultAreaId',
		DETAIL_PANE_WIDTH: 'client.customerExperience.detailPane.width',
		TOOLS_PANE_WIDTH: 'client.customerExperience.toolsPane.height',
		OVERVIEW_PANE_WIDTH: 'client.customerExperience.overviewPane.width',
		ATTRIBUTE_NAME: 'client.customerExperience.overviewPane.attributeName',
		ACTIVE_ATTRIBUTES: 'client.customerExperience.activeAttributes',
		DETAIL_PANE_TOGGLED: 'client.customerExperience.detailPane.toggled',
		OVERVIEW_PANE_TOGGLED: 'client.customerExperience.overviewPane.toggled',
		KPI_PANE_TOGGLED: 'client.customerExperience.kpiPane.toggled',
		CALENDAR_FORMAT: 'client.common.mapControls.calendarFormat',
		DEVICE: 'client.customerExperience.filter.deviceType',
		CONNECTION_TYPE: 'client.customerExperience.filter.connectionType',
		INDOOR_OUTDOOR: 'client.customerExperience.filter.inOutDoor',
		HOME_ROAMER: 'client.customerExperience.filter.homeRoamer',
		VIP_NONVIP: 'client.customerExperience.filter.vipNonVip',
		HIDE_EMPTY_KPI_ROWS: 'client.customerExperience.kpi.hideEmptyRows',
		//ToDo: , Info: This setting breaks the service
		HOME_LAT_LONG: 'client.common.map.HomeLatLong',
		HOME_ZOOM_LEVEL: 'client.common.map.HomeZoomLevel',
		MAX_NUM_OF_FEATURES_SHOWN: 'client.customerExperience.map.maxNumOfFeaturesShown',
		DatePickerFormatEnum: DatePickerFormatEnum
	};
}());
