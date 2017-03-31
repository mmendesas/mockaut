angular.module('mockaut').controller('ProjectController', function ($scope, $http, $routeParams, resourceProject, resourceLocation) {

    $scope.project = {};
    $scope.customMessage = '';
    currentFilename = '';

    if ($routeParams.projectID) {
        resourceProject.get({ projectID: $routeParams.projectID }, function (project) {
            $scope.project = project;
        }, function (err) {
            console.log(err);
            $scope.customMessage = 'Unable to get the Project';
        });
    }

    $scope.submeter = function () {
        if ($scope.formulario.$valid) {
            //update current project
            if ($routeParams.projectID) {
                resourceProject.update({ projectID: $scope.project._id }, $scope.project, function () {
                    $scope.customMessage = 'Project ' + $scope.project.name + ' alterado com sucesso';
                }, function (err) {
                    console.log(err);
                    $scope.customMessage = 'Não foi possível alterar o Project' + $scope.project.name;
                });
            }
            //create new project
            else {
                resourceProject.save($scope.project, function () {
                    $scope.project = {};
                    $scope.customMessage = 'Project incluído com sucesso';
                }, function (err) {
                    console.log(err);
                    $scope.customMessage = 'Não foi possível incluir o Project';
                });
            }

            // send to locations
            // resourceLocation.updateCache({ locationID: $scope.project.name }, $scope.project, function () {

            // }, function (err) {
            //     console.log(err);
            // });

            // console.log('PROJECTO', $scope.project);
        }
    };

    $scope.uploadFile = function (mFiles) {

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
                url: '/upload',
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

        resourceLocation.query(function (locations) {
            $scope.project.locations = locations;
        }, function (err) {
            console.log(err);
        });

        // if (currentFilename) {

        //     console.log('clicou na bagaça', currentFilename);

        //     // bate na api enviando nome do arquivo

        //     //preenche os campos e a tabela com os dados
        // }

    };


});