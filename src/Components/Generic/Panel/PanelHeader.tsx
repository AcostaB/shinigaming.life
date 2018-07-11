import React, {SFC} from 'react';

interface IProps {
    title: string
}

export const PanelHeader: SFC<IProps> = ({title}) =>
    <div className="panel-header">
        <div className="panel-header-text">
            {title.toUpperCase()}
        </div>
    </div>;