import React, { useState } from 'react';
import { Nav, initializeIcons, INavLink } from '@fluentui/react';

const navigationStyles = {
    root: {
        height: '100vh',
        boxSizing: 'border-box',
        //border: '1px solid #eee',
        overflowY: 'auto',
        paddingTop: '10vh',
    },
};

const links = [
    {
        links: [
            {
                name: 'Programar',
                key: 'key1',
                url: '#/',
                iconProps: {
                    iconName: 'News',
                    styles: {
                        root: {
                            fontSize: 20,
                            color: '#106ebe',
                        },
                    }
                }
            },
            {
                name: 'Estudiantes',
                key: 'key2',
                url: '#/estudiantes',
                iconProps: {
                    iconName: 'PlayerSettings',
                    styles: {
                        root: {
                            fontSize: 20,
                            color: '#106ebe',
                        },
                    }
                }
            },
            {
                name: 'Asignaciones',
                key: 'key3',
                url: '#/asignaciones',
                iconProps: {
                    iconName: 'SwitcherStartEnd',
                    styles: {
                        root: {
                            fontSize: 20,
                            color: '#106ebe',
                        },
                    }
                }
            },
            {
                name: 'Stats',
                key: 'key4',
                url: '#/',
                iconProps: {
                    iconName: 'StackedLineChart',
                    styles: {
                        root: {
                            fontSize: 20,
                            color: '#106ebe',
                        },
                    }
                }
            },
        ],
    },
];



const Navigation = () => {
    const [selectedKey, setSelectedkey] = useState<string | undefined>("key1");
    function _onLinkClick(ev?: React.MouseEvent<HTMLElement>, item?: INavLink) {
        setSelectedkey(item?.key);
    }
    initializeIcons();
    return (
        <Nav
            onLinkClick={_onLinkClick}
            groups={links}
            selectedKey={selectedKey}
            styles={navigationStyles}
        />
    );
};

export default Navigation;