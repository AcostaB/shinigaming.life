import React from 'react';

export class ExpandableItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {...props, ...{expanded: false}};
    }

    handleExpandedClick = () => {
        this.setState((prevState, props) => ({expanded: !prevState.expanded}));
    };

    renderBody() {
        if (this.state.expanded) {
            return (<div className="expandableItem-body">
                        {this.props.expandableItemBody}
                    </div>);
        } else {
            return "";
        }
    };

    render() {
        return (
            <div>
                <div className="expandableItem-header">
                    <div className="expandableItem-header-content">
                        {this.props.expandableItemHeader}
                    </div>
                    <div className="expandableItem-header-icon" onClick={this.handleExpandedClick}/>
                </div>
                {this.renderBody()}
            </div>
        );
    }
}