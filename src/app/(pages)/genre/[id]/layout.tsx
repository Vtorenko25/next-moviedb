import React from 'react';
import {Metadata} from "next";

export const metadata: Metadata = {
    title: 'GenersLayout metadata'
}
type Props = { children: React.ReactNode }
const GenersLayout = ({children}: Props) => {
    return (
        <div>
            {children}
        </div>
    );
};

export default GenersLayout;