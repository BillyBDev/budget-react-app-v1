import React, {Component} from 'react';
import Form from './Form';
// import { Button } from 'semantic-ui-react';
import Button from '@material-ui/core/button';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/AddBoxOutlined';


const AddItemBtn = (props) => {
    if (props.showForm === false) {
        return (
            <IconButton aria-label="add" onClick={props.toggleForm}>
                <AddIcon />
            </IconButton>
            //old semantic-ui button
            // <Button circular icon='plus' onClick={props.toggleForm}/>
        )
    } else {
        return null;
    }
}

const ItemsList = (props) => {
    const list = props.items.map((item, index) => {
        return (
            <li className="incomeListItem">
                {item.desc} - {item.amount}  
                <div className="delet">
                    <button
                        className="ui mini circular icon button inverted red" 
                        onClick={() => props.removeItem(index, item.amount)}
                    >
                        <i className="icon minus" />
                    </button>
                </div>
            </li>
        )
    })
    return <ul>{list}</ul>
}

class List extends Component {
    state = {
        showForm: false,
        items: []
    }

    toggleForm = () => {
        this.setState({
            showForm: !this.state.showForm
        });
    }

    addItem = (obj) => {
        let newItem = obj;
        let amt = obj.amount;
        if (this.props.flip) {
            amt = amt * -1;
        }
        this.props.adjustTotal(amt);
        this.setState({
            items: [...this.state.items, newItem]
        });
    }

    removeItem = (index, amount) => {
        const items = this.state.items;
        let amt = amount;
        if (this.props.flip) {
            amt = amt * -1;
        }
        this.props.adjustTotal(amt * -1);
        this.setState({items: items.filter((item, i) => {
            return i !== index
        })})
    }
    
    render(){
        return (
            <div>
                <ItemsList items={this.state.items} removeItem={this.removeItem} />
                <Form 
                    showForm={this.state.showForm} 
                    toggleForm={this.toggleForm}
                    addItem={this.addItem}
                />
                <AddItemBtn showForm={this.state.showForm} toggleForm={this.toggleForm}/>
            </div>
        )
    }
}

export default List;