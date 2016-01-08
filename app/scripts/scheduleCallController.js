var baseURL = "http://presaleshuddle:8080/";

angular.module('PreSales-Huddle')

    .controller('ScheduleCallCtrl', function ($scope, $http, $rootScope, $location) {
    document.getElementById('signin').style.visibility = 'hidden';
    document.getElementById('g-signinP').style.height = '0px';
    document.getElementById('sign-out').style.visibility = 'visible';
    document.getElementById('prospectList').style.visibility = 'visible';
    document.getElementById('clientList').style.visibility = 'visible';
    document.getElementById('headerText').style.visibility = 'visible';
    document.getElementById('reports').style.visibility = 'visible';
    document.getElementById('notifications').style.visibility='visible';
    document.getElementById('titleText').style.display = 'none';

    // code to show full notes on mouse hover
    $('.dropdown').hover( function () {
        $(this).find('.dropdown-menu').stop(true, true).delay(200).fadeIn(200);
    }, function() {
        $(this).find('.dropdown-menu').stop(true, true).delay(200).fadeOut(200);
    });

    /* reffer for fix footer height
     $().ready(function(){
     ch = $('#participantTable').width();
     alert(ch);
     $('#scheduleCallContainer').css({
     width : ch +'px'
     })
     });*/
    var currentProspect = $rootScope.prospectToUpdate;
    console.log("current prospect:", currentProspect);

    // set Default call participation status of all volunteers to "Yes"
    $http.get(baseURL + 'participant/prospectid/' + currentProspect.ProspectID)
        .success(function (data, status, headers, config) {
            console.log (data);
            if (data != undefined) {
                var callParticipants = JSON.stringify(data);
                console.log("callParticipants", callParticipants);

                if (JSON.parse(callParticipants) != null) {
                    var volunteersList = JSON.parse(callParticipants);
                    numberOfVolunteer = volunteersList.length;

                    console.log("volunteersList: ", volunteersList);

                    for (var i = 0; i < numberOfVolunteer; i++) {
                        volunteersList[i].Included = "Yes";
                        (function (index) {
                            $http.put(baseURL + 'participant/', data = volunteersList[i])
                                .success(function (data, status, headers, config) {
                                    console.log('participant updated.');
                                }).error(function (participantData, status, headers, config) {
                                console.log(participantData, status, headers, config);
                                console.log('participant not added.');
                            });
                        }(i));
                    }
                } else {
                    console.log("Empty Volunteer List.");
                }
            }
        }).error(function (data, status, headers, config) {
        console.log(data, status, headers, config);
    });

    $scope.typeOfCall = [
        {
            value: 'Internal Prep call',
            name: 'Internal Prep call'
        },
        {
            value: 'Client engg call',
            name: 'Client engg call'
        }
    ];
    $scope.call = 'Internal Prep call';

    // display volunteer table
    $http.get(baseURL + 'participant/prospectid/' + currentProspect.ProspectID)
        .success(function (data, status, headers, config) {
            //$rootScope.participants = data;

            var displayParticipants = JSON.stringify(data);
            console.log("displayParticipants", displayParticipants);

            if (JSON.parse(displayParticipants) != null) {
                var volunteersList = JSON.parse(displayParticipants);
                numberOfVolunteer = volunteersList.length;

                console.log("volunteersList: ", volunteersList);

                for (var i = 0; i < numberOfVolunteer; i++) {
                    var volunteerName = volunteersList[i];
                    volunteerName = volunteerName.UserID.substring(0, volunteerName.UserID.indexOf('@'));
                    var volunteerFirstName = volunteerName.split('.')[0];
                    var volunteerLastName = volunteerName.split('.')[1];
                    volunteerName = volunteerFirstName.charAt(0).toUpperCase() +
                        volunteerFirstName.substr(1) + ' ' + volunteerLastName.charAt(0).toUpperCase() +
                        volunteerLastName.substr(1);
                    volunteersList[i].volunteerName = volunteerName;

                    var notesLength = volunteersList[i].Notes.length;
                    if(notesLength > 50) {
                        volunteersList[i].flag = 1;
                    } else {
                        volunteersList[i].flag = 0;
                    }
                }
            } else {
                console.log("Empty Volunteer List.");
            }
            console.log("volunteersList after flag: ", volunteersList);
            $scope.participants = volunteersList;
            console.log("participants: ", $scope.participants);
        }).error(function (data, status, header, config) {
    });

    // set call time
    jQuery(function () {
        jQuery('#fromTime').datetimepicker();
        jQuery("#fromTime").on("dp.change", function (e) {
            //jQuery('#toTime').data("DateTimePicker").setMaxDate(e.date);

            $rootScope.ConfDateStart = e.date;
            console.log($rootScope.ConfDateStart);
            $rootScope.defaultToTime = new Date($rootScope.ConfDateStart);
            $rootScope.defaultToTime.setMinutes($rootScope.defaultToTime.getMinutes() + 45);

            //var d = new Date($rootScope.defaultToTime);
            //var month = d.getMonth() + 1;
            //var day = d.getDate();
            //
            //var time = d.toLocaleTimeString();
            //var s = time.split(':');
            //console.log("s:  s[2].substr(3)", s, s[2].substr(3));
            //var hr = d.getHours();
            //var minute = d.getMinutes();
            //t = hr + ':' + minute;
            //var output = (month < 10 ? '0' : '') +month+ '/' + (day < 10 ? '0': '')+ day + '/' + d.getFullYear();
            //var time_obj = s[0] + ':' + s[1] + " " + s[2].substr(3);
            //console.log("Output: ", output + " " + time_obj);

            jQuery("#toTime").data("DateTimePicker").setDate(new Date($rootScope.defaultToTime));
        });

        jQuery('#toTime').datetimepicker();
        jQuery("#toTime").on("dp.change", function (e) {

            //jQuery('#fromTime').data("DateTimePicker").setMaxDate(e.date);

            $rootScope.ConfDateEnd = e.date;
            console.log($rootScope.ConfDateEnd);
        });
    });

    // checkbox handling
    $scope.checkState = function ($event, participant) {
        console.log("Participant:", $event);
        console.log("Participant Object:", participant);

        var pStatus;
        if ($event == true) {
            console.log("yes", $event);
            pStatus = "Yes";
        } else if ($event == false) {
            pStatus = "No";
        }
        var participantData = {
            ProspectID: participant.ProspectID,
            UserID: participant.UserID,
            Included: pStatus,
            ParticipationRole: participant.ParticipationRole,
            AvailableDate: participant.AvailableDate,
            Notes: participant.Notes
        };

        $http.put(baseURL + 'participant/', data = participantData)
            .success(function (data, status, headers, config) {
                console.log("Data", participantData);
                console.log('participant updated.');
            }).error(function (participantData, status, headers, config) {
            console.log(participantData, status, headers, config);
            console.log('participant not updated.');
        });
    };

    var numberOfVolunteer = 0;
    var attendee_array;
    var attendees;
    var start = '{ "email" : ';
    var end;
    var attendee;
    var qoute = '"';

    $scope.scheduleCall = function () {
        console.log("$scope.call: ", $scope.call);
        var prospectStatus;

        var date = new Date($rootScope.ConfDateStart);
        var n = date.toDateString();
        var time = date.toLocaleTimeString();
        var date_time = n + " " + time;
        //var date = new Date($rootScope.ConfDateStart);

        console.log("length: ", date.toTimeString(), date.toTimeString().length);

        //var n = date.toDateString();
        //var time = date.toLocaleTimeString();
        //console.log("day & Time: ", n, time);
        //var date_time_str = n + ' ' + time;
        //var date_time = new Date(date_time_str);

        if(angular.equals($scope.call, "Internal Prep call")) {
            console.log("ConfDateStart: ", $rootScope.ConfDateStart);
            prospectStatus = "Prep call scheduled for " + date_time;
                //new Date($rootScope.ConfDateStart);
                //n + ' ' + time;
             //(new Date($rootScope.ConfDateStart)).toLocaleString('en-US');
        } else {
            prospectStatus = "Client call scheduled for " + date_time;
                 //new Date($rootScope.ConfDateStart);
                //n + ' ' + time;
             //(new Date($rootScope.ConfDateStart)).toLocaleString('en-US');
        }
        console.log("Prospect Status: ", prospectStatus);

        var prospectData = {
            ProspectID: $rootScope.prospectToUpdate.ProspectID,
            Name: currentProspect.Name,
            ConfCalls: [
                {
                    ConfDateStart: $rootScope.ConfDateStart,
                    ConfDateEnd: $rootScope.ConfDateEnd,
                    ConfType: $scope.call
                }
            ],
            TechStack: currentProspect.TechStack,
            Domain: currentProspect.Domain,
            DesiredTeamSize: currentProspect.DesiredTeamSize,
            ProspectNotes: currentProspect.ProspectNotes,
            CreateDate: currentProspect.CreateDate,
            SalesID: $rootScope.salesName,
            ProspectStatus: prospectStatus
        };

        // update prospect after scheduling call
        $http.put(baseURL + 'prospect/', data = prospectData)
            .success(function (data, status, headers, config) {
                console.log('Call details added to Prospect.');
                /*$location.path('/prospects');*/
            }).error(function (data, status, headers, config) {
            console.log(data, status, headers, config);
            console.log('Error occurred.');
        });

        // select participants before sending calender invite
        $http.get(baseURL + 'participant/prospectid/' + currentProspect.ProspectID)
            .success(function (data, status, headers, config) {

                console.log (data);
                var participants = JSON.stringify(data);
                console.log("participants: ", participants);
                if (JSON.parse(participants) == null) {
                    numberOfVolunteer = 0;
                }
                else {
                    numberOfVolunteer = JSON.parse(participants).length;
                    var volunteersList = JSON.parse(participants);
                    console.log("volunteersList: ", volunteersList);

                    for (var i = 0; i < numberOfVolunteer; i++) {
                        if (volunteersList[i].Included == "Yes" && volunteersList[i].UserID != "") {
                            end = ' }';
                            attendee = volunteersList[i].UserID;
                            console.log("attendee: ", attendee);
                            if (attendees == null) {
                                attendees = (start + qoute + attendee + qoute + end);
                                $rootScope.attendees = attendees;
                                console.log(" null attendees: ", attendees);
                            } else {
                                attendees += (', ' + start + qoute + attendee + qoute + end);
                                $rootScope.attendees += attendees;
                                console.log(" not nul attendees: ", attendees);
                            }
                        }
                    }
                    if (attendees) {
                        attendee_array = '[ ' + attendees + ' ]';
                        console.log("attendee_array: ", attendee_array);
                        checkAuth();
                    }
                }

            }).error(function (data, status, header, config) {
            console.log("Participants not fecthed.")
        });

        //send calender invite
        function sendCalendarInvite() {
            console.log("$rootScope.ConfDateStart: ", $rootScope.ConfDateStart);
            var date = new Date($rootScope.ConfDateStart);

            console.log("length: ", date.toTimeString(), date.toTimeString().length);

            var timeString = date.toTimeString();
            var timeZone = timeString.split(" ")[1];
            var GMTString = timeZone.substr(0, 4);
            if (angular.equals('0', timeZone.charAt(4))) {
                $rootScope.timeZoneValue = GMTString + timeZone.charAt(5) + ':' + timeZone.substr(6);
            } else {
                $rootScope.timeZoneValue = GMTString + timeZone.substr(4, 6) + ':' + timeZone.substr(6);
            }

            console.log("$rootScope.timeZoneValue: ", $rootScope.timeZoneValue);

            //var n = date.toDateString();
            //var time = date.toLocaleTimeString();
            //console.log("day & Time: ", n, time);
            //var date_time_str = n + ' ' + time;
            //var date_time = new Date(date_time_str);
            //console.log("date_time: ", date_time);
            var event = {
                'summary': 'Prospect: ' + currentProspect.Name + ' ' + $scope.call,
                'start': {
                    'dateTime': $rootScope.ConfDateStart,
                    'timeZone': $rootScope.timeZoneValue
                    //'timeZone': 'GMT+5:30'
                },
                'end': {
                    'dateTime': $rootScope.ConfDateEnd,
                    'timeZone': $rootScope.timeZoneValue
                    //'timeZone': 'GMT+5:30'
                },
                'attendees': jQuery.parseJSON(attendee_array),
                'reminders': {
                    'useDefault': false,
                    'overrides': [
                        {'method': 'email', 'minutes': 24 * 60},
                        {'method': 'popup', 'minutes': 10}
                    ]
                }
            };

            var request = gapi.client.calendar.events.insert({
                'calendarId': 'primary',
                'resource': event
            });

            request.execute(function (event) {
                console.log('Event created: ' + event.htmlLink);
                $rootScope.scheduleCallLink =  event.htmlLink;
                console.log("$rootScope.scheduleCalLink",$rootScope.scheduleCallLink);
                $rootScope.scheduleCallLink = ""+$rootScope.scheduleCallLink+"";
                console.log("$rootScope.scheduleCalLink new:-",$rootScope.scheduleCallLink);
                document.getElementById("message").innerHTML = '<a href="' + $rootScope.scheduleCallLink + '"target="_blank">here</a>';
                showPopup();
            });
        };

        function loadCalendarApi() {
            gapi.client.load('calendar', 'v3', sendCalendarInvite);
        }

        function showPopup() {
            $("#myModal").modal({backdrop: "static"});
        }

        // Check if current user has authorized this application.
        function checkAuth() {
            var api = gapi.auth2.getAuthInstance();
            var user = api.currentUser.get();
            var options = new gapi.auth2.SigninOptionsBuilder(
                {'scope': 'email https://www.googleapis.com/auth/calendar'});
            user.grant(options).then(
                function(success){
                    console.log(JSON.stringify({message: "success", value: success}));
                    loadCalendarApi();
                },
                function (fail) {
                    alert(JSON.stringify({message: "fail", value: fail}));
                });
        };
    };

    $scope.goBack = function() {
        $location.path('/prospects');
    }
    // Cancel button function
    $scope.go = function (path) {
        $rootScope.lastform = "createProspect";
        $location.path(path);
    }
})