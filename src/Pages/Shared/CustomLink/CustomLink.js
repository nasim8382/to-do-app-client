import React from 'react';
import { Link, useMatch, useResolvedPath } from 'react-router-dom';

const CustomLink = ({ children, to, ...props }) => {
    let resolved = useResolvedPath(to);
    let match = useMatch({ path: resolved.pathname, end: true });

    return (
        <div>
            <Link
                style={{
                    color: match? "white" : "white",
                    backgroundColor: match? "#b300b3" : "#26004d",
                    padding: match? "3px 12px" : "3px 12px",
                    borderRadius: match? "2px" : "2px",
                }}
                to={to}
                {...props}
            >
            {children}
            </Link>
        </div>
    );
};

export default CustomLink;