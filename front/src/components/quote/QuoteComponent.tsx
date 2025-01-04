import React from 'react';
import {QuoteType} from "../../types/QuoteType";

type Props = {
    quote: QuoteType
}

const QuoteComponent = (props: Props) => {
    const {quote} = props;

    return (
        <div className="mockup-window bg-base-300 flex flex-col ">
            <p className="bg-base-200 flex justify-center text-xl italic px-4 py-10">
                {quote.quote}
            </p>
            <span className={'ml-auto my-2 mr-4'}>
               {quote.user.email} {new Date(quote.createdAt).toLocaleDateString()}
            </span>
        </div>
    );
};

export default QuoteComponent;