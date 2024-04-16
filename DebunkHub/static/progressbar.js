// progressbar.js
var progressBarFill = document.getElementById('progress-bar-fill');
var width = 0;
var interval;
var on_next=true;
var number = 1;

var list1 = ['Checkingforspellingmistakes', 'Checkingforclickbaittitle', 'Checkingforsubjectivetitles', 'Checkingforvalidnewstitle', 'Checkingforwebavailability']
var list2 = ['Checkingforclickbaittitle', 'Checkingforsubjectivetitles', 'Checkingforvalidnewstitle', 'Checkingforwebavailability']
var list3 = ['Checkingforsubjectivetitles', 'Checkingforwebavailability']
var list4 = ['Checkingforwebavailability']
var list5 = ['Checkingforspellingmistakes', 'Checkingforsubjectivetitles', 'Checkingforwebavailability']

var progressNames = ['hii'];

function getlist() {
    fetch('/names')
        .then(response => response.json())
        .then(data => {
            if(data.number==1){
                progressNames = list1;
            }
            else if(data.number == 2){
                progressNames = list2;
            }
            else if(data.number == 3){
                progressNames = list3;
            }
            else if(data.number == 4){
                progressNames = list4;
            }
            else{
                progressNames = list5;
            }
        })
        .catch(error => {
            console.log('An error occurred during the AJAX request');
        });
}
getlist();

function startProgressBar() {
    interval = setInterval(increaseProgressBar, 50);
}

function increaseProgressBar() {
    width += 2;
    progressBarFill.style.width = width + '%';

    if (width >= 100) {
        clearInterval(interval);
        callFlaskFunction();
    }
}

function redirectToNextPage() {
    var currentPage = window.location.pathname;
    var nextPage;

    var urlParams = currentPage.split('/');
    console.log(urlParams);
    var text = urlParams[2];
    var progressName = urlParams[3];

    var currentIndex = progressNames.indexOf(progressName);
    console.log(progressName);
    console.log(progressNames);
    if (number == 0){
        var nextProgressName = progressNames[currentIndex];
        var routeName = 'progress';
        nextPage = urlFor(routeName, {text: text, progress_name: nextProgressName, num:0});
    }
    else if(currentIndex == progressNames.length-1){
        nextPage = '/truenews';
    }
    else if (currentIndex < progressNames.length - 1 ) {
        var nextProgressName = progressNames[currentIndex + 1];
        var routeName = 'progress';
        nextPage = urlFor(routeName, {text: text, progress_name: nextProgressName, num:1});
    } 

    window.location.href = nextPage;
}

function urlFor(routeName, params) {
    var key1 = [];
    var i = 0;
    for (var key in params) {
        key1[i] =  encodeURIComponent(params[key]);
        i=i+1;
    }
    var url = '/progress/'+key1[0]+'/'+key1[1]+'/'+key1[2];
    return url;
}
function callFlaskFunction() {
    fetch('/listen')
        .then(response => response.json())
        .then(data => {
            console.log('perfection');
            console.log(data);
            if (data.value==true) {
                number = 1;
                redirectToNextPage();
            } else {
                number = 0;
                redirectToNextPage();
            }
        })
        .catch(error => {
            console.log('An error occurred during the AJAX request');
        });
}
startProgressBar();