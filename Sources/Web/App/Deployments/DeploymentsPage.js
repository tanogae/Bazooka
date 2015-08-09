import React from "react";
import Router from 'react-router';
import Actions from "./ActionsCreator";
import ReactIntl from "react-intl";
var FormattedRelative = ReactIntl.FormattedRelative;
var { Route, DefaultRoute, RouteHandler, Link } = Router;

   var DeploymentRow = React.createClass({
    mixins:[Router.Navigation],

    navigate:function(){
      this.transitionTo("deployment",{Id:this.props.Deployment.Id});
    },

    render:function(){
      if(this.props.Deployment.Status==0){
        return(
          <tr onClick={this.navigate} style={{cursor:"pointer"}}>
            <td><i className="glyphicon glyphicon-list-alt"></i></td>
            <td>{this.props.Deployment.Name} - {this.props.Deployment.Configuration}</td>
            <td>{this.props.Deployment.Version}</td>
            <td>{this.props.Deployment.UserName}</td>
            <td></td>
          </tr>);
      } else if(this.props.Deployment.Status==1){
        return(
          <tr onClick={this.navigate} style={{cursor:"pointer"}}>
            <td><i className="glyphicon glyphicon glyphicon-play" style={{color:"#15CAFF"}}></i></td>
            <td>{this.props.Deployment.Name} - {this.props.Deployment.Configuration}</td>
            <td>{this.props.Deployment.Version}</td>
            <td>{this.props.Deployment.UserName}</td>
            <td><FormattedRelative value={this.props.Deployment.StartDate} /></td>
          </tr>);
      } else if(this.props.Deployment.Status==2){
        return(
          <tr onClick={this.navigate} style={{cursor:"pointer"}}>
            <td> <i className="glyphicon glyphicon-ok-circle" style={{color:"#17EF43"}}></i></td>
            <td>{this.props.Deployment.Name} - {this.props.Deployment.Configuration}</td>
            <td>{this.props.Deployment.Version}</td>
            <td>{this.props.Deployment.UserName}</td>
            <td><FormattedRelative value={this.props.Deployment.StartDate} /></td>
          </tr>);
      } else if(this.props.Deployment.Status==3){
        return(
          <tr onClick={this.navigate} style={{cursor:"pointer"}}>
            <td><i className="glyphicon glyphicon-remove-circle" style={{color:"#FF3B3B"}}></i></td>
            <td>{this.props.Deployment.Name} - {this.props.Deployment.Configuration}</td>
            <td>{this.props.Deployment.Version}</td>
            <td>{this.props.Deployment.UserName}</td>
            <td><FormattedRelative value={this.props.Deployment.StartDate} /></td>
          </tr>);
      }else if(this.props.Deployment.Status==3){
        return(
        <tr onClick={this.navigate} style={{cursor:"pointer"}}>
          <td><i className="glyphicon glyphicon-time"></i></td>
          <td>{this.props.Deployment.Name} - {this.props.Deployment.Configuration}</td>
          <td>{this.props.Deployment.Version}</td>
          <td>{this.props.Deployment.UserName}</td>
          <td><FormattedRelative value={this.props.Deployment.StartDate} /></td>
        </tr>);
      } else {
        return(
        <tr onClick={this.navigate} style={{cursor:"pointer"}}>
          <td><i className="glyphicon glyphicon-erase"></i></td>
          <td>{this.props.Deployment.Name} - {this.props.Deployment.Configuration}</td>
          <td>{this.props.Deployment.Version}</td>
          <td>{this.props.Deployment.UserName}</td>
          <td></td>
        </tr>);
      }
    }
  });

  var DeploymentsPage = React.createClass({

    getInitialState: function() {
      return {
        deployments : []
      };
    },

    update:function(){
      Actions.updateDeployments(this.refs.filter.getDOMNode().value).then(x => {
        this.setState({
          deployments:x
        })
      });
    },

    componentDidMount: function() {
      this.update();
    },


    updateFilters:function(){
       this.update();
    },

    render: function () {

      return(<div>
        <h2>Deployments:</h2>
        <table className="table table-border table-hover">
          <thead>
            <tr>
              <th>Status</th>
              <th>Application</th>
              <th>Version</th>
              <th>Started by</th>
              <th>
                <select ref="filter" onChange={this.updateFilters}>
                  <option>Today</option>
                  <option>Yesterday</option>
                  <option>Last week</option>
                  <option>Last month</option>
                </select>
              </th>
            </tr>
          </thead>
          <tbody>
          {this.state.deployments.map(x => (
              <DeploymentRow Deployment={x} />
            ))}
          </tbody>
        </table>
        </div>)
      }
    });

    module.exports = DeploymentsPage;
