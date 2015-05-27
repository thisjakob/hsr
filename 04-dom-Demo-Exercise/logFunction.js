/**
 * Created by mstolze on 24.05.15.
 */
function loggedFn(fn) {
	return function () {
		var fnSource = fn.toString();
		var fnSignature = fnSource.substring(fnSource.indexOf(" ")+1, fnSource.indexOf(")")+1);
		console.log("Called function " + fnSignature + " with arguments " + JSON.stringify(arguments) )
		result = fn.apply(this, arguments);
		console.log("Function " + fnSignature + " with arguments " + JSON.stringify(arguments) + " returned "+result);
		return result;
	}
}

function logFunction(fnName) {
	if (typeof(fnName)!="string") {
		throw "logFunction expects function name as String"
	}
	var fn = this[fnName];
	if (typeof(fn)!="function") {
		throw (fnName+ " is not defined in the context of "+this);
	}
	this[fnName] = loggedFn(fn);
}

Object.prototype.logFunction = logFunction;

function plus (a, b) {
	return a+b;
}

testObj = {};

testObj.plus = plus;

testObj.plus(1, 2); //no console output

testObj.logFunction("plus");

testObj.plus(1, 2); //console output