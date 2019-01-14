function getHistory() {
    return document.getElementById("historyValue").innerText;
}

function printHistory(num) {
    document.getElementById("historyValue").innerText = num;
}

function getOutput() {
    return document.getElementById("outputValue").innerText;
}

function printOutput(num){
	if(num==""){
		document.getElementById("outputValue").innerText = num;
	}
	else{
		document.getElementById("outputValue").innerText = getFormattedNumber(num);
	}	
}

function getFormattedNumber(num){
	if(num=="-"){
		return "";
	}
	var n = Number(num);
	var value = n.toLocaleString("en");
	return value;
}

//Converting number from comma seperated to normal form
function reverseNumberFormat(num){
	return Number(num.replace(/,/g,''));
}

var operator = document.getElementsByClassName("operator");
for(var i=0; i<operator.length; i++){
    operator[i].addEventListener('click', function(){
    //what action needs to be performed when user clicks the operator
        if(this.id=="clear"){
            printHistory("");
            printOutput("");
        }
        else if(this.id=="backspace"){
            var output=reverseNumberFormat(getOutput()).toString();
            //if there is a value in operator
			if(output){
				output= output.substr(0,output.length-1);
				printOutput(output);
			}
        }
        else{
            //First getting history and outut values
			var output=getOutput();
			var history=getHistory();
			if(output==""&&history!=""){
				if(isNaN(history[history.length-1])){
					history= history.substr(0,history.length-1);
				}
			}
			if(output!="" || history!=""){
				output= output==""?output:reverseNumberFormat(output);
				history=history+output;
				if(this.id=="="){
					var result=eval(history);
					printOutput(result);
					printHistory("");
				}
				else{
					history=history+this.id;
					printHistory(history);
					printOutput("");
				}
			}
		}
    });
}

var number = document.getElementsByClassName("number");
for(var i=0; i<number.length; i++){
    number[i].addEventListener('click', function(){

    var output=reverseNumberFormat(getOutput());
    //is number is entered
    if(output!=NaN){
        output=output+this.id;
        printOutput(output);
    }
    })
}

// FOR SPEECH RECOGNISTION

var microphone = document.getElementById('microphone');
microphone.onclick=function(){
	microphone.classList.add("record");
	var recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition || window.mozSpeechRecognition || window.msSpeechRecognition)();
	recognition.lang = 'en-US';
	recognition.start();
	operations = {
                "plus":"+",
				 "minus":"-",
				 "multiply":"*",
				 "multiplied":"*",
				 "divide":"/",
				 "divided":"/",
                 "reminder":"%"
                }
	
	recognition.onresult = function(event){
		var input = event.results[0][0].transcript;
		for(property in operations){
			input= input.replace(property, operations[property]);
		}
		document.getElementById("outputValue").innerText = input;
		setTimeout(function(){
			evaluate(input);
		},2000);
		microphone.classList.remove("record");
	}
	
}
function evaluate(input){
	try{
		var result = eval(input);
		document.getElementById("outputValue").innerText = result;
	}
	catch(e){
		console.log(e);
		document.getElementById("outputValue").innerText = "";
	}
}

