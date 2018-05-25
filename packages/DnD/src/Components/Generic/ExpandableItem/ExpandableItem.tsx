import React from 'react';
import "./ExpandableItem.css";

interface Props {
    expandableItemBody: JSX.Element | string,
    expandableItemHeader: JSX.Element | string
}

interface State extends Props {
    expanded: boolean
}

export class ExpandableItem extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {...props, expanded: false};
    }

    handleExpandedClick = (): void => {
        this.setState((prevState, props) => ({expanded: !prevState.expanded}));
    };

    renderBody(): JSX.Element | string {
        if (this.state.expanded) {
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