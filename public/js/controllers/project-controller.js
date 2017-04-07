angular.module('mockaut').controller('ProjectController', function ($scope, $http, $routeParams, resourceProject, resourceRule) {

    $scope.project = {};
    $scope.customMessage = '';
    $scope.customErrorMessage = '';
    $scope.defaultRules = [];
    currentFilename = '';

    if ($routeParams.projectID) {
        resourceProject.get({ projectID: $routeParams.projectID }, function (project) {
            $scope.project = project;
            populateDefaultRules(project._id);
        }, function (err) {
            console.log(err);
            $scope.customMessage = 'Unable to get the Project';
        });
    }

    $scope.submeter = function () {
        
        cleanMessages();

        if ($scope.formulario.$valid) {
            //update current project
            if ($routeParams.projectID) {
                resourceProject.update({ projectID: $scope.project._id }, $scope.project, function () {
                    $scope.customMessage = 'Project ' + $scope.project.name + ' successfully updated';
                }, function (err) {
                    console.log(err);
                    $scope.customMessage = 'Unable to update the Project' + $scope.project.name;
                });
            }
            //create new project
            else {
                resourceProject.save($scope.project, function (savedProject) {
                    $scope.project = savedProject;
                    $scope.customMessage = 'Project successfully included';
                }, function (err) {
                    console.log(err);
                    $scope.customMessage = 'Unable to save the Project';
                });
            }
        }
    };

    $scope.uploadFile = function (mFiles) {

        cleanMessages();

        // var files = $(this).get(0).files;
        var files = mFiles;

        if (files.length > 0) {
            // create a FormData object which will be sent as the data payload in the
            // AJAX request
            var formData = new FormData();

            // loop through all the selected files and add them to the formData object
            for (var i = 0; i < files.length; i++) {
                var file = files[i];

                // add the files to formData object for the data payload
                formData.append('uploads[]', file, file.name);
                currentFilename = file.name;
            }

            $.ajax({
                url: '/v1/swgfile/upload',
                type: 'POST',
                data: formData,
                processData: false,
                contentType: false,
                success: function (data) {
                    console.log('upload successful!\n' + data);
                },
                xhr: function () {
                    // create an XMLHttpRequest
                    var xhr = new XMLHttpRequest();

                    // listen to the 'progress' event
                    xhr.upload.addEventListener('progress', function (evt) {

                        if (evt.lengthComputable) {
                            // calculate the percentage of upload completed
                            var percentComplete = evt.loaded / evt.total;
                            percentComplete = parseInt(percentComplete * 100);

                            // update the Bootstrap progress bar with the new percentage
                            $('.progress-bar').text(percentComplete + '%');
                            $('.progress-bar').width(percentComplete + '%');

                            // once the upload reaches 100%, set the progress bar text to done
                            if (percentComplete === 100) {
                                $('.progress-bar').html('File uploaded successfully!');
                            }
                        }
                    }, false);

                    return xhr;
                }
            });
        }
    };

    $scope.buildProject = function (req, res) {

        cleanMessages();

        if (currentFilename == '') {
            $scope.customErrorMessage = 'Please upload the file before generate rules';
        } else {
            if ($scope.project._id) {
                $http.post('/v1/swgfile/process/' + currentFilename, $scope.project)
                    .success(function () {
                        $scope.customMessage = 'File successfully processed';
                    })
                    .error(function (err) {
                        console.log(err);
                        $scope.customMessage = 'Unable to process the file';
                    });
            } else {
                $scope.customErrorMessage = 'Please save the project before generate Rules';
            }
        }
    };

    //TODO: ver se esse eh o melhor jeito de implementar essa groselha
    function populateDefaultRules(projectID) {
        resourceRule.query(function (rules) {
            var newRules = [];
            for (var i = 0; i < rules.length; i++) {
                if (rules[i].project_id === projectID) {
                    newRules.push(rules[i]);
                }
            }
            $scope.defaultRules = newRules;
        }, function (err) {
            console.log(err);
        });
    }

    //TODO: ver se esse eh o melhor jeito de implementar essa groselha
    function cleanMessages() {
        $scope.customErrorMessage = '';
        $scope.customMessage = '';
    }

});