import React, {useEffect} from "react";
import {axiosInstance} from "../../axiosConfig/axiosInstance";
import QuoteComponent from "../../components/quote/QuoteComponent";
import {QuoteType} from "../../types/QuoteType";
import Header from "../../components/Header/Header";

type QuoteResponse = {
    quotes: QuoteType[],
    page: number
}

const Home = () => {
    const [quotes, setQuotes] = React.useState<QuoteResponse>();
    const [quoteInput, setQuoteInput] = React.useState<string>("");
    const [page, setPage] = React.useState<number>(1);
    const [error, setError] = React.useState<string | null>(null);
    const [isLoading, setIsLoading] = React.useState<boolean>(false);

    const fetchQuotes = async (page?: number) => {
        return await axiosInstance.get(`/quotes${page ? `?page=${page}` : ""} `)
    }

    useEffect(() => {
        setIsLoading(true);
        fetchQuotes().then((response) => {
            setQuotes(response.data);
        }).catch((error) => {

        }).finally(() => {
            setIsLoading(false);
        });
    }, []);

    const handleSubmitQuote = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!quoteInput) {
            setError("Please provide a quote");
            return;
        }

        try {
            await axiosInstance.post("/quotes", {quote: quoteInput});
            const response = await fetchQuotes();
            setQuotes(response.data);
            setQuoteInput("");
        } catch (e) {
            setError("Error during quote creation");
        }
    }

    return (
        <div className={'min-h-screen flex flex-col'}>
            <Header/>
            <div className={'p-5'}>
                <h1 className="text-center text-5xl mt-10 pb-20">Write your best quote !</h1>

                <form onSubmit={handleSubmitQuote} className={'flex flex-col'}>
                    <div className="mockup-window bg-base-300">
                  <textarea className="bg-base-200 flex flex-col justify-center px-4 pb-20"
                            onChange={(e) => setQuoteInput(e.target.value)}
                            value={quoteInput} placeholder="Your quote"/>
                    </div>
                    <button type={'submit'} className="btn btn-primary text-xl my-4 ml-auto">Submit your quote !</button>
                </form>

                <h1 className="text-center text-5xl mt-20 py-10">Here's some recently added quotes</h1>

                <div className={'flex flex-col gap-4'}>
                    {isLoading && <span className={'loading loading-lg mx-auto'} />}
                    {quotes?.quotes.map((quote, index) => (
                        <QuoteComponent quote={quote} key={index}/>
                    ))}
                </div>
            </div>

        </div>
    )

};

export default Home;
