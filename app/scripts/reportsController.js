
var baseURL = "http://presaleshuddle:8080/";

angular.module('PreSales-Huddle')

    //controller for reports
    .controller('ReportsListCtrl',function($scope, $http, $rootScope, $location){
        document.getElementById('signin').style.visibility = 'hidden';
        document.getElementById('g-signinP').style.height = '0px';
        document.getElementById('sign-out').style.visibility = 'visible';
        document.getElementById('prospectList').style.visibility = 'visible';
        document.getElementById('clientList').style.visibility = 'visible';
        document.getElementById('headerText').style.visibility = 'visible';
        document.getElementById('reports').style.visibility = 'visible';
        document.getElementById('notifications').style.visibility='visible';
        document.getElementById('titleText').style.display = 'none';

        $scope.prospect = $rootScope.prospectToUpdate;
        $http.get(baseURL + 'prospect/all/').success(function (data, status, headers, config) {
            $scope.prospect = data;

            $rootScope.flag = 1;
            var testArray = [],a = [], i,split_array = [], trimmed_array = [], j, k, l, m, p, q,index,prospectCount = 0, clientsCount = 0;
            var countJan = 0, countFeb = 0, countMar = 0, countApr = 0, countMay = 0, countJun = 0,
                countJul = 0, countAug = 0, countSept = 0, countOct = 0, countNov = 0, countDec = 0,countOne = 0,countTwo = 0,
                countThreeToFive = 0,countFiveToTen = 0,countTenPlus = 0,countCreated = 0,countPrep = 0,countClient = 0,countOther = 0;

            for ( i = 0; i < data.length; i++ ) {

                testArray[i] = data[i].CreateDate;
                a[i] = testArray[i].split('-');
                testArray[i] = a[i][1];

                if(testArray[i] === '01'){
                    countJan++;
                }else if(testArray[i] === '02')
                {
                    countFeb++;
                }else if(testArray[i] === '03')
                {
                    countMar++;
                }else if(testArray[i] === '04')
                {
                    countApr++;
                }else if(testArray[i] === '05')
                {
                    countMay++;
                }else if(testArray[i] === '06')
                {
                    countJun++;
                }else if(testArray[i] === '07')
                {
                    countJul++;
                }else if(testArray[i] === '08')
                {
                    countAug++;
                }else if(testArray[i] === '09')
                {
                    countSept++;
                }else if(testArray[i] === '10')
                {
                    countOct++;
                }else if(testArray[i] === '11')
                {
                    countNov++;
                }else if(testArray[i] === '12')
                {
                    countDec++;
                }
            }

            $(document).ready(function () {

                RenderLineChart('report-container', [
                    [countJan],[countFeb],[countMar],[countApr],[countMay],[countJun],[countJul],[countAug],
                    [countSept],[countOct],[countNov],[countDec]
                ]);
            });

            $scope.reportTypes =
                [{
                    value: 'Prospect addition per month',
                    name: 'Prospect addition per month'

                }, {
                    value: 'Demand for various technologies',
                    name: 'Demand for various technologies'
                }, {
                    value: 'Prospect segregation by domain',
                    name: 'Prospect segregation by domain'
                }, {
                    value: 'Probable teamsize',
                    name: 'Probable teamsize'
                }, {
                    value: 'Number of prospects by each sales person',
                    name: 'Number of prospects by each sales person'
                },{
                    value: 'Ratio of prospects vs clients',
                    name: 'Ratio of prospects vs clients'
                },{
                    value: 'Prospect segregation by status',
                    name: 'Prospect segregation by status'
                },{
                    value: 'Volunteer participation for prospects',
                    name: 'Volunteer participation for prospects'
                }]
            ;
            $scope.reportType = 'Prospect addition per month';
            $scope.changeReport = function () {

                $rootScope.flag = 1;
                var testArray = [],a = [], i,split_array = [], trimmed_array = [], j, k, l, m, p, q,index,prospectCount = 0, clientsCount = 0;
                var countJan = 0, countFeb = 0, countMar = 0, countApr = 0, countMay = 0, countJun = 0,
                    countJul = 0, countAug = 0, countSept = 0, countOct = 0, countNov = 0, countDec = 0,countOne = 0,countTwo = 0,
                    countThreeToFive = 0,countFiveToTen = 0,countTenPlus = 0,countCreated = 0,countPrep = 0,countClient = 0,countOther = 0;

                if ( angular.equals($scope.reportType, $scope.reportTypes[0].value) ) {

                    for ( i = 0; i < data.length; i++ ) {

                        testArray[i] = data[i].CreateDate;
                        a[i] = testArray[i].split('-');
                        testArray[i] = a[i][1];

                        if(testArray[i] === '01'){
                            countJan++;
                        }else if(testArray[i] === '02')
                        {
                            countFeb++;
                        }else if(testArray[i] === '03')
                        {
                            countMar++;
                        }else if(testArray[i] === '04')
                        {
                            countApr++;
                        }else if(testArray[i] === '05')
                        {
                            countMay++;
                        }else if(testArray[i] === '06')
                        {
                            countJun++;
                        }else if(testArray[i] === '07')
                        {
                            countJul++;
                        }else if(testArray[i] === '08')
                        {
                            countAug++;
                        }else if(testArray[i] === '09')
                        {
                            countSept++;
                        }else if(testArray[i] === '10')
                        {
                            countOct++;
                        }else if(testArray[i] === '11')
                        {
                            countNov++;
                        }else if(testArray[i] === '12')
                        {
                            countDec++;
                        }
                    }
                    $(document).ready(function () {

                        RenderLineChart('report-container', [
                            [countJan],[countFeb],[countMar],[countApr],[countMay],[countJun],[countJul],[countAug],
                            [countSept],[countOct],[countNov],[countDec]
                        ]);
                    });
                }

                else if ( angular.equals($scope.reportType, $scope.reportTypes[1].value) ) {

                    for ( i = 0; i < data.length; i++ ) {
                        testArray[i] = data[i].TechStack;
                    }
                    for ( j = 0; j < testArray.length; j++ ) {
                        a[j] = testArray[j];
                        if (a[j].indexOf(',') !== -1) {
                            split_array = a[j].split(',');
                            for ( k = 0; k < split_array.length; k++) {
                                testArray.push(split_array[k]);
                            }
                        }
                    }
                    for ( l = 0; l < testArray.length; l++) {
                        if (testArray[l].indexOf(',') == -1) {
                            trimmed_array.push(testArray[l]);
                        }
                    }
                    testArray = trimmed_array;

                    for ( m = 0; m < testArray.length; m++ ) {

                        testArray[m] = angular.uppercase(testArray[m]);
                        testArray[m] = testArray[m].replace(/^[\s,]+|[\s,]+$/g,'');
                    }
                    var newArray = countArrayTechstack(testArray);
                    newArray.sort(function(a, b){return b.count - a.count});
                    for(  p = 10; p < newArray.length; p++) {
                        index = newArray.indexOf(newArray[p]);
                        newArray.splice(index,1,"OTHER");
                    }
                    var sortArray = sortArrayTechstack(newArray);
                    if(newArray.length > 10){
                        newArray.length = 10;
                    }
                    var finalArray = newArray.concat(sortArray);

                    $(document).ready(function () {

                        var parentArray = $.map(finalArray[0], function (value) {
                            return [value];
                        });
                        for ( i = 0; i < finalArray.length; i++ ) {
                            var array = $.map(finalArray[i], function (value) {
                                return [value];
                            });
                            parentArray[i] = array;
                        }

                        if(finalArray.length == 1 && parentArray.length == 2){

                            parentArray.length = 1;
                        }
                        var Array = $.map(parentArray, function (value) {
                            return [value];
                        });
                        RenderPieChartTechstack('report-container', [
                            Array
                        ]);
                    });
                }
                else if ( angular.equals($scope.reportType, $scope.reportTypes[2].value) ) {

                    for ( i = 0; i < data.length; i++ ) {
                        testArray[i] = data[i].Domain;
                    }
                    for ( j = 0; j < testArray.length; j++ ) {
                        a[j] = testArray[j];
                        if (a[j].indexOf(',') !== -1) {
                            split_array = a[j].split(',');
                            for ( k = 0; k < split_array.length; k++ ) {
                                testArray.push(split_array[k]);
                            }
                        }
                    }
                    for ( l = 0; l < testArray.length; l++ ) {
                        if (testArray[l].indexOf(',') == -1) {
                            trimmed_array.push(testArray[l]);
                        }
                    }
                    testArray = trimmed_array;

                    for ( m = 0; m < testArray.length; m++ ) {
                        testArray[m] = angular.uppercase(testArray[m]);
                        testArray[m] = testArray[m].replace(/^[\s,]+|[\s,]+$/g, '');
                    }

                    for(  p = 10; p < testArray.length; p++){
                        index = testArray.indexOf(testArray[p]);
                        testArray.splice(index,1,"OTHER");
                    }
                    var newArray = countArrayDomain(testArray);

                    $(document).ready(function () {

                        var parentArray = $.map(newArray[0], function (value, index) {
                            return [value];
                        });
                        for (var i = 0; i < newArray.length; i++) {
                            var array = $.map(newArray[i], function (value, index) {
                                return [value];
                            });
                            parentArray[i] = array;
                        }
                        if(newArray.length == 1 && parentArray.length == 2){

                            parentArray.length = 1;
                        }
                        var Array = $.map(parentArray, function (value, index) {
                            return [value];
                        });

                        RenderPieChartDomain('report-container', [
                            Array

                        ]);
                    });
                }

                else if ( angular.equals($scope.reportType, $scope.reportTypes[3].value) ) {

                    for ( i = 0; i < data.length; i++ ) {
                        testArray[i] = data[i].DesiredTeamSize.toString();

                        if(testArray[i] == 1){

                            countOne++;
                        }
                        else if(testArray[i] == 2){
                            countTwo++;
                        }
                        else if(testArray[i] >= 3 && testArray[i] <= 5){
                            countThreeToFive++;
                        }
                        else if(testArray[i] >= 5 && testArray[i] <= 10){

                            countFiveToTen++;
                        }
                        else if(testArray[i] > 10){
                            countTenPlus++;
                        }

                    }
                    console.log(countThreeToFive);
                    /*var newArray = countArrayTeamSize(testArray);
                     console.log(newArray);*/
                    $(document).ready(function () {
                        /*var parentArray = $.map(newArray[0], function (value, index) {
                         return [value];
                         });
                         for ( i = 0; i < newArray.length; i++ ) {
                         var array = $.map(newArray[i], function (value, index) {
                         return [value];
                         });
                         parentArray[i] = array;
                         }
                         if(newArray.length == 1 && parentArray.length == 2){

                         parentArray.length = 1;
                         }
                         var Array = $.map(parentArray, function (value, index) {
                         return [value];
                         });*/
                        RenderPieChartTeamSize('report-container', [
                            ['1' ,countOne],['2',countTwo],['3 - 5',countThreeToFive],
                            ['5 - 10',countFiveToTen],['10+',countTenPlus]
                        ]);
                    });

                }

                else if ( angular.equals($scope.reportType, $scope.reportTypes[4].value) ) {

                    for( i = 0; i < data.length; i++ ){
                        testArray[i] = data[i].SalesID;
                    }
                    for ( j = 0; j < testArray.length; j++ ) {

                        testArray[j] = angular.uppercase(testArray[j]);
                    }
                    console.log(testArray);
                    var newArray = countArraySalesPerson(testArray);

                    $(document).ready(function () {

                        var parentArray = $.map(newArray[0], function (value, index) {
                            return [value];
                        });
                        for ( i = 0; i < newArray.length; i++ ) {
                            var array = $.map(newArray[i], function (value, index) {
                                return [value];
                            });
                            parentArray[i] = array;
                        }
                        console.log(parentArray);
                        console.log(parentArray[0]);
                        console.log(newArray.length);
                        if(newArray.length == 1 && parentArray.length == 2){

                            parentArray.length = 1;
                        }
                        console.log(parentArray.length);
                        var Array = $.map(parentArray, function (value, index) {
                            return [value];
                        });
                        console.log(Array);
                        RenderBarChartSalesPerson('report-container', [
                            Array
                        ]);
                    });
                }

                else if ( angular.equals($scope.reportType, $scope.reportTypes[5].value) ) {

                    for ( i = 0; i < data.length; i++ ) {
                        testArray[i] = data[i].BUHead;

                        if (testArray[i].length === 0 ) {
                            prospectCount++;
                        }
                        else {
                            clientsCount++;
                        }
                    }
                    $(document).ready(function () {

                        RenderPieChartPropsectvsClient('report-container', [
                            ['Propsects',prospectCount],
                            ['Clients',clientsCount]
                        ]);
                    });
                }

                else if ( angular.equals($scope.reportType, $scope.reportTypes[6].value) ) {

                    for(  i = 0;i < data.length; i++ ){

                        testArray[i] = data[i].ProspectStatus;
                    }
                    console.log(testArray);
                    for( j = 0; j < testArray.length; j++){

                        if(testArray[j].indexOf('created') !== -1){
                            countCreated++;
                        }else if(testArray[j].indexOf('Prep') !== -1){

                            countPrep++;
                        }else if(testArray[j].indexOf('Client') !== -1){

                            countClient++;
                        }
                    }
                    $(document).ready(function () {

                        RenderPieChartProspectStatus('report-container', [
                            ['Propsect Created',countCreated],['Prep call scheduled',countPrep],
                            ['Client call scheduled',countClient]
                        ]);
                    });
                }

                else if ( angular.equals($scope.reportType, $scope.reportTypes[7].value) ) {

                    $scope.prospect = $rootScope.prospectToUpdate;

                    $http.get(baseURL + 'prospect/all/').success(function(data, status, headers, config) {

                        var prospectData = JSON.stringify(data);
                        var prospectList = JSON.parse(prospectData);
                        var numberOfProspects = prospectList.length;
                        var testArray = [],a = [];
                        for(var i = 0; i < numberOfProspects; i++){
                            (function (index) {
                                $http.get(baseURL + 'participant/prospectid/' + prospectList[i].ProspectID)
                                    .success(function(participantData, status, headers, config){
                                        /*// console.log(participantData);
                                         for(var k = 0;k < numberOfProspects.length; k++){
                                         a[i] = participantData[i].ParticipationRole;
                                         }
                                         console.log(a);*/
                                        var participantdata = JSON.stringify(participantData);


                                        if (JSON.parse(participantdata) == null) {
                                            prospectList[index].noOfVolunteers = 0;
                                        }
                                        else {
                                            prospectList[index].noOfVolunteers = JSON.parse(participantdata).length;
                                        }
                                        for(var j= 0;j < prospectList.length; j++){
                                            testArray[j] = prospectList[j].noOfVolunteers;

                                        }
                                        var newArray = combineVolunteerData(prospectList);
                                        // console.log(newArray);
                                        $(document).ready(function () {

                                            var parentArray = $.map(newArray[0], function (value, index) {
                                                return [value];
                                            });
                                            for ( i = 0; i < newArray.length; i++ ) {
                                                var array = $.map(newArray[i], function (value, index) {
                                                    return [value];
                                                });
                                                parentArray[i] = array;
                                            }

                                            if(newArray.length == 1 && parentArray.length == 2){

                                                parentArray.length = 1;
                                            }
                                            var Array = $.map(parentArray, function (value, index) {
                                                return [value];
                                            });
                                            //console.log(Array);
                                            RenderBarChartVolunteer('report-container', [
                                                Array
                                            ]);
                                        });
                                    }).error(function(data, status, header, config) {
                                    console.log("Not able to calculate volunteer count")
                                });

                            }(i));
                        }

                    }).error(function(data, status, header, config) {});
                }
            };

        }).error(function (data, status, header, config) {});
        function RenderLineChart(elementId,dataList) {
            new Highcharts.Chart({
                title: {
                    text: 'Prospect addition per month',
                    x: -20 //center
                },
                chart: {
                    renderTo: elementId,
                    height:600,
                    width:1140
                },
                xAxis: {
                    categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                        'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
                },
                yAxis: {
                    title: {
                        text: 'No. of Prospects Added'
                    },
                    plotLines: [{
                        value: 0,
                        width: 1,
                        color: '#808080'
                    }]
                },
                tooltip: {},

                series: [{
                    name:'No. of Prospects',
                    data: dataList
                }]
            })
        }
        function RenderPieChartTechstack(elementId, dataList) {

            for ( i = 0; i < dataList.length; i++) {
                new Highcharts.Chart({

                    chart: {
                        renderTo: elementId,
                        plotBackgroundColor: null,
                        plotBorderWidth: null,
                        plotShadow: false,
                        height:600,
                        width:1140
                    },
                    colors: ['#7cb5ec', '#434348', '#90ed7d', '#f7a35c', '#8085e9',
                        '#f15c80', '#e4d354', '#2b908f', '#f45b5b', '#91e8e1','#8c8c8c'],
                    title: {
                        text: 'Demand for various technologies'
                    },
                    tooltip: {
                        formatter: function () {
                            return '<b>' + this.point.name + '</b>: ' + this.point.y;
                        }
                    },
                    plotOptions: {
                        pie: {
                            allowPointSelect: true,
                            size:400,
                            center:[550,200],
                            cursor: 'pointer',
                            borderColor: null,
                            dataLabels: {
                                enabled: true,
                                color: '#000000',
                                formatter: function () {
                                    return '<b>' + this.point.name + '</b>: ' + Highcharts.numberFormat(this.percentage, 2) + '%';
                                }
                            }
                        }
                    },
                    series: [{
                        type: 'pie',
                        name: 'Browser share',
                        data: dataList[0]
                    }]
                });
            }
        }
        function RenderPieChartDomain(elementId, dataList) {

            for (var i = 0; i < dataList.length; i++ ) {
                new Highcharts.Chart({

                    chart: {
                        type: 'pie',
                        options3d: {
                            enabled: true,
                            alpha: 45,
                            beta: 0
                        },
                        renderTo: elementId,
                        plotBackgroundColor: null,
                        plotBorderWidth: null,
                        plotShadow: false,
                        height:600,
                        width:1140
                    }, title: {
                        text: 'Prospect segregation by domain',
                        name: 'Prospect segregation by domain'
                    },
                    tooltip: {
                        formatter: function () {
                            return '<b>' + this.point.name + '</b>: ' + this.point.y;
                        }
                    },
                    plotOptions: {
                        pie: {
                            allowPointSelect: true,
                            size:'100%',
                            center:[550,200],
                            cursor: 'pointer',
                            depth:55,
                            dataLabels:{
                                formatter: function () {
                                    return '<b>' + this.point.name + '</b>: '+ Highcharts.numberFormat(this.percentage, 2) + '%';
                                }
                            }
                        }
                    },
                    series: [{

                        type: 'pie',
                        name: 'Browser share',
                        data: dataList[0]
                    }]
                });
            }
        }
        function RenderPieChartTeamSize(elementId, dataList) {


            new Highcharts.Chart({

                chart: {
                    type: 'pie',

                    options3d: {
                        enabled: true,
                        alpha: 45,
                        beta: 0
                    },

                    renderTo: elementId,
                    plotBackgroundColor: null,
                    plotBorderWidth: null,
                    plotShadow: false,
                    height:600,
                    width:1140
                },
                colors: ['#7cb5ec', '#434348', '#90ed7d', '#f7a35c', '#8085e9',
                    '#f15c80', '#e4d354', '#2b908f', '#f45b5b', '#91e8e1','#E5005A'],
                title: {
                    text: 'Probable teamsize'
                },
                tooltip: {
                    formatter: function () {
                        return  'No. of people = <b>' + this.point.name + '</b>: ' + 'No. of teams = <b>'+ this.point.y ;
                    }
                },
                legend: {
                    align: 'right',
                    verticalAlign: 'bottom',
                    layout: 'vertical',
                    borderColor:'black',
                    itemStyle: {
                        fontSize:15
                    },
                    borderWidth:1,
                    labelFormatter: function () {
                        return this.name + ' Person team';
                    }
                },
                plotOptions: {
                    pie: {

                        allowPointSelect: true,
                        innerSize: 170,
                        size:400,
                        center:[550,200],
                        cursor: 'pointer',
                        depth:55,
                        showInLegend: true,
                        dataLabels:{

                            formatter: function () {
                                if (this.y != 0){
                                    return '<b>' + this.point.name + '</b>: '+ Highcharts.numberFormat(this.percentage, 2) + '%';
                                }
                                else{
                                    return null;
                                }
                            }
                        }
                    }
                },
                series: [{
                    type: 'pie',
                    name: 'Browser share',
                    data: dataList
                }]
            });

        }
        function RenderBarChartSalesPerson(elementId, dataList) {

            for (var i = 0; i < dataList.length; i++ ) {
                new Highcharts.Chart({

                    chart: {
                        margin: 75,
                        options3d: {
                            enabled: true,
                            alpha: 15,
                            beta: 15,
                            depth: 50,
                            viewDistance: 25
                        },
                        type: 'column',
                        renderTo: elementId,
                        plotBackgroundColor: null,
                        plotBorderWidth: null,
                        plotShadow: false,
                        height:600,
                        width:1140
                    }, title: {
                        text:'Number of prospects by each sales person'
                    },
                    xAxis: {
                        categories: [

                        ],
                        crosshair: true
                    },
                    yAxis: {
                        min: 0,
                        title: {
                            text:' <b>Number of propsects</b>'
                        }
                    },
                    tooltip: {
                        headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                        pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                        '<td style="padding:0"><b>{point.y}</b></td></tr>',
                        footerFormat: '</table>',
                        shared: true,
                        useHTML: true
                    },
                    plotOptions: {
                        column: {
                            pointPadding: 0.2,
                            borderWidth: 0,
                            depth:25
                        }
                    },
                    series: [{
                        showInLegend: false,
                        name:'Number of Prospects',
                        data: dataList[0]
                    }]
                });
            }
        }
        function RenderPieChartPropsectvsClient(elementId, dataList) {

            new Highcharts.Chart({

                chart: {
                    type: 'pie',
                    options3d: {
                        enabled: true,
                        alpha: 45,
                        beta: 0
                    },
                    renderTo: elementId,
                    plotBackgroundColor: null,
                    plotBorderWidth: null,
                    plotShadow: false,
                    height:600,
                    width:1140
                },
                colors: ['#FFA500','#008000'],
                title: {
                    text: 'Ratio of prospects vs clients'
                },
                tooltip: {
                    formatter: function () {
                        return '<b>' + this.point.name + '</b>: ' + this.point.y ;
                    }
                },
                plotOptions: {
                    pie: {
                        allowPointSelect: true,
                        size:400,
                        center:[550,200],
                        cursor: 'pointer',
                        depth:55,
                        dataLabels:{
                            formatter: function () {

                                if (this.y != 0){
                                    return '<b>' + this.point.name + '</b>: '+ Highcharts.numberFormat(this.percentage, 2) + '%';
                                }
                                else{
                                    return null;
                                }
                            }
                        }
                    }
                },
                series: [{
                    type: 'pie',
                    name: 'Browser share',
                    data: dataList
                }]
            });
        }
        function RenderPieChartProspectStatus(elementId, dataList) {
            new Highcharts.Chart({

                chart: {
                    renderTo: elementId,
                    plotBackgroundColor: null,
                    plotBorderWidth: null,
                    plotShadow: false,
                    height:600,
                    width:1140
                },
                colors: ['#7cb5ec', '#434348', '#90ed7d', '#f7a35c', '#8085e9',
                    '#f15c80', '#e4d354', '#2b908f', '#f45b5b', '#91e8e1','#8c8c8c'],
                title: {
                    text: 'Prospect segregation by status'
                },
                tooltip: {
                    formatter: function () {
                        return '<b>' + this.point.name + '</b>: ' + this.point.y;
                    }
                },
                plotOptions: {
                    pie: {
                        allowPointSelect: true,
                        size:400,
                        center:[550,200],
                        cursor: 'pointer',
                        borderColor: null,
                        dataLabels: {
                            enabled: true,
                            color: '#000000',
                            formatter: function () {
                                if (this.y != 0){
                                    return '<b>' + this.point.name + '</b>: '+ Highcharts.numberFormat(this.percentage, 2) + '%';
                                }
                                else{
                                    return null;
                                }                            }
                        }
                    }
                },
                series: [{
                    type: 'pie',
                    name: 'Browser share',
                    data: dataList
                }]
            });
        }
        function RenderBarChartVolunteer(elementId, dataList) {

            for (var i = 0; i < dataList.length; i++ ) {
                new Highcharts.Chart({

                    chart: {
                        margin: 75,
                        options3d: {
                            enabled: true,
                            alpha: 15,
                            beta: 15,
                            depth: 50,
                            viewDistance: 25
                        },
                        type: 'column',
                        renderTo: elementId,
                        plotBackgroundColor: null,
                        plotBorderWidth: null,
                        plotShadow: false,
                        height:600,
                        width:1140
                    }, title: {
                        text:'Volunteer participation for propsects'
                    },
                    xAxis: {
                        categories: [

                        ],
                        crosshair: true
                    },
                    yAxis: {
                        min: 0,
                        title: {
                            text:' <b>Number of volunteers</b>'
                        }
                    },
                    tooltip: {
                        headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                        pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                        '<td style="padding:0"><b>{point.y}</b></td></tr>',
                        footerFormat: '</table>',
                        shared: true,
                        useHTML: true
                    },
                    plotOptions: {
                        column: {
                            pointPadding: 0.2,
                            borderWidth: 0,
                            depth:25
                        }
                    },
                    series: [{
                        showInLegend: false,
                        name:'Number of volunteers',
                        data: dataList[0]
                    }]
                });
            }
        }
        function countArrayDomain(original) {
            var compressed = [];
            // make a copy of the input array
            var copy = original.slice(0);
            // first loop goes over every element
            for (var i = 0; i < original.length; i++) {
                var myCount = 0;
                // loop over every element in the copy and see if it's the same
                for (var w = 0; w < copy.length; w++) {
                    if (original[i] == copy[w]) {
                        // increase amount of times duplicate is found
                        myCount++;
                        // sets item to undefined
                        delete copy[w];
                    }
                }
                if (myCount > 0) {
                    var a = {};
                    a.value = original[i];
                    a.count = myCount;
                    compressed.push(a);
                }
            }
            return compressed;
        }
        function countArrayTechstack(original) {
            var compressed = [];
            // make a copy of the input array
            var copy = original.slice(0);
            // first loop goes over every element
            for (var i = 0; i < original.length; i++) {
                var myCount = 0;
                // loop over every element in the copy and see if it's the same
                for (var w = 0; w < copy.length; w++) {
                    if (original[i] == copy[w]) {
                        // increase amount of times duplicate is found
                        myCount++;
                        // sets item to undefined
                        delete copy[w];
                    }
                }
                if (myCount > 0) {
                    var a = {};
                    a.value = original[i];
                    a.count = myCount;
                    compressed.push(a);
                }
            }
            return compressed;
        }
        function sortArrayTechstack(original) {
            var compressed = [];
            // make a copy of the input array
            var copy = original.slice(0);
            // first loop goes over every element
            for (var i = 10; i < original.length; i++) {
                var myCount = 0;
                // loop over every element in the copy and see if it's the same
                for (var w = 0; w < copy.length; w++) {
                    if (original[i] == copy[w]) {
                        // increase amount of times duplicate is found
                        myCount++;
                        // sets item to undefined
                        delete copy[w];
                    }
                }
                if (myCount > 0) {
                    var a = {};
                    a.value = original[i];
                    a.count = myCount;
                    compressed.push(a);
                }
            }
            return compressed;
        }
        function countArraySalesPerson(original) {
            var compressed = [];
            // make a copy of the input array
            var copy = original.slice(0);
            // first loop goes over every element
            for (var i = 0; i < original.length; i++) {
                var myCount = 0;
                // loop over every element in the copy and see if it's the same
                for (var w = 0; w < copy.length; w++) {
                    if (original[i] == copy[w]) {
                        // increase amount of times duplicate is found
                        myCount++;
                        // sets item to undefined
                        delete copy[w];
                    }
                }
                if (myCount > 0) {
                    var a = {};
                    a.value = original[i];
                    a.count = myCount;
                    compressed.push(a);
                }
            }
            return compressed;
        }
        function combineVolunteerData(original) {
            var compressed = [];
            for (var i = 0; i < original.length; i++) {
                var a = {};
                a.value = original[i].Name;
                a.count = original[i].noOfVolunteers;
                compressed.push(a);

            }
            return compressed;
        }
    });