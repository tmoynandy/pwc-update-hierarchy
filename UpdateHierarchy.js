import React, { Component } from 'react';
import update from 'immutability-helper';
import './updateHierarchyStyle.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

export default class UpdateHierarchy extends Component {
  constructor() {
    super();
    this.state = {
      totalParent: 0,
      totalInput: 0,
      show: false,
      parentInputs: {}
    };
  }

  create = numOfFields => { };

  createFields = () => {
    let numParentHiers = this.state.totalParent;
    let parentInputs = {};
    let i;
    let newInput = {};
    for (i = 0; i < numParentHiers; i++) {
      let name = "hier-" + (i + 1);
      newInput = {
        value: "",
        children: {},
        totalChildren: 0,
        type: "fixed"
      };
      parentInputs[name] = newInput;
    }
    this.setState({
      parentInputs: parentInputs
    });
  };

  createChild = hier => { };

  dropdown = e => {
    let val = e.target.name;
    // console.log(val);

    let parents = this.state.parentInputs;
    let parent = parents[val];

    parent.type = e.target.value;
    parents[val] = parent;

    this.setState({
      parentInputs: parents
    });
  };

  addChild = (e,val) => {
    // let val = e.target.name;
    let parents = this.state.parentInputs;
    console.log(val);
    console.log(e.target)
    console.log(parents);
    let parent = parents[val];
    if (parent.type === "fixed" || parent.type === "") {
      // window.alert("select type as dynamic");
      let parentObj ={
        value:"",
        children:{},
        totalChildren:0,
        type:"fixed"
      }
      let parentName = "hier-"+(Number(this.state.totalParent)+1);
      console.log(parentName);
      parents[parentName] = parentObj;
      this.setState({
        parentInputs:parents,
        totalParent : Number(this.state.totalParent)+1
      })
    }
    else {
      let children = parent.children;
      let childObj = {
        value: "",
        parent: val,
        type:"fixed"
      };
      // put the next line after children[newKey] = childObj in case of typeError
      parent.totalChildren = parent.totalChildren + 1;
      let newKey = "child-" + parent.totalChildren;
      children[newKey] = childObj;

      parent.children = children;
      parents[val] = parent;

      this.setState({
        parentInputs: parents
      });
    }

  };

  ChildDropdown = (e,parent)=>{
    let val = e.target.value;
    let child = e.target.name;

    const newParentsInput = update(this.state.parentInputs,
      {
        [parent]: {children: {[child]: {type: {$set:val}}} }        
      })
    console.log(newParentsInput);
    this.setState({
      parentInputs:newParentsInput
    })

  }

  handleChildAddBtn = (e,parent,child)=>{
    // let child = e.target.name;
    console.log(child, parent);
    let childDropDownType = this.state.parentInputs[parent].children[child].type;
    
    if(childDropDownType==="fixed" || childDropDownType===""){
      let newParentObj = {
        value: "",
        children: {},
        totalChildren: 0,
        type: "fixed"
      }
      let parents = this.state.parentInputs;
      let totalParents = this.state.totalParent;
      parents["hier-"+(Number(totalParents)+1)] = newParentObj;
      this.setState({
        parentInputs:parents,
        totalParent : Number(totalParents)+1
      })
    }
    else{
      let parents = this.state.parentInputs;
      let par = parents[parent];
      let childObj ={
        value:"",
        type:"fixed",
        parent:parent
      }
      let children = par.children;
      par.totalChildren = par.totalChildren + 1;
      let newKey = "child-" + par.totalChildren;
      children[newKey] = childObj;
      par.children = children;
      parents[parent] = par;

      this.setState({
        parentInputs:parents
      })

    }
  }

  handleParentHierChange =(e)=>{
    let val =e.target.value;
    console.log(e.target.name);
    const newParent = update(this.state.parentInputs,{
      [e.target.name] : {value:{$set: val}}
    })
    this.setState({
      parentInputs:newParent
    })
  }

  handleChildHierChange = (e,parent)=>{
    let val = e.target.value;
    let child = e.target.name;
    console.log(val,parent,child);
    const newParent = update(this.state.parentInputs,{
      [parent]:{children:{[child]:{value:{$set:val}}}}
    })

    this.setState({
      parentInputs:newParent
    })
  }

