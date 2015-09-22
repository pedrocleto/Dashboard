/*
 * serviceProxy.js
 * contains necessary functions to call our SOAP Webservices
 * the html page that imports this file needs to import JQuery too
 */

export default (function(){
	/**
	 * Function		toXML
	 *
	 * Description  transform an object into its XML representation
	 *
	 * @param 	tagName		Tag name which wraps the XML representation (usually property name containing data)
	 * @param 	data			Object
	 * @return 	XML representation (String)
	 */
	var
	toXML = function ( tagName, data ) {
		var xml = '',
		//if data not an array -> create an array of one position so we can use a for loop
		aux = ($.isArray(data)===false) ? [data] : data,
		type = (!!data && !!data.SOAPType)? (" "+data.SOAPType) : '',
		use = false,
		i=0,
	    element;

		//iterate through array
		for (i=0; i<aux.length; i++){
			element = aux[i];
			if (element == null) {
				//type = ' xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:nil="true"/';
				return xml;
			}
			//open tag
			xml += "<"+tagName+type+">";
			use = false;
			if (element !== null) {
				//if element contains children -> recursive call to process them
				if (element instanceof Date) {
					xml += toXML("year", element.getFullYear());
					xml += toXML("month", element.getMonth());
					xml += toXML("day", element.getDate());
					xml += toXML("hour", element.getHours());
					xml += toXML("minute", element.getMinutes());
					use = true;
				}
				else
					if (typeof (element) !== "string") {
						$.each(element, function(key, value){
							xml += toXML(key, value);
							use = true;
						});
					}

				if (!use) {
					//otherwise -> enter text value
					xml += element;
				}
				xml += "</"+tagName+">";
			}

		}
		return xml;
	},

	/**
	 * Function		createSOAPRequest
	 *
	 * Description	create a SOAP request
	 *
	 * @param serviceName	name of the service we need to call (e.g. QueryData) !!Case sensitive
	 * @param methodName	name of the method
	 * @param parameters	all parameters in a single object (e.g. {param1:val1,param2:val2} )
	 *
	 * @return	a full and valid SOAP Request message
	 */
	createSOAPRequest = function ( serviceName, methodName, parameters) {
		//open envelope and include namespaces
		var soapMessage = '<soapenv:Envelope ';
		soapMessage+= 'xmlns:q0="http://'+serviceName+'.actix.com/" ';
		soapMessage+= 'xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xs="http://www.w3.org/2001/XMLSchema"><soapenv:Body>';

		//create body from parameters
		soapMessage+= toXML('q0:'+methodName, parameters);

		//close envelope
		soapMessage+= '</soapenv:Body></soapenv:Envelope>';
		return soapMessage;
	},

	/**
	 * Function		parseSOAPResponse
	 *
	 * Description	transform a SOAP response into an object
	 *
	 * @param soapResponse	SOAP Response message received from a service
	 *
	 * @return		Array of objects representing the SOAP response
	 */
	parseSOAPResponse = function  ( soapResponse ) {
		var results = [],

		//get XML results (ignore headers)
		$xmlResults = $("return", soapResponse), i;
		//parse each result
		for (i=0; i<$xmlResults.length; i++) {

			results.push(parseSOAPObject($xmlResults[i]));
		}

		return results;
	},

	/**
	 * Function		parseSOAPObject
	 *
	 * @param xml	XML representation of an Object
	 *
	 * @return	Object transformed from XML
	 */
	parseSOAPObject = function ( xml ) {

		var result = {}, j, element, parsedObject;
		//if no children --> just get text without property name
		if ($(xml).children().length===0) {
			result = $(xml).text();
		}
		//for each XML child create an Object property matching tagname to name respectively
		for (j=0; j<$(xml).children().length; j++) {

			element = $(xml).children()[j];
			//always Array????

			if ($(element).children().length>0) {
				//if children --> recursive
				parsedObject = parseSOAPObject(element);
				if (result[element.nodeName]===undefined){
					//if no previous value --> set object
					result[element.nodeName] = parsedObject;
				} else if ($.isArray(result[element.nodeName])===true) {
					//if previous value and isArray --> push text
					result[element.nodeName].push(parsedObject);
				} else {
					//if previous value but noArray --> create Array with old and new text
					result[element.nodeName] = [result[element.nodeName], parsedObject];
				}
			} else if (result[element.nodeName]===undefined){
				//if no previous value --> set text
				result[element.nodeName] = $(element).text();
			} else if ($.isArray(result[element.nodeName])===true) {
				//if previous value and isArray --> push text
				result[element.nodeName].push($(element).text());
			} else {
				//if previous value but noArray --> create Array with old and new text
				result[element.nodeName] = [result[element.nodeName], $(element).text()];
			}
		}

		return result;
	},

	/**
	 * Function		serviceProxy
	 *
	 * Description	main function of this file; handle creation of SOAP message, call to the service
	 * 				and what to do with the response or error received
	 *
	 * @param serviceName		name of the service to be called !!Case sensitive
	 * @param methodName		method name
	 * @param parameters		method parameters in a single object (e.g. {param1:val1,param2:val2} )
	 * @param resultCallback	success call back function
	 * @param errorCallback		error call back function
	 *
	 * @return	JQXHR Object, the actual service call (you can add listeners such as complete to that call)
	 */
	serviceProxy = function (serviceName, methodName, parameters, resultCallback, errorCallback) {

		var op = {}, result, soapMessage, serviceUrl, jqxhr;

		//onSuccess function
		//parse response and execute resultCallback function
		op.onSuccess = function ( data ) {
			if (typeof (resultCallback) === "function") {
				//transform XML Response to object
				//testing purposes --> check response
				//alert((new window.XMLSerializer()).serializeToString(data));
				result = parseSOAPResponse(data);
				resultCallback(result, op.cancelled);
			}
		};

		op.onError = function ( xhr, status, errorThrown ) {
			if (typeof (errorCallback)==="function") {
				errorCallback(errorThrown, op.cancelled);
			}
		};

		op.cancel = function cancel() {
			op.cancelled = true;
		};


		//create SOAP request message
		soapMessage = createSOAPRequest(serviceName.toLowerCase(), methodName, parameters);

		//build endpoint url
		serviceUrl = window.location.protocol+"//"+window.location.host+"/ActixOne-"+serviceName+"/"+serviceName;
		//serviceUrl = "http://localhost:8080/ActixOne-"+serviceName+"/"+serviceName;
		//make SOAP request
		jqxhr = $.ajax({
						type: "POST",
						url: serviceUrl,
						dataType: "xml",
						data: soapMessage,
						processData: false,
						contentType: "text/xml; charset=UTF-8",
						success: op.onSuccess,
						beforeSend: function (xhr) {
									xhr.setRequestHeader("Content-Type", "application/soap+xml;charset=UTF-8");
									xhr.setRequestHeader("SOAPAction", serviceUrl+"/"+methodName);
							},
						error: op.onError
					});

		op.jqxhr = jqxhr;
		return op;
	};

	return {
		toXML: toXML,
		createSOAPRequest: createSOAPRequest,
		parseSOAPResponse: parseSOAPResponse,
		parseSOAPObject: parseSOAPObject,
		serviceProxy: serviceProxy
	};

}());
