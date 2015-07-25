import Dispatcher from '../Base/Dispatcher';
import { ActionTypes } from './Constants';
import reqwest from "reqwest";

module.exports = {
  testAgent: function (url) {
    return reqwest({
      url: "/api/deployTasks/test?url=" + url,
      type: 'json',
      contentType: 'application/json',
      method: "get"
    })
  },

  getDeployUrl(id) {
    return reqwest({
      url: "/api/deployTasks/deployUrl?id=" + id,
      type: 'json',
      contentType: 'application/json',
      method: "get"
    })
  },

  getUsers: function (id) {
      return reqwest({
        url: "/users/allowed?id=" + id,
        type: 'json',
        contentType: 'application/json',
        method: "get"
      })
  },

  addUser: function (id, userId) {
      return reqwest({
        url: "/users/allowed/add?enviromentId=" + id + "&userId=" + userId,
        type: 'json',
        contentType: 'application/json',
        method: "post"
      })
  },

  removeUser: function (id) {
      return reqwest({
        url: "/users/allowed/remove?id=" + id,
        type: 'json',
        contentType: 'application/json',
        method: "post"
      })
  },

  getGroups: function (id) {
      return reqwest({
        url: "/groups/allowed?id=" + id,
        type: 'json',
        contentType: 'application/json',
        method: "get"
      })
  },

  addGroup: function (id, groupId) {
      return reqwest({
        url: "/group/allowed/add?enviromentId=" + id + "&groupId=" + groupId,
        type: 'json',
        contentType: 'application/json',
        method: "post"
      })
  },

  removeGroups: function (id) {
      return reqwest({
        url: "/group/allowed/remove?id=" + id,
        type: 'json',
        contentType: 'application/json',
        method: "post"
      })
  },

  getAllUsers: function () {
    return reqwest({
      url: "/users/all",
      type: 'json',
      contentType: 'application/json',
      method: "get"
    });
  },

  getAllGroups: function () {
    return reqwest({
      url: "/users/groups/",
      type: 'json',
      contentType: 'application/json',
      method: "get"
    })
  },

  updateDeployUnits: function (enviromentId) {
    reqwest({
      url: "/api/DeployTasks/Tasks/?id=" + enviromentId,
      type: 'json',
      contentType: 'application/json',
      method: "get"
    }).then((x => {
      Dispatcher.handleServerAction({
        type: ActionTypes.UPDATE_DEPLOYUNITS,
        apps: x
      });
    }))
  },

  updateDeployUnit: function (deployUnitId) {
    reqwest({
      url: "/api/DeployTasks/DeployTask/?id=" + deployUnitId,
      type: 'json',
      contentType: 'application/json',
      method: "get"
    }).then((x => {
      Dispatcher.handleServerAction({
        type: ActionTypes.UPDATE_DEPLOYUNIT,
        apps: x
      });
    }))
  },

  modifyDeployUnit: function (deployUnitId, enviromentId, name, machine,
    packageName, directory, repository, params, uninstallationScript, installationScript, configFile, configTransform, configuration) {
    var promise = reqwest({
      url: "/api/deployTasks",
      type: 'json',
      contentType: 'application/json',
      method: "put",
      data: JSON.stringify({
        Id: deployUnitId,
        EnviromentId: enviromentId,
        Name: name,
        Machine: machine,
        PackageName: packageName,
        Directory: directory,
        Repository: repository,
        UninstallScript: uninstallationScript,
        InstallScript: installationScript,
        ConfigurationFile: configFile,
        ConfigurationTransform: configTransform,
        Configuration: configuration,
        AdditionalParameters: params.map(x => {
          x.Key = x.Name;
          return x;
        })
      })
    });

    promise.then(x => {
      module.exports.updateDeployUnits(enviromentId);
    });

    return promise;
  },

  createDeployUnit: function (enviromentId, name, machine, packageName,
    directory, repository, params) {
    var promise = reqwest({
      url: "/api/deployTasks",
      type: 'json',
      contentType: 'application/json',
      method: "post",
      data: JSON.stringify({
        EnviromentId: enviromentId,
        Name: name,
        Machine: machine,
        PackageName: packageName,
        Directory: directory,
        Repository: repository,
        AdditionalParameters: params.map(x => {
          x.Key = x.Name;
          return x;
        })
      })
    });

    promise.then(x => {
      module.exports.updateDeployUnits(enviromentId);
    });

    return promise;
  }
};
