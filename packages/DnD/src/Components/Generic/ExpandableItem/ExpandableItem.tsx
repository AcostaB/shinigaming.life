import React from 'react';
import "./ExpandableItem.css";

interface IProps {
    expandableItemBody: JSX.Element | string,
    expandableItemHeader: JSX.Element | string
}

interface IState {
    expanded: boolean
}

// TODO: this should also follow the pattern of static properties. 
export class ExpandableItem extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = { expanded: false };
    }

    handleExpandedClick = (): void => {
        this.setState((prevState, props) => ({expanded: !prevState.expanded}));
    };

    renderBody(): JSX.Element | string {
        if (this.state != null && this.state.expanded) {
            return (<div className="expandableItem-body">
                        {this.props.expandableItemBody}
                    </div>);
        } else {
            return "";
        }
    };

    render(): JSX.Element {
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