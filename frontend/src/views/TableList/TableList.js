import React, {Component} from 'react';
import Table2 from '../../components/Table/Table2'
import { connect } from "react-redux";
class TableList extends Component {

    render() {
        console.log("%%%%", this.props.auth.user.classes)
        return (

            <div style={{display: 'flex', justifyContent: "center", alignItem: 'center',flexDirection:"column"}}>
                {this.props.auth.user.classes.map((classId)=>(
                    <Table2  classId={classId}/>
                ))}

            </div>
        );
    }
}


function mapStateToProps(state){
    return {
        auth:state.auth
    }
}

export default connect(mapStateToProps) (TableList);

