
import React from 'react';

const DateContext = React.createContext({
    dateUtc: () => { }
});


export const DateContextProvider = (props) => {

    const dateToUtcHandler = (date) => {
        const d1 = new Date();
        const d2 = new Date(date);
        if (Math.abs(d1 - d2) / 1000 < 1) {
            return `now`
        }
        if (Math.abs(d1 - d2) / 1000 < 60) {
            return Math.floor(Math.abs(d1 - d2) / 1000) + ` seconds ago`
        }
        if (Math.abs(d1 - d2) / 1000 / 60 < 60) {
            return Math.floor(Math.abs(d1 - d2) / 1000 / 60) + ` minutes ago`
        }
        if (Math.abs(d1 - d2) / 1000 / 60 / 60 < 24) {
            return Math.floor((Math.abs(d1 - d2)) / 1000 / 60 / 60) + ` hours ago`
        } else {
            return Math.floor((Math.abs(d1 - d2)) / 1000 / 60 / 60 / 24) + ` days ago`
        }

    };


    const contextValue = {
        dateUtc: dateToUtcHandler
    };
    return (
        <DateContext.Provider value={contextValue}>
            {props.children}
        </DateContext.Provider>
    );
};

export default DateContext;
