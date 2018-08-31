import React from 'react';
import projectsApi from '../../api/projects';
import Pipeline from '../Pipeline';
import { renderIf } from '../../utils/helpers';

import './style'

export default class Projects extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            pipelines: []
        }
        this.handleSelectProject = this.handleSelectProject.bind(this)
        this.includePipeine = this.includePipeline.bind(this);
        this.hide = this.hide.bind(this);
    }

    handleSelectProject(value){
        projectsApi.getDefinitions(value).then(response => 
            this.setState({buildDefinitions: response.value, projectId: value}));
    }

    includePipeline(id){
        this.state.pipelines.push(id)
        this.setState({pipelines: this.state.pipelines})
    }

    componentDidMount(){
        projectsApi.get().then( response => 
            this.setState({projects: response.value}));
    }

    renderProjects(){
        return this.state.projects.map((project, i) => 
        <div>
            <h4>{project.name}</h4>
            <p> {project.description}</p>
            <button className="button green"
                value={project.id} 
                onClick={e =>this.handleSelectProject(e.target.value)} >
                Choose Me!
            </button>
        </div>);
    }

    renderDefinitions(){
        return this.state.buildDefinitions.map(definition => 
        <button className="button purple"
            key={definition.id}  
            value={definition.id} 
            onClick={e => this.includePipeline(e.target.value)} >
            {definition.name}
        </button>);
    }

    renderPipelines(){
        return  this.state.pipelines.map(pipelineId => 
        <Pipeline 
            key={pipelineId} 
            projectId={this.state.projectId} 
            definitionId={pipelineId} />);
    }

    hide(){
        this.setState({hide: "hide"})
    }

    render(){
        return  <div>
            {renderIf(() => this.state.projects, 
                () => <div className={`projects ${this.state.hide}`} >{this.renderProjects()}</div>)}     
            {renderIf(() => this.state.buildDefinitions , 
                () => <div className={`defintions ${this.state.hide}`}>
                        {this.renderDefinitions()}
                        <button className="button" onClick={this.hide}>Hide</button>
                      </div>)}
            {renderIf(() => this.state.pipelines && this.state.pipelines.length > 0, 
                () => this.renderPipelines())}
        </div>

    }
}