  render() {
    const parents = this.state.parentInputs;
    console.log("new state", this.state);
    return (
      <React.Fragment>
        <div className="row">
          <div className="col">
            <div className="card">
              <div className="card-body">
              <p className = "metadata-upload ">Hierarchy Update</p>
               <p className = "select-hierarchy">Select Hierarchy </p>
              <button type="button" class="btn btn-outline-secondary btn-primary btn-text" >Select Hierarchy</button>
                <button type="button" class="btn btn-outline-secondary btn-primary dropdown-toggle dropdown-toggle-split" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  <span class="sr-only">Toggle Dropdown</span>
                </button>
                <div class="dropdown-menu">
                  <a class="dropdown-item" href="#">Action</a>
                  <a class="dropdown-item" href="#">Another action</a>
                  <a class="dropdown-item" href="#">Something else here</a>

                </div>
                <br/>
                <br />
                <p className = "select-hierarchy">Hierarchy Name</p>
                <div class="form-group">
  
  <input type="text" class="form-control" id="usr" />
</div>
            <br />
            
            
              
                <div className="input-group mb-3">
                  <input
                    type="number"
                    onChange={e => {
                      this.setState({ totalParent: e.target.value });
                    }}
                    placeholder="no. of parent hierarchies"
                  />
                  <div className="input-group-append">
                    <button className="btn btn-primary" onClick={this.createFields}>Create</button>
                  </div>
                </div>
              
            



            {Object.keys(parents).map(
              (parent, id) => {
                return (
                  <React.Fragment>
                    <div className="row">
                      <div className="col">
                        <div className="parent1">
                          <div class="input-group mb-3">
                            <input value={"hier-"+(id+1)} disabled/>
                            <input key={id} name={"hier-" + (id + 1)} type="text" onChange={this.handleParentHierChange}  />
                            <div class="input-group-append">
                              <button class="btn btn-primary" key={id + "btn"} name={"hier-" + (id + 1)} onClick={(e)=> this.addChild(e,"hier-"+(id+1))}>
                                <FontAwesomeIcon icon={faPlus} />
                              </button>
                            </div>
                            <select
                              
                              id={"type" + id}
                              name={"hier-" + (id + 1)}
                              key={id + "sel"}
                              onChange={this.dropdown}
                            >
                              <option disabled value="">
                                Select
                    </option>
                              <option value="fixed">Fixed</option>
                              <option value="dynamic">Dynamic</option>
                            </select>
                          </div>







                          <div className="card-md">
                            {Object.keys(this.state.parentInputs["hier-" + (id + 1)].children).map((data, idx) => {
                              return (
                                <React.Fragment>

                                  <div className="row">
                                    <div className="col">
                                      <div class="input-group mb-3">
                                        <input value={"hier-"+(id+1)} disabled/>
                                        <input type="text" key={idx} name={"child-" + (idx + 1)} onChange={(e) => this.handleChildHierChange(e, "hier-" + (id + 1))} />
                                        <div class="input-group-append">
                                          <button
                                            className="btn btn-primary"
                                            name={"child-" + (idx + 1)}
                                            par={"hier-" + (id + 1)}
                                            onClick={(e) => this.handleChildAddBtn(e, "hier-" + (id + 1),"child-"+(idx+1))}
                                          >
                                            <FontAwesomeIcon icon={faPlus} />
                                          </button>
                                        </div>
                                        <select
                                          
                                          id={"type-" + idx}
                                          name={"child-" + (idx + 1)}
                                          par={"hier" + (id + 1)}
                                          key={idx + "-sel"}
                                          onChange={(e) => this.ChildDropdown(e, "hier-" + (id + 1))}
                                        >
                                          <option disabled value="">
                                            Select
                            </option>
                                          <option value="fixed">Fixed</option>
                                          <option value="dynamic">Dynamic</option>
                                        </select>
                                      </div>



                                    </div>
                                  </div>


                                </React.Fragment>
                              )

                            })}

                          </div>


                        </div>
                      </div>
                    </div>

                  </React.Fragment>
                );
              })
            }
            {JSON.stringify(this.state,null,"\t")}
            { Object.keys(this.state.parentInputs).length != 0  ? (<div className="col">  <button className="btn btn-primary save-hierarchy" name="submit">Save Hierarchy</button></div>) : (<div></div>)}
              </div>
            </div>
            
          </div>
        </div>
          <br />
        <div className = "metadata-btn">
        <button className = "btn btn-primary btn-text">Metadata Upload </button>
        </div>
      </React.Fragment>
    );
  }
}