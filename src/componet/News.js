import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import NewsItem from './Newsitem';
import Spinner from './Spinner';

const News = ({ pageSize, category }) => {
    const [articles, setArticles] = useState([]);
    const [page, setPage] = useState(1);
    const [totalResults, setTotalResults] = useState(0);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const url = `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=d229838f984643c78f851e0695a6a8f3&page=${page}&pageSize=${pageSize}`;
                const response = await fetch(url);
                const data = await response.json();
                setArticles(data.articles || []);
                setTotalResults(data.totalResults);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setLoading(false);
            }
        };

        fetchData();
    }, [page, pageSize]);

    const handlePrevClick = async () => {
        if (page > 1) {
            const newPage = page - 1;
            setLoading(true);
            const url = `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=d229838f984643c78f851e0695a6a8f3&page=${newPage}`;
            const data = await fetch(url);
            const parseData = await data.json();
            setPage(newPage);
            setArticles(parseData.articles || []);
            setLoading(false);
        }
    };

    const totalPages = Math.ceil(totalResults / pageSize);

    const handleNextClick = async () => {
        if (page + 1 > totalPages) {
            return;
        }

        const newPage = page + 1;
        setLoading(true);

        try {
            const url = `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=d229838f984643c78f851e0695a6a8f3&page=${newPage}&pageSize=${pageSize}`;
            const response = await fetch(url);
            const data = await response.json();

            setPage(newPage);
            setArticles(data.articles || []);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching data:', error);
            setLoading(false);
        }
    };

    return (
        <div className='container my-3'>
            <h1 className='text-center'>Top Headline News</h1>
            {loading && <Spinner />}
            <div className='row'>
                {articles.map((article, index) => (
                    <div className='col-md-4' key={index}>
                        <NewsItem
                            title={article.title}
                            description={article.description}
                            urlToImage={article.urlToImage}
                            url={article.url}
                            publishedAt={article.publishedAt}
                            author={article.author}
                            source={article.source}
                        />
                    </div>
                ))}
                <div className='container d-flex justify-content-between mt-5'>
                    <button
                        type='button'
                        disabled={page <= 1}
                        className='btn btn-sm btn-primary'
                        onClick={handlePrevClick}
                    >
                        &larr; Previous
                    </button>
                    <button
                        disabled={page >= totalPages}
                        className='btn btn-sm btn-primary'
                        onClick={handleNextClick}
                    >
                        Next &rarr;
                    </button>
                </div>
            </div>
        </div>
    );
};

News.defaultProps = {
    country: 'in',
    pageSize: 2,
};

News.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
};
export default News;
