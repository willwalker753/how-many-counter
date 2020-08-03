$( "#numberForm" ).submit(function( event ) {
    event.preventDefault();
    $('#error').empty();
    $('#results').empty();
    let num = $('#num').val();
    let lowRange = $('#lowRange').val();
    let highRange = $('#highRange').val();
    verifyEntries(num,lowRange,highRange);
});

function verifyEntries(num,lowRange,highRange) {
    num = num.toString().trim();
    lowRange = lowRange.toString().trim();
    highRange = highRange.toString().trim();
    if((num==='')||(lowRange==='')||(highRange==='')) {
        $('#error').append('<p>Please submit one integer into each box</p>');
    }
    else if((num.indexOf('-') > -1)||(lowRange.indexOf('-') > -1)||(highRange.indexOf('-') > -1)) {
        $('#error').append('<p>Please submit only positive integers into each box</p>');
    }
    else if((num.indexOf('.') > -1)||(lowRange.indexOf('.') > -1)||(highRange.indexOf('.') > -1)) {
        $('#error').append('<p>Please submit only integers into each box</p>');
    }
    else if((num.indexOf(' ') > -1)||(lowRange.indexOf(' ') > -1)||(highRange.indexOf(' ') > -1)) {
        $('#error').append('<p>Please submit only one integer per box</p>');
    }
    else {
        if(lowRange > highRange) {
            let temp = lowRange;
            lowRange = highRange;
            highRange = temp;
        }
        findMatches(num, lowRange, highRange);
    }
}

function findMatches(num, lowRange, highRange) {
    num = parseInt(num);
    lowRange = parseInt(lowRange);
    lowRangeCopy = lowRange;
    highRange = parseInt(highRange);
    let resultsArr = [];
    let resultsArrInd = 0;
    let overallCount = 0;

    for(lowRange;lowRange <= highRange;lowRange++) {
        let curStr = lowRange.toString(); 
        var re = new RegExp(num, 'g');
        let res = curStr.match(re);
        if(res !== null) {            
            overallCount = overallCount + res.length;
            resultsArr[resultsArrInd] = curStr;
            resultsArrInd++;
        }
    }
    let listElements = '';
    for(i=0;i<resultsArr.length;i++){
        listElements = listElements + resultsArr[i]+' &#9702 ';
    }
    listElements = listElements.substring(0, listElements.length -4);
    
    $('#results').append('<h3>There are '+overallCount+' occurrences of '+num+' from '+lowRangeCopy+' to '+highRange+'.</h3><p>'+listElements+'</p>');
    //console.log(numString,lowString,highString,num,lowRange,highRange);
    /*for(let i = lowRange;i <= highRange;i++) {
        let temp = i.toString();
        if(temp.indexOf(numString) > -1){
            console.log(i);
            resultsArr[resultsArrInd] = temp;
            resultsArrInd++;
            overallCount++;
        }
    }
    let listElements = '';
    for(i=0;i<resultsArr.length;i++){
        listElements = listElements + '<li>'+resultsArr[i]+'</li>';
    }
    $('#results').append('<h3>There are '+overallCount+' occurrences of '+num+' from '+lowRange+' to '+highRange+'.</h3><ul>'+listElements+'</ul>');
    */
    
    
    /*let numArr = numString.split('');
    let lengthOfNum = numArr.length;
    let curNumInd = 0;
    let listElements = [];
    let listElementsInd = 0;
    //start at the low range num and go up to the high num
    for(lowRange; lowRange <= highRange; lowRange++) {   
        //take the current low number being compared to small num
        //and take each digit into an array
        let lowString = lowRange.toString();
        curLowArr = lowString.split('');    
        //while on the current low range number loop though it to
        //find any matches starting at index 0
        for(let i=0;i < curLowArr.length; i++) {
            //if the current index of the small num array is past the
            //length of the array then set the index to 0
            if(curNumInd === lengthOfNum) {
                curNumInd = 0;
            }
            //if there is a match for the first num of the low num
            //and one of the digits of the cur low range then
            //keep checking for a match
            if(curLowArr[i]===numArr[curNumInd]){
                console.log('first digit match');
                for(let e=0;e<=lengthOfNum;e++) {
                    if(curLowArr[i+e] !== numArr[curNumInd]) {
                        console.log('not a match after first digit');
                        break;
                    }
                    else if(e===lengthOfNum) {
                        listElements[listElementsInd] = curLowArr.join('');
                        listElementsInd++;
                        curNumInd = 0;
                        console.log('thats a match');
                    }
                    else {
                        curNumInd++;
                    }
                }
            }
        }
        
    }
    console.log(listElements);*/
}