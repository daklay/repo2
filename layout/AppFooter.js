import React, { useContext } from 'react';
import { LayoutContext } from './context/layoutcontext';

const AppFooter = () => {
    const { layoutConfig } = useContext(LayoutContext);

    return (
        <div className="layout-footer">
            <img src={`/layout/images/logo-no-text.png`} alt="Logo" height="20" className="mr-2" />
            by
            <span className="font-medium ml-2">Pubsilon</span>
        </div>
    );
};

export default AppFooter;
